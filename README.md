# Sunay 个人作品集

基于 React、TypeScript 与 Vite 的个人作品集网站。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

项目部署到 Vercel。导入 GitHub 仓库后，Vercel 使用 `npm run build` 构建并发布 `dist`，每次推送到 `main` 都会自动部署。

Vercel 的全球 CDN 自动分发静态文件。`/assets/*` 中带内容哈希的构建资源和 `/audio/*` 中使用时间戳命名的音频采用一年不可变缓存；`public/content/projects.json` 在边缘节点短时缓存并后台重新验证。

## 作品管理

每个作品都是 `src/content/projects/<project-id>/` 下的独立单元：

```text
<project-id>/
|-- project.ts       # 作品信息与展示配置
`-- assets/          # 图片、视频、PDF 等作品源文件
```

新增作品时，创建上述目录并在 `src/content/projects/index.ts` 中导入配置。
`projects` 数组的顺序就是页面展示顺序。

也可以打开 `/edits`，通过块编辑器创建和修改作品。编辑器将内容提交到
`public/content/projects.json`，站点运行时会优先加载这个文件。

## 编辑器部署配置

编辑接口运行在 Vercel Functions。创建 GitHub OAuth App，将回调地址设置为
`https://<你的域名>/api/auth/callback`，再为 Vercel 项目配置：

```text
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
SESSION_SECRET
REPO_OWNER（默认 sunay04）
REPO_NAME（默认 sunay04.github.io）
CONTENT_PATH（默认 public/content/projects.json）
```

在 Vercel 项目的 Settings > Environment Variables 中配置这些变量，并将 GitHub OAuth App 的回调地址更新为正式 Vercel 域名。至少为 Production 环境配置；若需要在预览部署中使用编辑器，也要为 Preview 配置并添加对应的 OAuth 回调地址。

Vercel Functions 的请求体上限为 4.5 MB。编辑器使用 Base64 提交媒体，因此单个新上传文件限制为 3 MB；仓库中已有的静态媒体不受此限制。
登录后，Vercel Function 会通过 GitHub API 再次检查当前用户对仓库是否拥有
`write`、`maintain` 或 `admin` 权限。

个人资料、导航和服务内容位于 `src/content/site.ts`；作品共享类型位于
`src/content/projects/types.ts`。
