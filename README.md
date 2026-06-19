# Sunay

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

## 内容配置文件说明

网站的主要文案、导航、服务、作品和友情链接都集中在：

```text
src/content/portfolio.ts
```

这份文件是内容配置文件。一般只需要改这里，就能更新网站上的大部分可见信息；页面结构、动画和样式在 `src/components/` 与 `src/styles.css` 中维护。

### 类型定义

文件顶部的 `PortfolioImage`、`Project`、`Service`、`FriendLink` 是 TypeScript 类型定义，用来约束后面配置项的格式。

```ts
export type PortfolioImage = {
  src: string;
  alt: string;
};
```

`PortfolioImage` 表示一张作品图片：

- `src`：图片地址。可以是站内路径，例如 `/artworks/project-name/cover.webp`，也可以是完整的远程图片 URL。
- `alt`：图片替代文本。图片加载失败、读屏软件读取页面、搜索引擎理解图片时都会用到它。建议写清楚图片内容，不要留空。

```ts
export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  liveUrl: string;
  images: {
    leftTop: PortfolioImage;
    leftBottom: PortfolioImage;
    featured: PortfolioImage;
  };
};
```

`Project` 表示一个作品卡片：

- `id`：作品的唯一标识，用作 React 渲染列表时的 key。建议使用小写英文和短横线，例如 `aura-brand-identity`。
- `number`：页面上显示的作品编号，例如 `01`、`02`。它不会自动计算，调整排序后需要手动同步。
- `name`：作品名称，会显示为作品卡片的大标题。
- `category`：作品类别，会显示在作品卡片的小标签里，例如 `Client`、`Personal`、`Commercial`。
- `liveUrl`：作品按钮的跳转地址。可以写外部链接，例如 `https://example.com`，也可以写页面锚点，例如 `#contact` 或 `#footer-contact`。
- `images.leftTop`：作品卡片左侧上方的小图。
- `images.leftBottom`：作品卡片左侧下方的小图。
- `images.featured`：作品卡片右侧主图，是视觉权重最高的一张图。

```ts
export type Service = {
  number: string;
  name: string;
  description: string;
};
```

`Service` 表示一个服务项目：

- `number`：服务编号，例如 `01`。只负责显示，不会自动排序。
- `name`：服务名称，例如 `Branding`、`Web Design`。
- `description`：服务说明文字，显示在服务卡片正文中。

```ts
export type FriendLink = {
  label: string;
  href: string;
};
```

`FriendLink` 表示页脚友情链接：

- `label`：页面上显示的链接名称。
- `href`：链接地址。建议使用完整地址，例如 `https://cloud09.space`。

### `profile`

`profile` 控制网站的个人信息、首页主文案和通用联系按钮。

```ts
export const profile = {
  name: "Sunay",
  title: "Sunay",
  heroTitle: "Hi,I'm Sunay",
  heroDescription:
    "a visual creator crafting striking brands, web experiences, motion, and unforgettable digital projects",
  aboutTitle: "About me",
  about: "With more than five years of experience...",
  contactLabel: "Contact Me",
  contactUrl: "#footer-contact",
};
```

- `name`：站点主名称。当前会用于左上角 logo 的可访问名称、联系按钮的可访问名称，以及页脚版权中的名字。
- `title`：站点标题/身份名称的保留字段。当前页面没有直接渲染它，保留它是为了后续扩展 SEO、页面标题或个人身份展示。
- `heroTitle`：首页第一屏的大标题。
- `heroDescription`：首页第一屏标题下方的简介文字。
- `aboutTitle`：关于我区域的标题。
- `about`：关于我区域的正文介绍。
- `contactLabel`：所有通用联系按钮上的文字。
- `contactUrl`：通用联系按钮的跳转地址。当前推荐使用 `#footer-contact`，点击后会跳到页脚联系方式区域。也可以改为邮箱、社交主页或联系表单地址。

常见 `contactUrl` 写法：

```ts
// 跳到页脚联系方式
contactUrl: "#footer-contact"

// 打开邮箱客户端
contactUrl: "mailto:your-name@example.com"

// 跳到外部链接
contactUrl: "https://example.com/contact"
```

### `navLinks`

`navLinks` 控制桌面端顶部导航的页签文字和跳转位置。

```ts
export const navLinks = [
  { label: "关于我", href: "#about" },
  { label: "商业合作", href: "#services" },
  { label: "艺术作品", href: "#projects" },
  { label: "联系我", href: "#footer-contact" },
];
```

- `label`：导航中显示的文字。
- `href`：点击后的跳转地址。站内区域一般使用 `#区域id`，例如 `#about`、`#services`、`#projects`、`#footer-contact`。

注意事项：

- `href` 需要和页面里真实存在的 `id` 对应，否则点击后不会跳到正确位置。
- 数组顺序就是导航显示顺序。
- 可以新增或删除导航项，但顶部导航空间有限，不建议放太多项。
- 当前移动端顶部导航会隐藏文字页签，只保留左侧 logo 和右侧音乐按钮。

### `friendLinks`

`friendLinks` 控制页脚的友情链接。

```ts
export const friendLinks = [
  { label: "Cloud09", href: "https://cloud09.space" },
];
```

- `label`：页脚显示的链接名称。
- `href`：点击后打开的地址。友情链接会在新标签页中打开。

新增多个友情链接时，继续往数组里加对象即可：

```ts
export const friendLinks = [
  { label: "Cloud09", href: "https://cloud09.space" },
  { label: "Example", href: "https://example.com" },
];
```

### `services`

`services` 控制“商业合作”区域展示的服务项目。

```ts
export const services = [
  {
    number: "01",
    name: "3D Modeling",
    description: "Creation of detailed objects...",
  },
];
```

- `number`：服务编号，会显示在服务卡片左上角。
- `name`：服务名称，会显示为服务卡片标题。
- `description`：服务说明，会显示为服务卡片正文。

页面会按数组顺序渲染服务。当前布局会把前 3 项放在第一行，后面的项目放在下一组更宽的卡片中；如果服务数量变化较大，建议顺手检查一下页面布局。

### `projects`

`projects` 控制“艺术作品”区域展示的作品列表。

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

- `id`：作品唯一标识。不要和其他作品重复，建议只用小写英文、数字和短横线。
- `number`：作品编号，会显示在作品卡片左侧。
- `name`：作品名称，会显示为作品卡片主标题。
- `category`：作品类型标签。
- `liveUrl`：作品按钮跳转地址。可以是线上作品地址，也可以是站内锚点。
- `images.leftTop.src`：左上图片地址。
- `images.leftTop.alt`：左上图片替代文本。
- `images.leftBottom.src`：左下图片地址。
- `images.leftBottom.alt`：左下图片替代文本。
- `images.featured.src`：主图地址。
- `images.featured.alt`：主图替代文本。

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

图片路径规则：

```ts
// public/artworks/aura/cover.webp
src: "/artworks/aura/cover.webp"

// 远程图片
src: "https://example.com/image.webp"
```

### 新增作品的推荐步骤

1. 把图片放到 `public/artworks/你的作品目录/`。
2. 在 `projects` 数组末尾复制一个作品对象。
3. 修改 `id`、`number`、`name`、`category`、`liveUrl`。
4. 修改三张图片的 `src` 和 `alt`。
5. 执行 `npm run dev` 本地预览，确认图片比例、文字长度和按钮跳转正常。

## 背景与主题相关文件

全站共享的雾面玻璃背景在全局样式里维护：

```text
src/styles.css
```

当前主题使用 cinematic space-travel / liquid-glass 视觉语言，不再渲染此前的特殊 3D 人物图或漂浮装饰。

如果你想调整背景质感，优先修改 `.site-backdrop`、`.liquid-glass` 和 `.liquid-glass-strong`，这样整站效果会保持一致。

## 视觉主题说明

本版本保留作品集的信息结构，并把视觉主题切换为：

```text
统一暗色雾面玻璃背景
液态玻璃导航、按钮和卡片
统一压色的作品媒体
Instrument Serif 斜体标题
Barlow 正文字体
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
