# sunay 个人作品集网站

这是基于原 Sunay 个人网站模板整理后的求职向作品集网站，已插入真实项目、项目文案、作品图、作品集 PDF 和两版岗位导向简历。

## 已插入内容

- 《悬置》AI 短片
- 《悬置》网页播放版视频、分镜剧本 PDF、课程 PPT 跳转区
- GENTLE MONSTER《折叠的维度：先锋个性大冒险》
- Future Echoes 视觉延展
- 海娜文化快闪集市
- 山下有松香氛插画
- 完整作品集 PDF
- AIGC / 内容运营方向简历
- 视觉 / AIGC 设计方向简历

## 本地预览

```bash
npm install
npm run dev
```

浏览器打开终端里显示的本地地址即可。

## 构建

```bash
npm run build
```

项目已经包含 GitHub Pages 自动部署配置：

```text
.github/workflows/deploy.yml
```

如果仓库的 `Settings > Pages` 使用的是 `GitHub Actions`，把代码推送到 `main` 后会自动发布 `dist`。

如果你的 Pages 目前直接读取仓库根目录，本次也同步了根目录的 `index.html`、`assets/`、`portfolio/`，上传后同样可以访问。

## 主要可编辑位置

```text
src/content/portfolio.ts
```

个人介绍、项目文案、项目图片、PDF 链接和导航都集中在这里。后续想换项目顺序或继续润色文案，优先改这个文件。
