# Zihao ZHU - Personal Academic Homepage

Zihao ZHU 的个人学术主页，基于 Kards 模板改造，简洁美观且支持响应式布局。

## 📁 项目结构

```
personalpage/
├── index.html              # 🏠 主页（头像 + Bio + News）
├── publications.html       # 📝 论文发表页（CHI'26, IJHCS, CHI'25）
├── experience.html         # 💼 经历页（教育/研究/服务时间线）
├── blog.html               # 📰 博客列表页
├── blog-post.html          # 📄 博客文章详情页（Markdown 渲染）
├── blog/
│   ├── posts.json          # 博客文章元数据
│   └── posts/              # Markdown 博客文章
│       ├── new-york-california.md
│       ├── why-we-procrastinate.md
│       └── what-is-okr.md
├── css/                    # 样式文件
├── js/                     # JavaScript 文件
├── images/                 # 图片资源
│   └── profile-pic.jpg     # 个人头像（请替换）
└── fonts/                  # 字体文件
```

## 🎨 主题色

- 主色调：`#66BAB7`（清新薄荷绿）
- 深色调：`#4F9A97`（悬停效果）

## 📝 如何发布新博客文章

1. 在 `blog/posts/` 目录下创建一个新的 `.md` 文件
2. 用 Markdown 格式写好文章内容
3. 在 `blog/posts.json` 数组**最前面**添加一条记录：

```json
{
    "slug": "my-new-post",
    "title": "文章标题",
    "date": "2026-03-01",
    "summary": "文章摘要...",
    "tags": ["标签1", "标签2"]
}
```

4. 推送到 GitHub 即可

## 📑 如何添加新论文

打开 `publications.html`，在对应年份下复制一个 `pub-item` 模块并修改内容。

## 🚀 部署到 GitHub Pages

1. 推送到 GitHub 仓库
2. Settings → Pages → Source: `main` / `/ (root)`
3. 等待几分钟即可访问

## ⚙️ 技术栈

- HTML5 + CSS3 + JavaScript（纯静态）
- marked.js (CDN) — Markdown 渲染
- highlight.js (CDN) — 代码高亮
- Font Awesome — 图标
- 模板基础：[Kards by Styleshout](http://www.styleshout.com/)

## 🔧 需要自行修改的内容

- [ ] `images/profile-pic.jpg` — 替换为真实头像
- [ ] Publications 页面中的 `[Paper Title — to be updated]` — 填入论文标题
- [ ] Experience 页面中的 `[Your University]` / `[Time Period]` — 填入真实信息
- [ ] 各页面社交链接 — 填入真实 Google Scholar / GitHub / LinkedIn 链接
