import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Check, ChevronRight, Copy, Eye, FileText, Github, GripVertical, Image, Images, LayoutDashboard, LoaderCircle, LogOut, Plus, Quote, Save, Sparkles, Trash2, Upload, X } from "lucide-react";
import type { PortfolioImage, Project, ProjectBlock } from "../content/projects";
import { bundledProjects } from "../content/projects/runtime";
import { ProjectDetail } from "../components/ProjectsSection";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { FriendsSection } from "../components/FriendsSection";
import { bundledSite, type SiteContent } from "../content/site";
import { getEditorSession, getRepositoryContent, publishRepositoryContent, uploadRepositoryMedia, type EditorUser } from "./api";

const DRAFT_KEY = "sunay-editor-draft-v1";
const SITE_DRAFT_KEY = "sunay-editor-site-draft-v1";

function uid() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function blankProject(_index?: number): Project {
  return {
    id: `untitled-${Date.now()}`,
    name: "未命名作品",
    category: "视觉设计",
    startDate: `${new Date().getFullYear()}-01`,
    summary: "在这里概括作品背景、方法与最终成果。",
    tags: ["新作品"],
    hero: { src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1800&q=85", alt: "作品封面", fit: "cover", orientation: "landscape" },
    gallery: [],
    blocks: [{ id: uid(), type: "text", heading: "担任角色", body: "说明你在项目中的角色与职责。", width: "narrow" }, { id: uid(), type: "text", heading: "成果", body: "说明项目成果。", width: "narrow" }, { id: uid(), type: "text", heading: "项目背景", body: "从问题、过程和结果开始讲述这个作品。", width: "narrow" }],
  };
}

function migrateProject(project: Project): Project {
  const hadBlocks = Boolean(project.blocks?.length);
  const blocks = [...(project.blocks ?? [])];
  if (project.role && !blocks.some((block) => block.type === "text" && block.heading === "担任角色")) blocks.unshift({ id: uid(), type: "text", heading: "担任角色", body: project.role, width: "narrow" });
  if (project.metrics?.length && !blocks.some((block) => block.type === "text" && block.heading === "成果")) blocks.splice(1, 0, { id: uid(), type: "text", heading: "成果", body: project.metrics.join("\n"), width: "narrow" });
  if (!hadBlocks) {
    blocks.push({ id: uid(), type: "media", media: { ...project.hero } });
    if (project.takeaways?.length) blocks.push({ id: uid(), type: "text", heading: "关键决策与贡献", body: project.takeaways.join("\n"), width: "wide" });
    if (project.gallery.length) blocks.push({ id: uid(), type: "gallery", items: project.gallery.map((item) => ({ ...item })), columns: 2 });
  }
  const addNotes = (media: PortfolioImage, heading: string) => { const body = [media.alt && `替代文本：${media.alt}`, media.caption && `说明：${media.caption}`].filter(Boolean).join("\n"); if (body && !blocks.some((block) => block.type === "text" && block.body === body)) blocks.push({ id: uid(), type: "text", heading, body, width: "narrow" }); };
  addNotes(project.hero, "封面媒体说明");
  project.gallery.forEach((media, index) => addNotes(media, `媒体 ${index + 1} 说明`));
  return { ...project, startDate: project.startDate ?? (project.year ? `${project.year}-01` : ""), blocks, role: undefined, metrics: undefined, number: undefined };
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

function PropertyPicker({ label, options, values, multiple, onChange }: { label: string; options: string[]; values: string[]; multiple?: boolean; onChange: (values: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const matches = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));
  const createValue = query.trim();
  const choose = (value: string) => { onChange(multiple ? (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]) : [value]); if (!multiple) { setOpen(false); setQuery(""); } };
  return <div className="editor-property"><span className="editor-property-label">{label}</span><div className="editor-property-control"><button className="editor-property-trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{values.length ? values.map((value) => <span className="editor-property-chip" key={value}>{value}</span>) : <span className="editor-property-empty">选择或创建</span>}<ChevronRight size={14} /></button>{open && <div className="editor-property-popover"><input autoFocus value={query} placeholder={`搜索或创建${label}`} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); if (event.key === "Enter" && createValue) { event.preventDefault(); choose(createValue); setQuery(""); } }} /><div className="editor-property-options">{matches.map((option) => <button key={option} aria-pressed={values.includes(option)} onClick={() => choose(option)}><span className="editor-property-dot" />{option}{values.includes(option) && <Check size={14} />}</button>)}{createValue && !options.includes(createValue) && <button onClick={() => { choose(createValue); setQuery(""); }}><Plus size={14} />创建“{createValue}”</button>}</div></div>}</div></div>;
}

function MediaFields({ media, onChange, onUpload }: { media: PortfolioImage; onChange: (media: PortfolioImage) => void; onUpload: (file: File) => Promise<string> }) {
  return <>
    {media.src && <div className="editor-inline-media-preview">{media.type === "video" ? <video src={media.src} controls /> : <img src={media.src} alt="" />}</div>}
    <Field label="媒体 URL" value={media.src} placeholder="https://..." onChange={(src) => onChange({ ...media, src })} />
    <label className="editor-upload-button"><Upload size={15} />上传本地文件（最大 8 MB）<input type="file" accept="image/*,video/*" onChange={async (event) => { const file = event.target.files?.[0]; if (file) onChange({ ...media, src: await onUpload(file), type: file.type.startsWith("video/") ? "video" : "image" }); event.currentTarget.value = ""; }} /></label>
    <div className="editor-segmented" aria-label="媒体类型">
      <button aria-pressed={(media.type ?? "image") === "image"} onClick={() => onChange({ ...media, type: "image" })}>图片</button>
      <button aria-pressed={media.type === "video"} onClick={() => onChange({ ...media, type: "video" })}>视频</button>
    </div>
  </>;
}

function BlockInspector({ block, onChange, onUpload }: { block: ProjectBlock; onChange: (block: ProjectBlock) => void; onUpload: (file: File) => Promise<string> }) {
  if (block.type === "text") return <><Field label="标题" value={block.heading ?? ""} onChange={(heading) => onChange({ ...block, heading })} /><Field label="正文" multiline value={block.body} onChange={(body) => onChange({ ...block, body })} /><div className="editor-segmented"><button aria-pressed={block.width !== "wide"} onClick={() => onChange({ ...block, width: "narrow" })}>窄栏</button><button aria-pressed={block.width === "wide"} onClick={() => onChange({ ...block, width: "wide" })}>宽栏</button></div></>;
  if (block.type === "quote") return <><Field label="引用" multiline value={block.body} onChange={(body) => onChange({ ...block, body })} /><Field label="署名" value={block.attribution ?? ""} onChange={(attribution) => onChange({ ...block, attribution })} /></>;
  if (block.type === "media") return <MediaFields media={block.media} onUpload={onUpload} onChange={(media) => onChange({ ...block, media })} />;
  if (block.type === "gallery") return <><div className="editor-segmented"><button aria-pressed={block.columns !== 3} onClick={() => onChange({ ...block, columns: 2 })}>两列</button><button aria-pressed={block.columns === 3} onClick={() => onChange({ ...block, columns: 3 })}>三列</button></div>{block.items.map((media, index) => <div className="editor-nested-fields" key={index}><strong>媒体 {index + 1}</strong><MediaFields media={media} onUpload={onUpload} onChange={(next) => onChange({ ...block, items: block.items.map((item, itemIndex) => itemIndex === index ? next : item) })} /><button className="editor-text-button danger" onClick={() => onChange({ ...block, items: block.items.filter((_, itemIndex) => itemIndex !== index) })}>移除媒体</button></div>)}<button className="editor-secondary-button" onClick={() => onChange({ ...block, items: [...block.items, { src: "", alt: `画廊图片 ${block.items.length + 1}`, fit: "cover" }] })}><Plus size={15} />添加媒体</button></>;
  if (block.type === "metrics") return <Field label="每行一项" multiline value={block.items.join("\n")} onChange={(value) => onChange({ ...block, items: value.split("\n").filter(Boolean) })} />;
  return <div className="editor-segmented"><button aria-pressed={block.size === "small"} onClick={() => onChange({ ...block, size: "small" })}>小</button><button aria-pressed={!block.size || block.size === "medium"} onClick={() => onChange({ ...block, size: "medium" })}>中</button><button aria-pressed={block.size === "large"} onClick={() => onChange({ ...block, size: "large" })}>大</button></div>;
}

function SiteEditor({ site, onChange }: { site: SiteContent; onChange: (site: SiteContent) => void }) {
  return <div className="editor-site-fields">
    <h2>关于页面</h2><Field label="主标题" value={site.profile.heroTitle} onChange={(heroTitle) => onChange({ ...site, profile: { ...site.profile, heroTitle } })} /><Field label="教育信息（每行一项）" multiline value={site.profile.education.join("\n")} onChange={(value) => onChange({ ...site, profile: { ...site.profile, education: value.split("\n").filter(Boolean) } })} />
    <h2>技能页面</h2>{site.highlights.map((item, index) => <div className="editor-nested-fields" key={`${item.label}-${index}`}><Field label="分组" value={item.label} onChange={(label) => onChange({ ...site, highlights: site.highlights.map((entry, itemIndex) => itemIndex === index ? { ...entry, label } : entry) })} /><Field label="内容" value={item.value} onChange={(value) => onChange({ ...site, highlights: site.highlights.map((entry, itemIndex) => itemIndex === index ? { ...entry, value } : entry) })} /><Field label="说明" multiline value={item.detail} onChange={(detail) => onChange({ ...site, highlights: site.highlights.map((entry, itemIndex) => itemIndex === index ? { ...entry, detail } : entry) })} /></div>)}
    {site.services.map((item, index) => <div className="editor-nested-fields" key={`${item.name}-${index}`}><Field label="能力名称" value={item.name} onChange={(name) => onChange({ ...site, services: site.services.map((entry, itemIndex) => itemIndex === index ? { ...entry, name } : entry) })} /><Field label="类型" value={item.tag} onChange={(tag) => onChange({ ...site, services: site.services.map((entry, itemIndex) => itemIndex === index ? { ...entry, tag } : entry) })} /><Field label="描述" multiline value={item.description} onChange={(description) => onChange({ ...site, services: site.services.map((entry, itemIndex) => itemIndex === index ? { ...entry, description } : entry) })} /></div>)}
    <h2>履历页面</h2>{site.experiences.map((item, index) => <div className="editor-nested-fields" key={`${item.period}-${index}`}><Field label="时间" value={item.period} onChange={(period) => onChange({ ...site, experiences: site.experiences.map((entry, itemIndex) => itemIndex === index ? { ...entry, period } : entry) })} /><Field label="职位 / 项目" value={item.role} onChange={(role) => onChange({ ...site, experiences: site.experiences.map((entry, itemIndex) => itemIndex === index ? { ...entry, role } : entry) })} /><Field label="组织" value={item.organization} onChange={(organization) => onChange({ ...site, experiences: site.experiences.map((entry, itemIndex) => itemIndex === index ? { ...entry, organization } : entry) })} /><Field label="描述" multiline value={item.description} onChange={(description) => onChange({ ...site, experiences: site.experiences.map((entry, itemIndex) => itemIndex === index ? { ...entry, description } : entry) })} /><Field label="要点（每行一项）" multiline value={item.highlights.join("\n")} onChange={(value) => onChange({ ...site, experiences: site.experiences.map((entry, itemIndex) => itemIndex === index ? { ...entry, highlights: value.split("\n").filter(Boolean) } : entry) })} /></div>)}
    <h2>友链页面</h2>{site.friendLinks.map((item, index) => <div className="editor-nested-fields" key={`${item.href}-${index}`}><Field label="名称" value={item.name} onChange={(name) => onChange({ ...site, friendLinks: site.friendLinks.map((entry, itemIndex) => itemIndex === index ? { ...entry, name } : entry) })} /><Field label="链接" value={item.href} onChange={(href) => onChange({ ...site, friendLinks: site.friendLinks.map((entry, itemIndex) => itemIndex === index ? { ...entry, href } : entry) })} /><Field label="描述" multiline value={item.description} onChange={(description) => onChange({ ...site, friendLinks: site.friendLinks.map((entry, itemIndex) => itemIndex === index ? { ...entry, description } : entry) })} /></div>)}
  </div>;
}

function SitePreview({ site }: { site: SiteContent }) {
  return <div className="editor-site-preview"><HeroSection content={site.profile} /><ServicesSection content={{ highlights: site.highlights, services: site.services }} /><ExperienceSection content={site.experiences} /><FriendsSection content={site.friendLinks} /></div>;
}

export function EditorPage() {
  const demoMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("demo") === "1";
  const [session, setSession] = useState<{ authenticated: boolean; configured: boolean; user?: EditorUser } | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => bundledProjects.map(migrateProject));
  const [site, setSite] = useState<SiteContent>(bundledSite);
  const [contentArea, setContentArea] = useState<"projects" | "site">("projects");
  const [selectedId, setSelectedId] = useState(bundledProjects[0]?.id ?? "");
  const [, setSelectedBlockId] = useState<string | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "saved" | "error">("loading");
  const [message, setMessage] = useState("");

  const selectedIndex = projects.findIndex((item) => item.id === selectedId);
  const project = projects[selectedIndex] ?? projects[0];

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
        const nextProjects = (draft ? JSON.parse(draft) as Project[] : remote.projects).map(migrateProject);
        const siteDraft = localStorage.getItem(SITE_DRAFT_KEY);
        setSite(siteDraft ? JSON.parse(siteDraft) as SiteContent : remote.site ?? bundledSite);
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
  useEffect(() => { if (session?.authenticated) localStorage.setItem(SITE_DRAFT_KEY, JSON.stringify(site)); }, [site, session?.authenticated]);

  const updateProject = (next: Project) => setProjects((items) => items.map((item) => item.id === project.id ? next : item));
  const updateBlock = (next: ProjectBlock) => updateProject({ ...project, blocks: project.blocks?.map((block) => block.id === next.id ? next : block) });
  const projectLabel = useMemo(() => project?.name ?? "", [project]);
  const categories = useMemo(() => [...new Set(projects.map((item) => item.category).filter(Boolean))].sort(), [projects]);
  const tagPool = useMemo(() => [...new Set(projects.flatMap((item) => item.tags))].sort(), [projects]);
  const uploadMedia = async (file: File) => {
    if (file.size > 8 * 1024 * 1024) throw new Error("单个文件不能超过 8 MB");
    setStatus("saving"); setMessage("正在上传媒体");
    try { const result = await uploadRepositoryMedia(file); setStatus("idle"); setMessage(""); return result.url; }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "上传失败"); throw error; }
  };
  const navigateContent = (area: "projects" | "site", heading?: string) => {
    setContentArea(area); setSelectedBlockId(null); setMode("edit");
    if (heading) requestAnimationFrame(() => requestAnimationFrame(() => { const target = [...document.querySelectorAll(".editor-site-fields h2")].find((element) => element.textContent?.startsWith(heading)); target?.scrollIntoView({ behavior: "smooth", block: "start" }); }));
  };

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
    if (projects.some((item) => !/^\d{4}-\d{2}$/.test(item.startDate ?? ""))) { setStatus("error"); setMessage("每个作品都必须填写 YYYY-MM 格式的开始时间"); return; }
    setStatus("saving"); setMessage("");
    if (demoMode) { setStatus("saved"); setMessage("本地预览已保存，不会提交仓库"); setTimeout(() => setStatus("idle"), 2500); return; }
    try { const result = await publishRepositoryContent(projects, site, sha); setSha(result.sha); localStorage.removeItem(DRAFT_KEY); localStorage.removeItem(SITE_DRAFT_KEY); setStatus("saved"); setMessage("已提交，站点将自动构建"); setTimeout(() => setStatus("idle"), 2500); }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "发布失败"); }
  };

  return <main className="editor-shell">
    <header className="editor-topbar liquid-glass-strong">
      <div className="editor-brand"><a href="/" aria-label="返回作品集">S</a><div><span>Sunay Studio</span><small>{session.user?.repository}</small></div><ChevronRight size={15} /><strong>{projectLabel}</strong></div>
      <div className="editor-top-actions"><nav className="editor-page-switch" aria-label="编辑页面"><button onClick={() => navigateContent("site", "关于")}>关于</button><button onClick={() => navigateContent("site", "技能")}>技能</button><button onClick={() => navigateContent("site", "履历")}>履历</button><button aria-current={contentArea === "projects"} onClick={() => navigateContent("projects")}>作品</button><button onClick={() => navigateContent("site", "友链")}>友链</button></nav><div className="editor-mode-switch"><button aria-pressed={mode === "edit"} onClick={() => setMode("edit")}><LayoutDashboard size={15} />编辑</button><button aria-pressed={mode === "preview"} onClick={() => setMode("preview")}><Eye size={15} />预览</button></div><button className="editor-publish-button" disabled={status === "saving"} onClick={publish}>{status === "saving" ? <LoaderCircle className="editor-spinner" size={16} /> : status === "saved" ? <Check size={16} /> : <Save size={16} />}{status === "saving" ? "正在发布" : "发布"}</button><img className="editor-avatar" src={session.user?.avatarUrl} alt={session.user?.login} /><a className="editor-icon-button" href="/api/auth/logout" title="退出登录" aria-label="退出登录"><LogOut size={16} /></a></div>
    </header>
    {message && <div className={`editor-toast is-${status}`}>{message}</div>}
    <div className="editor-workspace" data-mode={mode} data-area={contentArea}>
      {mode === "edit" && <aside className="editor-sidebar"><div className="editor-panel-title"><span>作品（拖拽排序）</span><button title="新建作品" aria-label="新建作品" onClick={() => { const next = blankProject(projects.length); setProjects([...projects, next]); setSelectedId(next.id); }}><Plus size={17} /></button></div><div className="editor-project-list">{projects.map((item, index) => <button key={item.id} draggable aria-current={item.id === project.id} onDragStart={(event) => event.dataTransfer.setData("text/project-index", String(index))} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const from = Number(event.dataTransfer.getData("text/project-index")); if (!Number.isInteger(from) || from === index) return; const next = [...projects]; const [moved] = next.splice(from, 1); next.splice(index, 0, moved); setProjects(next); }} onClick={() => { setSelectedId(item.id); setSelectedBlockId(null); }}><GripVertical size={14} /><strong>{item.name}</strong></button>)}</div><div className="editor-sidebar-actions"><button onClick={() => { const copy = { ...project, id: `${project.id}-copy-${Date.now()}`, name: `${project.name} 副本`, blocks: project.blocks?.map((block) => ({ ...block, id: uid() })) }; setProjects([...projects, copy]); setSelectedId(copy.id); }}><Copy size={15} />创建副本</button><button className="danger" disabled={projects.length === 1} onClick={() => { const next = projects.filter((item) => item.id !== project.id); setProjects(next); setSelectedId(next[0].id); }}><Trash2 size={15} />删除作品</button></div></aside>}
      <section className="editor-canvas"><div className="editor-document">
        {contentArea === "site" && (mode === "preview" ? <SitePreview site={site} /> : <SiteEditor site={site} onChange={setSite} />)}
        {contentArea === "projects" && mode === "edit" && <div className="editor-properties"><PropertyPicker label="类别" options={categories} values={[project.category].filter(Boolean)} onChange={(values) => updateProject({ ...project, category: values[0] ?? "" })} /><PropertyPicker label="标签" options={tagPool} values={project.tags} multiple onChange={(tags) => updateProject({ ...project, tags })} /></div>}
        {mode === "edit" && <div className="editor-project-meta"><div><Field label="开始时间（必填）" value={project.startDate ?? ""} placeholder="YYYY-MM" onChange={(startDate) => updateProject({ ...project, startDate })} /><Field label="结束时间（留空为至今）" value={project.endDate ?? ""} placeholder="YYYY-MM" onChange={(endDate) => updateProject({ ...project, endDate: endDate || undefined })} /></div><Field label="作品名称" value={project.name} onChange={(name) => updateProject({ ...project, name })} /><label className="editor-field"><span>类别（单选，共享池）</span><input list="editor-category-pool" value={project.category} onChange={(event) => updateProject({ ...project, category: event.target.value })} /><datalist id="editor-category-pool">{categories.map((item) => <option key={item} value={item} />)}</datalist></label><Field label="作品描述" multiline value={project.summary} onChange={(summary) => updateProject({ ...project, summary })} /><MediaFields media={project.hero} onUpload={uploadMedia} onChange={(hero) => updateProject({ ...project, hero })} /></div>}
        {mode === "preview" ? <div className="editor-real-preview"><ProjectDetail project={project} onBack={() => setMode("edit")} onPrevious={() => setSelectedId(projects[(selectedIndex - 1 + projects.length) % projects.length].id)} onNext={() => setSelectedId(projects[(selectedIndex + 1) % projects.length].id)} /></div> : <div className="editor-block-list">{blocks.map((block, index) => <section key={block.id} className="editor-inline-block"><div className="editor-block-controls"><GripVertical size={15} /><span>{blockCatalog.find((item) => item.type === block.type)?.label}</span><button disabled={index === 0} onClick={() => moveBlock(index, -1)} title="上移" aria-label="上移"><ArrowUp size={14} /></button><button disabled={index === blocks.length - 1} onClick={() => moveBlock(index, 1)} title="下移" aria-label="下移"><ArrowDown size={14} /></button><button onClick={() => updateProject({ ...project, blocks: blocks.filter((item) => item.id !== block.id) })} title="删除块" aria-label="删除块"><X size={14} /></button></div><div className="editor-inline-block-body"><BlockInspector block={block} onUpload={uploadMedia} onChange={updateBlock} /></div></section>)}<div className="editor-add-block"><span>添加内容块</span>{blockCatalog.map(({ type, label, icon: Icon }) => <button key={type} onClick={() => { const block = newBlock(type); updateProject({ ...project, blocks: [...blocks, block] }); }}><Icon size={16} />{label}</button>)}</div></div>}
      </div></section>
    </div>
  </main>;
}
