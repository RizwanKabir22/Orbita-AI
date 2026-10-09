// Converts the Claude Design export (../project/assets) into right-sized WebP
// files under src/assets/img. Run once with `npm run assets`; outputs are
// committed so the regular build does not depend on the design bundle.
import { mkdir, readFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(root, '../../project/assets');
const out = path.resolve(root, '../src/assets/img');
await mkdir(out, { recursive: true });

/** [file, output width, quality] — width is ~2x the largest on-screen size. */
const jobs = [
  ['tool-files.png', 300, 86], ['tool-imagine.png', 300, 86],
  ['tool-translate.png', 300, 86], ['tool-voice.png', 300, 86],
  ['step-ask.png', 240, 86], ['step-understand.png', 240, 86],
  ['step-act.png', 240, 86], ['step-done.png', 240, 86],
  ['balloon-1.png', 1024, 80], ['balloon-2.png', 800, 80],
  ['person-voice-2.png', 800, 80], ['person-joy.png', 800, 80],
  ['avatar.png', 200, 82],
  ['frame-iphone-empty.png', 658, 90],
];

for (const [file, width, quality] of jobs) {
  const name = file.replace(/\.png$/, '.webp');
  await sharp(path.join(src, file)).resize({ width, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 92, effort: 6, smartSubsample: true })
    .toFile(path.join(out, name));
  console.log('✓', name);
}

for (const svg of ['orbita-logo.svg', 'orbita-full-logo.svg']) {
  await copyFile(path.join(src, svg), path.join(out, svg));
}

// Mockups the designer dropped into <image-slot>s. Their pan/zoom (image-slot.js
// geometry: cover-fit × s, centre offset by x/y % of frame) was set in the
// prototype's slot boxes (`seen`), which overflowed the grid. Keep the same
// centre and zoom, and re-frame to the boxes the layout really has (`frame`).
const slots = JSON.parse(await readFile(path.resolve(src, '../.image-slots.state.json'), 'utf8'));
const boxes = {
  'cs-phone-hand': { seen: [930, 620], frame: [721.5, 620] },
  'cs-app-icon': { seen: [447, 298], frame: [534.5, 298] },
  'cs-portrait': { seen: [447, 298], frame: [534.5, 298] },
};
for (const [id, { seen: [sw, sh], frame: [fw, fh] }] of Object.entries(boxes)) {
  const v = slots[id];
  const buf = Buffer.from(v.u.split(',')[1], 'base64');
  const { width: iw, height: ih } = await sharp(buf).metadata();
  const k0 = Math.max(sw / iw, sh / ih) * v.s;
  // Centre of the visible box, in source-image pixels.
  const icx = iw / 2 - (v.x / 100) * sw / k0;
  const icy = ih / 2 - (v.y / 100) * sh / k0;
  const k = Math.max(k0, fw / iw, fh / ih);
  const width = Math.round(fw / k), height = Math.round(fh / k);
  const left = Math.round(Math.min(Math.max(icx - width / 2, 0), iw - width));
  const top = Math.round(Math.min(Math.max(icy - height / 2, 0), ih - height));
  await sharp(buf).extract({ left, top, width, height })
    .resize({ width: Math.round(fw * 2), withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 }).toFile(path.join(out, `${id}.webp`));
  console.log('✓', id, { left, top, width, height });
}
