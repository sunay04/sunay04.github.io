import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import process from 'node:process';

export function editorRedirectHtml(origin) {
  if (!origin) throw new Error('请设置 EDITOR_ORIGIN 为 Vercel 的固定正式域名');
  const target = new URL(origin);
  if (target.protocol !== 'https:' || target.username || target.password || target.hostname.endsWith('.github.io')) {
    throw new Error('EDITOR_ORIGIN 必须是 HTTPS 编辑器域名，不能指向 GitHub Pages');
  }
  target.pathname = '/edits';
  target.search = '';
  target.hash = '';
  const href = target.href.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const literal = JSON.stringify(target.href).replaceAll('<', '\\u003c');
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="referrer" content="no-referrer">
<meta http-equiv="refresh" content="0;url=${href}">
<title>正在前往作品编辑台</title>
<script>window.location.replace(${literal});</script>
<style>body{margin:0;padding:12vh 24px;background:#f2f3f5;color:#273443;font:16px/1.7 system-ui,sans-serif}main{max-width:36rem;margin:auto}a{color:#235eb0}h1{font-size:24px}</style>
</head>
<body><main><h1>正在前往作品编辑台</h1><p>编辑与发布由 Vercel 提供。网站展示地址保持不变。</p><p>如果没有自动跳转，<a href="${href}" rel="noreferrer">点击进入编辑台</a>。</p><a href="/">返回作品集</a></main></body>
</html>\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeFileSync('dist/edits/index.html', editorRedirectHtml(process.env.EDITOR_ORIGIN));
}
