import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { redirects } from './redirects.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const files = [];
function walk(dir) { for (const name of readdirSync(dir)) { const path = join(dir, name); if (statSync(path).isDirectory()) walk(path); else files.push(path); } }
walk(output);
function targetPath(pathname) {
  const path = join(output, decodeURIComponent(pathname));
  return !extname(path) || pathname.endsWith('/') ? join(path, 'index.html') : path;
}
for (const path of files.filter((file) => file.endsWith('.html'))) {
  const html = readFileSync(path, 'utf8');
  assert.ok(html.includes('<title>'), `Missing title: ${path}`);
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, 'https://devpu.sh');
    assert.ok(existsSync(targetPath(url.pathname)), `Missing ${href} linked from ${path}`);
    if (url.hash && targetPath(url.pathname).endsWith('.html')) {
      const target = readFileSync(targetPath(url.pathname), 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      assert.ok(target.includes(`id="${id}"`), `Missing anchor ${href} in ${path}`);
    }
  }
}
const docs = readdirSync(join(root, 'docs')).filter((file) => file.endsWith('.md'));
for (const file of docs) assert.ok(existsSync(join(output, 'docs', file)), `Missing Markdown export: ${file}`);
for (const file of ['llms.txt', 'llms-full.txt', 'docs/search-index.json']) assert.ok(existsSync(join(output, file)), `Missing ${file}`);
const search = JSON.parse(readFileSync(join(output, 'docs/search-index.json'), 'utf8'));
assert.ok(JSON.stringify(search).includes('Docker Compose'), 'Search content is missing.');
for (const [from, to] of Object.entries(redirects)) assert.ok(existsSync(targetPath(new URL(to, 'https://devpu.sh').pathname)), `Invalid redirect ${from}`);
// Cloudflare Pages uses real 301s; other static hosts retain Astro's HTML fallbacks.
writeFileSync(join(output, '_redirects'), Object.entries(redirects).flatMap(([from, to]) => [`${from} ${to} 301`, `${from}/ ${to} 301`]).join('\n') + '\n');
console.log(`Checked ${files.filter((file) => file.endsWith('.html')).length} HTML pages, ${docs.length} Markdown exports, local links/anchors, search, LLM files and legacy redirects.`);
