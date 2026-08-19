// scripts/generate-favicons.js
import sharp from 'sharp';

const sizes = [
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of sizes) {
  await sharp('public/gallery/logo.webp')
    .resize(size, size)
    .png()
    .toFile(`public/${name}`);
}