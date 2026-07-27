#!/usr/bin/env node
/**
 * generate-responsive-images.mjs
 *
 * Reads every product image referenced by src/assets/products/*.asset.json,
 * and emits WebP + AVIF variants at responsive widths (400, 800, 1200, 1600)
 * into public/assets/products/responsive/<name>-<width>.<fmt>.
 *
 * Also writes a manifest JSON so the app can build <picture> srcsets without
 * scanning the filesystem at runtime:
 *   src/assets/products/responsive-manifest.json
 *
 *   {
 *     "wd40": {
 *       "original": "/assets/products/wd40.jpg",
 *       "webp": { "400": "/assets/products/responsive/wd40-400.webp", ... },
 *       "avif": { "400": "/assets/products/responsive/wd40-400.avif", ... },
 *       "widths": [400, 800, 1200, 1600]
 *     }
 *   }
 *
 * Incremental: skips outputs newer than the source. Pass --force to rebuild.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POINTER_DIR = path.join(ROOT, "src/assets/products");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "assets/products/responsive");
const MANIFEST = path.join(POINTER_DIR, "responsive-manifest.json");

const WIDTHS = [400, 800, 1200, 1600];
const FORCE = process.argv.includes("--force");

const exists = async (p) => { try { await fs.access(p); return true; } catch { return false; } };
const mtime = async (p) => { try { return (await fs.stat(p)).mtimeMs; } catch { return 0; } };

async function processOne(sourceAbs, baseName) {
  const meta = await sharp(sourceAbs).metadata();
  const srcWidth = meta.width || 1600;
  const srcMtime = await mtime(sourceAbs);
  await fs.mkdir(OUT_DIR, { recursive: true });

  const record = { webp: {}, avif: {}, widths: [] };
  for (const w of WIDTHS) {
    const targetWidth = Math.min(w, srcWidth);
    record.widths.push(targetWidth);
    for (const fmt of ["webp", "avif"]) {
      const outName = `${baseName}-${targetWidth}.${fmt}`;
      const outPath = path.join(OUT_DIR, outName);
      const publicUrl = `/assets/products/responsive/${outName}`;
      record[fmt][targetWidth] = publicUrl;
      if (!FORCE && (await mtime(outPath)) > srcMtime) continue;
      const pipeline = sharp(sourceAbs).resize({ width: targetWidth, withoutEnlargement: true });
      if (fmt === "webp") await pipeline.webp({ quality: 82 }).toFile(outPath);
      else await pipeline.avif({ quality: 55 }).toFile(outPath);
    }
  }
  return record;
}

async function main() {
  const pointerFiles = (await fs.readdir(POINTER_DIR)).filter((f) => f.endsWith(".asset.json"));
  const manifest = {};
  let processed = 0, skipped = 0, failed = 0;

  for (const f of pointerFiles) {
    const pointerPath = path.join(POINTER_DIR, f);
    let url;
    try { url = JSON.parse(await fs.readFile(pointerPath, "utf8")).url; } catch { failed++; continue; }
    if (!url || /^https?:\/\//i.test(url)) { skipped++; continue; }
    const sourceAbs = path.join(PUBLIC_DIR, url.replace(/^\//, ""));
    if (!(await exists(sourceAbs))) {
      console.warn(`  ⚠ missing source for ${f} → ${url}`);
      failed++;
      continue;
    }
    const baseName = path.basename(url, path.extname(url));
    try {
      const rec = await processOne(sourceAbs, baseName);
      manifest[baseName] = { original: url, ...rec };
      processed++;
      process.stdout.write(`  ✓ ${baseName}\n`);
    } catch (e) {
      console.error(`  ✗ ${baseName}: ${e.message}`);
      failed++;
    }
  }

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`\n🖼  Responsive image generation done.`);
  console.log(`   processed: ${processed}   skipped: ${skipped}   failed: ${failed}`);
  console.log(`   manifest:  ${path.relative(ROOT, MANIFEST)}`);
  console.log(`   output:    ${path.relative(ROOT, OUT_DIR)}/`);
  if (failed) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
