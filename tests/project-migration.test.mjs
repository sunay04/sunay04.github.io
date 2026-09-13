import { URL } from 'node:url';
import { Buffer } from 'node:buffer';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/editor/migrateProject.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { migrateProject } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const legacy = { id: 'test', name: 'Test', category: '', summary: '', tags: [], year: '2025', role: 'Designer', metrics: ['Outcome'], hero: { src: '/cover.jpg', alt: 'Cover' }, heroSupport: { src: '/support.jpg', alt: 'Support' }, gallery: [{ src: '/gallery.jpg', alt: 'Gallery' }], takeaways: ['Decision'] };
test('migration preserves old content and remains stable across reopening', () => {
  const migrated = migrateProject(legacy);
  assert.equal(migrated.blocks.length, 6);
  assert.deepEqual(migrateProject(legacy), migrated);
  assert.deepEqual(migrateProject(migrated), migrated);
  assert.equal(new Set(migrated.blocks.map(block => block.id)).size, 6);
});
test('intentional empty body stays empty despite old gallery and role fields', () => {
  assert.deepEqual(migrateProject({ ...legacy, blocks: [] }).blocks, []);
});
test('deleting migrated content does not restore it on next load', () => {
  const migrated = migrateProject(legacy);
  migrated.blocks = migrated.blocks.slice(0, 1);
  assert.deepEqual(migrateProject(migrated).blocks, migrated.blocks);
});
