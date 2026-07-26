#!/usr/bin/env node
/**
 * Build-time image reference checker.
 *
 * Scans project source for image references and verifies each one resolves to:
 *   - an existing local file (relative import, alias @/…, or /public path), or
 *   - a reachable remote URL (HEAD/GET < 400), or
 *   - a Lovable Assets .asset.json pointer with a reachable `url`.
 *
 * Features:
 *   - Allowlist/ignore patterns via `.imagecheckrc.json` or `--ignore` CLI flag
 *     (match by path glob, extension, or domain).
 *   - On-disk cache of URL check results (TTL configurable) to speed up repeat runs.
 *   - Automatic retries with exponential backoff.
 *   - Basic host-level rate limiting (concurrency + min interval per host).
 *   - Exits non-zero on any unresolved reference so CI fails.
 *
 * Usage:
 *   node scripts/check-images.mjs                 # local + remote (cached)
 *   node scripts/check-images.mjs --offline       # skip network checks
 *   node scripts/check-images.mjs --no-cache      # bypass URL cache
 *   node scripts/check-images.mjs --ignore="**\/analytics/*,*.gif,tracking.example.com"
 *   node scripts/check-images.mjs --ci            # machine-friendly output + strict exit
 *
 * Config file (`.imagecheckrc.json` at repo root, optional):
 *   {
 *     "ignore": {
 *       "paths":      ["src/legacy/**", "src/experiments/**"],
 *       "extensions": [".gif"],
 *       "domains":    ["analytics.example.com", "*.tracking.net"]
 *     },
 *     "cacheTtlHours": 24,
 *     "retries": 2,
 *     "concurrencyPerHost": 4,
 *     "minIntervalMsPerHost": 50
 *   }
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");
const CACHE_FILE = path.join(ROOT, "node_modules", ".cache", "check-images", "url-cache.json");
const CONFIG_FILE = path.join(ROOT, ".imagecheckrc.json");

const argv = process.argv.slice(2);
const hasFlag = (f) => argv.includes(f);
const getFlagVal = (name) => {
  const p = argv.find((a) => a.startsWith(`${name}=`));
  return p ? p.slice(name.length + 1) : null;
};

const OFFLINE = hasFlag("--offline");
const NO_CACHE = hasFlag("--no-cache");
const CI = hasFlag("--ci") || process.env.CI === "true";

const IMG_EXT = /\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff?)$/i;

// ---------- config + ignore rules ----------
async function loadConfig() {
  try {
    return JSON.parse(await fs.readFile(CONFIG_FILE, "utf8"));
  } catch {
    return {};
  }
}

/** Convert a shell-ish glob to a RegExp. Supports **, *, ?. */
function globToRegex(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        re += ".*";
        i++;
        if (glob[i + 1] === "/") i++;
      } else re += "[^/]*";
    } else if (c === "?") re += ".";
    else if (".+^$(){}|[]\\".includes(c)) re += "\\" + c;
    else re += c;
  }
  return new RegExp("^" + re + "$", "i");
}

function buildIgnoreMatchers(cfgIgnore, cliIgnore) {
  const cfg = cfgIgnore ?? {};
  const extra = (cliIgnore || "").split(",").map((s) => s.trim()).filter(Boolean);
  const paths = [...(cfg.paths ?? [])];
  const exts = [...(cfg.extensions ?? [])];
  const domains = [...(cfg.domains ?? [])];
  for (const item of extra) {
    if (item.startsWith(".")) exts.push(item);
    else if (item.includes("/") || item.includes("*")) paths.push(item);
    else domains.push(item);
  }
  const pathRes = paths.map(globToRegex);
  const domainRes = domains.map(globToRegex);
  const extSet = new Set(exts.map((e) => e.toLowerCase()));
  return {
    ignoresPath: (rel) => pathRes.some((r) => r.test(rel.replace(/\\/g, "/"))),
    ignoresExt: (ref) => {
      const m = ref.split("?")[0].match(/\.[a-z0-9]+$/i);
      return m ? extSet.has(m[0].toLowerCase()) : false;
    },
    ignoresDomain: (url) => {
      try {
        const h = new URL(url).hostname;
        return domainRes.some((r) => r.test(h));
      } catch {
        return false;
      }
    },
  };
}

// ---------- url cache ----------
async function loadCache(ttlHours) {
  if (NO_CACHE) return new Map();
  try {
    const raw = JSON.parse(await fs.readFile(CACHE_FILE, "utf8"));
    const cutoff = Date.now() - ttlHours * 3600_000;
    return new Map(Object.entries(raw).filter(([, v]) => v.ts >= cutoff));
  } catch {
    return new Map();
  }
}
async function saveCache(cache) {
  if (NO_CACHE) return;
  try {
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    const obj = Object.fromEntries(cache);
    await fs.writeFile(CACHE_FILE, JSON.stringify(obj));
  } catch {
    /* non-fatal */
  }
}

// ---------- host-level rate limiter ----------
function makeHostLimiter({ concurrency, minIntervalMs }) {
  const hosts = new Map();
  async function acquire(host) {
    let s = hosts.get(host);
    if (!s) {
      s = { active: 0, lastStart: 0, waiters: [] };
      hosts.set(host, s);
    }
    await new Promise((resolve) => {
      const tryRun = () => {
        const wait = Math.max(0, s.lastStart + minIntervalMs - Date.now());
        if (s.active < concurrency && wait === 0) {
          s.active++;
          s.lastStart = Date.now();
          resolve();
        } else {
          setTimeout(tryRun, wait || 5);
        }
      };
      if (s.active < concurrency) tryRun();
      else s.waiters.push(tryRun);
    });
  }
  function release(host) {
    const s = hosts.get(host);
    if (!s) return;
    s.active--;
    const next = s.waiters.shift();
    if (next) next();
  }
  return { acquire, release };
}

// ---------- fs helpers ----------
async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name.startsWith(".")) continue;
      out.push(...(await walk(p)));
    } else out.push(p);
  }
  return out;
}

function extractRefs(text) {
  const refs = new Set();
  for (const m of text.matchAll(/from\s+["']([^"']+)["']/g)) refs.add(m[1]);
  for (const m of text.matchAll(/import\(\s*["']([^"']+)["']\s*\)/g)) refs.add(m[1]);
  for (const m of text.matchAll(/(?:src|poster|href)\s*=\s*["']([^"']+)["']/g)) refs.add(m[1]);
  for (const m of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) refs.add(m[1]);
  return [...refs];
}

function resolveLocal(ref, fromFile) {
  if (ref.startsWith("@/")) return path.join(SRC, ref.slice(2));
  if (ref.startsWith("/")) return path.join(PUBLIC_DIR, ref);
  if (ref.startsWith(".")) return path.resolve(path.dirname(fromFile), ref);
  return null;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

// ---------- url checker with retries + rate limit ----------
function makeUrlChecker({ cache, limiter, retries }) {
  const inflight = new Map();
  async function attempt(url) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 10_000);
    try {
      let res = await fetch(url, { method: "HEAD", signal: controller.signal });
      if (res.status === 405 || res.status === 403)
        res = await fetch(url, {
          method: "GET",
          headers: { Range: "bytes=0-0" },
          signal: controller.signal,
        });
      return { ok: res.status < 400, status: res.status };
    } catch (e) {
      return { ok: false, error: String(e?.message ?? e) };
    } finally {
      clearTimeout(t);
    }
  }
  async function check(url) {
    if (OFFLINE) return { ok: true, skipped: true };
    const cached = cache.get(url);
    if (cached) return { ...cached.result, cached: true };
    if (inflight.has(url)) return inflight.get(url);
    const p = (async () => {
      let host;
      try {
        host = new URL(url).hostname;
      } catch {
        return { ok: false, error: "invalid url" };
      }
      await limiter.acquire(host);
      try {
        let result;
        for (let i = 0; i <= retries; i++) {
          result = await attempt(url);
          if (result.ok) break;
          const status = result.status;
          const retryable = !status || status >= 500 || status === 429;
          if (!retryable || i === retries) break;
          await new Promise((r) => setTimeout(r, 250 * 2 ** i));
        }
        cache.set(url, { ts: Date.now(), result });
        return result;
      } finally {
        limiter.release(host);
      }
    })();
    inflight.set(url, p);
    return p;
  }
  return { check };
}

async function readAssetPointer(absPath) {
  try {
    const j = JSON.parse(await fs.readFile(absPath, "utf8"));
    return typeof j.url === "string" ? j.url : null;
  } catch {
    return null;
  }
}

// ---------- main ----------
async function main() {
  const config = await loadConfig();
  const ignore = buildIgnoreMatchers(config.ignore, getFlagVal("--ignore"));
  const ttlHours = config.cacheTtlHours ?? 24;
  const retries = config.retries ?? 2;
  const concurrency = config.concurrencyPerHost ?? 4;
  const minIntervalMs = config.minIntervalMsPerHost ?? 50;

  const cache = await loadCache(ttlHours);
  const limiter = makeHostLimiter({ concurrency, minIntervalMs });
  const checker = makeUrlChecker({ cache, limiter, retries });

  const problems = [];
  const urlPromises = new Map();
  const enqueue = (url) => {
    if (ignore.ignoresDomain(url) || ignore.ignoresExt(url)) return null;
    if (!urlPromises.has(url)) urlPromises.set(url, checker.check(url));
    return urlPromises.get(url);
  };

  const srcFiles = (await walk(SRC)).filter((f) => /\.(t|j)sx?$|\.css$|\.html$/.test(f));
  srcFiles.push(...(await walk(PUBLIC_DIR)).filter((f) => /\.html$/.test(f)));

  for (const file of srcFiles) {
    const rel = path.relative(ROOT, file);
    if (ignore.ignoresPath(rel)) continue;
    const text = await fs.readFile(file, "utf8");
    for (const ref of extractRefs(text)) {
      if (ignore.ignoresExt(ref)) continue;
      if (/^https?:\/\//i.test(ref)) {
        if (!IMG_EXT.test(ref.split("?")[0])) continue;
        const r = await enqueue(ref);
        if (r && !r.ok)
          problems.push(`${rel}: unreachable ${ref} (${r.status ?? r.error})`);
        continue;
      }
      if (ref.startsWith("/__l5e/")) continue;
      const isAsset = ref.endsWith(".asset.json");
      if (!isAsset && !IMG_EXT.test(ref)) continue;
      const abs = resolveLocal(ref, file);
      if (!abs) continue;
      if (!(await exists(abs))) {
        problems.push(`${rel}: missing local file ${ref}`);
        continue;
      }
      if (isAsset) {
        const url = await readAssetPointer(abs);
        if (!url) {
          problems.push(`${rel}: invalid asset pointer ${ref}`);
          continue;
        }
        const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
        const r = await enqueue(full);
        if (r && !r.ok && !r.skipped)
          problems.push(
            `${path.relative(ROOT, abs)}: CDN url unreachable ${url} (${r.status ?? r.error})`,
          );
      }
    }
  }

  const pointers = (await walk(SRC)).filter((f) => f.endsWith(".asset.json"));
  for (const p of pointers) {
    const rel = path.relative(ROOT, p);
    if (ignore.ignoresPath(rel)) continue;
    const url = await readAssetPointer(p);
    if (!url) {
      problems.push(`${rel}: invalid pointer JSON`);
      continue;
    }
    const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
    const r = await enqueue(full);
    if (r && !r.ok && !r.skipped)
      problems.push(`${rel}: CDN url unreachable ${url} (${r.status ?? r.error})`);
  }

  await saveCache(cache);

  const urlCount = urlPromises.size;
  if (problems.length) {
    const header = CI
      ? `::error::Image check failed (${problems.length} issue(s))`
      : `\n✗ Image check failed (${problems.length} issue(s)):`;
    console.error(header);
    for (const p of problems) console.error((CI ? "::error::" : "  - ") + p);
    process.exit(1);
  }
  console.log(
    `✓ Image check passed. ${pointers.length} pointer(s), ${urlCount} url(s) validated${OFFLINE ? " (offline mode)" : ""}${NO_CACHE ? "" : " (cache on)"}.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
