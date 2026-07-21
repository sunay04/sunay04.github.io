import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";
import { PortfolioImage, Project, projects } from "../content/portfolio";
import { cn } from "../lib/utils";

const PAGE_SIZE = 6;
const appleSpring = { type: "spring", bounce: 0, duration: 0.42 } as const;
const filters = ["全部", "AIGC", "品牌视觉", "视觉设计", "内容运营", "插画"] as const;

function projectFilter(project: Project) {
  const text = `${project.category} ${project.tags.join(" ")}`;
  if (/AIGC|AI |AI短片|Midjourney|可灵/.test(text)) return "AIGC";
  if (/运营|团购|快闪|本地生活/.test(text)) return "内容运营";
  if (/插画|角色叙事/.test(text)) return "插画";
  if (/品牌/.test(text)) return "品牌视觉";
  return "视觉设计";
}

function ProjectMedia({ media, className }: { media: PortfolioImage; className?: string }) {
  const fit = media.fit === "contain" ? "object-contain bg-[#f3f0ea]" : "object-cover";
  if (media.type === "video") {
    return <video src={media.src} aria-label={media.alt} className={cn("glass-media h-full w-full", fit, className)} autoPlay loop muted playsInline preload="metadata" />;
  }
  return <img src={media.src} alt={media.alt} className={cn("glass-media h-full w-full", fit, className)} loading="lazy" />;
}

function PreviewCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article layout className="project-card group liquid-glass flex min-h-0 flex-col overflow-hidden rounded-lg" whileHover={{ y: -4 }} transition={appleSpring}>
      <motion.button type="button" onClick={onOpen} whileTap={{ scale: 0.985 }} className="relative aspect-[16/10] w-full overflow-hidden text-left">
        <ProjectMedia media={project.hero} className="project-card-media transition-transform duration-500 group-hover:scale-[1.018]" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] text-white backdrop-blur-md">
          {projectFilter(project)}
        </span>
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition group-hover:translate-x-0.5" aria-hidden="true">
          <ArrowRight className="h-4 w-4" />
        </span>
      </motion.button>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] text-white/45">{project.category} · {project.year}</p>
            <h3 className="mt-2 text-lg font-medium leading-snug text-white">{project.name}</h3>
          </div>
          <span className="font-heading text-3xl italic text-white/35">{project.number}</span>
        </div>
        <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-white/65">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[11px] text-white/60">{tag}</span>)}
        </div>
        <motion.button type="button" onClick={onOpen} whileTap={{ scale: 0.98 }} className="mt-auto flex min-h-11 items-center justify-between border-t border-white/10 pt-4 text-sm font-medium text-white/90 transition-colors group-hover:text-white">
          查看作品 <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.article>
  );
}

function MediaFrame({ media }: { media: PortfolioImage }) {
  return (
    <figure className={cn("relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]", media.span === "wide" && "md:col-span-2")}>
      {media.type === "video" ?
        <video src={media.src} aria-label={media.alt} className="glass-media h-auto w-full bg-black object-contain" autoPlay loop muted playsInline preload="metadata" /> :
        <img src={media.src} alt={media.alt} className="glass-media h-auto w-full bg-[#f3f0ea] object-contain" loading="lazy" />}
      {media.caption && <figcaption className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[11px] text-white backdrop-blur-md">{media.caption}</figcaption>}
    </figure>
  );
}

function ProjectDetail({ project, onBack, onPrevious, onNext }: { project: Project; onBack: () => void; onPrevious: () => void; onNext: () => void }) {
  return (
    <FadeIn key={project.id} y={24}>
      <div className="mx-auto max-w-[92rem]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <motion.button type="button" onClick={onBack} whileTap={{ scale: 0.96 }} className="apple-control liquid-glass flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-white"><ArrowLeft className="h-4 w-4" /> 返回作品列表</motion.button>
          <div className="flex gap-2">
            <motion.button type="button" onClick={onPrevious} whileTap={{ scale: 0.92 }} title="上一个作品" aria-label="上一个作品" className="apple-control liquid-glass flex h-11 w-11 items-center justify-center rounded-full"><ChevronLeft className="h-5 w-5" /></motion.button>
            <motion.button type="button" onClick={onNext} whileTap={{ scale: 0.92 }} title="下一个作品" aria-label="下一个作品" className="apple-control liquid-glass flex h-11 w-11 items-center justify-center rounded-full"><ChevronRight className="h-5 w-5" /></motion.button>
          </div>
        </div>

        <article className="liquid-glass overflow-hidden rounded-lg p-4 sm:p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
            <div className="overflow-hidden rounded-lg bg-black/20"><ProjectMedia media={project.hero} className="max-h-[72dvh] min-h-[360px]" /></div>
            <div className="flex flex-col rounded-lg bg-black/15 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="text-5xl font-semibold leading-none text-white/20">{project.number}</span>
                <div className="text-right"><p className="text-xs text-white/65">{project.category}</p><p className="mt-1 text-xs text-white/40">{project.year}</p></div>
              </div>
              <h2 className="apple-title mt-7 text-[clamp(2.35rem,5vw,4.5rem)] font-semibold leading-[1.02]">{project.name}</h2>
              <p className="cosmic-copy mt-5 text-sm font-light leading-relaxed md:text-base">{project.summary}</p>
              <div className="mt-7 border-t border-white/10 pt-5"><p className="text-xs text-white/40">ROLE</p><p className="mt-2 text-sm leading-relaxed text-white/75">{project.role}</p></div>
              <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{tag}</span>)}</div>
              <div className="mt-4 flex flex-wrap gap-2">{project.metrics.map((metric) => <span key={metric} className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs text-white/80">{metric}</span>)}</div>
              {project.liveUrl && <div className="mt-6"><LiveProjectButton href={project.liveUrl} label={project.linkLabel} /></div>}
            </div>
          </div>

          {project.heroSupport && <div className="mt-4"><MediaFrame media={project.heroSupport} /></div>}
          {project.gallery.length > 0 && <div className="mt-4 grid gap-4 md:grid-cols-2">{project.gallery.map((media) => <MediaFrame key={media.src} media={media} />)}</div>}
          {project.takeaways?.length ? <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.05] p-5"><p className="text-xs text-white/40">INTERVIEW FOCUS</p><ul className="mt-3 grid gap-2 md:grid-cols-2">{project.takeaways.map((item) => <li key={item} className="text-sm font-light leading-relaxed text-white/70">· {item}</li>)}</ul></div> : null}
          {project.resources?.length ? <div className="mt-4 grid gap-3 sm:grid-cols-3">{project.resources.map((resource) => {
            const href = resource.href === "#xuanzhi-ppt" ? "/portfolio/xuanzhi-presentation.pdf" : resource.href;
            return <a key={resource.href} href={href} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm transition hover:bg-white/[0.12]"><span className="font-medium">{resource.label}</span>{resource.note && <span className="mt-1 block text-xs text-white/45">{resource.note}</span>}</a>;
          })}</div> : null}
          {project.fullLayout && <details className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-white/[0.05]"><summary className="cursor-pointer px-5 py-4 text-sm">展开 / 收起完整版长图</summary><img src={project.fullLayout.src} alt={project.fullLayout.alt} className="h-auto w-full bg-[#f3f0ea] object-contain p-2" loading="lazy" /></details>}
        </article>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={onPrevious} className="liquid-glass flex min-h-14 items-center justify-start gap-2 rounded-lg px-4 text-sm"><ChevronLeft className="h-5 w-5" /> 上一个作品</button>
          <button type="button" onClick={onNext} className="liquid-glass flex min-h-14 items-center justify-end gap-2 rounded-lg px-4 text-sm">下一个作品 <ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </FadeIn>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => filter === "全部" ? projects : projects.filter((project) => projectFilter(project) === filter), [filter]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedIndex = projects.findIndex((project) => project.id === selectedId);
  const selected = selectedIndex >= 0 ? projects[selectedIndex] : null;

  useEffect(() => {
    const syncHash = () => {
      const match = window.location.hash.match(/^#project\/(.+)$/);
      setSelectedId(match && projects.some((project) => project.id === match[1]) ? match[1] : null);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const scrollTop = () => sectionRef.current?.closest(".horizontal-panel")?.scrollTo({ top: 0, behavior: "smooth" });
  const openProject = (id: string) => { setSelectedId(id); window.history.pushState(null, "", `#project/${id}`); scrollTop(); };
  const closeProject = () => { setSelectedId(null); window.history.pushState(null, "", "#projects"); scrollTop(); };
  const moveProject = (offset: number) => openProject(projects[(selectedIndex + offset + projects.length) % projects.length].id);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-full px-5 py-24 sm:px-8 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20 md:inset-x-16" />
      <AnimatePresence mode="wait" initial={false}>
      {selected ? <motion.div key={`detail-${selected.id}`} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.992 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.992 }} transition={appleSpring}><ProjectDetail project={selected} onBack={closeProject} onPrevious={() => moveProject(-1)} onNext={() => moveProject(1)} /></motion.div> : <motion.div key="project-index" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24, scale: 0.992 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24, scale: 0.992 }} transition={appleSpring}>
        <FadeIn as="h2" className="apple-title text-center text-[clamp(3.5rem,9vw,7.4rem)] font-semibold leading-[0.94]">Selected Work</FadeIn>
        <FadeIn as="p" className="cosmic-copy mx-auto mt-4 max-w-2xl text-center text-sm font-light leading-relaxed md:text-base">从缩略图快速浏览不同类型的作品，使用标签筛选方向，进入详情后可连续切换查看。</FadeIn>

        <FadeIn className="mx-auto mt-9 flex max-w-fit flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.055] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl" y={16}>
          {filters.map((item) => <motion.button key={item} type="button" onClick={() => { setFilter(item); setPage(1); }} whileTap={{ scale: 0.96 }} aria-pressed={filter === item} className="relative min-h-9 rounded-full px-3.5 text-sm text-white/60 transition-colors hover:text-white aria-pressed:text-black">{filter === item && <motion.span layoutId="active-project-filter" className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]" transition={appleSpring} />}<span className="relative z-10">{item}<span className="ml-1.5 text-xs opacity-55">{item === "全部" ? projects.length : projects.filter((project) => projectFilter(project) === item).length}</span></span></motion.button>)}
        </FadeIn>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${filter}-${page}`} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={appleSpring} className="mx-auto mt-8 grid max-w-[92rem] gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, index) => <FadeIn key={project.id} delay={index * 0.035} y={16} className="h-full"><PreviewCard project={project} onOpen={() => openProject(project.id)} /></FadeIn>)}
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto mt-8 flex max-w-[92rem] items-center justify-center gap-3">
          <button type="button" disabled={page === 1} onClick={() => { setPage((value) => value - 1); scrollTop(); }} aria-label="上一页" className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
          <span className="min-w-20 text-center text-sm text-white/60">{page} / {pageCount}</span>
          <button type="button" disabled={page === pageCount} onClick={() => { setPage((value) => value + 1); scrollTop(); }} aria-label="下一页" className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </motion.div>}
      </AnimatePresence>
    </section>
  );
}
