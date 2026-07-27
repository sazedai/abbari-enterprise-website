#!/usr/bin/env node
/**
 * verify-product-images.mjs
 *
 * Scans every product asset pointer under src/assets/products/*.asset.json and
 * confirms the referenced image file exists locally under public/. Also flags
 * any local product image files that are not referenced by a pointer (orphans).
 *
 * Exit codes:
 *   0 — all pointers resolve
 *   1 — missing files (broken references)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POINTER_DIR = path.join(ROOT, "src/assets/products");
const PUBLIC_DIR = path.join(ROOT, "public");

const exists = async (p) => { try { await fs.access(p); return true; } catch { return false; } };

async function main() {
  const files = (await fs.readdir(POINTER_DIR)).filter((f) => f.endsWith(".asset.json"));
  const missing = [];
  const ok = [];
  const referenced = new Set();

  for (const f of files) {
    const abs = path.join(POINTER_DIR, f);
    let url;
    try {
      const j = JSON.parse(await fs.readFile(abs, "utf8"));
      url = j.url;
    } catch (e) {
      missing.push({ pointer: f, reason: `invalid JSON: ${e.message}` });
      continue;
    }
    if (!url || typeof url !== "string") {
      missing.push({ pointer: f, reason: "missing url field" });
      continue;
    }
    if (/^https?:\/\//i.test(url)) {
      ok.push({ pointer: f, url, note: "external URL (not verified)" });
      continue;
    }
    const localPath = path.join(PUBLIC_DIR, url.replace(/^\//, ""));
    if (await exists(localPath)) {
      ok.push({ pointer: f, url });
      referenced.add(path.resolve(localPath));
    } else {
      missing.push({ pointer: f, url, reason: `file not found at public${url}` });
    }
  }

  // Orphan scan
  const productsDir = path.join(PUBLIC_DIR, "assets/products");
  const orphans = [];
  if (await exists(productsDir)) {
    const walk = async (dir) => {
      for (const e of await fs.readdir(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        // Skip generated responsive variants — managed by generate-responsive-images.mjs
        if (e.isDirectory()) { if (e.name === "responsive") continue; await walk(p); }
        else if (/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(e.name) && !referenced.has(p)) {
          orphans.push(path.relative(ROOT, p));
        }
      }
    };
    await walk(productsDir);
  }

  console.log(`\n📦 Product image verification`);
  console.log(`   pointers scanned: ${files.length}`);
  console.log(`   ✓ resolved:       ${ok.length}`);
  console.log(`   ✗ missing:        ${missing.length}`);
  console.log(`   ⚠ orphaned files: ${orphans.length}\n`);

  if (missing.length) {
    console.log(`Missing references:`);
    for (const m of missing) console.log(`  ✗ ${m.pointer}${m.url ? ` → ${m.url}` : ""} (${m.reason})`);
    console.log("");
  }
  if (orphans.length && process.argv.includes("--show-orphans")) {
    console.log(`Orphan files (not referenced by any pointer):`);
    for (const o of orphans) console.log(`  ⚠ ${o}`);
    console.log("");
  }

  process.exit(missing.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
