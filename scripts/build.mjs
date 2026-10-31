import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import hljs from 'highlight.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '_site');
const read = (name) => readFile(path.join(root, name), 'utf8');
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const posts = JSON.parse(await read('blog/posts.json')).sort((a, b) => b.date.localeCompare(a.date));
const seen = new Set();
for (const post of posts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || seen.has(post.slug)) {
    throw new Error(`Invalid or duplicate article slug: ${post.slug}`);
  }
  if (!post.title || !/^\d{4}-\d{2}-\d{2}$/.test(post.date) || !['en', 'zh-CN'].includes(post.lang)) {
    throw new Error(`Missing title, date, or supported language for ${post.slug}`);
  }
  seen.add(post.slug);
}

// Recreate only the generated directory, using Node's filesystem API.
// It is always the fixed _site child of this repository.
const { rm } = await import('node:fs/promises');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== '_site') {
  throw new Error('Refusing to remove a directory outside this project’s _site output.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const directory of ['css', 'js', 'fonts', 'images', 'papers', 'blog/images', 'blog/posts']) {
  await cp(path.join(root, directory), path.join(output, directory), { recursive: true });
}
await cp(path.join(root, 'favicon.ico'), path.join(output, 'favicon.ico'));
await cp(path.join(root, 'blog/posts.json'), path.join(output, 'blog/posts.json'));

const footer = (await read('inc/footer.html')).replace(/<!--[\s\S]*?-->/g, '').trim();
const includeFooter = (html) => html.replace(/<div data-include="inc\/footer.html"><\/div>/g, footer);
const articleUrl = (post) => `/blog/${post.slug}/`;
const cards = posts.map((post) => `
  <a class="blog-card" href="${articleUrl(post)}" lang="${post.lang}">
    <div class="blog-card-meta"><time class="blog-card-date" datetime="${post.date}">${post.date}</time></div>
    <h2>${escape(post.title)}</h2>
    ${post.summary ? `<p class="blog-card-summary">${escape(post.summary)}</p>` : ''}
  </a>`).join('\n');

for (const name of ['index.html', 'publications.html', 'experience.html', 'blog.html', 'blog-post.html']) {
  let html = includeFooter(await read(name));
  html = html.replace('<!-- BLOG_POSTS -->', cards);
  const legacyLinks = posts.map((post) => `<li lang="${post.lang}"><a href="${articleUrl(post)}">${escape(post.title)}</a></li>`).join('\n');
  html = html.replace('<!-- LEGACY_POST_LINKS -->', legacyLinks);
  // The redirect uses only known article identifiers; it never fetches Markdown.
  html = html.replace('/* LEGACY_POST_SLUGS */ []', JSON.stringify(posts.map((post) => post.slug)));
  await writeFile(path.join(output, name), html);
}

const template = await read('_templates/post.html');
const parser = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    code({ text, lang }) {
      const language = (lang || '').split(/\s+/)[0];
      const highlighted = language && hljs.getLanguage(language)
        ? hljs.highlight(text, { language }).value : escape(text);
      return `<pre><code class="hljs${language ? ` language-${escape(language)}` : ''}">${highlighted}</code></pre>\n`;
    }
  }
});

for (const post of posts) {
  const markdown = await read(`blog/posts/${post.slug}.md`);
  const tokens = parser.lexer(markdown);
  const depths = [];
  parser.walkTokens(tokens, (token) => { if (token.type === 'heading') depths.push(token.depth); });
  const shift = depths.length ? 2 - Math.min(...depths) : 0;
  parser.walkTokens(tokens, (token) => {
    if (token.type === 'heading') token.depth = Math.min(6, token.depth + shift);
  });
  let body = parser.parser(tokens);
  // Existing Markdown image paths were relative to the old root-level article page.
  body = body.replace(/(src|href)="(?:\.\/)?blog\/images\//g, '$1="/blog/images/');
  if (post.lang === 'en') {
    body = body.replace(/<p>([\s\S]*?)<\/p>/g, (html, text) => /[\u3400-\u9fff]/.test(text)
      ? `<p lang="zh-CN">${text}</p>` : html);
  }
  const replacements = {
    language: post.lang,
    title: escape(post.title),
    summary: escape(post.summary || post.title),
    date: post.date,
    tags: (post.tags || []).map((tag) => `<span class="post-tag" lang="en">${escape(tag)}</span>`).join(''),
    body,
    codeStyles: /<pre><code/.test(body) ? '<link rel="stylesheet" href="/css/highlight.css">' : ''
  };
  const html = includeFooter(template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in replacements)) throw new Error(`Unknown template field: ${key}`);
    return replacements[key];
  }));
  const folder = path.join(output, 'blog', post.slug);
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, 'index.html'), html);
}

await cp(path.join(root, 'node_modules/highlight.js/styles/atom-one-dark.min.css'), path.join(output, 'css/highlight.css'));
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Built ${posts.length} static articles and 5 root pages in _site.`);
