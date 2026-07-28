import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "public/assets/hero");
const OUT_DIR = path.join(SRC_DIR, "responsive");
const MANIFEST = path.join(ROOT, "src/assets/hero/responsive-manifest.json");
const WIDTHS = [640, 1024, 1280, 1600];

await fs.mkdir(OUT_DIR, { recursive: true });
const files = (await fs.readdir(SRC_DIR)).filter(f => /\.(jpe?g|png)$/i.test(f));
const manifest = {};
for (const f of files) {
  const src = path.join(SRC_DIR, f);
  const base = f.replace(/\.[^.]+$/, "");
  const meta = await sharp(src).metadata();
  const rec = { original: `/assets/hero/${f}`, webp: {}, avif: {}, widths: [] };
  for (const w of WIDTHS) {
    const tw = Math.min(w, meta.width || w);
    rec.widths.push(tw);
    for (const fmt of ["webp", "avif"]) {
      const out = path.join(OUT_DIR, `${base}-${tw}.${fmt}`);
      const url = `/assets/hero/responsive/${base}-${tw}.${fmt}`;
      rec[fmt][tw] = url;
      const p = sharp(src).resize({ width: tw, withoutEnlargement: true });
      if (fmt === "webp") await p.webp({ quality: 80 }).toFile(out);
      else await p.avif({ quality: 50 }).toFile(out);
    }
  }
  manifest[base] = rec;
  console.log("  ✓", base);
}
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
console.log("manifest →", path.relative(ROOT, MANIFEST));
