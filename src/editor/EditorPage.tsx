import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Check, ChevronRight, Copy, Eye, FileText, Github, GripVertical, Image, Images, LayoutDashboard, LoaderCircle, LogOut, Plus, Quote, Save, Sparkles, Trash2, X } from "lucide-react";
import type { PortfolioImage, Project, ProjectBlock } from "../content/projects";
import { bundledProjects } from "../content/projects/runtime";
import { ProjectBlocks } from "../components/ProjectBlocks";
import { getEditorSession, getRepositoryContent, publishRepositoryContent, type EditorUser } from "./api";

const DRAFT_KEY = "sunay-editor-draft-v1";

function uid() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function blankProject(index: number): Project {
  return {
    id: `untitled-${Date.now()}`,
    number: String(index + 1).padStart(2, "0"),
    name: "未命名作品",
    category: "视觉设计",
    role: "项目职责",
    year: String(new Date().getFullYear()),
    summary: "在这里概括作品背景、方法与最终成果。",
    tags: ["新作品"],
    metrics: ["待补充项目成果"],
    hero: { src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1800&q=85", alt: "作品封面", fit: "cover", orientation: "landscape" },
    gallery: [],
    blocks: [{ id: uid(), type: "text", heading: "项目背景", body: "从问题、过程和结果开始讲述这个作品。", width: "narrow" }],
  };
}

function newBlock(type: ProjectBlock["type"]): ProjectBlock {
  if (type === "text") return { id: uid(), type, heading: "段落标题", body: "输入正文内容。", width: "narrow" };
  if (type === "quote") return { id: uid(), type, body: "输入一句关键观点。", attribution: "" };
  if (type === "media") return { id: uid(), type, media: { src: "", alt: "作品图片", fit: "cover" } };
  if (type === "gallery") return { id: uid(), type, columns: 2, items: [{ src: "", alt: "画廊图片 1", fit: "cover" }, { src: "", alt: "画廊图片 2", fit: "cover" }] };
  if (type === "metrics") return { id: uid(), type, items: ["第一项成果", "第二项成果"] };
  return { id: uid(), type: "spacer", size: "medium" };
}

const blockCatalog = [
  { type: "text", label: "文本", icon: FileText },
  { type: "media", label: "媒体", icon: Image },
  { type: "gallery", label: "画廊", icon: Images },
  { type: "quote", label: "引用", icon: Quote },
  { type: "metrics", label: "数据", icon: LayoutDashboard },
  { type: "spacer", label: "留白", icon: GripVertical },
] as const;

function Field({ label, value, onChange, multiline, placeholder }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; placeholder?: string }) {
  const props = { value, placeholder, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value) };
  return <label className="editor-field"><span>{label}</span>{multiline ? <textarea rows={4} {...props} /> : <input {...props} />}</label>;
}

function MediaFields({ media, onChange }: { media: PortfolioImage; onChange: (media: PortfolioImage) => void }) {
  return <>
    <Field label="媒体 URL" value={media.src} placeholder="https://..." onChange={(src) => onChange({ ...media, src })} />
    <Field label="替代文本" value={media.alt} onChange={(alt) => onChange({ ...media, alt })} />
    <Field label="说明" value={media.caption ?? ""} onChange={(caption) => onChange({ ...media, caption })} />
    <div className="editor-segmented" aria-label="媒体类型">
      <button aria-pressed={(media.type ?? "image") === "image"} onClick={() => onChange({ ...media, type: "image" })}>图片</button>
      <button aria-pressed={media.type === "video"} onClick={() => onChange({ ...media, type: "video" })}>视频</button>
    </div>
  </>;
}

function BlockInspector({ block, onChange }: { block: ProjectBlock; onChange: (block: ProjectBlock) => void }) {
  if (block.type === "text") return <><Field label="标题" value={block.heading ?? ""} onChange={(heading) => onChange({ ...block, heading })} /><Field label="正文" multiline value={block.body} onChange={(body) => onChange({ ...block, body })} /><div className="editor-segmented"><button aria-pressed={block.width !== "wide"} onClick={() => onChange({ ...block, width: "narrow" })}>窄栏</button><button aria-pressed={block.width === "wide"} onClick={() => onChange({ ...block, width: "wide" })}>宽栏</button></div></>;
  if (block.type === "quote") return <><Field label="引用" multiline value={block.body} onChange={(body) => onChange({ ...block, body })} /><Field label="署名" value={block.attribution ?? ""} onChange={(attribution) => onChange({ ...block, attribution })} /></>;
  if (block.type === "media") return <MediaFields media={block.media} onChange={(media) => onChange({ ...block, media })} />;
  if (block.type === "gallery") return <><div className="editor-segmented"><button aria-pressed={block.columns !== 3} onClick={() => onChange({ ...block, columns: 2 })}>两列</button><button aria-pressed={block.columns === 3} onClick={() => onChange({ ...block, columns: 3 })}>三列</button></div>{block.items.map((media, index) => <div className="editor-nested-fields" key={index}><strong>媒体 {index + 1}</strong><MediaFields media={media} onChange={(next) => onChange({ ...block, items: block.items.map((item, itemIndex) => itemIndex === index ? next : item) })} /><button className="editor-text-button danger" onClick={() => onChange({ ...block, items: block.items.filter((_, itemIndex) => itemIndex !== index) })}>移除媒体</button></div>)}<button className="editor-secondary-button" onClick={() => onChange({ ...block, items: [...block.items, { src: "", alt: `画廊图片 ${block.items.length + 1}`, fit: "cover" }] })}><Plus size={15} />添加媒体</button></>;
  if (block.type === "metrics") return <Field label="每行一项" multiline value={block.items.join("\n")} onChange={(value) => onChange({ ...block, items: value.split("\n").filter(Boolean) })} />;
  return <div className="editor-segmented"><button aria-pressed={block.size === "small"} onClick={() => onChange({ ...block, size: "small" })}>小</button><button aria-pressed={!block.size || block.size === "medium"} onClick={() => onChange({ ...block, size: "medium" })}>中</button><button aria-pressed={block.size === "large"} onClick={() => onChange({ ...block, size: "large" })}>大</button></div>;
}

export function EditorPage() {
  const demoMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("demo") === "1";
  const [session, setSession] = useState<{ authenticated: boolean; configured: boolean; user?: EditorUser } | null>(null);
  const [projects, setProjects] = useState<Project[]>(bundledProjects);
  const [selectedId, setSelectedId] = useState(bundledProjects[0]?.id ?? "");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "saved" | "error">("loading");
  const [message, setMessage] = useState("");

  const selectedIndex = projects.findIndex((item) => item.id === selectedId);
  const project = projects[selectedIndex] ?? projects[0];
  const selectedBlock = project?.blocks?.find((block) => block.id === selectedBlockId);

  useEffect(() => {
    if (demoMode) {
      setSession({ authenticated: true, configured: true, user: { login: "local-preview", avatarUrl: "https://github.com/sunay04.png", repository: "本地预览，不会提交" } });
      setStatus("idle");
      return;
    }
    getEditorSession().then(async (nextSession) => {
      setSession(nextSession);
      if (!nextSession.authenticated) { setStatus("idle"); return; }
      try {
        const remote = await getRepositoryContent();
        const draft = localStorage.getItem(DRAFT_KEY);
        const nextProjects = draft ? JSON.parse(draft) as Project[] : remote.projects;
        setProjects(nextProjects.length ? nextProjects : bundledProjects);
        setSelectedId((nextProjects[0] ?? bundledProjects[0])?.id ?? "");
        setSha(remote.sha);
        setStatus("idle");
      } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "加载失败"); }
    }).catch(() => { setSession({ authenticated: false, configured: false }); setStatus("idle"); });
  }, [demoMode]);

  useEffect(() => {
    if (session?.authenticated && projects.length) localStorage.setItem(DRAFT_KEY, JSON.stringify(projects));
  }, [projects, session?.authenticated]);

  const updateProject = (next: Project) => setProjects((items) => items.map((item) => item.id === project.id ? next : item));
  const updateBlock = (next: ProjectBlock) => updateProject({ ...project, blocks: project.blocks?.map((block) => block.id === next.id ? next : block) });
  const projectLabel = useMemo(() => project ? `${project.number} / ${project.name}` : "", [project]);

  if (!session || status === "loading") return <main className="editor-gate"><LoaderCircle className="editor-spinner" /><p>正在检查编辑权限</p></main>;

  if (!session.authenticated) return <main className="editor-gate"><a href="/" className="editor-back-link"><ArrowLeft size={16} />返回作品集</a><div className="editor-gate-mark"><Sparkles /></div><p className="editor-eyebrow">SUNAY STUDIO</p><h1>进入作品编辑台</h1><p className="editor-gate-copy">使用 GitHub 身份验证。仅此仓库的所有者和协作者可以读取草稿并发布更改。</p>{session.configured ? <a className="editor-github-button" href="/api/auth/github"><Github size={18} />使用 GitHub 继续</a> : <div className="editor-config-note">编辑服务尚未配置。请在 Cloudflare 中设置 GitHub OAuth 与会话环境变量。</div>}</main>;

  if (!project) return null;

  const blocks = project.blocks ?? [];
  const moveBlock = (index: number, offset: number) => {
    const next = [...blocks]; const target = index + offset;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updateProject({ ...project, blocks: next });
  };
  const publish = async () => {
    setStatus("saving"); setMessage("");
    if (demoMode) { setStatus("saved"); setMessage("本地预览已保存，不会提交仓库"); setTimeout(() => setStatus("idle"), 2500); return; }
    try { const result = await publishRepositoryContent(projects, sha); setSha(result.sha); localStorage.removeItem(DRAFT_KEY); setStatus("saved"); setMessage("已提交，站点将自动构建"); setTimeout(() => setStatus("idle"), 2500); }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "发布失败"); }
  };

  return <main className="editor-shell">
    <header className="editor-topbar liquid-glass-strong">
      <div className="editor-brand"><a href="/" aria-label="返回作品集">S</a><div><span>Sunay Studio</span><small>{session.user?.repository}</small></div><ChevronRight size={15} /><strong>{projectLabel}</strong></div>
      <div className="editor-top-actions"><div className="editor-mode-switch"><button aria-pressed={mode === "edit"} onClick={() => setMode("edit")}><LayoutDashboard size={15} />编辑</button><button aria-pressed={mode === "preview"} onClick={() => setMode("preview")}><Eye size={15} />预览</button></div><button className="editor-publish-button" disabled={status === "saving"} onClick={publish}>{status === "saving" ? <LoaderCircle className="editor-spinner" size={16} /> : status === "saved" ? <Check size={16} /> : <Save size={16} />}{status === "saving" ? "正在发布" : "发布"}</button><img className="editor-avatar" src={session.user?.avatarUrl} alt={session.user?.login} /><a className="editor-icon-button" href="/api/auth/logout" title="退出登录" aria-label="退出登录"><LogOut size={16} /></a></div>
    </header>
    {message && <div className={`editor-toast is-${status}`}>{message}</div>}
    <div className="editor-workspace" data-mode={mode}>
      {mode === "edit" && <aside className="editor-sidebar"><div className="editor-panel-title"><span>作品</span><button title="新建作品" aria-label="新建作品" onClick={() => { const next = blankProject(projects.length); setProjects([...projects, next]); setSelectedId(next.id); }}><Plus size={17} /></button></div><div className="editor-project-list">{projects.map((item) => <button key={item.id} aria-current={item.id === project.id} onClick={() => { setSelectedId(item.id); setSelectedBlockId(null); }}><span>{item.number}</span><strong>{item.name}</strong></button>)}</div><div className="editor-sidebar-actions"><button onClick={() => { const copy = { ...project, id: `${project.id}-copy-${Date.now()}`, name: `${project.name} 副本`, blocks: project.blocks?.map((block) => ({ ...block, id: uid() })) }; setProjects([...projects, copy]); setSelectedId(copy.id); }}><Copy size={15} />创建副本</button><button className="danger" disabled={projects.length === 1} onClick={() => { const next = projects.filter((item) => item.id !== project.id); setProjects(next); setSelectedId(next[0].id); }}><Trash2 size={15} />删除作品</button></div></aside>}
      <section className="editor-canvas"><div className="editor-document">
        {mode === "edit" && <div className="editor-project-meta"><div><Field label="编号" value={project.number} onChange={(number) => updateProject({ ...project, number })} /><Field label="年份" value={project.year} onChange={(year) => updateProject({ ...project, year })} /></div><Field label="作品名称" value={project.name} onChange={(name) => updateProject({ ...project, name })} /><Field label="类别" value={project.category} onChange={(category) => updateProject({ ...project, category })} /><Field label="一句话简介" multiline value={project.summary} onChange={(summary) => updateProject({ ...project, summary })} /><MediaFields media={project.hero} onChange={(hero) => updateProject({ ...project, hero })} /></div>}
        {mode === "preview" ? <article className="editor-preview"><p>{project.category} · {project.year}</p><h1>{project.name}</h1><div className="editor-preview-hero">{project.hero.type === "video" ? <video src={project.hero.src} controls /> : <img src={project.hero.src} alt={project.hero.alt} />}</div><ProjectBlocks blocks={blocks} /></article> : <div className="editor-block-list">{blocks.map((block, index) => <div key={block.id} className="editor-block-row" data-selected={block.id === selectedBlockId} onClick={() => setSelectedBlockId(block.id)}><div className="editor-block-controls"><GripVertical size={15} /><button disabled={index === 0} onClick={(event) => { event.stopPropagation(); moveBlock(index, -1); }} title="上移" aria-label="上移"><ArrowUp size={14} /></button><button disabled={index === blocks.length - 1} onClick={(event) => { event.stopPropagation(); moveBlock(index, 1); }} title="下移" aria-label="下移"><ArrowDown size={14} /></button><button onClick={(event) => { event.stopPropagation(); updateProject({ ...project, blocks: blocks.filter((item) => item.id !== block.id) }); }} title="删除块" aria-label="删除块"><X size={14} /></button></div><div className="editor-block-summary"><span>{blockCatalog.find((item) => item.type === block.type)?.label}</span><strong>{block.type === "text" ? block.heading : block.type === "quote" ? block.body : block.type === "media" ? block.media.alt : block.type === "gallery" ? `${block.items.length} 项媒体` : block.type === "metrics" ? `${block.items.length} 项数据` : "节奏留白"}</strong></div></div>)}<div className="editor-add-block"><span>添加内容块</span>{blockCatalog.map(({ type, label, icon: Icon }) => <button key={type} onClick={() => { const block = newBlock(type); updateProject({ ...project, blocks: [...blocks, block] }); setSelectedBlockId(block.id); }}><Icon size={16} />{label}</button>)}</div></div>}
      </div></section>
      {mode === "edit" && <aside className="editor-inspector"><div className="editor-panel-title"><span>{selectedBlock ? "块设置" : "作品设置"}</span></div>{selectedBlock ? <BlockInspector block={selectedBlock} onChange={updateBlock} /> : <><Field label="职责" multiline value={project.role} onChange={(role) => updateProject({ ...project, role })} /><Field label="标签（逗号分隔）" value={project.tags.join(", ")} onChange={(value) => updateProject({ ...project, tags: value.split(",").map((item) => item.trim()).filter(Boolean) })} /><Field label="成果（每行一项）" multiline value={project.metrics.join("\n")} onChange={(value) => updateProject({ ...project, metrics: value.split("\n").filter(Boolean) })} /></>}<p className="editor-autosave"><Check size={13} />更改已保存在此浏览器</p></aside>}
    </div>
  </main>;
}
