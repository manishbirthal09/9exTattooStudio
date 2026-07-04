/**
 * Batch-convert all images in a folder (recursively) to .webp
 *
 * Usage:
 *   node convert-to-webp.js <input-folder> [--quality=80] [--delete-original]
 *
 * Example:
 *   node convert-to-webp.js ../public/gallery --quality=75 --delete-original
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const VALID_EXT = ['.png', '.jpg', '.jpeg'];

// ── Parse CLI args ───────────────────────────────────────
const args = process.argv.slice(2);
const inputDir = args.find((a) => !a.startsWith('--'));
const qualityArg = args.find((a) => a.startsWith('--quality='));
const quality = qualityArg ? parseInt(qualityArg.split('=')[1], 10) : 80;
const deleteOriginal = args.includes('--delete-original');

if (!inputDir) {
  console.error('❌  Please provide a folder path.\n   Example: node convert-to-webp.js ../public/gallery');
  process.exit(1);
}

const resolvedDir = path.resolve(inputDir);
if (!fs.existsSync(resolvedDir)) {
  console.error(`❌  Folder not found: ${resolvedDir}`);
  process.exit(1);
}

// ── Recursively collect image files ─────────────────────
function collectImages(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(collectImages(fullPath));
    } else if (VALID_EXT.includes(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Convert one file ─────────────────────────────────────
async function convertFile(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const outputPath = path.join(dir, `${base}.webp`);

  const originalSize = fs.statSync(filePath).size;

  await sharp(filePath).webp({ quality }).toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  const savedPct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

  console.log(
    `✔ ${path.relative(resolvedDir, filePath)} → ${path.basename(outputPath)}  ` +
      `(${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB, -${savedPct}%)`
  );

  if (deleteOriginal) {
    fs.unlinkSync(filePath);
  }
}

// ── Run ───────────────────────────────────────────────────
(async () => {
  const files = collectImages(resolvedDir);

  if (files.length === 0) {
    console.log('No .png/.jpg/.jpeg files found in that folder.');
    return;
  }

  console.log(`Found ${files.length} image(s). Converting at quality=${quality}...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    try {
      await convertFile(file);
      successCount++;
    } catch (err) {
      console.error(`✘ Failed: ${file} — ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nDone. ${successCount} converted, ${failCount} failed.`);
  if (deleteOriginal) {
    console.log('Original files were deleted after conversion.');
  } else {
    console.log('Original files were kept. Re-run with --delete-original to remove them.');
  }
})();