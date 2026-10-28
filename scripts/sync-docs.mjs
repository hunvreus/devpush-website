import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.env.DEVPUSH_DOCS_PATH || join(root, '../devpush'));
const sourceDocs = join(source, 'docs');
const themePath = join(source, 'app/src/styles/theme.css');
const manifest = JSON.parse(readFileSync(join(sourceDocs, 'docs.json'), 'utf8'));
if (!Array.isArray(manifest.menu)) throw new Error('Expected a ReallySimpleDocs menu.');
const entries = readdirSync(sourceDocs, { withFileTypes: true });
if (entries.some((entry) => entry.isDirectory())) throw new Error('Source documentation must be flat.');
const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md')).map((entry) => entry.name);
if (!files.length || !existsSync(join(sourceDocs, 'index.md'))) throw new Error('Source docs are incomplete.');
const validateMenu = (items) => {
  for (const item of items) {
    if (typeof item === 'object' && item?.items) {
      if (!Array.isArray(item.items)) throw new Error('Invalid navigation group.');
      validateMenu(item.items);
      continue;
    }
    if (typeof item === 'object' && item?.url) continue;
    const slug = typeof item === 'string' ? item : item?.slug;
    if (!slug || !files.includes(`${slug}.md`)) throw new Error(`Missing navigation page: ${slug}`);
  }
};
validateMenu(manifest.menu);
const theme = readFileSync(themePath, 'utf8');
const staging = join(root, '.tmp/docs-import');
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });
for (const file of files) cpSync(join(sourceDocs, file), join(staging, file));
writeFileSync(join(staging, 'docs.json'), JSON.stringify(manifest, null, 2) + '\n');
let revision;
try { revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' }).trim(); } catch { revision = null; }
let dirty = false;
try { dirty = !!execFileSync('git', ['status', '--porcelain', '--', 'docs', 'app/src/styles/theme.css'], { cwd: source, encoding: 'utf8' }).trim(); } catch { dirty = true; }
// Validate inputs before replacing the generated copy. The site build never needs
// the sibling checkout, network access or access to application configuration.
rmSync(join(root, 'docs'), { recursive: true, force: true });
renameSync(staging, join(root, 'docs'));
mkdirSync(join(root, 'src/styles'), { recursive: true });
writeFileSync(join(root, 'src/styles/theme.css'), theme);
writeFileSync(join(root, 'docs-source.json'), JSON.stringify({ repository: 'hunvreus/devpush', revision, dirty, pages: files.length }, null, 2) + '\n');
console.log(`Imported ${files.length} docs pages and the app theme${dirty ? ' from a working tree with uncommitted changes' : ''}.`);
