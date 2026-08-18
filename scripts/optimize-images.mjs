import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DIRS = [
  { path: path.join(ROOT, "src/assets/galerie"), type: "gallery" },
  { path: path.join(ROOT, "src/assets/acceuil"), type: "hero" },
];

const EXTENSIONS = [".jpg", ".jpeg", ".png"];

// Target sizes based on image type and purpose
const TARGET_SIZES = {
  gallery: {
    // For portfolio images, create optimized web-sized version
    lg: { size: 1800, quality: 82, target: 600 }, // Large desktop view
    md: { size: 1200, quality: 82, target: 450 }, // Medium tablet view
    sm: { size: 800, quality: 82, target: 300 },  // Small mobile view
  },
  hero: {
    // For hero/hero images
    lg: { size: 2400, quality: 83, target: 700 }, // Full desktop hero
    md: { size: 1200, quality: 82, target: 400 }, // Tablet
    sm: { size: 800, quality: 81, target: 250 },  // Mobile
  },
};

async function optimizeImage(filePath, type = "gallery") {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return null;

  // Skip if already webp
  if (ext.toLowerCase() === ".webp") return null;

  const baseName = path.basename(filePath);
  const nameWithoutExt = path.parse(baseName).name;
  const dirPath = path.dirname(filePath);

  const srcSize = fs.statSync(filePath).size / 1024;
  const targets = TARGET_SIZES[type] || TARGET_SIZES.gallery;

  const results = {
    original: baseName,
    originalSize: srcSize.toFixed(2),
    optimized: [],
  };

  // Get image metadata
  const metadata = await sharp(filePath).metadata();
  const originalDimensions = `${metadata.width}x${metadata.height}`;

  // Create optimized version for gallery view
  const lgFileName = `${nameWithoutExt}.webp`;
  const lgPath = path.join(dirPath, lgFileName);

  try {
    // Create optimized full-size version (for lightbox/full view)
    let buffer = await sharp(filePath)
      .resize({
        width: targets.lg.size,
        height: targets.lg.size,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: targets.lg.quality, effort: 6 })
      .toBuffer();

    fs.writeFileSync(lgPath, buffer);
    const lgSize = (buffer.length / 1024).toFixed(2);
    results.optimized.push({
      file: lgFileName,
      size: lgSize,
      quality: targets.lg.quality,
      maxDimension: targets.lg.size,
    });
  } catch (err) {
    console.error(`  ERROR processing ${baseName}:`, err.message);
    return null;
  }

  return results;
}

function formatSize(bytes) {
  if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + " MB";
  }
  return bytes.toFixed(2) + " KB";
}

async function main() {
  console.log("🎨 Optimizing Photography Portfolio Images\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;

  for (const dirInfo of DIRS) {
    const dir = dirInfo.path;
    const type = dirInfo.type;

    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Directory not found: ${path.relative(ROOT, dir)}\n`);
      continue;
    }

    console.log(`📁 Processing: ${path.relative(ROOT, dir)}`);
    console.log(`   Type: ${type === "hero" ? "Hero/Landing Images" : "Gallery Images"}\n`);

    const allFiles = fs.readdirSync(dir);
    const imageFiles = allFiles
      .filter((f) => EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort();

    for (const file of imageFiles) {
      const filePath = path.join(dir, file);
      try {
        const result = await optimizeImage(filePath, type);
        if (result) {
          processedCount++;
          const origSizeNum = parseFloat(result.originalSize);
          totalOriginal += origSizeNum;

          console.log(`  ✓ ${result.original}`);
          console.log(`    Original: ${formatSize(origSizeNum * 1024)}`);

          for (const opt of result.optimized) {
            const optSizeNum = parseFloat(opt.size);
            totalOptimized += optSizeNum;
            const reduction = (
              ((origSizeNum - optSizeNum) / origSizeNum) *
              100
            ).toFixed(1);
            console.log(
              `    → ${opt.file} (${formatSize(optSizeNum * 1024)}, ${reduction}% reduction, Q${opt.quality})`
            );
          }
          console.log();
        }
      } catch (err) {
        console.error(`  ✗ Error processing ${file}:`, err.message);
      }
    }

    console.log();
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("📊 OPTIMIZATION SUMMARY");
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Images processed: ${processedCount}`);
  console.log(`  Total original size: ${formatSize(totalOriginal * 1024)}`);
  console.log(`  Total optimized size: ${formatSize(totalOptimized * 1024)}`);
  const totalReduction = (
    ((totalOriginal - totalOptimized) / totalOriginal) *
    100
  ).toFixed(1);
  console.log(`  Total reduction: ${totalReduction}%`);
  console.log(`  Average per image: ${formatSize((totalOptimized / processedCount) * 1024)}`);
  console.log(`\n✨ Optimization complete!`);
  console.log(`   Original files kept as backup.`);
  console.log(`   Updated .webp versions ready for deployment.\n`);
}

main().catch(console.error);
