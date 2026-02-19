# 📖 个人学术博客 - Zihao ZHU

> 这是 Zihao ZHU 的个人学术博客网站，用于展示研究成果、分享个人经历和发表博客文章。

## 🎯 项目简介

这是一个基于 **Hexo** 框架搭建的个人学术博客网站，使用了优雅的 **NexT** 主题。网站主要用于：
- 展示学术研究成果和论文
- 分享教育和工作经历
- 发表个人思考和博客文章

## 📋 项目信息

- **博客所有者：** Zihao ZHU（朱子豪）
- **身份：** 香港城市大学计算机科学博士生
- **研究方向：** 人机交互、健康信息学、人工智能交互
- **Hexo 版本：** 6.3.0
- **主题：** NexT
- **部署平台：** GitHub Pages

## 🛠️ 技术架构

### 核心技术
- **Hexo 6.3.0** - 静态博客生成器
- **NexT Theme** - 博客主题
- **Node.js** - 运行环境
- **Markdown** - 文章编写格式

### 主要依赖
```json
{
  "hexo": "^6.3.0",                          // 博客核心框架
  "hexo-server": "^3.0.0",                   // 本地预览服务器
  "hexo-deployer-git": "^4.0.0",             // Git部署工具
  "hexo-renderer-marked": "^6.0.0",          // Markdown渲染器
  "hexo-renderer-stylus": "^3.0.0",          // 样式渲染器
  "hexo-asset-image": "github:CodeFalling/hexo-asset-image", // 图片资源管理
  "hexo-generator-index-pin-top": "^0.2.2"   // 文章置顶功能
}
```

## 📂 项目结构

```
Blog/
├── source/                  # 📝 博客源文件目录
│   ├── _posts/             # 博客文章（Markdown格式）
│   │   ├── 我们为什么会摆烂.md
│   │   ├── AboutMyself.md  # 个人简介（置顶）
│   │   ├── What-is-OKR.md
│   │   └── New-York-is-3-hours-ahead-of-California.md
│   │
│   ├── Research/           # 🔬 研究成果页面
│   │   └── index.md        # 学术论文列表
│   │
│   ├── Experience/         # 💼 个人经历页面
│   │   └── index.md        # 教育和工作经历
│   │
│   ├── Blog/               # 📰 博客主页
│   │   └── index.md
│   │
│   ├── Images/             # 🖼️ 图片资源
│   └── _data/              # 自定义数据和样式
│
├── themes/                 # 🎨 主题目录
│   └── next/              # NexT主题文件
│
├── public/                 # 🌐 生成的静态网站文件
├── scaffolds/             # 📄 文章模板
├── _config.yml            # ⚙️ 网站配置文件
├── _config.landscape.yml  # 备用主题配置
├── package.json           # 📦 项目依赖配置
└── db.json               # 数据库缓存文件
```

## 🚀 使用方法

### 前置要求
确保你的电脑已经安装了：
- **Node.js**（版本 10.9.0 或更高）
- **Git**

### 安装依赖
第一次使用时，需要安装项目所需的所有工具：
```bash
npm install
```

### 常用命令

#### 1️⃣ 本地预览博客
在本地电脑上运行博客，可以实时查看效果：
```bash
npm run server
# 或者
hexo server
```
然后在浏览器中打开：http://localhost:4000

#### 2️⃣ 创建新文章
```bash
hexo new "文章标题"
```
这会在 `source/_posts/` 目录下创建一个新的 Markdown 文件。

#### 3️⃣ 生成静态网站文件
将 Markdown 文章转换成网页：
```bash
npm run build
# 或者
hexo generate
```
生成的文件会保存在 `public/` 目录中。

#### 4️⃣ 清理缓存
如果发现内容没有更新，可以清理缓存：
```bash
npm run clean
# 或者
hexo clean
```

#### 5️⃣ 部署到 GitHub Pages
将网站发布到互联网上：
```bash
npm run deploy
# 或者
hexo deploy
```
网站会被发布到：https://lumia-zhu.github.io/

#### 完整工作流程
```bash
# 1. 清理旧文件
hexo clean

# 2. 生成新网站
hexo generate

# 3. 本地预览（可选）
hexo server

# 4. 部署到网上
hexo deploy
```

## 📝 网站内容管理

### 修改个人信息
编辑 `_config.yml` 文件中的以下部分：
```yaml
# 网站基本信息
title: Zihao ZHU           # 网站标题
subtitle: ''               # 副标题
description: 'Empowering us all'  # 网站描述
author: Zihao ZHU         # 作者名字
language: en              # 语言（en=英文，zh-CN=简体中文）
```

### 写博客文章

1. **创建新文章**
   ```bash
   hexo new "我的新文章"
   ```

2. **编辑文章**
   在 `source/_posts/我的新文章.md` 文件中编写内容：
   ```markdown
   ---
   title: 我的新文章         # 文章标题
   date: 2026-02-12         # 发布日期
   tags:                    # 标签（可选）
     - 标签1
     - 标签2
   top: false               # 是否置顶（true=置顶）
   ---
   
   这里写文章内容...
   ```

3. **添加图片**
   - 将图片放在 `source/_posts/我的新文章/` 目录下
   - 在文章中引用：`![图片描述](./图片名称.png)`

### 文章置顶
在文章开头的配置中添加：
```markdown
---
title: 标题
top: true    # 这会让文章置顶显示
---
```

### 修改研究成果
编辑 `source/Research/index.md` 文件，添加新的研究项目或论文。

### 修改个人经历
编辑 `source/Experience/index.md` 文件，更新教育或工作经历。

## 🌐 部署配置

网站当前配置为自动部署到 GitHub Pages：

```yaml
# _config.yml 中的部署设置
deploy:
  type: git
  repo: https://github.com/lumia-zhu/lumia-zhu.github.io.git
  branch: master
```

每次执行 `hexo deploy` 后，网站会自动更新到：
https://lumia-zhu.github.io/

## 🎨 主题自定义

### 修改主题配置
编辑 `themes/next/_config.yml` 可以修改：
- 网站外观样式
- 侧边栏设置
- 社交媒体链接
- 评论系统
- 搜索功能
- 等等...

### 自定义样式
可以在 `source/_data/styles.styl` 中添加自定义 CSS 样式。

## 📖 Hexo 常用概念解释

| 概念 | 通俗解释 | 说明 |
|------|---------|------|
| **Hexo** | 博客生成器 | 把你写的文章（Markdown）转换成漂亮的网页 |
| **Markdown** | 简单的写作格式 | 用简单的符号来排版文章，比如 `#` 表示标题 |
| **source/** | 源文件夹 | 你写的原始文章和资源都放这里 |
| **public/** | 网站文件夹 | 生成的最终网页文件，会上传到网上 |
| **theme** | 主题/外观 | 控制网站长什么样子 |
| **deploy** | 部署/发布 | 把网站上传到互联网上，让别人能访问 |
| **generate** | 生成 | 把 Markdown 文章转换成 HTML 网页 |
| **server** | 本地服务器 | 在自己电脑上预览网站效果 |

## 🔧 常见问题解决

### 问题1：文章没有更新
**解决方法：**
```bash
hexo clean    # 清理缓存
hexo generate # 重新生成
```

### 问题2：图片显示不出来
**解决方法：**
- 确保图片放在正确的位置：`source/_posts/文章名/图片.png`
- 使用相对路径引用：`![](./图片.png)`

### 问题3：部署失败
**解决方法：**
- 检查 Git 是否配置正确
- 确认 GitHub 仓库访问权限
- 检查 `_config.yml` 中的 `deploy` 配置

### 问题4：命令执行失败
**解决方法：**
```bash
# 重新安装依赖
rm -rf node_modules
npm install
```

## 📚 学习资源

- **Hexo 官方文档：** https://hexo.io/zh-cn/docs/
- **NexT 主题文档：** https://theme-next.js.org/
- **Markdown 语法：** https://www.markdownguide.org/

## 📞 联系方式

- **GitHub：** https://github.com/lumia-zhu
- **个人网站：** https://lumia-zhu.github.io/

## 📄 许可证

本项目使用的 NexT 主题基于 AGPL 许可证。

---

**最后更新时间：** 2026年2月12日

**维护说明：** 
- 当添加新的研究成果时，记得更新 `source/Research/index.md`
- 定期备份 `source/` 目录中的所有文件
- 修改配置前建议先备份 `_config.yml` 文件
