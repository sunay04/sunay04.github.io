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

个人资料、导航和服务内容位于 `src/content/site.ts`；作品共享类型位于
`src/content/projects/types.ts`。
