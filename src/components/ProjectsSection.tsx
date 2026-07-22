import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";
import { PortfolioImage, Project, projects } from "../content/projects";
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

function ProjectMedia({ media, className, eager = false }: { media: PortfolioImage; className?: string; eager?: boolean }) {
  const fit = media.fit === "contain" ? "object-contain" : "object-cover";
  if (media.type === "video") {
    return <video src={media.src} aria-label={media.alt} className={cn("h-full w-full bg-black", fit, className)} autoPlay loop muted playsInline preload="metadata" />;
  }
  return <img src={media.src} alt={media.alt} className={cn("h-full w-full", fit, className)} loading={eager ? "eager" : "lazy"} />;
}

function PreviewCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article layout className="project-card group flex h-full flex-col overflow-hidden rounded-lg bg-white/[0.055]" whileHover={{ y: -4 }} transition={appleSpring}>
      <button type="button" onClick={onOpen} className="relative block aspect-[16/11] w-full shrink-0 overflow-hidden text-left">
        <ProjectMedia media={project.hero} className="project-card-media bg-[#ece9e2] transition-transform duration-500 group-hover:scale-[1.018]" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white backdrop-blur-md">{projectFilter(project)}</span>
      </button>
      <div className="flex h-[10.5rem] shrink-0 items-end justify-between gap-5 p-5 sm:h-[8.875rem]">
        <div className="min-w-0">
          <p className="text-xs text-white/60">{project.category} · {project.year}</p>
          <h3 className="mt-2 text-wrap-balance text-lg font-medium leading-snug text-white">{project.name}</h3>
          <p className="mt-2 line-clamp-2 max-w-[62ch] text-sm leading-relaxed text-white/70">{project.role}</p>
        </div>
        <button type="button" onClick={onOpen} aria-label={`查看${project.name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}

function MediaFrame({ media, className }: { media: PortfolioImage; className?: string }) {
  const orientation = media.orientation ?? (media.height === "tall" ? "portrait" : "natural");
  return (
    <figure className={cn("group relative overflow-hidden rounded-lg bg-white/[0.045]", orientation === "portrait" && "mx-auto w-full max-w-2xl", className)}>
      <div className={cn(
        orientation === "landscape" && "aspect-video",
        orientation === "portrait" && "aspect-[3/4]",
        orientation === "panorama" && "aspect-[2/1]",
      )}>
        <ProjectMedia media={media} className="bg-[#ece9e2]" />
      </div>
      {media.caption && <figcaption className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[11px] text-white backdrop-blur-md">{media.caption}</figcaption>}
    </figure>
  );
}

function Gallery({ project }: { project: Project }) {
  if (!project.gallery.length) return null;
  const layout = project.galleryLayout ?? "default";
  return (
    <section className="mt-16 md:mt-24" aria-label="项目作品展示">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/15 pb-4">
        <h3 className="text-xl font-medium text-white sm:text-2xl">作品呈现</h3>
        <span className="text-sm text-white/50">{project.gallery.length} 项</span>
      </div>
      <div className={cn(
        "grid gap-4 md:gap-6",
        layout === "default" && "md:grid-cols-2",
        layout === "feature-left-stack-right" && "md:grid-cols-12",
        layout === "landscape-sequence" && "md:grid-cols-2",
        layout === "poster-grid" && "sm:grid-cols-2 lg:grid-cols-3",
      )}>
        {project.gallery.map((media, index) => (
          <MediaFrame
            key={media.src}
            media={media}
            className={cn(
              media.span === "wide" && "md:col-span-2",
              layout === "feature-left-stack-right" && index === 0 && "md:col-span-7 md:row-span-2",
              layout === "feature-left-stack-right" && index > 0 && "md:col-span-5",
              layout === "poster-grid" && media.orientation === "panorama" && "sm:col-span-2 lg:col-span-3",
            )}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectOverview({ project }: { project: Project }) {
  return (
    <header className="grid gap-8 border-b border-white/15 pb-10 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:gap-12 md:pb-14">
      <div>
        <p className="text-sm text-white/60">{project.category} · {project.year}</p>
        <h2 className="apple-title mt-4 max-w-[14ch] text-wrap-balance text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[1.02]">{project.name}</h2>
        <p className="cosmic-copy mt-6 max-w-[65ch] text-base leading-relaxed text-white/78 md:text-lg">{project.summary}</p>
      </div>
      <div className="flex flex-col justify-end gap-7">
        <div>
          <h3 className="text-sm font-medium text-white">我的职责</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/72">{project.role}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">项目成果</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
            {project.metrics.map((metric) => <li key={metric} className="border-t border-white/15 pt-2 text-sm leading-snug text-white/75">{metric}</li>)}
          </ul>
        </div>
        {project.liveUrl && <LiveProjectButton href={project.liveUrl} label={project.linkLabel} />}
      </div>
    </header>
  );
}

function HeroShowcase({ project }: { project: Project }) {
  const paired = project.detailLayout === "poster-pair" && project.heroSupport;
  return (
    <section className={cn("mt-10 md:mt-14", paired && "mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 md:gap-6")} aria-label="项目主视觉">
      <MediaFrame media={project.hero} className={cn(!paired && project.hero.height === "tall" && "max-w-3xl", !paired && project.hero.orientation !== "portrait" && "max-w-none")} />
      {paired && <MediaFrame media={project.heroSupport!} />}
      {!paired && project.heroSupport && <MediaFrame media={project.heroSupport} className="mt-4 md:mt-6" />}
    </section>
  );
}

function ProjectEvidence({ project }: { project: Project }) {
  if (!project.takeaways?.length) return null;
  return (
    <section className="mt-16 border-y border-white/15 py-8 md:mt-24 md:py-12">
      <h3 className="text-xl font-medium text-white sm:text-2xl">关键决策与贡献</h3>
      <ol className="mt-6 grid gap-5 md:grid-cols-3 md:gap-8">
        {project.takeaways.map((item, index) => (
          <li key={item} className="text-sm leading-relaxed text-white/72"><span className="mb-3 block text-xs text-white/40">0{index + 1}</span>{item}</li>
        ))}
      </ol>
    </section>
  );
}

function ProjectResources({ project }: { project: Project }) {
  if (!project.resources?.length && !project.fullLayout) return null;
  return (
    <section className="mt-16 md:mt-24">
      <h3 className="text-xl font-medium text-white sm:text-2xl">项目资料</h3>
      <div className="mt-5 flex flex-wrap gap-3">
        {project.resources?.map((resource) => (
          <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer" className="flex min-h-12 items-center gap-3 rounded-lg border border-white/20 px-4 py-3 text-sm text-white transition hover:bg-white/10">
            <span><span className="font-medium">{resource.label}</span>{resource.note && <span className="mt-0.5 block text-xs text-white/55">{resource.note}</span>}</span>
            <ExternalLink className="h-4 w-4 text-white/55" />
          </a>
        ))}
      </div>
      {project.fullLayout && (
        <details className="mt-5 border-t border-white/15">
          <summary className="flex cursor-pointer items-center justify-between py-5 text-sm font-medium text-white">查看完整项目长图 <span className="text-white/45">展开 / 收起</span></summary>
          <img src={project.fullLayout.src} alt={project.fullLayout.alt} className="h-auto w-full bg-[#ece9e2] object-contain" loading="lazy" />
        </details>
      )}
    </section>
  );
}

function ProjectDetail({ project, onBack, onPrevious, onNext }: { project: Project; onBack: () => void; onPrevious: () => void; onNext: () => void }) {
  return (
    <FadeIn key={project.id} y={24}>
      <div className="mx-auto max-w-[92rem]">
        <nav className="mb-10 flex items-center justify-between gap-3 md:mb-14" aria-label="作品导航">
          <motion.button type="button" onClick={onBack} whileTap={{ scale: 0.96 }} className="apple-control flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm text-white"><ArrowLeft className="h-4 w-4" /> 返回作品列表</motion.button>
          <div className="flex gap-2">
            <motion.button type="button" onClick={onPrevious} whileTap={{ scale: 0.92 }} title="上一个作品" aria-label="上一个作品" className="apple-control flex h-11 w-11 items-center justify-center rounded-full border border-white/20"><ChevronLeft className="h-5 w-5" /></motion.button>
            <motion.button type="button" onClick={onNext} whileTap={{ scale: 0.92 }} title="下一个作品" aria-label="下一个作品" className="apple-control flex h-11 w-11 items-center justify-center rounded-full border border-white/20"><ChevronRight className="h-5 w-5" /></motion.button>
          </div>
        </nav>

        <article>
          <ProjectOverview project={project} />
          <HeroShowcase project={project} />
          <ProjectEvidence project={project} />
          <Gallery project={project} />
          <ProjectResources project={project} />
        </article>

        <nav className="mt-20 grid grid-cols-2 border-t border-white/15 pt-5" aria-label="浏览其他作品">
          <button type="button" onClick={onPrevious} className="flex min-h-14 items-center justify-start gap-2 text-sm text-white/75 hover:text-white"><ChevronLeft className="h-5 w-5" /> 上一个作品</button>
          <button type="button" onClick={onNext} className="flex min-h-14 items-center justify-end gap-2 text-sm text-white/75 hover:text-white">下一个作品 <ChevronRight className="h-5 w-5" /></button>
        </nav>
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
    <section ref={sectionRef} className="relative z-10 min-h-full px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20 md:inset-x-16" />
      <AnimatePresence mode="wait" initial={false}>
        {selected ? (
          <motion.div key={`detail-${selected.id}`} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }} transition={appleSpring}>
            <ProjectDetail project={selected} onBack={closeProject} onPrevious={() => moveProject(-1)} onNext={() => moveProject(1)} />
          </motion.div>
        ) : (
          <motion.div key="project-index" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }} transition={appleSpring}>
            <FadeIn as="h2" className="apple-title text-center text-[clamp(3.5rem,9vw,6rem)] font-semibold leading-[0.94]">Selected Work</FadeIn>
            <FadeIn as="p" className="cosmic-copy mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/72 md:text-base">从代表项目快速了解我的职责、创作判断与实际成果。</FadeIn>

            <FadeIn className="mx-auto mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-2" y={16}>
              {filters.map((item) => <motion.button key={item} type="button" onClick={() => { setFilter(item); setPage(1); }} whileTap={{ scale: 0.96 }} aria-pressed={filter === item} className="relative min-h-10 rounded-full border border-white/15 px-4 text-sm text-white/65 transition-colors hover:text-white aria-pressed:border-white aria-pressed:bg-white aria-pressed:text-black">{item}<span className="ml-2 text-xs opacity-55">{item === "全部" ? projects.length : projects.filter((project) => projectFilter(project) === item).length}</span></motion.button>)}
            </FadeIn>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${filter}-${page}`} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={appleSpring} className="mx-auto mt-10 grid max-w-[92rem] gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((project, index) => <FadeIn key={project.id} delay={index * 0.035} y={16} className="h-full"><PreviewCard project={project} onOpen={() => openProject(project.id)} /></FadeIn>)}
              </motion.div>
            </AnimatePresence>

            <div className="mx-auto mt-10 flex max-w-[92rem] items-center justify-center gap-3">
              <button type="button" disabled={page === 1} onClick={() => { setPage((value) => value - 1); scrollTop(); }} aria-label="上一页" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
              <span className="min-w-20 text-center text-sm text-white/60">{page} / {pageCount}</span>
              <button type="button" disabled={page === pageCount} onClick={() => { setPage((value) => value + 1); scrollTop(); }} aria-label="下一页" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
