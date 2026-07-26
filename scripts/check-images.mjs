#!/usr/bin/env node
/**
 * Build-time image reference checker.
 *
 * Scans the project source for image references and verifies every one of them
 * resolves to either:
 *   - an existing local file (relative import, alias @/…, or /public path), or
 *   - a reachable remote URL (http(s) HEAD/GET returns < 400), or
 *   - a Lovable Assets .asset.json pointer with a reachable `url`.
 *
 * Exits with a non-zero status on any unresolved reference so CI/build fails.
 *
 * Usage:
 *   node scripts/check-images.mjs             # check local + remote
 *   node scripts/check-images.mjs --offline   # skip network checks
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");

const OFFLINE = process.argv.includes("--offline");
const IMG_EXT = /\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff?)$/i;

/** Recursively walk a directory returning file paths. */
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

/** Extract candidate image references from a text file. */
function extractRefs(text) {
  const refs = new Set();
  // import x from "…"
  for (const m of text.matchAll(/from\s+["']([^"']+)["']/g)) refs.add(m[1]);
  // import("…")
  for (const m of text.matchAll(/import\(\s*["']([^"']+)["']\s*\)/g)) refs.add(m[1]);
  // src="…" / poster="…" / href="…"
  for (const m of text.matchAll(/(?:src|poster|href)\s*=\s*["']([^"']+)["']/g))
    refs.add(m[1]);
  // url(...) in CSS/inline
  for (const m of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) refs.add(m[1]);
  return [...refs];
}

/** Resolve a source-file-relative reference to an absolute filesystem path. */
function resolveLocal(ref, fromFile) {
  if (ref.startsWith("@/")) return path.join(SRC, ref.slice(2));
  if (ref.startsWith("/")) return path.join(PUBLIC_DIR, ref);
  if (ref.startsWith(".")) return path.resolve(path.dirname(fromFile), ref);
  return null; // bare specifier (npm pkg) — ignore
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/** Check a remote URL with HEAD, fall back to ranged GET. */
async function checkUrl(url) {
  if (OFFLINE) return { ok: true, skipped: true };
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

/** Read a .asset.json pointer and return its url, or null if invalid. */
async function readAssetPointer(absPath) {
  try {
    const j = JSON.parse(await fs.readFile(absPath, "utf8"));
    return typeof j.url === "string" ? j.url : null;
  } catch {
    return null;
  }
}

async function main() {
  const problems = [];
  const checkedUrls = new Map();

  // 1. Scan source files for references.
  const srcFiles = (await walk(SRC)).filter((f) =>
    /\.(t|j)sx?$|\.css$|\.html$/.test(f),
  );
  srcFiles.push(...(await walk(PUBLIC_DIR)).filter((f) => /\.html$/.test(f)));

  for (const file of srcFiles) {
    const text = await fs.readFile(file, "utf8");
    for (const ref of extractRefs(text)) {
      // Remote URL
      if (/^https?:\/\//i.test(ref)) {
        if (!IMG_EXT.test(ref.split("?")[0])) continue;
        if (!checkedUrls.has(ref)) checkedUrls.set(ref, checkUrl(ref));
        const r = await checkedUrls.get(ref);
        if (!r.ok)
          problems.push(`${path.relative(ROOT, file)}: unreachable ${ref} (${r.status ?? r.error})`);
        continue;
      }
      // Lovable CDN absolute path
      if (ref.startsWith("/__l5e/")) continue;
      // Local ref (image only, or .asset.json pointer)
      const isAsset = ref.endsWith(".asset.json");
      if (!isAsset && !IMG_EXT.test(ref)) continue;
      const abs = resolveLocal(ref, file);
      if (!abs) continue;
      if (!(await exists(abs))) {
        problems.push(`${path.relative(ROOT, file)}: missing local file ${ref}`);
        continue;
      }
      if (isAsset) {
        const url = await readAssetPointer(abs);
        if (!url) {
          problems.push(`${path.relative(ROOT, file)}: invalid asset pointer ${ref}`);
          continue;
        }
        const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
        if (!checkedUrls.has(full)) checkedUrls.set(full, checkUrl(full));
        const r = await checkedUrls.get(full);
        if (!r.ok && !r.skipped)
          problems.push(
            `${path.relative(ROOT, abs)}: CDN url unreachable ${url} (${r.status ?? r.error})`,
          );
      }
    }
  }

  // 2. Also validate every .asset.json pointer in src/ even if not directly imported.
  const pointers = (await walk(SRC)).filter((f) => f.endsWith(".asset.json"));
  for (const p of pointers) {
    const url = await readAssetPointer(p);
    if (!url) {
      problems.push(`${path.relative(ROOT, p)}: invalid pointer JSON`);
      continue;
    }
    const full = url.startsWith("http") ? url : `https://cdn.lovable.dev${url}`;
    if (!checkedUrls.has(full)) checkedUrls.set(full, checkUrl(full));
    const r = await checkedUrls.get(full);
    if (!r.ok && !r.skipped)
      problems.push(
        `${path.relative(ROOT, p)}: CDN url unreachable ${url} (${r.status ?? r.error})`,
      );
  }

  const total = checkedUrls.size + pointers.length;
  if (problems.length) {
    console.error(`\n✗ Image check failed (${problems.length} issue(s)):`);
    for (const p of problems) console.error("  - " + p);
    process.exit(1);
  }
  console.log(
    `✓ Image check passed. ${pointers.length} asset pointer(s), ${checkedUrls.size} url(s) validated${OFFLINE ? " (offline mode)" : ""}.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
