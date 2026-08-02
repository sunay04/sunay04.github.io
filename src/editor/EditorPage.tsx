import { useEffect, useMemo, useRef, useState } from "react";
import { Reorder } from "framer-motion";
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
  if (project.heroSupport && !blocks.some((block) => block.type === "media" && block.media.src === project.heroSupport?.src)) blocks.splice(1, 0, { id: uid(), type: "media", media: { ...project.heroSupport } });
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

function Field({ label, value, onChange, multiline, placeholder, type }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; placeholder?: string; type?: React.HTMLInputTypeAttribute }) {
  const props = { value, placeholder, onPointerDown: (event: React.PointerEvent) => event.stopPropagation(), onMouseDown: (event: React.MouseEvent) => event.stopPropagation(), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value) };
  return <label className="editor-field"><span>{label}</span>{multiline ? <textarea rows={4} {...props} /> : <input type={type} {...props} />}</label>;
}

function KeywordInput({ label, values, onChange, placeholder = "输入关键词后按回车" }: { label: string; values: string[]; onChange: (values: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const add = () => { const value = draft.trim(); if (!value) return; if (!values.includes(value)) onChange([...values, value]); setDraft(""); };
  return <div className="editor-keywords"><span>{label}</span><div className="editor-keyword-control"><div className="editor-keyword-list">{values.map((value) => <span key={value}>{value}<button type="button" aria-label={`删除关键词 ${value}`} onClick={() => onChange(values.filter((item) => item !== value))}><X size={12} /></button></span>)}</div><input value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing) { event.preventDefault(); add(); } }} onBlur={add} /></div></div>;
}

const propertyPalette = ["#dce2e8", "#f2d7d5", "#f5dfbd", "#eee6b7", "#d4e7d3", "#cfe6e7", "#d8def0", "#e4d7ed", "#ead6df", "#d8d0c8"];

function PropertyPicker({ label, options, values, colors, multiple, onChange, onColorChange }: { label: string; options: string[]; values: string[]; colors: Record<string, string>; multiple?: boolean; onChange: (values: string[]) => void; onColorChange: (value: string, color: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [colorTarget, setColorTarget] = useState<string | null>(null);
  const pickerId = label === "类别" ? "category" : "tags";
  useEffect(() => { const closeOther = (event: Event) => { if ((event as CustomEvent<string>).detail !== pickerId) { setOpen(false); setColorTarget(null); } }; window.addEventListener("sunay-property-open", closeOther); return () => window.removeEventListener("sunay-property-open", closeOther); }, [pickerId]);
  const matches = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));
  const createValue = query.trim();
  const choose = (value: string) => { onChange(multiple ? (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]) : [value]); if (!multiple) { setOpen(false); setQuery(""); } };
  return <div className="editor-property"><span className="editor-property-label">{label}</span><div className="editor-property-control"><button className="editor-property-trigger" aria-expanded={open} onClick={() => { if (!open) window.dispatchEvent(new CustomEvent("sunay-property-open", { detail: pickerId })); setOpen((value) => !value); setColorTarget(null); }}>{values.length ? values.map((value) => <span className="editor-property-chip" style={{ backgroundColor: colors[value] ?? "#e4e7eb" }} key={value}>{value}</span>) : <span className="editor-property-empty">选择或创建</span>}<ChevronRight size={14} /></button>{open && <><button className="editor-property-dismiss" aria-label={`关闭${label}菜单`} onClick={() => { setOpen(false); setColorTarget(null); }} /><div className="editor-property-popover"><input autoFocus value={query} placeholder={`搜索或创建${label}`} onPointerDown={(event) => event.stopPropagation()} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); setColorTarget(null); } if (event.key === "Enter" && createValue) { event.preventDefault(); choose(createValue); setQuery(""); } }} /><div className="editor-property-options">{matches.map((option) => <div className="editor-property-option" key={option}><button aria-pressed={values.includes(option)} onClick={() => choose(option)}><span className="editor-property-dot" style={{ backgroundColor: colors[option] ?? "#dce2e8" }} />{option}{values.includes(option) && <Check size={14} />}</button><button className="editor-property-color-button" aria-label={`设置${option}颜色`} onClick={() => setColorTarget(colorTarget === option ? null : option)}><span style={{ backgroundColor: colors[option] ?? "#dce2e8" }} /></button></div>)}{createValue && !options.includes(createValue) && <button onClick={() => { choose(createValue); setQuery(""); }}><Plus size={14} />创建“{createValue}”</button>}</div>{colorTarget && <div className="editor-property-palette" aria-label={`设置${colorTarget}颜色`}><span>{colorTarget}</span><div>{propertyPalette.map((color) => <button key={color} aria-label={color} aria-pressed={(colors[colorTarget] ?? "#dce2e8") === color} style={{ backgroundColor: color }} onClick={() => { onColorChange(colorTarget, color); setColorTarget(null); }} />)}</div></div>}</div></>}</div></div>;
}

function MonthWheel({ label, value, allowPresent, onChange }: { label: string; value?: string; allowPresent?: boolean; onChange: (value?: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const now = new Date();
  const selectedYear = Number(value?.slice(0, 4)) || now.getFullYear();
  const selectedMonth = Number(value?.slice(5, 7)) || now.getMonth() + 1;
  const years = Array.from({ length: now.getFullYear() - 2000 + 6 }, (_, index) => 2000 + index);
  useEffect(() => { const close = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, []);
  const setPart = (year: number, month: number) => onChange(`${year}-${String(month).padStart(2, "0")}`);
  return <div className="editor-month-field" ref={rootRef}><span>{label}</span><button type="button" aria-expanded={open} onClick={() => setOpen((current) => !current)}>{value ? value.replace("-", " 年 ") + " 月" : allowPresent ? "至今" : "选择年月"}<ChevronRight size={14} /></button>{open && <div className="editor-month-popover">{allowPresent && <button className="editor-present-option" aria-pressed={!value} onClick={() => { onChange(undefined); setOpen(false); }}>至今</button>}<div className="editor-month-wheels"><div>{years.map((year) => <button key={year} aria-pressed={year === selectedYear} onClick={() => setPart(year, selectedMonth)}>{year} 年</button>)}</div><div>{Array.from({ length: 12 }, (_, index) => index + 1).map((month) => <button key={month} aria-pressed={month === selectedMonth} onClick={() => setPart(selectedYear, month)}>{month} 月</button>)}</div></div><button className="editor-month-done" onClick={() => { if (!value) setPart(selectedYear, selectedMonth); setOpen(false); }}>完成</button></div>}</div>;
}

function MediaFields({ media, onChange, onUpload, label = "媒体来源" }: { media: PortfolioImage; onChange: (media: PortfolioImage) => void; onUpload: (file: File) => Promise<string>; label?: string }) {
  return <>
    {media.src && <div className="editor-inline-media-preview">{media.type === "video" ? <video src={media.src} controls /> : <img src={media.src} alt="" />}</div>}
    <Field label={label} value={media.src} placeholder="https://... 或 /uploads/example.jpg" onChange={(src) => onChange({ ...media, src })} />
    <p className="editor-field-help">支持完整链接或仓库内的站点相对路径（例如 /uploads/example.jpg）。</p>
    <label className="editor-upload-button"><Upload size={15} />上传本地文件（最大 8 MB）<input type="file" accept="image/*,video/*" onChange={async (event) => { const file = event.target.files?.[0]; if (file) onChange({ ...media, src: await onUpload(file), type: file.type.startsWith("video/") ? "video" : "image" }); event.currentTarget.value = ""; }} /></label>
    <div className="editor-segmented" aria-label="媒体类型">
      <button aria-pressed={(media.type ?? "image") === "image"} onClick={() => onChange({ ...media, type: "image" })}>图片</button>
      <button aria-pressed={media.type === "video"} onClick={() => onChange({ ...media, type: "video" })}>视频</button>
    </div>
  </>;
}

function AvatarField({ name, value, onChange, onUpload }: { name: string; value: string; onChange: (value: string) => void; onUpload: (file: File) => Promise<string> }) {
  return <div className="editor-avatar-field"><span>头像</span><div className="editor-avatar-preview">{value ? <img src={value} alt={`${name} 头像预览`} /> : <span>{name.slice(0, 1) || "?"}</span>}</div><Field label="媒体来源" value={value} placeholder="https://... 或 /uploads/avatar.png" onChange={onChange} /><p className="editor-field-help">支持完整链接、仓库相对路径或上传本地图片，单个文件最大 8 MB。</p><label className="editor-upload-button"><Upload size={15} />上传头像<input type="file" accept="image/*" onChange={async (event) => { const file = event.target.files?.[0]; if (file) onChange(await onUpload(file)); event.currentTarget.value = ""; }} /></label></div>;
}

function BlockInspector({ block, onChange, onUpload }: { block: ProjectBlock; onChange: (block: ProjectBlock) => void; onUpload: (file: File) => Promise<string> }) {
  if (block.type === "text") return <><Field label="标题" value={block.heading ?? ""} onChange={(heading) => onChange({ ...block, heading })} /><Field label="正文" multiline value={block.body} onChange={(body) => onChange({ ...block, body })} /><div className="editor-segmented"><button aria-pressed={block.width !== "wide"} onClick={() => onChange({ ...block, width: "narrow" })}>窄栏</button><button aria-pressed={block.width === "wide"} onClick={() => onChange({ ...block, width: "wide" })}>宽栏</button></div></>;
  if (block.type === "quote") return <><Field label="引用" multiline value={block.body} onChange={(body) => onChange({ ...block, body })} /><Field label="署名" value={block.attribution ?? ""} onChange={(attribution) => onChange({ ...block, attribution })} /></>;
  if (block.type === "media") return <MediaFields media={block.media} onUpload={onUpload} onChange={(media) => onChange({ ...block, media })} />;
  if (block.type === "gallery") return <><div className="editor-segmented"><button aria-pressed={block.columns !== 3} onClick={() => onChange({ ...block, columns: 2 })}>两列</button><button aria-pressed={block.columns === 3} onClick={() => onChange({ ...block, columns: 3 })}>三列</button></div>{block.items.map((media, index) => <div className="editor-nested-fields" key={index}><strong>媒体 {index + 1}</strong><MediaFields media={media} onUpload={onUpload} onChange={(next) => onChange({ ...block, items: block.items.map((item, itemIndex) => itemIndex === index ? next : item) })} /><button className="editor-text-button danger" onClick={() => onChange({ ...block, items: block.items.filter((_, itemIndex) => itemIndex !== index) })}>移除媒体</button></div>)}<button className="editor-secondary-button" onClick={() => onChange({ ...block, items: [...block.items, { src: "", alt: `画廊图片 ${block.items.length + 1}`, fit: "cover" }] })}><Plus size={15} />添加媒体</button></>;
  if (block.type === "metrics") return <Field label="每行一项" multiline value={block.items.join("\n")} onChange={(value) => onChange({ ...block, items: value.split("\n").filter(Boolean) })} />;
  return <div className="editor-segmented"><button aria-pressed={block.size === "small"} onClick={() => onChange({ ...block, size: "small" })}>小</button><button aria-pressed={!block.size || block.size === "medium"} onClick={() => onChange({ ...block, size: "medium" })}>中</button><button aria-pressed={block.size === "large"} onClick={() => onChange({ ...block, size: "large" })}>大</button></div>;
}

function ResourceFields({ project, onChange }: { project: Project; onChange: (project: Project) => void }) {
  const resources = project.resources ?? [];
  return <section className="editor-resource-fields"><div className="editor-section-heading"><div><span>项目资料</span><small>正式作品页底部的外部链接或仓库文件</small></div><button type="button" onClick={() => onChange({ ...project, resources: [...resources, { label: "新资料", href: "", note: "" }] })}><Plus size={15} />添加资料</button></div>{resources.map((resource, index) => <div className="editor-nested-fields" key={`${resource.href}-${index}`}><Field label="资料名称" value={resource.label} onChange={(label) => onChange({ ...project, resources: resources.map((item, itemIndex) => itemIndex === index ? { ...item, label } : item) })} /><Field label="资料链接" value={resource.href} placeholder="https://... 或 /content/file.pdf" onChange={(href) => onChange({ ...project, resources: resources.map((item, itemIndex) => itemIndex === index ? { ...item, href } : item) })} /><Field label="补充说明" value={resource.note ?? ""} onChange={(note) => onChange({ ...project, resources: resources.map((item, itemIndex) => itemIndex === index ? { ...item, note } : item) })} /><button className="editor-text-button danger" type="button" onClick={() => onChange({ ...project, resources: resources.filter((_, itemIndex) => itemIndex !== index) })}>移除资料</button></div>)}</section>;
}

type EditorPageKey = "about" | "services" | "experience" | "projects" | "friends";

function ItemActions({ onCopy, onDelete }: { onCopy: () => void; onDelete: () => void }) {
  return <div className="editor-item-actions"><button type="button" onClick={onCopy}><Copy size={14} />复制</button><button type="button" className="danger" onClick={onDelete}><Trash2 size={14} />删除</button></div>;
}

function SectionHeading({ title, actionLabel, onAdd }: { title: string; actionLabel?: string; onAdd?: () => void }) {
  return <div className="editor-site-heading"><h2>{title}</h2>{onAdd && <button type="button" onClick={onAdd}><Plus size={15} />{actionLabel}</button>}</div>;
}

function experienceDates(period: string, startDate?: string, endDate?: string) {
  const parts = period.match(/(\d{4})[.-](\d{1,2})\s*[—-]+\s*(?:(\d{4})[.-](\d{1,2})|Present|至今)/i);
  return { start: startDate ?? (parts ? `${parts[1]}-${parts[2].padStart(2, "0")}` : ""), end: endDate ?? (parts?.[3] ? `${parts[3]}-${parts[4].padStart(2, "0")}` : undefined) };
}

function experiencePeriod(start?: string, end?: string) {
  if (!start) return "";
  return `${start.replace("-", ".")} — ${end ? end.replace("-", ".") : "Present"}`;
}

function CollectionList<T>({ title, addLabel, items, selectedIndex, getLabel, onSelect, onAdd, onReorder }: { title: string; addLabel: string; items: T[]; selectedIndex: number; getLabel: (item: T, index: number) => string; onSelect: (index: number) => void; onAdd: () => void; onReorder: (items: T[]) => void }) {
  const selectedItem = items[selectedIndex];
  return <div className="editor-collection-group"><div className="editor-panel-title"><span>{title}</span><button type="button" title={addLabel} aria-label={addLabel} onClick={onAdd}><Plus size={17} /></button></div><Reorder.Group as="div" axis="y" values={items} onReorder={(next) => { onReorder(next); if (selectedItem) onSelect(Math.max(0, next.indexOf(selectedItem))); }} className="editor-project-list editor-collection-list">{items.map((item, index) => <Reorder.Item as="button" type="button" value={item} key={`${getLabel(item, index)}-${index}`} aria-current={index === selectedIndex} whileDrag={{ scale: 1.025, boxShadow: "0 12px 30px rgba(24,28,34,.16)" }} transition={{ type: "spring", bounce: 0.08, duration: 0.36 }} onClick={() => onSelect(index)}><GripVertical size={14} /><strong>{getLabel(item, index)}</strong></Reorder.Item>)}</Reorder.Group></div>;
}

function SiteEditor({ page, site, onChange, onUpload }: { page: Exclude<EditorPageKey, "projects">; site: SiteContent; onChange: (site: SiteContent) => void; onUpload: (file: File) => Promise<string> }) {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [friendIndex, setFriendIndex] = useState(0);
  const [skillGroup, setSkillGroup] = useState<"highlights" | "services">("services");
  if (page === "about") return <div className="editor-site-fields"><SectionHeading title="关于页面" /><Field label="用户名" value={site.profile.heroTitle} onChange={(heroTitle) => onChange({ ...site, profile: { ...site.profile, heroTitle } })} /><KeywordInput label="个人简介" values={site.profile.education} onChange={(education) => onChange({ ...site, profile: { ...site.profile, education } })} /></div>;
  const highlight = site.highlights[highlightIndex];
  const service = site.services[serviceIndex];
  const experience = site.experiences[experienceIndex];
  const friend = site.friendLinks[friendIndex];
  const deleteHighlight = () => { const next = site.highlights.filter((_, index) => index !== highlightIndex); onChange({ ...site, highlights: next }); setHighlightIndex(Math.max(0, Math.min(highlightIndex, next.length - 1))); };
  const deleteService = () => { const next = site.services.filter((_, index) => index !== serviceIndex).map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") })); onChange({ ...site, services: next }); setServiceIndex(Math.max(0, Math.min(serviceIndex, next.length - 1))); };
  const deleteExperience = () => { const next = site.experiences.filter((_, index) => index !== experienceIndex); onChange({ ...site, experiences: next }); setExperienceIndex(Math.max(0, Math.min(experienceIndex, next.length - 1))); };
  const deleteFriend = () => { const next = site.friendLinks.filter((_, index) => index !== friendIndex); onChange({ ...site, friendLinks: next }); setFriendIndex(Math.max(0, Math.min(friendIndex, next.length - 1))); };
  return <div className="editor-site-manager">
    <aside className="editor-sidebar editor-collection-sidebar">
      {page === "services" && <><CollectionList title="技能概览" addLabel="添加分组" items={site.highlights} selectedIndex={skillGroup === "highlights" ? highlightIndex : -1} getLabel={(item) => item.label || "未命名分组"} onSelect={(index) => { setHighlightIndex(index); setSkillGroup("highlights"); }} onAdd={() => { const next = { label: "新分组", value: "", detail: "" }; onChange({ ...site, highlights: [...site.highlights, next] }); setHighlightIndex(site.highlights.length); setSkillGroup("highlights"); }} onReorder={(highlights) => onChange({ ...site, highlights })} /><CollectionList title="技能项目" addLabel="添加技能" items={site.services} selectedIndex={skillGroup === "services" ? serviceIndex : -1} getLabel={(item) => item.name || "未命名技能"} onSelect={(index) => { setServiceIndex(index); setSkillGroup("services"); }} onAdd={() => { const next = { number: String(site.services.length + 1).padStart(2, "0"), name: "新技能", tag: "Skill", description: "" }; onChange({ ...site, services: [...site.services, next] }); setServiceIndex(site.services.length); setSkillGroup("services"); }} onReorder={(services) => onChange({ ...site, services: services.map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") })) })} /></>}
      {page === "experience" && <CollectionList title="履历（拖拽排序）" addLabel="添加履历" items={site.experiences} selectedIndex={experienceIndex} getLabel={(item) => item.role || "未命名履历"} onSelect={setExperienceIndex} onAdd={() => { const next = { period: "", startDate: "", role: "新组织 / 项目", organization: "", type: "实习" as const, description: "", highlights: [] }; onChange({ ...site, experiences: [...site.experiences, next] }); setExperienceIndex(site.experiences.length); }} onReorder={(experiences) => onChange({ ...site, experiences })} />}
      {page === "friends" && <CollectionList title="友链（拖拽排序）" addLabel="添加友链" items={site.friendLinks} selectedIndex={friendIndex} getLabel={(item) => item.name || "未命名友链"} onSelect={setFriendIndex} onAdd={() => { const next = { name: "新友链", href: "https://", icon: "", description: "" }; onChange({ ...site, friendLinks: [...site.friendLinks, next] }); setFriendIndex(site.friendLinks.length); }} onReorder={(friendLinks) => onChange({ ...site, friendLinks })} />}
    </aside>
    <div className="editor-collection-detail editor-site-fields">
      {page === "services" && skillGroup === "highlights" && highlight && <><SectionHeading title="编辑技能概览" /><ItemActions onCopy={() => { const next = [...site.highlights.slice(0, highlightIndex + 1), { ...highlight }, ...site.highlights.slice(highlightIndex + 1)]; onChange({ ...site, highlights: next }); setHighlightIndex(highlightIndex + 1); }} onDelete={deleteHighlight} /><Field label="分组" value={highlight.label} onChange={(label) => onChange({ ...site, highlights: site.highlights.map((item, index) => index === highlightIndex ? { ...item, label } : item) })} /><Field label="内容" value={highlight.value} onChange={(value) => onChange({ ...site, highlights: site.highlights.map((item, index) => index === highlightIndex ? { ...item, value } : item) })} /><Field label="说明" multiline value={highlight.detail} onChange={(detail) => onChange({ ...site, highlights: site.highlights.map((item, index) => index === highlightIndex ? { ...item, detail } : item) })} /></>}
      {page === "services" && skillGroup === "services" && service && <><SectionHeading title="编辑技能项目" /><ItemActions onCopy={() => { const copy = { ...service, number: String(site.services.length + 1).padStart(2, "0") }; const next = [...site.services.slice(0, serviceIndex + 1), copy, ...site.services.slice(serviceIndex + 1)].map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") })); onChange({ ...site, services: next }); setServiceIndex(serviceIndex + 1); }} onDelete={deleteService} /><Field label="能力名称" value={service.name} onChange={(name) => onChange({ ...site, services: site.services.map((item, index) => index === serviceIndex ? { ...item, name } : item) })} /><Field label="类型" value={service.tag} onChange={(tag) => onChange({ ...site, services: site.services.map((item, index) => index === serviceIndex ? { ...item, tag } : item) })} /><Field label="描述" multiline value={service.description} onChange={(description) => onChange({ ...site, services: site.services.map((item, index) => index === serviceIndex ? { ...item, description } : item) })} /></>}
      {page === "experience" && experience && (() => { const dates = experienceDates(experience.period, experience.startDate, experience.endDate); const dateError = !dates.start ? "请选择开始时间" : dates.end && dates.start > dates.end ? "开始时间不能晚于结束时间" : ""; const setDates = (start?: string, end?: string) => onChange({ ...site, experiences: site.experiences.map((item, index) => index === experienceIndex ? { ...item, startDate: start, endDate: end, period: experiencePeriod(start, end) } : item) }); return <><SectionHeading title="编辑履历" /><ItemActions onCopy={() => { const next = [...site.experiences.slice(0, experienceIndex + 1), { ...experience, highlights: [...experience.highlights] }, ...site.experiences.slice(experienceIndex + 1)]; onChange({ ...site, experiences: next }); setExperienceIndex(experienceIndex + 1); }} onDelete={deleteExperience} /><div className="editor-segmented editor-experience-type" aria-label="履历类型"><button type="button" aria-pressed={experience.type === "工作"} onClick={() => onChange({ ...site, experiences: site.experiences.map((item, index) => index === experienceIndex ? { ...item, type: "工作" } : item) })}>工作经历</button><button type="button" aria-pressed={experience.type === "实习"} onClick={() => onChange({ ...site, experiences: site.experiences.map((item, index) => index === experienceIndex ? { ...item, type: "实习" } : item) })}>实习经历</button></div><div className="editor-month-range" data-invalid={Boolean(dateError)}><MonthWheel label="开始时间（必填）" value={dates.start} onChange={(start) => setDates(start, dates.end)} /><MonthWheel label="结束时间" value={dates.end} allowPresent onChange={(end) => setDates(dates.start, end)} /></div>{dateError && <p className="editor-validation-message">{dateError}</p>}<Field label="组织 / 项目" value={experience.role} onChange={(role) => onChange({ ...site, experiences: site.experiences.map((item, index) => index === experienceIndex ? { ...item, role } : item) })} /><Field label="担任角色 / 职位" value={experience.organization} onChange={(organization) => onChange({ ...site, experiences: site.experiences.map((item, index) => index === experienceIndex ? { ...item, organization } : item) })} /><Field label="描述" multiline value={experience.description} onChange={(description) => onChange({ ...site, experiences: site.experiences.map((item, index) => index === experienceIndex ? { ...item, description } : item) })} /><KeywordInput label="关键词" values={experience.highlights} onChange={(highlights) => onChange({ ...site, experiences: site.experiences.map((item, index) => index === experienceIndex ? { ...item, highlights } : item) })} /></>; })()}
      {page === "friends" && friend && <><SectionHeading title="编辑友链" /><ItemActions onCopy={() => { const next = [...site.friendLinks.slice(0, friendIndex + 1), { ...friend, name: `${friend.name} 副本` }, ...site.friendLinks.slice(friendIndex + 1)]; onChange({ ...site, friendLinks: next }); setFriendIndex(friendIndex + 1); }} onDelete={deleteFriend} /><Field label="名称" value={friend.name} onChange={(name) => onChange({ ...site, friendLinks: site.friendLinks.map((item, index) => index === friendIndex ? { ...item, name } : item) })} /><Field label="链接" value={friend.href} placeholder="https://..." onChange={(href) => onChange({ ...site, friendLinks: site.friendLinks.map((item, index) => index === friendIndex ? { ...item, href } : item) })} /><AvatarField name={friend.name} value={friend.icon} onUpload={onUpload} onChange={(icon) => onChange({ ...site, friendLinks: site.friendLinks.map((item, index) => index === friendIndex ? { ...item, icon } : item) })} /><Field label="描述" multiline value={friend.description} onChange={(description) => onChange({ ...site, friendLinks: site.friendLinks.map((item, index) => index === friendIndex ? { ...item, description } : item) })} /></>}
    </div>
  </div>;
}

function SitePreview({ page, site }: { page: Exclude<EditorPageKey, "projects">; site: SiteContent }) {
  return <div className="editor-site-preview">{page === "about" && <HeroSection content={site.profile} />}{page === "services" && <ServicesSection content={{ highlights: site.highlights, services: site.services }} />}{page === "experience" && <ExperienceSection content={site.experiences} />}{page === "friends" && <FriendsSection content={site.friendLinks} />}</div>;
}

export function EditorPage() {
  const demoMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("demo") === "1";
  const [session, setSession] = useState<{ authenticated: boolean; configured: boolean; user?: EditorUser } | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => bundledProjects.map(migrateProject));
  const [site, setSite] = useState<SiteContent>(bundledSite);
  const [activePage, setActivePage] = useState<EditorPageKey>("projects");
  const [selectedId, setSelectedId] = useState(bundledProjects[0]?.id ?? "");
  const [, setSelectedBlockId] = useState<string | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "saved" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => { document.title = "编辑模式 · Sunay's Portfolio"; }, []);

  const selectedIndex = projects.findIndex((item) => item.id === selectedId);
  const project = projects[selectedIndex] ?? projects[0];
  const projectDateError = !project?.startDate ? "开始时间为必填项" : project.endDate && project.startDate > project.endDate ? "开始时间不能晚于结束时间" : "";

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
  const categories = useMemo(() => [...new Set(projects.map((item) => item.category).filter(Boolean))].sort(), [projects]);
  const tagPool = useMemo(() => [...new Set(projects.flatMap((item) => item.tags))].sort(), [projects]);
  const categoryColors = useMemo(() => Object.fromEntries(projects.map((item) => [item.category, item.categoryColor ?? "#dce2e8"])), [projects]);
  const tagColors = useMemo(() => Object.assign({}, ...projects.map((item) => item.tagColors ?? {})) as Record<string, string>, [projects]);
  const updateTaxonomyColor = (kind: "category" | "tag", value: string, color: string) => setProjects((items) => items.map((item) => kind === "category" && item.category === value ? { ...item, categoryColor: color } : kind === "tag" && item.tags.includes(value) ? { ...item, tagColors: { ...item.tagColors, [value]: color } } : item));
  const uploadMedia = async (file: File) => {
    if (file.size > 8 * 1024 * 1024) throw new Error("单个文件不能超过 8 MB");
    setStatus("saving"); setMessage("正在上传媒体");
    try { const result = await uploadRepositoryMedia(file); setStatus("idle"); setMessage(""); return result.url; }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "上传失败"); throw error; }
  };
  const navigateContent = (page: EditorPageKey) => { setActivePage(page); setSelectedBlockId(null); setMode("edit"); };

  if (!session || status === "loading") return <main className="editor-gate"><LoaderCircle className="editor-spinner" /><p>正在检查编辑权限</p></main>;

  if (!session.authenticated) return <main className="editor-gate"><a href="https://sunay04.github.io/" className="editor-back-link"><ArrowLeft size={16} />返回作品集</a><div className="editor-gate-mark"><Sparkles /></div><p className="editor-eyebrow">SUNAY'S PORTFOLIO</p><h1>进入作品编辑台</h1><p className="editor-gate-copy">使用 GitHub 身份验证。仅此仓库的所有者和协作者可以读取草稿并发布更改。</p>{session.configured ? <a className="editor-github-button" href="/api/auth/github"><Github size={18} />使用 GitHub 继续</a> : <div className="editor-config-note">编辑服务尚未配置。请在 Cloudflare 中设置 GitHub OAuth 与会话环境变量。</div>}</main>;

  if (!project) return null;

  const blocks = project.blocks ?? [];
  const moveBlock = (index: number, offset: number) => {
    const next = [...blocks]; const target = index + offset;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    updateProject({ ...project, blocks: next });
  };
  const publish = async () => {
    if (projects.some((item) => !/^\d{4}-\d{2}$/.test(item.startDate ?? ""))) { setStatus("error"); setMessage("每个作品都必须填写开始时间"); return; }
    if (projects.some((item) => item.endDate && item.startDate! > item.endDate)) { setStatus("error"); setMessage("作品的开始时间不能晚于结束时间"); return; }
    if (site.experiences.some((item) => { const dates = experienceDates(item.period, item.startDate, item.endDate); return !dates.start || Boolean(dates.end && dates.start > dates.end); })) { setStatus("error"); setMessage("履历时间不能为空，且开始时间不能晚于结束时间"); return; }
    setStatus("saving"); setMessage("");
    if (demoMode) { setStatus("saved"); setMessage("本地预览已保存，不会提交仓库"); setTimeout(() => setStatus("idle"), 2500); return; }
    try { const result = await publishRepositoryContent(projects, site, sha); setSha(result.sha); localStorage.removeItem(DRAFT_KEY); localStorage.removeItem(SITE_DRAFT_KEY); setStatus("saved"); setMessage("已提交，站点将自动构建"); setTimeout(() => setStatus("idle"), 2500); }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "发布失败"); }
  };
  const repositoryHref = `https://github.com/${session.user?.repository?.includes("/") ? session.user.repository : "sunay04/sunay04.github.io"}`;

  return <main className="editor-shell">
    <header className="editor-topbar liquid-glass-strong">
      <div className="editor-brand"><a href="https://sunay04.github.io/" aria-label="返回作品集">S</a><div><span>Sunay's Portfolio</span><small>{session.user?.repository}</small></div></div>
      <nav className="editor-page-switch" aria-label="编辑页面"><button aria-current={activePage === "about"} onClick={() => navigateContent("about")}>关于</button><button aria-current={activePage === "services"} onClick={() => navigateContent("services")}>技能</button><button aria-current={activePage === "experience"} onClick={() => navigateContent("experience")}>履历</button><button aria-current={activePage === "projects"} onClick={() => navigateContent("projects")}>作品</button><button aria-current={activePage === "friends"} onClick={() => navigateContent("friends")}>友链</button></nav>
      <div className="editor-top-actions"><div className="editor-mode-switch"><button aria-pressed={mode === "edit"} onClick={() => setMode("edit")}><LayoutDashboard size={15} />编辑</button><button aria-pressed={mode === "preview"} onClick={() => setMode("preview")}><Eye size={15} />预览</button></div><button className="editor-publish-button" disabled={status === "saving"} onClick={publish}>{status === "saving" ? <LoaderCircle className="editor-spinner" size={16} /> : status === "saved" ? <Check size={16} /> : <Save size={16} />}{status === "saving" ? "正在发布" : "发布"}</button><div className="editor-account-actions"><a className="editor-icon-button editor-repository-button editor-tooltip" href={repositoryHref} target="_blank" rel="noreferrer" aria-label="打开 GitHub 仓库" data-tooltip="打开 GitHub 仓库"><Github size={17} /></a><img className="editor-avatar" src={session.user?.avatarUrl} alt={session.user?.login} title={session.user?.login} /><a className="editor-icon-button editor-logout-button editor-tooltip" href="/api/auth/logout" aria-label="退出登录" data-tooltip="退出登录"><LogOut size={16} /></a></div></div>
    </header>
    {message && <div className={`editor-toast is-${status}`}>{message}</div>}
    <div className="editor-workspace" data-mode={mode} data-area={activePage === "projects" ? "projects" : "site"}>
      {activePage === "projects" && mode === "edit" && <aside className="editor-sidebar"><div className="editor-panel-title"><span>作品（拖拽排序）</span><button title="新建作品" aria-label="新建作品" onClick={() => { const next = blankProject(projects.length); setProjects([...projects, next]); setSelectedId(next.id); }}><Plus size={17} /></button></div><Reorder.Group as="div" axis="y" values={projects} onReorder={setProjects} className="editor-project-list">{projects.map((item) => <Reorder.Item as="button" value={item} key={item.id} aria-current={item.id === project.id} whileDrag={{ scale: 1.025, boxShadow: "0 12px 30px rgba(24,28,34,.16)" }} transition={{ type: "spring", bounce: 0.08, duration: 0.36 }} onClick={() => { setSelectedId(item.id); setSelectedBlockId(null); }}><GripVertical size={14} /><strong>{item.name}</strong></Reorder.Item>)}</Reorder.Group><div className="editor-sidebar-actions"><button onClick={() => { const copy = { ...project, id: `${project.id}-copy-${Date.now()}`, name: `${project.name} 副本`, blocks: project.blocks?.map((block) => ({ ...block, id: uid() })) }; setProjects([...projects, copy]); setSelectedId(copy.id); }}><Copy size={15} />创建副本</button><button className="danger" disabled={projects.length === 1} onClick={() => { const next = projects.filter((item) => item.id !== project.id); setProjects(next); setSelectedId(next[0].id); }}><Trash2 size={15} />删除作品</button></div></aside>}
      <section className="editor-canvas"><div className="editor-document">
        {activePage !== "projects" && (mode === "preview" ? <SitePreview page={activePage} site={site} /> : <SiteEditor page={activePage} site={site} onChange={setSite} onUpload={uploadMedia} />)}
        {activePage === "projects" && mode === "edit" && <div className="editor-properties"><PropertyPicker label="类别" options={categories} values={[project.category].filter(Boolean)} colors={categoryColors} onColorChange={(value, color) => updateTaxonomyColor("category", value, color)} onChange={(values) => updateProject({ ...project, category: values[0] ?? "", categoryColor: categoryColors[values[0]] ?? "#dce2e8" })} /><PropertyPicker label="标签" options={tagPool} values={project.tags} colors={tagColors} multiple onColorChange={(value, color) => updateTaxonomyColor("tag", value, color)} onChange={(tags) => updateProject({ ...project, tags, tagColors: { ...project.tagColors, ...Object.fromEntries(tags.map((tag) => [tag, tagColors[tag] ?? "#dce2e8"])) } })} /></div>}
        {activePage === "projects" && mode === "edit" && <div className="editor-project-meta"><div className="editor-month-range" data-invalid={Boolean(projectDateError)}><MonthWheel label="开始时间（必填）" value={project.startDate} onChange={(startDate) => updateProject({ ...project, startDate })} /><MonthWheel label="结束时间" value={project.endDate} allowPresent onChange={(endDate) => updateProject({ ...project, endDate })} /></div>{projectDateError && <p className="editor-validation-message">{projectDateError}</p>}<Field label="作品名称" value={project.name} onChange={(name) => updateProject({ ...project, name })} /><Field label="作品描述" multiline value={project.summary} onChange={(summary) => updateProject({ ...project, summary })} /><Field label="在线作品链接" value={project.liveUrl ?? ""} placeholder="https://..." onChange={(liveUrl) => updateProject({ ...project, liveUrl: liveUrl || undefined })} /><Field label="链接按钮文字" value={project.linkLabel ?? ""} placeholder="查看在线作品" onChange={(linkLabel) => updateProject({ ...project, linkLabel: linkLabel || undefined })} /><MediaFields label="封面URL" media={project.hero} onUpload={uploadMedia} onChange={(hero) => updateProject({ ...project, hero })} /><ResourceFields project={project} onChange={updateProject} /></div>}
        {activePage === "projects" && (mode === "preview" ? <div className="editor-real-preview"><ProjectDetail project={project} onBack={() => setMode("edit")} onPrevious={() => setSelectedId(projects[(selectedIndex - 1 + projects.length) % projects.length].id)} onNext={() => setSelectedId(projects[(selectedIndex + 1) % projects.length].id)} /></div> : <div className="editor-block-list">{blocks.map((block, index) => <section key={block.id} className="editor-inline-block"><div className="editor-block-controls"><GripVertical size={15} /><span>{blockCatalog.find((item) => item.type === block.type)?.label}</span><button disabled={index === 0} onClick={() => moveBlock(index, -1)} title="上移" aria-label="上移"><ArrowUp size={14} /></button><button disabled={index === blocks.length - 1} onClick={() => moveBlock(index, 1)} title="下移" aria-label="下移"><ArrowDown size={14} /></button><button onClick={() => updateProject({ ...project, blocks: blocks.filter((item) => item.id !== block.id) })} title="删除块" aria-label="删除块"><X size={14} /></button></div><div className="editor-inline-block-body"><BlockInspector block={block} onUpload={uploadMedia} onChange={updateBlock} /></div></section>)}<div className="editor-add-block"><span>添加内容块</span>{blockCatalog.map(({ type, label, icon: Icon }) => <button key={type} onClick={() => { const block = newBlock(type); updateProject({ ...project, blocks: [...blocks, block] }); }}><Icon size={16} />{label}</button>)}</div></div>)}
      </div></section>
    </div>
  </main>;
}
