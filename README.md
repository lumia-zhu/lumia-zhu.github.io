# Zihao ZHU — Personal Academic Homepage

Static academic website hosted at <https://lumia-zhu.github.io/>. The existing HTML/CSS design is retained; Markdown articles are rendered during publication.

## Local preview

With Node.js 22 or newer and Python 3 installed:

```sh
npm ci
npm run build
npm run check
npm run preview
```

Open <http://127.0.0.1:8765/>. `_site/` is generated output and is not committed. The checker verifies local pages, images, paper links, headings, and fonts.

## Publish a blog article

1. Add the article to `blog/posts/my-post.md` using Markdown.
2. Add its metadata to `blog/posts.json`:

   ```json
   {
     "slug": "my-post",
     "title": "文章标题",
     "date": "2026-10-31",
     "summary": "文章摘要",
     "tags": ["Research"],
     "lang": "zh-CN"
   }
   ```

   Use `zh-CN` for Chinese articles and `en` for English articles. The build sorts articles by date. Markdown headings are normalized below the page's single `h1`; use `#`/`##` or `##`/`###` consistently within an article.
3. Keep article images in `blog/images/`. Existing `blog/images/...` Markdown links remain supported; the build rewrites them for each article's new URL.
4. Push to `master`. GitHub Actions builds, checks, and publishes the site.

Each article has a complete static page at `/blog/my-post/`. Reading it needs no Markdown renderer or content requests in the browser. Code highlighting is also generated at build time. Existing `blog-post.html#my-post` bookmarks redirect to the matching article; without JavaScript that address offers article links.

## Edit the site

- `index.html`: profile, selected publications, and the current full experience.
- `publications.html`: publications grouped by year, with linked paper titles.
- `blog.html`: blog listing template; `<!-- BLOG_POSTS -->` is filled by the build.
- `projects/chi2026-metacognition/`: standalone CHI 2026 project page, scoped styles, citation, and contributor assets. Project folders are copied to `_site/projects/` during the build.
- `_templates/post.html`: shared article layout.
- `inc/footer.html`: shared footer, inserted at build time into every full page.
- `css/base.css`, `css/main.css`, `css/home.css`: base, shared, and homepage styles.
- `css/fonts.css`: locally hosted WOFF2 fonts with `font-display: swap`.
- `js/site.js`: navigation, section highlighting, back-to-top, and image previews.
- `scripts/build.mjs`: Markdown and shared-footer generation into `_site/`.
- `scripts/check.mjs`: generated-site validation.

`experience.html` redirects to `index.html#experience`, so old links stay useful without maintaining a second version of the CV.

## Deployment

The `.github/workflows/pages.yml` workflow builds pull requests for validation and deploys successful `master` builds through GitHub Pages. The repository's Pages source is **GitHub Actions**.

Browser dependencies are limited to the small native site script; Markdown parsing and syntax highlighting run only during the build. The design is based on Kards by Styleshout. Font and icon assets retain their existing notices and licenses.
