import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editorRedirectHtml } from '../scripts/editor-redirect.mjs';

test('Pages editor redirects without depending on the application bundle', () => {
  const html = editorRedirectHtml('https://portfolio.example/');
  assert.match(html, /window.location.replace\("https:\/\/portfolio.example\/edits"\)/);
  assert.match(html, /http-equiv="refresh"/);
  assert.match(html, /href="https:\/\/portfolio.example\/edits"/);
  assert.doesNotMatch(html, /type="module"|\/assets\//);
});
test('missing or unsafe destination cannot produce a broken deployment', () => {
  for (const origin of ['', 'http://portfolio.example', 'https://sunay04.github.io', 'https://user:pass@portfolio.example']) {
    assert.throws(() => editorRedirectHtml(origin));
  }
});
test('uses only the fixed origin, without copying query parameters', () => {
  const html = editorRedirectHtml('https://portfolio.example/old?redirect=elsewhere#hash');
  assert.doesNotMatch(html, /redirect=|#hash|\/old/);
});
