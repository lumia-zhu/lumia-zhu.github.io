import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../_site/', import.meta.url));
const files = [];
async function collect(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const name = path.join(folder, entry.name);
    if (entry.isDirectory()) await collect(name);
    else if (entry.name.endsWith('.html')) files.push(name);
  }
}
await collect(root);
let links = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const name = path.relative(root, file);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${name}: expected one page title`);
  assert.equal((html.match(/<main\b/g) || []).length, 1, `${name}: expected one main landmark`);
  assert(!/Loading (?:post|posts)|data-include=|\{\{\w+\}\}/.test(html), `${name}: unresolved dynamic content`);
  assert(!/jquery|plugins\.js|modernizr|vendor\.css|cdnjs\.cloudflare/.test(html), `${name}: old browser dependencies`);
  let previous = 0;
  for (const [, level] of html.matchAll(/<h([1-6])\b/g)) {
    const depth = Number(level);
    if (previous) assert(depth <= previous + 1, `${name}: skipped heading level h${previous} to h${depth}`);
    previous = depth;
  }
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
    if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) continue;
    const url = new URL(value.replaceAll('&amp;', '&'), `https://local.test/${name.split(path.sep).join('/')}`);
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    await access(target).catch(() => { throw new Error(`${name}: missing local link ${value}`); });
    if (url.hash && target.endsWith('.html')) {
      const linked = await readFile(target, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      assert(linked.includes(`id="${id}"`), `${name}: missing anchor ${value}`);
    }
    links++;
  }
}
const css = await readFile(path.join(root, 'css/main.css'), 'utf8');
for (const [, value] of css.matchAll(/@import url\("([^"]+)"\)/g)) await access(path.join(root, 'css', value));
const fonts = await readFile(path.join(root, 'css/fonts.css'), 'utf8');
for (const [, value] of fonts.matchAll(/url\(['"]([^'"]+)['"]\)/g)) await access(path.resolve(root, 'css', value));
console.log(`Checked ${files.length} complete HTML pages, ${links} local links, heading order, and font assets.`);
