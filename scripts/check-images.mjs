#!/usr/bin/env node
/**
 * Build-time image reference checker.
 *
 * Scans project source for image references and verifies each one resolves to:
 *   - an existing local file (relative import, alias @/…, or /public path), or
 *   - a reachable remote URL (HEAD/GET < 400) with an image Content-Type, or
 *   - a Lovable Assets .asset.json pointer with a reachable, image-typed `url`.
 *
 * Features:
 *   - Allowlist/ignore patterns via `.imagecheckrc.json` or `--ignore` CLI flag
 *     (match by path glob, extension, domain glob, or full-URL regex).
 *   - Per-domain (or per-rule) severity: "warn" vs "error".
 *   - Content-Type / MIME validation on remote URLs.
 *   - Incremental mode (`--changed` / `--since=<ref>`) that only checks files
 *     changed in the current PR/commit range.
 *   - JSON + HTML report artifacts (`--report-json`, `--report-html`).
 *   - On-disk cache of URL check results (TTL configurable) to speed up repeat runs.
 *   - Automatic retries with exponential backoff.
 *   - Basic host-level rate limiting (concurrency + min interval per host).
 *   - Exits non-zero on any unresolved error-severity reference so CI fails.
 *
 * Usage:
 *   node scripts/check-images.mjs                    # local + remote (cached)
 *   node scripts/check-images.mjs --offline          # skip network checks
 *   node scripts/check-images.mjs --no-cache         # bypass URL cache
 *   node scripts/check-images.mjs --changed          # only files changed vs origin/main
 *   node scripts/check-images.mjs --since=HEAD~5     # only files changed since a git ref
 *   node scripts/check-images.mjs --report-json=report.json --report-html=report.html
 *   node scripts/check-images.mjs --ignore="**\/analytics/*,*.gif,tracking.example.com"
 *   node scripts/check-images.mjs --ci               # machine-friendly output + strict exit
 *
 * Config file (`.imagecheckrc.json` at repo root, optional):
 *   {
 *     "ignore": {
 *       "paths":      ["src/legacy/**"],
 *       "extensions": [".gif"],
 *       "domains":    ["analytics.example.com", "*.tracking.net"],
 *       "urlPatterns": ["^https://cdn\\.example\\.com/dynamic/.*\\?token="]
 *     },
 *     "warn": {
 *       "domains":    ["flaky.example.com"],
 *       "urlPatterns": ["^https://experimental\\..*"]
 *     },
 *     "cacheTtlHours": 24,
 *     "retries": 2,
 *     "concurrencyPerHost": 4,
 *     "minIntervalMsPerHost": 50,
 *     "validateContentType": true
 *   }
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

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
const CHANGED = hasFlag("--changed");
const SINCE = getFlagVal("--since");
const REPORT_JSON = getFlagVal("--report-json");
const REPORT_HTML = getFlagVal("--report-html");

const IMG_EXT = /\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff?)$/i;
const IMAGE_MIME = /^image\//i;

// ---------- config + ignore rules ----------
async function loadConfig() {
  try {
    return JSON.parse(await fs.readFile(CONFIG_FILE, "utf8"));
  } catch {
    return {};
  }
}

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

function buildMatchers(cfg = {}, cliIgnore) {
  const extra = (cliIgnore || "").split(",").map((s) => s.trim()).filter(Boolean);
  const paths = [...(cfg.paths ?? [])];
  const exts = [...(cfg.extensions ?? [])];
  const domains = [...(cfg.domains ?? [])];
  const urlPatterns = [...(cfg.urlPatterns ?? [])];
  for (const item of extra) {
    if (item.startsWith(".")) exts.push(item);
    else if (item.startsWith("re:")) urlPatterns.push(item.slice(3));
    else if (item.includes("/") || item.includes("*")) paths.push(item);
    else domains.push(item);
  }
  const pathRes = paths.map(globToRegex);
  const domainRes = domains.map(globToRegex);
  const urlRes = urlPatterns.map((p) => new RegExp(p));
  const extSet = new Set(exts.map((e) => e.toLowerCase()));
  return {
    matchesPath: (rel) => pathRes.some((r) => r.test(rel.replace(/\\/g, "/"))),
    matchesExt: (ref) => {
      const m = ref.split("?")[0].match(/\.[a-z0-9]+$/i);
      return m ? extSet.has(m[0].toLowerCase()) : false;
    },
    matchesDomain: (url) => {
      try {
        const h = new URL(url).hostname;
        return domainRes.some((r) => r.test(h));
      } catch {
        return false;
      }
    },
    matchesUrl: (url) => urlRes.some((r) => r.test(url)),
    hasAny: pathRes.length + domainRes.length + urlRes.length + extSet.size > 0,
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
    await fs.writeFile(CACHE_FILE, JSON.stringify(Object.fromEntries(cache)));
  } catch {}
}

// ---------- rate limiter ----------
function makeHostLimiter({ concurrency, minIntervalMs }) {
  const hosts = new Map();
  async function acquire(host) {
    let s = hosts.get(host);
    if (!s) { s = { active: 0, lastStart: 0, waiters: [] }; hosts.set(host, s); }
    await new Promise((resolve) => {
      const tryRun = () => {
        const wait = Math.max(0, s.lastStart + minIntervalMs - Date.now());
        if (s.active < concurrency && wait === 0) {
          s.active++; s.lastStart = Date.now(); resolve();
        } else setTimeout(tryRun, wait || 5);
      };
      if (s.active < concurrency) tryRun();
      else s.waiters.push(tryRun);
    });
  }
  function release(host) {
    const s = hosts.get(host); if (!s) return;
    s.active--; const next = s.waiters.shift(); if (next) next();
  }
  return { acquire, release };
}

// ---------- fs helpers ----------
async function walk(dir) {
  const out = [];
  let entries;
  try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return out; }
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
async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

// ---------- url checker ----------
function makeUrlChecker({ cache, limiter, retries, validateContentType }) {
  const inflight = new Map();
  async function attempt(url) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 10_000);
    try {
      let res = await fetch(url, { method: "HEAD", signal: controller.signal });
      if (res.status === 405 || res.status === 403)
        res = await fetch(url, { method: "GET", headers: { Range: "bytes=0-0" }, signal: controller.signal });
      const ct = res.headers.get("content-type") || "";
      return { ok: res.status < 400, status: res.status, contentType: ct };
    } catch (e) {
      return { ok: false, error: String(e?.message ?? e) };
    } finally { clearTimeout(t); }
  }
  async function check(url) {
    if (OFFLINE) return { ok: true, skipped: true };
    const cached = cache.get(url);
    if (cached) return { ...cached.result, cached: true };
    if (inflight.has(url)) return inflight.get(url);
    const p = (async () => {
      let host;
      try { host = new URL(url).hostname; } catch { return { ok: false, error: "invalid url" }; }
      await limiter.acquire(host);
      try {
        let result;
        for (let i = 0; i <= retries; i++) {
          result = await attempt(url);
          if (result.ok) break;
          const retryable = !result.status || result.status >= 500 || result.status === 429;
          if (!retryable || i === retries) break;
          await new Promise((r) => setTimeout(r, 250 * 2 ** i));
        }
        if (result.ok && validateContentType && result.contentType && !IMAGE_MIME.test(result.contentType)) {
          result = { ...result, ok: false, error: `non-image content-type: ${result.contentType}` };
        }
        cache.set(url, { ts: Date.now(), result });
        return result;
      } finally { limiter.release(host); }
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
  } catch { return null; }
}

// ---------- incremental (git) ----------
function getChangedFiles(since) {
  const ref = since || process.env.GITHUB_BASE_REF || "origin/main";
  try {
    const out = execSync(`git diff --name-only ${ref}...HEAD`, { cwd: ROOT, encoding: "utf8" });
    const untracked = execSync(`git ls-files --others --exclude-standard`, { cwd: ROOT, encoding: "utf8" });
    return new Set([...out.split("\n"), ...untracked.split("\n")].map((s) => s.trim()).filter(Boolean));
  } catch (e) {
    console.warn(`⚠ could not compute changed files (${e.message}); falling back to full scan`);
    return null;
  }
}

// ---------- reports ----------
async function writeReports(records) {
  if (REPORT_JSON) {
    const abs = path.resolve(ROOT, REPORT_JSON);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, JSON.stringify({ generatedAt: new Date().toISOString(), records }, null, 2));
    console.log(`↳ JSON report: ${path.relative(ROOT, abs)}`);
  }
  if (REPORT_HTML) {
    const abs = path.resolve(ROOT, REPORT_HTML);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    const rows = records.map((r) => {
      const color = r.status === "ok" ? "#10b981" : r.status === "warn" ? "#f59e0b" : "#ef4444";
      const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
      return `<tr><td style="color:${color};font-weight:600">${r.status}</td><td>${esc(r.source)}</td><td style="word-break:break-all">${esc(r.ref)}</td><td style="word-break:break-all">${esc(r.resolved || "")}</td><td>${esc(r.reason || "")}</td></tr>`;
    }).join("");
    const summary = records.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {});
    const html = `<!doctype html><meta charset="utf-8"><title>Image check report</title><style>body{font:14px system-ui;margin:24px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 8px;text-align:left;vertical-align:top}th{background:#f5f5f5}</style><h1>Image check report</h1><p>Generated ${new Date().toISOString()} — ok: ${summary.ok||0}, warn: ${summary.warn||0}, error: ${summary.error||0}</p><table><thead><tr><th>Status</th><th>Source</th><th>Reference</th><th>Resolved</th><th>Reason</th></tr></thead><tbody>${rows}</tbody></table>`;
    await fs.writeFile(abs, html);
    console.log(`↳ HTML report: ${path.relative(ROOT, abs)}`);
  }
}

// ---------- main ----------
async function main() {
  const config = await loadConfig();
  const ignore = buildMatchers(config.ignore, getFlagVal("--ignore"));
  const warn = buildMatchers(config.warn);
  const ttlHours = config.cacheTtlHours ?? 24;
  const retries = config.retries ?? 2;
  const concurrency = config.concurrencyPerHost ?? 4;
  const minIntervalMs = config.minIntervalMsPerHost ?? 50;
  const validateContentType = config.validateContentType !== false;

  const cache = await loadCache(ttlHours);
  const limiter = makeHostLimiter({ concurrency, minIntervalMs });
  const checker = makeUrlChecker({ cache, limiter, retries, validateContentType });

  const changedSet = (CHANGED || SINCE) ? getChangedFiles(SINCE) : null;
  const isChanged = (rel) => !changedSet || changedSet.has(rel.replace(/\\/g, "/"));

  const records = []; // {source, ref, resolved, status: 'ok'|'warn'|'error', reason}
  const urlPromises = new Map();

  const severityForUrl = (url) => {
    if (ignore.matchesDomain(url) || ignore.matchesUrl(url) || ignore.matchesExt(url)) return "skip";
    if (warn.matchesDomain(url) || warn.matchesUrl(url) || warn.matchesExt(url)) return "warn";
    return "error";
  };

  const enqueue = (url) => {
    if (!urlPromises.has(url)) urlPromises.set(url, checker.check(url));
    return urlPromises.get(url);
  };

  const srcFiles = (await walk(SRC)).filter((f) => /\.(t|j)sx?$|\.css$|\.html$/.test(f));
  srcFiles.push(...(await walk(PUBLIC_DIR)).filter((f) => /\.html$/.test(f)));

  for (const file of srcFiles) {
    const rel = path.relative(ROOT, file);
    if (ignore.matchesPath(rel)) continue;
    if (!isChanged(rel)) continue;
    const text = await fs.readFile(file, "utf8");
    for (const ref of extractRefs(text)) {
      if (ignore.matchesExt(ref)) continue;
      if (/^https?:\/\//i.test(ref)) {
        if (!IMG_EXT.test(ref.split("?")[0])) continue;
        const sev = severityForUrl(ref);
        if (sev === "skip") { records.push({ source: rel, ref, resolved: ref, status: "ok", reason: "ignored" }); continue; }
        const r = await enqueue(ref);
        if (r.ok || r.skipped) records.push({ source: rel, ref, resolved: ref, status: "ok" });
        else records.push({ source: rel, ref, resolved: ref, status: sev, reason: `unreachable (${r.status ?? r.error})` });
        continue;
      }
      if (ref.startsWith("/__l5e/")) continue;
      const isAsset = ref.endsWith(".asset.json");
      if (!isAsset && !IMG_EXT.test(ref)) continue;
      const abs = resolveLocal(ref, file);
      if (!abs) continue;
      if (!(await exists(abs))) {
        records.push({ source: rel, ref, resolved: abs, status: "error", reason: "missing local file" });
        continue;
      }
      if (isAsset) {
        const url = await readAssetPointer(abs);
        if (!url) { records.push({ source: rel, ref, resolved: abs, status: "error", reason: "invalid asset pointer" }); continue; }
        const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
        const sev = severityForUrl(full);
        if (sev === "skip") { records.push({ source: rel, ref, resolved: full, status: "ok", reason: "ignored" }); continue; }
        const r = await enqueue(full);
        if (r.ok || r.skipped) records.push({ source: rel, ref, resolved: full, status: "ok" });
        else records.push({ source: rel, ref, resolved: full, status: sev, reason: `CDN ${r.status ?? r.error}` });
      } else {
        records.push({ source: rel, ref, resolved: abs, status: "ok" });
      }
    }
  }

  const pointers = (await walk(SRC)).filter((f) => f.endsWith(".asset.json"));
  for (const p of pointers) {
    const rel = path.relative(ROOT, p);
    if (ignore.matchesPath(rel)) continue;
    if (!isChanged(rel)) continue;
    const url = await readAssetPointer(p);
    if (!url) { records.push({ source: rel, ref: "(pointer)", resolved: p, status: "error", reason: "invalid pointer JSON" }); continue; }
    const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
    const sev = severityForUrl(full);
    if (sev === "skip") { records.push({ source: rel, ref: url, resolved: full, status: "ok", reason: "ignored" }); continue; }
    const r = await enqueue(full);
    if (r.ok || r.skipped) records.push({ source: rel, ref: url, resolved: full, status: "ok" });
    else records.push({ source: rel, ref: url, resolved: full, status: sev, reason: `CDN ${r.status ?? r.error}` });
  }

  await saveCache(cache);
  await writeReports(records);

  const errors = records.filter((r) => r.status === "error");
  const warnings = records.filter((r) => r.status === "warn");

  for (const w of warnings) {
    const msg = `${w.source}: ${w.ref} — ${w.reason}`;
    console.warn(CI ? `::warning::${msg}` : `  ⚠ ${msg}`);
  }
  if (errors.length) {
    const header = CI ? `::error::Image check failed (${errors.length} issue(s))` : `\n✗ Image check failed (${errors.length} issue(s)):`;
    console.error(header);
    for (const p of errors) console.error((CI ? "::error::" : "  - ") + `${p.source}: ${p.ref} — ${p.reason}`);
    process.exit(1);
  }
  console.log(
    `✓ Image check passed. ${records.length} reference(s) checked, ${urlPromises.size} url(s) validated, ${warnings.length} warning(s)${OFFLINE ? " (offline)" : ""}${changedSet ? ` (incremental: ${changedSet.size} changed file(s))` : ""}.`,
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
