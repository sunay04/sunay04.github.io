import { useEffect, useRef, useState } from "react";
import { Check, LoaderCircle, Undo2, X } from "lucide-react";
import type { Project } from "../content/projects";
import { applySuggestion, projectFields, validateInput, validateResult, type AiAction, type AiResult, type AiSuggestion } from "./ai";
import "./ai.css";

export type AiRequest = { projectId: string; action: AiAction; target?: string; nonce: number };
type Props = { project: Project; request: AiRequest | null; visible: boolean; onClose: () => void; onChange: (project: Project) => void };
const actionLabels: Record<AiAction, string> = { summary: "优化简介", paragraph: "改善段落", review: "检查完整度" };

export function AiAssistant({ project, request, visible, onClose, onChange }: Props) {
  const [action, setAction] = useState<AiAction>("summary");
  const [target, setTarget] = useState("");
  const [context, setContext] = useState("");
  const [availability, setAvailability] = useState<"checking" | "ready" | "missing" | "error">("checking");
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [result, setResult] = useState<AiResult | null>(null);
  const [applied, setApplied] = useState<AiSuggestion[]>([]);
  const controller = useRef<AbortController | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const fields = projectFields(project);
  const paragraphs = fields.filter((field) => field.key.startsWith("block:"));
  const open = visible && request?.projectId === project.id;

  useEffect(() => {
    if (!open) { controller.current?.abort(); return; }
    const previous = document.activeElement;
    heading.current?.focus();
    return () => { if (previous instanceof HTMLElement && previous.isConnected) previous.focus(); };
  }, [open]);

  useEffect(() => {
    if (!request) return;
    controller.current?.abort();
    setAction(request.action); setTarget(request.target ?? ""); setError(""); setNotice("");
  }, [request]);

  useEffect(() => () => controller.current?.abort(), []);

  useEffect(() => {
    if (!open) return;
    const abort = new AbortController();
    setAvailability("checking");
    fetch("/api/ai/status", { credentials: "include", signal: AbortSignal.any([abort.signal, AbortSignal.timeout(10000)]) })
      .then(async (response) => {
        if (!response.ok) throw new Error(response.status === 403 ? "登录已失效，请重新登录编辑器。" : "无法连接 AI 接口，请确认部署后重试。");
        const body = await response.json();
        if (typeof body.configured !== "boolean") throw new Error("AI 接口尚不可用。");
        if (!abort.signal.aborted) setAvailability(body.configured ? "ready" : "missing");
      }).catch((reason) => {
        if (abort.signal.aborted) return;
        setAvailability("error");
        setError(reason instanceof SyntaxError ? "本地预览未连接 AI 服务，请在已部署并登录的编辑器中使用。" : reason instanceof Error ? reason.message : "AI 状态读取失败，请重试。");
      });
    return () => abort.abort();
  }, [open, retry]);

  const generate = async () => {
    if (controller.current) return;
    setError(""); setNotice("");
    let input;
    try { input = validateInput({ action, projectId: project.id, name: project.name, category: project.category, fields, target, context }); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "请检查输入内容"); return; }
    const abort = new AbortController();
    controller.current = abort;
    setLoading(true);
    try {
      const response = await fetch("/api/ai/assist", { method: "POST", credentials: "include", headers: { "content-type": "application/json" },
        signal: AbortSignal.any([abort.signal, AbortSignal.timeout(60000)]), body: JSON.stringify(input) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "生成失败，请重试。");
      const validated = validateResult(body, input);
      if (!abort.signal.aborted) { setResult(validated); setNotice("建议已生成，请核对事实后逐条采纳。"); }
    } catch (reason) {
      if (!abort.signal.aborted) setError(reason instanceof Error && reason.name === "TimeoutError" ? "AI 响应超时，请重试。" : reason instanceof Error ? reason.message : "生成失败，请重试。");
    } finally {
      if (controller.current === abort) { controller.current = null; setLoading(false); }
    }
  };

  const apply = (suggestion: AiSuggestion, undo = false) => {
    const next = applySuggestion(project, project.id, suggestion, undo);
    if (!next) { setError("这段文字已修改或删除，无法直接覆盖。请重新生成建议。"); return; }
    onChange(next);
    setError("");
    setApplied((items) => undo ? items.filter((item) => item !== suggestion) : [...items, suggestion]);
    setNotice(undo ? "已撤销这条 AI 修改，其他编辑保留。" : "已采纳到草稿，可预览后发布。");
  };

  return <aside id="portfolio-ai-assistant" className="editor-ai" hidden={!open} aria-labelledby="portfolio-ai-title" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); onClose(); } }}>
    <header className="editor-ai-header"><div><h2 id="portfolio-ai-title" tabIndex={-1} ref={heading}>作品集助手</h2><p>{project.name}</p></div><button type="button" className="editor-icon-button" aria-label="收起作品集助手" onClick={onClose}><X size={18} /></button></header>
    <div className="editor-ai-body">
      <p className="editor-ai-intro">把作品的背景、设计决策和个人贡献讲清楚。</p>
      <div className="editor-ai-modes" aria-label="选择 AI 功能">{(Object.keys(actionLabels) as AiAction[]).map((value) => <button key={value} type="button" aria-pressed={action === value} disabled={loading} onClick={() => { setAction(value); setError(""); }}>{actionLabels[value]}</button>)}</div>
      {action === "paragraph" && <label className="editor-field"><span>选择正文段落</span><select value={target} disabled={loading} onChange={(event) => setTarget(event.target.value)}><option value="">请选择段落</option>{paragraphs.map((field) => <option key={field.key} value={field.key}>{field.label}</option>)}</select>{!paragraphs.length && <small>先在作品中添加一个文本块。</small>}</label>}
      <label className="editor-field"><span>补充事实或希望突出的方向（选填）</span><textarea rows={4} maxLength={4000} value={context} disabled={loading} placeholder="例如：这是个人练习，我独立完成了概念与视觉设计，希望突出配色与叙事。也可以在这里回答下方待补问题。" onChange={(event) => setContext(event.target.value)} /></label>
      <p className="editor-ai-disclosure">点击生成后，当前作品文字和补充说明将发送给 DeepSeek。仅分析文字；建议采纳后保存为草稿。</p>
      {availability === "missing" && <p className="editor-ai-feedback" role="status">AI 尚未配置。请在 Vercel 设置 DEEPSEEK_API_KEY 后重新部署。</p>}
      {availability === "checking" && <p role="status" className="editor-ai-feedback">正在检查 AI 服务…</p>}
      <div className="editor-ai-actions"><button type="button" className="editor-secondary-button editor-ai-generate" disabled={availability !== "ready" || loading || (action === "paragraph" && !paragraphs.some((field) => field.key === target))} onClick={() => void generate()}>{loading && <LoaderCircle size={15} className="editor-spinner" />}{loading ? "正在生成建议…" : result ? "重新生成建议" : "生成建议"}</button>{loading && <button type="button" className="editor-secondary-button" onClick={() => { controller.current?.abort(); setNotice("已取消生成，现有建议和草稿保留。"); }}>取消</button>}{["error", "missing"].includes(availability) && <button type="button" className="editor-secondary-button" onClick={() => { setError(""); setRetry((value) => value + 1); }}>重新检查</button>}</div>
      {error && <p role="alert" className="editor-ai-error">{error}</p>}
      <p role="status" className="editor-ai-notice">{notice}</p>
      {result && <section className="editor-ai-results" aria-label="AI 建议" aria-busy={loading}>
        <h3>本次建议</h3><p>{result.overview}</p>
        {result.suggestions.map((suggestion, index) => {
          const accepted = applied.includes(suggestion);
          const stale = !accepted && !applySuggestion(project, project.id, suggestion);
          return <article className="editor-ai-suggestion" key={`${index}:${suggestion.key}`}><h4>{fields.find((field) => field.key === suggestion.key)?.label ?? "已删除的段落"}</h4><dl><dt>原文</dt><dd className="editor-ai-before">{suggestion.before || "（空白）"}</dd><dt>建议文案</dt><dd>{suggestion.after}</dd></dl><p className="editor-ai-reason">{suggestion.reason}</p>{accepted ? <span className="editor-ai-accepted"><Check size={14} />已采纳，可在下方撤销</span> : <button type="button" className="editor-secondary-button" disabled={!!stale || loading} onClick={() => apply(suggestion)}>{stale ? "原文已变化，请重新生成" : "采纳到草稿"}</button>}</article>;
        })}
        {!!result.questions.length && <section className="editor-ai-questions"><h3>补充这些事实，作品会更清楚</h3><ul>{result.questions.map((question, index) => <li key={index}>{question}</li>)}</ul><p>在上方补充说明中回答，再生成一次建议。</p></section>}
      </section>}
      {!!applied.length && <section className="editor-ai-history"><h3>本次编辑已采纳 · {applied.length}</h3>{[...applied].reverse().map((suggestion, index) => <div key={index}><p>{suggestion.after}</p><button type="button" className="editor-secondary-button" disabled={loading || !applySuggestion(project, project.id, suggestion, true)} onClick={() => apply(suggestion, true)}><Undo2 size={14} />撤销{!applySuggestion(project, project.id, suggestion, true) ? "（文字已变化）" : ""}</button></div>)}</section>}
    </div>
  </aside>;
}
