import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DIRS = [
  path.join(ROOT, "src/assets/galerie"),
  path.join(ROOT, "src/assets/acceuil"),
];

const TARGET_SIZE_KB = 512; // ~0.5 MB
const MAX_DIMENSION = 2000; // max width or height in px
const EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return;

  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const baseName = path.basename(filePath);

  // Skip if webp already exists and is newer than source
  if (fs.existsSync(webpPath)) {
    const srcStat = fs.statSync(filePath);
    const webpStat = fs.statSync(webpPath);
    if (webpStat.mtimeMs > srcStat.mtimeMs) {
      console.log(`  SKIP  ${baseName} (webp already up-to-date)`);
      return;
    }
  }

  const srcSize = (fs.statSync(filePath).size / 1024).toFixed(0);
  let quality = 82;
  let buffer;

  // Iteratively adjust quality to approach target size
  for (let attempt = 0; attempt < 5; attempt++) {
    buffer = await sharp(filePath)
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality, effort: 6 })
      .toBuffer();

    const sizeKB = buffer.length / 1024;

    if (sizeKB <= TARGET_SIZE_KB * 1.1) break; // within 10% of target
    // Reduce quality proportionally
    quality = Math.max(30, Math.round(quality * (TARGET_SIZE_KB / sizeKB)));
  }

  fs.writeFileSync(webpPath, buffer);
  const outSize = (buffer.length / 1024).toFixed(0);
  console.log(
    `  DONE  ${baseName} → .webp  (${srcSize} KB → ${outSize} KB, q=${quality})`
  );
}

async function main() {
  console.log("Optimizing images to WebP...\n");

  for (const dir of DIRS) {
    console.log(`Directory: ${path.relative(ROOT, dir)}`);
    const files = fs.readdirSync(dir).map((f) => path.join(dir, f));
    for (const file of files) {
      await convertImage(file);
    }
    console.log();
  }

  console.log("Done! Original files kept as backup.");
  console.log("Update your imports from .jpg/.png → .webp");
}

main().catch(console.error);
