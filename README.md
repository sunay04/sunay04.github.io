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

仓库通过 `.github/workflows/deploy.yml` 自动部署到 GitHub Pages。

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

编辑接口运行在 Cloudflare Worker。创建 GitHub OAuth App，将回调地址设置为
`https://<你的域名>/api/auth/callback`，再为 Worker 配置：

```text
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
SESSION_SECRET
REPO_OWNER（默认 sunay04）
REPO_NAME（默认 sunay04.github.io）
CONTENT_PATH（默认 public/content/projects.json）
```

`GITHUB_CLIENT_SECRET` 与 `SESSION_SECRET` 应使用 `wrangler secret put` 设置。
登录后，Worker 会通过 GitHub API 再次检查当前用户对仓库是否拥有
`write`、`maintain` 或 `admin` 权限。

个人资料、导航和服务内容位于 `src/content/site.ts`；作品共享类型位于
`src/content/projects/types.ts`。
