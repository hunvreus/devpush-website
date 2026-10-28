import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

// Compose original assets at the dashboard screenshot's native resolution.
const root = new URL('../public/', import.meta.url);
const embedded = async (path) => `data:image/jpeg;base64,${(await readFile(new URL(path, root))).toString('base64')}`;
const [background, screenshot] = await Promise.all([
  embedded('images/deployment-wallpaper.jpg'),
  embedded('screenshots/deployment-dark.jpg'),
]);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1846" height="1038" viewBox="0 0 1846 1038">
  <defs>
    <clipPath id="screen"><rect x="148" y="83" width="1550" height="872" rx="18"/></clipPath>
    <filter id="shadow" x="-15%" y="-20%" width="130%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="24" flood-opacity=".26"/></filter>
  </defs>
  <image href="${background}" width="1846" height="1038" preserveAspectRatio="xMidYMid slice"/>
  <rect x="148" y="83" width="1550" height="872" rx="18" fill="#11100f" filter="url(#shadow)"/>
  <image href="${screenshot}" x="148" y="83" width="1550" height="872" clip-path="url(#screen)"/>
  <rect x="148.5" y="83.5" width="1549" height="871" rx="17.5" fill="none" stroke="#fff" stroke-opacity=".12"/>
  <circle cx="923" cy="519" r="49" fill="#11100f" fill-opacity=".94" stroke="#fff" stroke-opacity=".15" stroke-width="1.5"/>
  <path d="M913 503 Q913 500 916 502 L939 516 Q943 519 939 522 L916 536 Q913 538 913 535Z" fill="#eeeae7"/>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(new URL('videos/readme-demo.png', root).pathname);
console.log('Generated readme-demo.png: 1846 × 1038; dashboard preserved at 1550 × 872.');
