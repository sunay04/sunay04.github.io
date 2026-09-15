import type { Project } from "../content/projects/types.js";

export type AiAction = "summary" | "paragraph" | "review";
export type AiField = { key: string; label: string; value: string };
export type AiInput = { action: AiAction; projectId: string; name: string; category: string; fields: AiField[]; target?: string; context: string };
export type AiSuggestion = { key: string; before: string; after: string; reason: string };
export type AiResult = { overview: string; suggestions: AiSuggestion[]; questions: string[] };

export function projectFields(project: Project): AiField[] {
  return [
    { key: "summary", label: "作品简介", value: project.summary },
    ...(project.blocks ?? []).flatMap((block): AiField[] => {
      if (block.type === "text") return [{ key: `block:${block.id}`, label: block.heading || "正文段落", value: block.body }];
      if (block.type === "metrics") return [{ key: `evidence:${block.id}`, label: "已有成果（仅作参考）", value: block.items.join("；") }];
      return [];
    }),
  ];
}

const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const text = (value: unknown, max: number): value is string => typeof value === "string" && value.length <= max;

export function validateInput(value: unknown): AiInput {
  if (!record(value) || !["summary", "paragraph", "review"].includes(String(value.action)) ||
      !text(value.projectId, 200) || !value.projectId || !text(value.name, 300) || !text(value.category, 200) ||
      !text(value.context, 4000) || !Array.isArray(value.fields) || value.fields.length < 1 || value.fields.length > 60) {
    throw new Error("作品文字过长或请求格式无效，请缩短内容后重试。");
  }
  const keys = new Set<string>();
  const fields = value.fields.map((field): AiField => {
    if (!record(field) || !text(field.key, 220) || !/^(summary|block:.+|evidence:.+)$/.test(field.key) ||
        keys.has(field.key) || !text(field.label, 300) || !text(field.value, 12000)) throw new Error("段落内容过长或标识重复，请检查作品内容。");
    keys.add(field.key);
    return { key: field.key, label: field.label, value: field.value };
  });
  if (!keys.has("summary") || fields.reduce((size, field) => size + field.value.length, 0) > 24000) throw new Error("作品文字最多支持 24000 字，请精简后重试。");
  const action = value.action as AiAction;
  const target = action === "summary" ? "summary" : action === "paragraph" ? value.target : undefined;
  if (action === "paragraph" && (!text(target, 220) || !target.startsWith("block:") || !keys.has(target))) throw new Error("请选择仍然存在的正文段落。");
  return { action, projectId: value.projectId, name: value.name, category: value.category, context: value.context, fields, target: target as string | undefined };
}

export function validateResult(value: unknown, input: AiInput): AiResult {
  if (!record(value) || !text(value.overview, 1600) || !value.overview.trim() || !Array.isArray(value.suggestions) ||
      value.suggestions.length > 8 || !Array.isArray(value.questions) || value.questions.length > 5 ||
      !value.questions.every((question) => text(question, 600) && question.trim())) throw new Error("AI 返回的建议格式不完整，请重试。");
  const seen = new Set<string>();
  const suggestions = value.suggestions.map((item): AiSuggestion => {
    if (!record(item) || !text(item.key, 220) || !text(item.after, 12000) || !item.after.trim() ||
        !text(item.reason, 1000) || !item.reason.trim() || seen.has(item.key)) throw new Error("AI 返回的建议格式无效，请重试。");
    const field = input.fields.find((candidate) => candidate.key === item.key);
    if (!field || field.key.startsWith("evidence:") || (input.target && item.key !== input.target) || item.before !== field.value) throw new Error("AI 建议与原文不一致，请重新生成。");
    seen.add(item.key);
    return { key: item.key, before: field.value, after: item.after, reason: item.reason };
  });
  return { overview: value.overview, suggestions, questions: value.questions as string[] };
}

// Compare only the target text: unrelated edits and block reordering are preserved.
export function applySuggestion(project: Project, projectId: string, suggestion: AiSuggestion, undo = false): Project | null {
  if (project.id !== projectId) return null;
  const expected = undo ? suggestion.after : suggestion.before;
  const replacement = undo ? suggestion.before : suggestion.after;
  if (suggestion.key === "summary") return project.summary === expected ? { ...project, summary: replacement } : null;
  if (!suggestion.key.startsWith("block:")) return null;
  const id = suggestion.key.slice(6);
  const matches = project.blocks?.filter((block) => block.id === id) ?? [];
  if (matches.length !== 1 || matches[0].type !== "text" || matches[0].body !== expected) return null;
  return { ...project, blocks: project.blocks?.map((block) => block.id === id && block.type === "text" ? { ...block, body: replacement } : block) };
}

