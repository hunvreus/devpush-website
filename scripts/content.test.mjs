import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { redirects } from './redirects.mjs';
const root = new URL('../', import.meta.url);
test('the imported navigation resolves to committed docs', () => {
  const manifest = JSON.parse(readFileSync(new URL('docs/docs.json', root), 'utf8'));
  const available = new Set(readdirSync(new URL('docs/', root)));
  const visit = (items) => { for (const item of items) {
    if (typeof item === 'string') assert.ok(available.has(`${item}.md`), item);
    else if (item.items) visit(item.items);
    else if (item.slug) assert.ok(available.has(`${item.slug}.md`), item.slug);
  } };
  visit(manifest.menu);
});
test('legacy redirects resolve to current pages', () => {
  for (const path of Object.values(redirects)) {
    const slug = path.split('#')[0].replace(/^\/docs\/?/, '').replace(/\/$/, '') || 'index';
    assert.ok(readFileSync(new URL(`docs/${slug}.md`, root), 'utf8').length > 0);
  }
});
test('import provenance describes this documentation snapshot', () => {
  const source = JSON.parse(readFileSync(new URL('docs-source.json', root), 'utf8'));
  assert.equal(source.repository, 'hunvreus/devpush');
  assert.equal(source.pages, readdirSync(new URL('docs/', root)).filter((file) => file.endsWith('.md')).length);
});

test('installation and removal redirects retain their original purpose', () => {
  assert.equal(redirects['/docs/installation'], '/docs/self-hosting/');
  assert.equal(redirects['/docs/uninstalling'], '/docs/production-operations/#uninstall');
});

test('marketing and docs use the current social card and versioned branding assets', () => {
  const layout = readFileSync(new URL('src/layouts/Site.astro', root), 'utf8');
  const config = readFileSync(new URL('astro.config.mjs', root), 'utf8');
  for (const asset of ['favicon.svg', 'apple-touch-icon.png', 'social.png']) {
    assert.ok(layout.includes(`/${asset}?v=2`));
    assert.ok(config.includes(`/${asset}?v=2`));
    assert.ok(readFileSync(new URL(`public/${asset}`, root)).length > 0);
  }
  assert.ok(layout.includes('property="og:image"'));
  assert.ok(layout.includes('name="twitter:image"'));
  assert.ok(layout.includes('content="summary_large_image"'));
});
