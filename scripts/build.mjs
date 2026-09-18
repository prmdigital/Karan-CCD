// Copies the deployable site into dist/ for upload to the ccdentistry.kids host.
// The site is plain HTML/CSS/JS, so the build is a clean copy of public files.
import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

// Root-level files that are not part of the public site.
const EXCLUDE = new Set(['README.md', 'package.json', 'Chilliwack Homepage - Option 1b.html']);
const ROOT_FILES = /\.(html|ico|txt|xml)$/;

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST);

let count = 0;
for (const name of readdirSync(ROOT)) {
  if (EXCLUDE.has(name) || !statSync(join(ROOT, name)).isFile() || !ROOT_FILES.test(name)) continue;
  cpSync(join(ROOT, name), join(DIST, name));
  count++;
}
cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });
count += readdirSync(join(DIST, 'assets'), { recursive: true }).length;

console.log(`Built ${count} files into dist/`);
