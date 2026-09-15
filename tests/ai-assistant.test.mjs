import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Buffer } from 'node:buffer';
import ts from 'typescript';

const dir = mkdtempSync(join(tmpdir(), 'portfolio-ai-test-'));
writeFileSync(join(dir, 'package.json'), '{"type":"module"}');
for (const file of ['src/editor/ai.ts', 'api/_ai.ts', 'api/_github.ts']) {
  const destination = join(dir, file.replace(/\.ts$/, '.js'));
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText);
}
after(() => rmSync(dir, { recursive: true, force: true }));
const { projectFields, validateInput, validateResult, applySuggestion } = await import(pathToFileURL(join(dir, 'src/editor/ai.js')));
const { handleAi } = await import(pathToFileURL(join(dir, 'api/_ai.js')));
const { handleApi } = await import(pathToFileURL(join(dir, 'api/_github.js')));
const { Request, Response, AbortController, crypto, TextEncoder } = globalThis;
const project = { id: 'work', name: '品牌练习', category: '视觉', summary: '设计海报。', hero: { src: 'private.jpg' }, blocks: [{ id: 'a', type: 'text', heading: '过程', body: '我完成配色。' }, { id: 'b', type: 'metrics', items: ['概念练习'] }, { id: 'c', type: 'media', media: { src: 'secret.jpg' } }] };
const input = { action: 'summary', projectId: project.id, name: project.name, category: project.category, fields: projectFields(project), context: '' };
const suggestion = { key: 'summary', before: '设计海报。', after: '通过海报练习探索品牌配色。', reason: '保留练习性质，突出配色。' };
const result = { overview: '突出真实贡献。', suggestions: [suggestion], questions: ['配色选择的依据是什么？'] };
const env = { DEEPSEEK_API_KEY: 'server-only-secret' };
function request(body = input, options = {}) { return new Request('https://portfolio.test/api/ai/assist', { method: 'POST', headers: { origin: 'https://portfolio.test', 'content-type': 'application/json' }, body: JSON.stringify(body), ...options }); }
function completion(value = result) { return Response.json({ choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(value) } }] }); }
async function mockFetch(mock, run) { const original = globalThis.fetch; globalThis.fetch = mock; try { await run(); } finally { globalThis.fetch = original; } }

test('extracts only text and outcome context, not media or private fields', () => {
  assert.deepEqual(projectFields(project).map(field => field.key), ['summary', 'block:a', 'evidence:b']);
  assert.ok(!JSON.stringify(projectFields(project)).includes('private.jpg'));
  assert.ok(!JSON.stringify(projectFields(project)).includes('secret.jpg'));
});
test('validates target, duplicate fields, lengths and required summary', () => {
  assert.equal(validateInput(input).target, 'summary');
  for (const change of [{ action: 'inject' }, { fields: [...input.fields, input.fields[0]] }, { context: 'x'.repeat(4001) }, { action: 'paragraph', target: 'missing' }, { fields: input.fields.slice(1) }]) assert.throws(() => validateInput({ ...input, ...change }));
});
test('rejects fabricated output targets, wrong originals, reference mutations and malformed results', () => {
  const validated = validateInput(input);
  assert.deepEqual(validateResult(result, validated), result);
  for (const change of [{ key: '__proto__' }, { before: 'invented' }, { key: 'block:a', before: '我完成配色。' }, { key: 'evidence:b', before: '概念练习' }, { after: '' }]) assert.throws(() => validateResult({ ...result, suggestions: [{ ...suggestion, ...change }] }, validated));
  assert.throws(() => validateResult({ ...result, questions: ['x'.repeat(601)] }, validated));
  assert.throws(() => validateResult({ ...result, suggestions: [suggestion, suggestion] }, validated));
});
test('apply and undo preserve unrelated edits and reject stale, deleted or different projects', () => {
  const updated = applySuggestion(project, 'work', suggestion);
  assert.equal(updated.summary, suggestion.after);
  assert.equal(project.summary, suggestion.before);
  assert.deepEqual(applySuggestion({ ...updated, name: '新标题' }, 'work', suggestion, true), { ...project, name: '新标题' });
  assert.equal(applySuggestion(project, 'different', suggestion), null);
  assert.equal(applySuggestion({ ...project, summary: 'new edit' }, 'work', suggestion), null);
  assert.equal(applySuggestion({ ...updated, summary: 'new edit' }, 'work', suggestion, true), null);
  const blockSuggestion = { ...suggestion, key: 'block:a', before: '我完成配色。' };
  assert.equal(applySuggestion({ ...project, blocks: [] }, 'work', blockSuggestion), null);
  const reordered = { ...project, blocks: [...project.blocks].reverse() };
  assert.equal(applySuggestion(reordered, 'work', blockSuggestion).blocks[2].body, suggestion.after);
});
test('requires a real editor session before any AI route', async () => {
  await mockFetch(() => { throw new Error('must not call upstream'); }, async () => {
    const response = await handleApi(request(), { ...env, SESSION_SECRET: 'test', GITHUB_CLIENT_ID: 'test', GITHUB_CLIENT_SECRET: 'test' });
    assert.equal(response.status, 403);
  });
});
test('authenticated owner can inspect AI configuration without exposing secrets', async () => {
  const encoder = new TextEncoder();
  const secret = 'test-session-secret';
  const key = await crypto.subtle.importKey('raw', await crypto.subtle.digest('SHA-256', encoder.encode(secret)), 'AES-GCM', false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const payload = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(JSON.stringify({ login: 'owner', accessToken: 'github-secret', exp: Date.now() + 60000 })));
  const cookie = Buffer.concat([Buffer.from(iv), Buffer.from(payload)]).toString('base64url');
  const response = await handleApi(new Request('https://portfolio.test/api/ai/status', { headers: { cookie: `sunay_session=${cookie}` } }), { ...env, SESSION_SECRET: secret, REPO_OWNER: 'owner' });
  assert.deepEqual(await response.json(), { configured: true });
});
test('rejects missing key, wrong method, cross-origin, missing origin and bad input without upstream calls', async () => {
  await mockFetch(() => { throw new Error('must not call upstream'); }, async () => {
    assert.equal((await handleAi(request(), {}, 'missing')).status, 503);
    assert.equal((await handleAi(new Request('https://portfolio.test/api/ai/assist'), env, 'method')).status, 405);
    assert.equal((await handleAi(request(input, { headers: { origin: 'https://evil.test' } }), env, 'origin')).status, 403);
    assert.equal((await handleAi(request(input, { headers: {} }), env, 'origin')).status, 403);
    assert.equal((await handleAi(request({}, { body: '{' }), env, 'bad')).status, 400);
    assert.equal((await handleAi(request(input, { body: 'x'.repeat(120001) }), env, 'large')).status, 400);
  });
});
test('calls DeepSeek with server key and returns validated suggestions', async () => {
  await mockFetch(async (url, options) => {
    assert.equal(url, 'https://api.deepseek.com/chat/completions');
    assert.equal(options.headers.authorization, 'Bearer server-only-secret');
    const body = JSON.parse(options.body);
    assert.equal(body.model, 'deepseek-flash');
    assert.deepEqual(body.response_format, { type: 'json_object' });
    assert.equal(JSON.parse(body.messages[1].content).target, 'summary');
    return completion();
  }, async () => {
    const response = await handleAi(request(), env, 'valid');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await response.json(), result);
  });
});
test('does not forward upstream error details, truncated output or invalid changes', async () => {
  const responses = [new Response('server-only-secret', { status: 401 }), Response.json({ choices: [{ finish_reason: 'length', message: { content: '{}' } }] }), completion({ ...result, suggestions: [{ ...suggestion, before: 'bad' }] })];
  for (const [index, upstream] of responses.entries()) await mockFetch(async () => upstream, async () => {
    const response = await handleAi(request(), env, `invalid-${index}`);
    assert.equal(response.status, 502);
    assert.ok(!(await response.text()).includes('server-only-secret'));
  });
});
test('throttles repeated calls and permits no parallel calls per user', async () => {
  let finish;
  let started;
  const began = new Promise(resolve => { started = resolve; });
  await mockFetch(() => { started(); return new Promise(resolve => { finish = resolve; }); }, async () => {
    const first = handleAi(request(), env, 'parallel');
    await began;
    assert.equal((await handleAi(request(), env, 'parallel')).status, 429);
    finish(completion());
    assert.equal((await first).status, 200);
  });
  await mockFetch(async () => completion(), async () => {
    for (let i = 0; i < 6; i++) assert.equal((await handleAi(request(), env, 'limited')).status, 200);
    assert.equal((await handleAi(request(), env, 'limited')).status, 429);
  });
});
test('propagates request cancellation and releases the per-user lock', async () => {
  const controller = new AbortController();
  await mockFetch(async (_url, options) => { controller.abort(); options.signal.throwIfAborted(); }, async () => {
    assert.equal((await handleAi(request(input, { signal: controller.signal }), env, 'cancelled')).status, 499);
  });
  await mockFetch(async () => completion(), async () => assert.equal((await handleAi(request(), env, 'cancelled')).status, 200));
});
