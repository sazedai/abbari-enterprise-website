#!/usr/bin/env node
/**
 * Build-time image reference checker.
 *
 * Scans project source for image references and verifies each resolves to:
 *   - an existing local file (relative import, alias @/…, or /public path), or
 *   - a reachable remote URL (HEAD/GET < 400, redirects followed) whose FINAL
 *     response has an image Content-Type, or
 *   - a Lovable Assets .asset.json pointer with a reachable, image-typed `url`.
 *
 * Sources scanned:
 *   - .ts / .tsx / .js / .jsx  (imports, JSX src/poster/href, template strings)
 *   - .css / .scss / .sass / .less (url(...) in rules, including CSS modules)
 *   - .html
 *   - .asset.json pointers under src/
 *
 * Run `node scripts/check-images.mjs --help` for the full CLI reference.
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

if (hasFlag("--help") || hasFlag("-h")) {
  console.log(`
image-check — verify every image reference in the project resolves.

USAGE
  node scripts/check-images.mjs [options]

NETWORK & CACHING
  --offline              Skip all network checks (local files + pointer JSON validity only).
  --no-cache             Bypass the on-disk URL cache for this run.

INCREMENTAL MODE
  --changed              Only scan files changed vs origin/main (or $GITHUB_BASE_REF).
  --since=<git-ref>      Only scan files changed since <git-ref> (e.g. HEAD~5, origin/dev).

IGNORE / ALLOWLIST (comma-separated)
  --ignore="<pattern>,..."
      Each pattern is auto-classified:
        .ext          → ignore by extension            (e.g. .gif)
        glob or path/ → ignore by source-file path     (e.g. src/legacy/**)
        re:<regex>    → ignore by full-URL regex       (e.g. re:^https://cdn\\.x\\.com/dyn/.*\\?t=)
        anything else → ignore by hostname glob        (e.g. tracking.example.com, *.ads.net)

THRESHOLDS (fail policy)
  --max-errors=<N>       Fail only if error count > N       (default: 0 → any error fails).
  --max-error-pct=<P>    Fail only if errors/total*100 > P  (default: 100 → disabled).
                         When both are set, EITHER exceeding triggers failure.

REPORTS
  --report-json=<path>   Write a machine-readable JSON report.
  --report-html=<path>   Write a human-readable HTML report.
  --pr-comment=<path>    Write a GitHub-flavored Markdown PR summary
                         (counts + top failures + artifact link if REPORT_ARTIFACT_URL is set).

CI
  --ci                   Emit ::warning:: / ::error:: annotations; obey thresholds strictly.
                         Also implied when \$CI=true.

MISC
  -h, --help             Show this help.

CONFIG FILE
  .imagecheckrc.json at the repo root — see the shipped example for every field.

EXAMPLES
  node scripts/check-images.mjs
  node scripts/check-images.mjs --offline
  node scripts/check-images.mjs --changed --report-html=reports/img.html
  node scripts/check-images.mjs --ci --max-errors=3 --max-error-pct=5 \\
    --report-json=reports/img.json --pr-comment=reports/pr.md
  node scripts/check-images.mjs --ignore=".gif,src/legacy/**,tracking.example.com,re:\\\\?token="
`);
  process.exit(0);
}

const OFFLINE = hasFlag("--offline");
const NO_CACHE = hasFlag("--no-cache");
const CI = hasFlag("--ci") || process.env.CI === "true";
const CHANGED = hasFlag("--changed");
const SINCE = getFlagVal("--since");
const REPORT_JSON = getFlagVal("--report-json");
const REPORT_HTML = getFlagVal("--report-html");
const PR_COMMENT = getFlagVal("--pr-comment");
const CLI_MAX_ERRORS = getFlagVal("--max-errors");
const CLI_MAX_ERROR_PCT = getFlagVal("--max-error-pct");

const IMG_EXT = /\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff?)$/i;
const IMAGE_MIME = /^image\//i;

// ---------- config + ignore rules ----------
async function loadConfig() {
  try { return JSON.parse(await fs.readFile(CONFIG_FILE, "utf8")); } catch { return {}; }
}

function globToRegex(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") { re += ".*"; i++; if (glob[i + 1] === "/") i++; }
      else re += "[^/]*";
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
    matchesDomain: (url) => { try { return domainRes.some((r) => r.test(new URL(url).hostname)); } catch { return false; } },
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
  } catch { return new Map(); }
}
async function saveCache(cache) {
  if (NO_CACHE) return;
  try { await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true }); await fs.writeFile(CACHE_FILE, JSON.stringify(Object.fromEntries(cache))); } catch {}
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
        if (s.active < concurrency && wait === 0) { s.active++; s.lastStart = Date.now(); resolve(); }
        else setTimeout(tryRun, wait || 5);
      };
      if (s.active < concurrency) tryRun(); else s.waiters.push(tryRun);
    });
  }
  function release(host) { const s = hosts.get(host); if (!s) return; s.active--; const next = s.waiters.shift(); if (next) next(); }
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

function extractRefsFromCode(text) {
  const refs = new Set();
  for (const m of text.matchAll(/from\s+["']([^"']+)["']/g)) refs.add(m[1]);
  for (const m of text.matchAll(/import\(\s*["']([^"']+)["']\s*\)/g)) refs.add(m[1]);
  for (const m of text.matchAll(/(?:src|poster|href)\s*=\s*["']([^"']+)["']/g)) refs.add(m[1]);
  for (const m of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) refs.add(m[1]);
  return [...refs];
}

function extractRefsFromCss(text) {
  const refs = new Set();
  // background: url(...), background-image: url(...), content: url(...), mask-image, border-image, cursor, list-style-image, @import url(...)
  for (const m of text.matchAll(/url\(\s*(?:"([^"]+)"|'([^']+)'|([^)\s]+))\s*\)/g)) {
    const u = (m[1] ?? m[2] ?? m[3] ?? "").trim();
    if (u && !u.startsWith("data:") && !u.startsWith("#")) refs.add(u);
  }
  return [...refs];
}

function resolveLocal(ref, fromFile) {
  if (ref.startsWith("@/")) return path.join(SRC, ref.slice(2));
  if (ref.startsWith("/")) return path.join(PUBLIC_DIR, ref);
  if (ref.startsWith(".")) return path.resolve(path.dirname(fromFile), ref);
  return null;
}
async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

// ---------- url checker (redirect-following) ----------
function makeUrlChecker({ cache, limiter, retries, validateContentType, maxRedirects }) {
  const inflight = new Map();

  async function attemptOnce(url, method) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetch(url, { method, redirect: "manual", signal: controller.signal, headers: method === "GET" ? { Range: "bytes=0-0" } : {} });
      return { status: res.status, headers: res.headers };
    } catch (e) {
      return { error: String(e?.message ?? e) };
    } finally { clearTimeout(t); }
  }

  async function attempt(startUrl) {
    let url = startUrl;
    const chain = [];
    for (let i = 0; i <= maxRedirects; i++) {
      let res = await attemptOnce(url, "HEAD");
      if (res.error) return { ok: false, error: res.error, finalUrl: url, chain };
      if (res.status === 405 || res.status === 403 || res.status === 501) {
        res = await attemptOnce(url, "GET");
        if (res.error) return { ok: false, error: res.error, finalUrl: url, chain };
      }
      chain.push({ url, status: res.status });
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) return { ok: false, status: res.status, error: "redirect without location", finalUrl: url, chain };
        url = new URL(loc, url).toString();
        continue;
      }
      const ct = res.headers.get("content-type") || "";
      return { ok: res.status < 400, status: res.status, contentType: ct, finalUrl: url, chain };
    }
    return { ok: false, error: `too many redirects (>${maxRedirects})`, finalUrl: url, chain };
  }

  async function check(url) {
    if (OFFLINE) return { ok: true, skipped: true };
    const cached = cache.get(url);
    if (cached) return { ...cached.result, cached: true };
    if (inflight.has(url)) return inflight.get(url);
    const p = (async () => {
      let host; try { host = new URL(url).hostname; } catch { return { ok: false, error: "invalid url" }; }
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
          result = { ...result, ok: false, error: `non-image content-type after ${result.chain.length - 1} redirect(s): ${result.contentType}` };
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
  try { const j = JSON.parse(await fs.readFile(absPath, "utf8")); return typeof j.url === "string" ? j.url : null; } catch { return null; }
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
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }

async function writeReports(records, summary) {
  if (REPORT_JSON) {
    const abs = path.resolve(ROOT, REPORT_JSON);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, JSON.stringify({ generatedAt: new Date().toISOString(), summary, records }, null, 2));
    console.log(`↳ JSON report: ${path.relative(ROOT, abs)}`);
  }
  if (REPORT_HTML) {
    const abs = path.resolve(ROOT, REPORT_HTML);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    const rows = records.map((r) => {
      const color = r.status === "ok" ? "#10b981" : r.status === "warn" ? "#f59e0b" : "#ef4444";
      return `<tr><td style="color:${color};font-weight:600">${r.status}</td><td>${esc(r.source)}</td><td style="word-break:break-all">${esc(r.ref)}</td><td style="word-break:break-all">${esc(r.resolved || "")}</td><td>${esc(r.reason || "")}</td></tr>`;
    }).join("");
    const html = `<!doctype html><meta charset="utf-8"><title>Image check report</title><style>body{font:14px system-ui;margin:24px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px 8px;text-align:left;vertical-align:top}th{background:#f5f5f5}</style><h1>Image check report</h1><p>Generated ${new Date().toISOString()} — ok: ${summary.ok}, warn: ${summary.warn}, error: ${summary.error}</p><table><thead><tr><th>Status</th><th>Source</th><th>Reference</th><th>Resolved</th><th>Reason</th></tr></thead><tbody>${rows}</tbody></table>`;
    await fs.writeFile(abs, html);
    console.log(`↳ HTML report: ${path.relative(ROOT, abs)}`);
  }
  if (PR_COMMENT) {
    const abs = path.resolve(ROOT, PR_COMMENT);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    const total = summary.ok + summary.warn + summary.error;
    const errors = records.filter((r) => r.status === "error").slice(0, 10);
    const artifactUrl = process.env.REPORT_ARTIFACT_URL || process.env.IMAGE_CHECK_ARTIFACT_URL;
    const badge = summary.error === 0 ? (summary.warn === 0 ? "✅ **All image references OK**" : "⚠️ **Passed with warnings**") : "❌ **Image check failed**";
    let md = `## 🖼️ Image reference check\n\n${badge}\n\n| Result | Count |\n|---|---:|\n| ✅ Pass | ${summary.ok} |\n| ⚠️ Warn | ${summary.warn} |\n| ❌ Fail | ${summary.error} |\n| **Total** | **${total}** |\n`;
    if (errors.length) {
      md += `\n<details open><summary><b>Top ${errors.length} failure(s)</b></summary>\n\n| Source | Reference | Reason |\n|---|---|---|\n`;
      for (const e of errors) md += `| \`${e.source}\` | \`${(e.ref || "").slice(0, 120)}\` | ${e.reason || ""} |\n`;
      md += `\n</details>\n`;
    }
    if (artifactUrl) md += `\n📎 [Full report artifact](${artifactUrl})\n`;
    else md += `\n_Full report attached as workflow artifact \`image-check-report\`._\n`;
    await fs.writeFile(abs, md);
    console.log(`↳ PR comment: ${path.relative(ROOT, abs)}`);
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
  const maxRedirects = config.maxRedirects ?? 5;
  const maxErrors = Number(CLI_MAX_ERRORS ?? config.maxErrors ?? 0);
  const maxErrorPct = Number(CLI_MAX_ERROR_PCT ?? config.maxErrorPct ?? 100);

  const cache = await loadCache(ttlHours);
  const limiter = makeHostLimiter({ concurrency, minIntervalMs });
  const checker = makeUrlChecker({ cache, limiter, retries, validateContentType, maxRedirects });

  const changedSet = (CHANGED || SINCE) ? getChangedFiles(SINCE) : null;
  const isChanged = (rel) => !changedSet || changedSet.has(rel.replace(/\\/g, "/"));

  const records = [];
  const urlPromises = new Map();

  const severityForUrl = (url) => {
    if (ignore.matchesDomain(url) || ignore.matchesUrl(url) || ignore.matchesExt(url)) return "skip";
    if (warn.matchesDomain(url) || warn.matchesUrl(url) || warn.matchesExt(url)) return "warn";
    return "error";
  };

  const enqueue = (url) => { if (!urlPromises.has(url)) urlPromises.set(url, checker.check(url)); return urlPromises.get(url); };

  const handleUrlRef = async (rel, ref, resolvedForRecord) => {
    const sev = severityForUrl(ref);
    if (sev === "skip") { records.push({ source: rel, ref, resolved: resolvedForRecord ?? ref, status: "ok", reason: "ignored" }); return; }
    const r = await enqueue(ref);
    if (r.ok || r.skipped) records.push({ source: rel, ref, resolved: r.finalUrl || resolvedForRecord || ref, status: "ok", reason: r.chain && r.chain.length > 1 ? `followed ${r.chain.length - 1} redirect(s)` : undefined });
    else records.push({ source: rel, ref, resolved: r.finalUrl || resolvedForRecord || ref, status: sev, reason: `unreachable (${r.error || r.status})` });
  };

  const allFiles = [...(await walk(SRC)), ...(await walk(PUBLIC_DIR)).filter((f) => /\.html$/.test(f))];
  const codeFiles = allFiles.filter((f) => /\.(t|j)sx?$|\.html$/.test(f));
  const cssFiles = allFiles.filter((f) => /\.(css|scss|sass|less)$/.test(f));

  const scanFile = async (file, extractor) => {
    const rel = path.relative(ROOT, file);
    if (ignore.matchesPath(rel)) return;
    if (!isChanged(rel)) return;
    const text = await fs.readFile(file, "utf8");
    for (const ref of extractor(text)) {
      if (ignore.matchesExt(ref)) continue;
      if (/^https?:\/\//i.test(ref)) {
        if (!IMG_EXT.test(ref.split("?")[0])) continue;
        await handleUrlRef(rel, ref);
        continue;
      }
      if (ref.startsWith("/__l5e/")) continue;
      if (ref.startsWith("data:") || ref.startsWith("#")) continue;
      const isAsset = ref.endsWith(".asset.json");
      if (!isAsset && !IMG_EXT.test(ref.split("?")[0])) continue;
      const abs = resolveLocal(ref, file);
      if (!abs) continue;
      if (!(await exists(abs))) { records.push({ source: rel, ref, resolved: abs, status: "error", reason: "missing local file" }); continue; }
      if (isAsset) {
        const url = await readAssetPointer(abs);
        if (!url) { records.push({ source: rel, ref, resolved: abs, status: "error", reason: "invalid asset pointer" }); continue; }
        const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
        await handleUrlRef(rel, full, full);
      } else {
        records.push({ source: rel, ref, resolved: abs, status: "ok" });
      }
    }
  };

  for (const f of codeFiles) await scanFile(f, extractRefsFromCode);
  for (const f of cssFiles) await scanFile(f, extractRefsFromCss);

  const pointers = (await walk(SRC)).filter((f) => f.endsWith(".asset.json"));
  for (const p of pointers) {
    const rel = path.relative(ROOT, p);
    if (ignore.matchesPath(rel)) continue;
    if (!isChanged(rel)) continue;
    const url = await readAssetPointer(p);
    if (!url) { records.push({ source: rel, ref: "(pointer)", resolved: p, status: "error", reason: "invalid pointer JSON" }); continue; }
    const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
    await handleUrlRef(rel, full, full);
  }

  const summary = records.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), { ok: 0, warn: 0, error: 0 });
  await saveCache(cache);
  await writeReports(records, summary);

  const warnings = records.filter((r) => r.status === "warn");
  const errors = records.filter((r) => r.status === "error");
  const total = records.length;
  const errPct = total ? (errors.length / total) * 100 : 0;
  const overThreshold = errors.length > maxErrors || errPct > maxErrorPct;

  for (const w of warnings) {
    const msg = `${w.source}: ${w.ref} — ${w.reason}`;
    console.warn(CI ? `::warning::${msg}` : `  ⚠ ${msg}`);
  }
  for (const p of errors) {
    const msg = `${p.source}: ${p.ref} — ${p.reason}`;
    console.error(CI ? `::error::${msg}` : `  ✗ ${msg}`);
  }

  console.log(
    `\n${overThreshold ? "✗" : "✓"} Image check ${overThreshold ? "failed" : "passed"}. ` +
    `${total} reference(s), ${urlPromises.size} url(s) validated. ` +
    `ok=${summary.ok} warn=${summary.warn} error=${summary.error} (${errPct.toFixed(1)}%) ` +
    `— threshold: max ${maxErrors} error(s) OR ${maxErrorPct}%${OFFLINE ? " (offline)" : ""}${changedSet ? ` (incremental: ${changedSet.size} changed)` : ""}.`,
  );

  if (overThreshold) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
