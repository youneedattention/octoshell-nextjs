import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const PUBLIC = decodeURIComponent(
  new URL("../public", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")
);

// Target: resize longest side to max 1600px, convert to WebP at quality 82
const MAX_PX  = 1600;
const QUALITY = 82;

const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const files = (await readdir(PUBLIC)).filter(f => EXTS.has(extname(f).toLowerCase()));

let totalBefore = 0;
let totalAfter  = 0;

for (const file of files) {
  const src  = join(PUBLIC, file);
  const name = basename(file, extname(file));
  const dest = join(PUBLIC, name + ".webp");

  const before = (await stat(src)).size;
  totalBefore += before;

  const img = sharp(src);
  const meta = await img.metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

  const pipeline = longest > MAX_PX
    ? img.resize({ width: meta.width > meta.height ? MAX_PX : undefined,
                   height: meta.height >= meta.width ? MAX_PX : undefined,
                   withoutEnlargement: true })
    : img;

  await pipeline.webp({ quality: QUALITY }).toFile(dest);

  const after = (await stat(dest)).size;
  totalAfter += after;

  const pct = (((before - after) / before) * 100).toFixed(1);
  const sign = after > before ? "+" : "-";
  console.log(
    `  ${file.padEnd(22)} ${(before/1024).toFixed(0).padStart(7)} KB  →  ${(after/1024).toFixed(0).padStart(6)} KB  (${sign}${Math.abs(pct)}%)`
  );

  // If output is same file (already webp), sharp wrote a temp first — no-op needed
  if (src !== dest) {
    // keep original only if we ended up larger (shouldn't happen, but safety net)
    if (after >= before && extname(file).toLowerCase() === ".webp") {
      await unlink(dest);
    }
  }
}

console.log("");
console.log(`  TOTAL BEFORE : ${(totalBefore/1024/1024).toFixed(2)} MB`);
console.log(`  TOTAL AFTER  : ${(totalAfter /1024/1024).toFixed(2)} MB`);
console.log(`  SAVED        : ${((totalBefore-totalAfter)/1024/1024).toFixed(2)} MB  (${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(1)}%)`);
