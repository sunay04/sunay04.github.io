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

Vercel 承载 HTML、编辑器和 API。生产构建默认从当前网站域名加载 JavaScript、CSS 和静态资源，GitHub Pages 与 Vercel 均可使用同一份构建。不要将启动脚本指向可变的 `@cdn` 镜像分支：两处发布不同步或镜像缓存未刷新时，旧 HTML 会引用已不存在的脚本并导致白屏。

`.github/workflows/publish-cdn.yml` 仍将构建产物发布到 `cdn` 分支，并预热镜像，但镜像不再是启动网站的前提。GitHub Pages 仅提供静态访问，在线编辑和登录需使用 Vercel 域名的 `/edits`。
Vercel 自身也会通过全球 CDN 分发静态文件。`/assets/*` 中带内容哈希的构建资源和 `/audio/*` 中使用时间戳命名的音频采用一年不可变缓存；`public/content/projects.json` 在边缘节点短时缓存并后台重新验证。

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

## 编辑与发布流程

1. 在 Vercel 网站打开 `/edits` 并登录。修改自动保存在当前设备的浏览器中，不等于上线。
2. 作品正文支持文本、媒体、画廊、引用、数据和留白。可在任意块后插入、上移下移、复制、折叠，或撤销最近一次块删除。删除全部正文块后不会自动补回旧画廊。
3. 点击「预览」检查真实作品页，再点击「检查并发布」及「确认发布全部修改」。发布包含整个网站草稿，并自动提交到 GitHub，触发 Vercel 构建。
4. 等待部署状态完成。五分钟仍无法确认时会停止等待并提示，不应重复提交同一内容。
5. 如果其他窗口修改了线上内容，编辑器拒绝覆盖。先「备份草稿」下载 JSON，再「载入线上版本」，参考备份重新应用修改。旧版草稿没有版本信息时也按此流程处理。

音乐列表保留原有独立自动保存机制，界面会明确提示。备份 JSON 用于保留和人工恢复内容，当前不提供导入按钮。开发环境 `/edits?demo=1` 使用独立草稿空间，不发布到仓库。

## GitHub Pages 独立发布

`sunay04.github.io` 由 GitHub Pages 提供，更新 Vercel 不会更新这个地址。仓库 Pages 设置应保留 GitHub Actions 模式；`.github/workflows/deploy-pages.yml` 在推送到 `main` 后构建并通过 `deploy-pages` 发布。`Publish CDN assets` 成功仅代表镜像分支更新，不代表 Pages 已上线。

排查白屏时，先核对线上 HTML 引用的脚本是否返回 200，再分别查看 `Deploy to GitHub Pages` 与 Vercel 的部署结果。不能只以镜像构建或 Vercel 成功判断 `github.io` 已更新。

### Pages 编辑入口跳转

GitHub Pages 的编辑入口固定指向 `https://sunay04.vercel.app/edits`。如果以后更换 Vercel 正式域名，需要同步修改 `.github/workflows/deploy-pages.yml` 中的 `EDITOR_ORIGIN`。

Pages 工作流在构建后将 `dist/edits/index.html` 替换为独立跳转页，因此 `/edits`、`/edits/` 和 `/edits/index.html` 最终进入 Vercel 的 `/edits`。跳转不依赖应用脚本，提供浏览器自动跳转与手动链接；不转发查询参数。Vercel 使用常规构建，编辑器不受影响。缺少域名配置时 Pages 工作流会停止，避免发布错误入口。
