# Jack - 3D Creator Portfolio

这是一个适合部署到 GitHub Pages 的个人作品集网站，使用 Vite、React、TypeScript、Tailwind CSS、Framer Motion 和 Lucide React 构建。页面内容集中在配置文件中，后续新增作品或替换个人资料时不需要重写页面结构。

## 本地运行

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

## GitHub Pages 部署

项目已经包含自动部署工作流：

```text
.github/workflows/deploy.yml
```

推荐仓库设置：

1. 仓库分支使用 `main`。
2. 打开 GitHub 仓库的 `Settings > Pages`。
3. 在 `Build and deployment` 中选择 `GitHub Actions`。
4. 推送代码到 `main` 后，Actions 会自动构建并发布 `dist`。

### `username.github.io` 特殊仓库

如果你的仓库名是 `你的用户名.github.io`，这是 GitHub Pages 的用户站点，站点根路径是 `/`。保持默认配置即可：

```text
VITE_BASE_PATH=/
```

### 普通项目 Pages 仓库

如果仓库不是 `username.github.io`，而是类似 `portfolio`，Pages 地址通常是：

```text
https://你的用户名.github.io/portfolio/
```

这时需要在 GitHub 仓库里添加 Actions 变量：

```text
Settings > Secrets and variables > Actions > Variables
Name: VITE_BASE_PATH
Value: /portfolio/
```

本地也可以复制 `.env.example` 为 `.env.local`，再修改：

```bash
cp .env.example .env.local
```

```text
VITE_BASE_PATH=/portfolio/
```

## 修改个人信息

主要内容都在：

```text
src/content/portfolio.ts
```

常用字段：

```ts
export const profile = {
  name: "Jack",
  title: "Jack - 3D Creator",
  heroTitle: "Hi, i'm jack",
  heroDescription:
    "a 3d creator driven by crafting striking and unforgettable projects",
  aboutTitle: "About me",
  about: "With more than five years of experience...",
  contactLabel: "Contact Me",
  contactUrl: "mailto:jack@example.com",
  portrait: {
    src: "https://...",
    alt: "Jack portrait in a glossy 3D creator style",
  },
};
```

把 `contactUrl` 改成你的邮箱、社交链接或联系表单地址。例如：

```ts
contactUrl: "mailto:your-name@example.com"
```

## 新增或替换作品

作品数据在 `projects` 数组中：

```ts
export const projects = [
  {
    id: "project-id",
    number: "04",
    name: "Project Name",
    category: "Client",
    liveUrl: "https://example.com",
    images: {
      leftTop: {
        src: "/artworks/project-name/detail-1.webp",
        alt: "Project detail image",
      },
      leftBottom: {
        src: "/artworks/project-name/detail-2.webp",
        alt: "Project second detail image",
      },
      featured: {
        src: "/artworks/project-name/cover.webp",
        alt: "Project featured image",
      },
    },
  },
];
```

推荐把作品图片放到：

```text
public/artworks/project-name/
```

然后在配置里使用：

```ts
src: "/artworks/project-name/cover.webp"
```

推荐图片规格：

```text
cover.webp       1600 x 1200 或更高
detail-1.webp    1200 x 800
detail-2.webp    1200 x 1200
```

尽量使用 `.webp` 或压缩后的 `.jpg`，避免直接上传超大的原始渲染图。

## 修改服务项目

服务内容在 `services` 数组中：

```ts
export const services = [
  {
    number: "01",
    name: "3D Modeling",
    description: "Creation of detailed objects...",
  },
];
```

可以新增、删除或重新排序。页面会自动渲染列表。

## 替换首页与装饰图片

首页人物图：

```ts
profile.portrait.src
```

About 区域四个装饰图：

```ts
decorativeAssets
```

作品滚动墙图片：

```ts
marqueeImages
```

如果你不想使用远程图片，可以下载到 `public/artworks/` 或 `public/assets/` 后改成站内路径。

## 后续扩展建议

当前项目结构已经为新增功能预留了边界：

```text
src/components/      页面区块与可复用组件
src/content/         可配置内容数据
src/lib/             工具函数
public/artworks/     用户上传或替换的作品图片
```

适合继续添加的功能：

```text
作品详情页
作品分类筛选
联系表单
CMS 内容管理
多语言切换
暗色/亮色主题切换
SEO 与 Open Graph 图片自动生成
```

如果后续要做作品详情页，建议引入 `react-router-dom` 或切换到 Next.js。当前版本是单页静态站，部署到 GitHub Pages 最简单。

## 常见问题

### 页面发布后样式或资源丢失

检查 `VITE_BASE_PATH` 是否正确。用户站点通常是 `/`，普通项目站点通常是 `/仓库名/`。

### 新上传图片没有显示

检查：

1. 图片是否放在 `public/artworks/` 下。
2. 配置路径是否以 `/artworks/...` 开头。
3. 文件名大小写是否完全一致。
4. 是否重新执行了 `npm run build` 或推送触发了 Actions。

### 如何换成自己的域名

在 GitHub 仓库的 `Settings > Pages > Custom domain` 配置域名。如果需要把 `CNAME` 文件纳入仓库，可以在 `public/CNAME` 中写入你的域名。
