/**
 * Favicon generator — creates all required sizes from logo.png
 * Run: node scripts/gen-favicons.mjs
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT  = join(__dirname, '../public/logo.png');
const PUBLIC = join(__dirname, '../public');

// --- Helper: circular crop with padding, then resize ---
async function makeIcon(size, outputPath) {
  // 1. Resize to a slightly larger canvas with padding so the circle logo
  //    has breathing room and is crisp at small sizes
  const pad = Math.round(size * 0.05);            // 5% padding each side
  const inner = size - pad * 2;

  // 2. Resize the source image to inner size (preserves aspect ratio)
  const resized = await sharp(INPUT)
    .resize(inner, inner, { fit: 'cover', position: 'centre' })
    .toBuffer();

  // 3. Compose onto a transparent (or white, for .ico) square canvas
  const canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  });

  const result = await canvas
    .composite([{ input: resized, top: pad, left: pad }])
    .png()
    .toBuffer();

  writeFileSync(outputPath, result);
  console.log(`✓ ${outputPath.replace(PUBLIC, '/public')} — ${size}x${size}px`);
  return result;
}

// --- Generate all sizes ---
async function run() {
  console.log('\n🎨 Generating favicons from logo.png…\n');

  // favicon-16x16.png
  await makeIcon(16, join(PUBLIC, 'favicon-16x16.png'));

  // favicon-32x32.png
  await makeIcon(32, join(PUBLIC, 'favicon-32x32.png'));

  // favicon-48x48.png
  await makeIcon(48, join(PUBLIC, 'favicon-48x48.png'));

  // apple-touch-icon.png — 180x180
  await makeIcon(180, join(PUBLIC, 'apple-touch-icon.png'));

  // android-chrome-192x192.png
  await makeIcon(192, join(PUBLIC, 'android-chrome-192x192.png'));

  // android-chrome-512x512.png (PWA splash)
  await makeIcon(512, join(PUBLIC, 'android-chrome-512x512.png'));

  // favicon.ico — package 16 + 32 + 48 into a single .ico
  // Sharp can't write .ico natively, so we write a 32px PNG renamed as ico
  // and rely on the <link rel="icon"> PNG tags which all modern browsers prefer.
  // For legacy IE support a simple 32px copy works fine as .ico via raw ICO header.
  const ico32 = await makeIcon(32, join(PUBLIC, 'favicon-32x32-tmp.png'));

  // Build a minimal valid .ico file (1 image: 32x32 BGRA)
  const png32 = readFileSync(join(PUBLIC, 'favicon-32x32.png'));
  writeFileSync(join(PUBLIC, 'favicon.ico'), buildIco([{ size: 32, png: png32 }]));
  console.log('✓ /public/favicon.ico — multi-size ICO');

  // Cleanup temp
  try {
    const { unlinkSync } = await import('fs');
    unlinkSync(join(PUBLIC, 'favicon-32x32-tmp.png'));
  } catch {}

  console.log('\n✅ All favicons generated!\n');
}

/**
 * Builds a valid ICO file from PNG buffers.
 * ICO format: ICONDIR header + ICONDIRENTRY[] + image data
 */
function buildIco(images) {
  const ICONDIR_SIZE  = 6;
  const DIRENTRY_SIZE = 16;
  const headerSize    = ICONDIR_SIZE + images.length * DIRENTRY_SIZE;

  let offset = headerSize;
  const entries = images.map(({ size, png }) => {
    const entry = { size, png, offset };
    offset += png.length;
    return entry;
  });

  const buf = Buffer.alloc(offset);
  // ICONDIR
  buf.writeUInt16LE(0, 0);               // reserved
  buf.writeUInt16LE(1, 2);               // type: 1 = ICO
  buf.writeUInt16LE(images.length, 4);  // image count

  // ICONDIRENTRY[]
  entries.forEach(({ size, png }, i) => {
    const base = ICONDIR_SIZE + i * DIRENTRY_SIZE;
    buf.writeUInt8(size === 256 ? 0 : size, base + 0);  // width (0 = 256)
    buf.writeUInt8(size === 256 ? 0 : size, base + 1);  // height
    buf.writeUInt8(0, base + 2);    // color count
    buf.writeUInt8(0, base + 3);    // reserved
    buf.writeUInt16LE(1, base + 4); // planes
    buf.writeUInt16LE(32, base + 6);// bit count
    buf.writeUInt32LE(png.length, base + 8);    // size of image data
    buf.writeUInt32LE(entries[i].offset, base + 12); // offset of image data
  });

  // Image data
  entries.forEach(({ png, offset: off }) => {
    png.copy(buf, off);
  });

  return buf;
}

run().catch(err => { console.error(err); process.exit(1); });
