import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'devpush-doc-import-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const source = join(root, 'source');
  const site = join(root, 'site');
  for (const path of ['docs', 'app/src/styles']) mkdirSync(join(source, path), { recursive: true });
  mkdirSync(join(site, 'scripts'), { recursive: true });
  mkdirSync(join(site, 'docs'));
  writeFileSync(join(site, 'docs/previous.md'), 'previous snapshot');
  cpSync(new URL('./sync-docs.mjs', import.meta.url), join(site, 'scripts/sync-docs.mjs'));
  writeFileSync(join(source, 'docs/index.md'), '# Introduction');
  writeFileSync(join(source, 'docs/projects.md'), '# Projects');
  writeFileSync(join(source, 'docs/docs.json'), JSON.stringify({ menu: ['index', { type: 'group', label: 'Basics', items: ['projects'] }] }));
  writeFileSync(join(source, 'app/src/styles/theme.css'), ':root {}');
  return { source, site, run: () => spawnSync(process.execPath, ['scripts/sync-docs.mjs'], { cwd: site, env: { ...process.env, DEVPUSH_DOCS_PATH: source }, encoding: 'utf8' }) };
}

test('source pages and visual groups preserve page URLs', (t) => {
  const { site, run } = fixture(t);
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(site, 'docs/projects.md'), 'utf8'), '# Projects');
  assert.equal(JSON.parse(readFileSync(join(site, 'docs-source.json'), 'utf8')).pages, 2);
  assert.deepEqual(JSON.parse(readFileSync(join(site, 'docs/docs.json'), 'utf8')).menu[1].items, ['projects']);
});

test('nested folders reject import before replacing the previous snapshot', (t) => {
  const { source, site, run } = fixture(t);
  mkdirSync(join(source, 'docs/basics'));
  writeFileSync(join(source, 'docs/basics/projects.md'), '# Nested');
  const result = run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Source documentation must be flat/);
  assert.equal(readFileSync(join(site, 'docs/previous.md'), 'utf8'), 'previous snapshot');
});
