import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";
import { PortfolioImage, Project } from "../content/projects";
import { ProjectBlocks } from "./ProjectBlocks";
import { cn } from "../lib/utils";

const PAGE_SIZE = 6;
const appleSpring = { type: "spring", bounce: 0, duration: 0.42 } as const;
const filters = ["全部", "AIGC", "品牌视觉", "视觉设计", "内容运营", "插画"] as const;

function projectPeriod(project: Project) {
  if (!project.startDate) return project.year ?? "";
  return `${project.startDate.replace("-", ".")} — ${project.endDate ? project.endDate.replace("-", ".") : "至今"}`;
}

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
    <motion.article layout className="project-card liquid-glass group flex h-full flex-col overflow-hidden rounded-lg" whileHover={{ y: -4 }} transition={appleSpring}>
      <button type="button" onClick={onOpen} className="relative block aspect-[16/11] w-full shrink-0 overflow-hidden text-left">
        <ProjectMedia media={project.hero} className="project-card-media bg-black transition-transform duration-500 group-hover:scale-[1.018]" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white backdrop-blur-md">{projectFilter(project)}</span>
      </button>
      <div className="flex h-[10.5rem] shrink-0 items-end justify-between gap-5 p-5 sm:h-[8.875rem]">
        <div className="min-w-0">
          <p className="text-xs text-white/60">{project.category} · {projectPeriod(project)}</p>
          <h3 className="mt-2 text-wrap-balance text-lg font-medium leading-snug text-white">{project.name}</h3>
          <p className="mt-2 line-clamp-2 max-w-[62ch] text-sm leading-relaxed text-white/70">{project.summary}</p>
        </div>
        <button type="button" onClick={onOpen} aria-label={`查看${project.name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}

function MediaFrame({ media, className, onOpen }: { media: PortfolioImage; className?: string; onOpen?: () => void }) {
  const orientation = media.orientation ?? (media.height === "tall" ? "portrait" : "natural");
  const mediaClassName = cn(
    orientation === "landscape" && "aspect-video",
    orientation === "portrait" && "aspect-[3/4]",
    orientation === "panorama" && "aspect-[2/1]",
  );
  const content = (
    <div className={mediaClassName}>
      <ProjectMedia media={media} className="bg-[#ece9e2]" />
    </div>
  );

  return (
    <figure className={cn("glass-media-frame group relative w-full overflow-hidden rounded-lg", className)}>
      {onOpen && media.type !== "video" ? (
        <button type="button" onClick={onOpen} aria-label={`放大查看${media.caption ?? media.alt}`} className="relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white">
          {content}
          <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white opacity-80 backdrop-blur-md transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" />
          </span>
        </button>
      ) : content}
      {media.caption && <figcaption className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[11px] text-white backdrop-blur-md">{media.caption}</figcaption>}
    </figure>
  );
}

function Gallery({ project, onOpen }: { project: Project; onOpen: (media: PortfolioImage) => void }) {
  if (!project.gallery.length) return null;
  const columns = project.gallery.length > 4 ? "sm:columns-2 lg:columns-3" : "sm:columns-2";
  const renderMedia = (media: PortfolioImage, className?: string) => (
    <MediaFrame key={media.src} media={media} className={className} onOpen={media.type === "video" ? undefined : () => onOpen(media)} />
  );

  return (
    <section className="mt-16 md:mt-24" aria-label="项目作品展示">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h3 className="text-xl font-medium text-white sm:text-2xl">作品呈现</h3>
        <span className="text-sm text-white/50">{project.gallery.length} 项</span>
      </div>
      {project.galleryLayout === "feature-poster" ? (
        <div className="grid gap-4 sm:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] md:gap-6">
          {renderMedia(project.gallery[0])}
          <div className="grid content-start gap-4 md:gap-6">
            {project.gallery.slice(1).map((media) => renderMedia(media))}
          </div>
        </div>
      ) : project.galleryLayout === "sequence-grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          {project.gallery.map((media, index) => renderMedia(media, index === project.gallery.length - 1 ? "sm:col-span-2" : undefined))}
        </div>
      ) : (
        <div className={cn("columns-1 gap-4 md:gap-6", columns)}>
          {project.gallery.map((media) => renderMedia(media, "mb-4 inline-block w-full break-inside-avoid md:mb-6"))}
        </div>
      )}
    </section>
  );
}

function ProjectOverview({ project }: { project: Project }) {
  return (
    <header className="grid gap-8 border-b border-white/15 pb-10 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:gap-12 md:pb-14">
      <div>
        <p className="text-sm text-white/60">{project.category} · {projectPeriod(project)}</p>
        <h2 className="apple-title mt-4 max-w-[14ch] text-wrap-balance text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[1.02]">{project.name}</h2>
        <p className="cosmic-copy mt-6 max-w-[65ch] text-base leading-relaxed text-white/78 md:text-lg">{project.summary}</p>
      </div>
      <div className="flex flex-col justify-end gap-5">
        <div className="liquid-glass project-taxonomy-panel rounded-lg p-4">
          <div className="project-taxonomy-row"><span>类别</span><strong style={{ "--taxonomy-color": project.categoryColor ?? "#dce2e8" } as React.CSSProperties}><i />{project.category}</strong></div>
          <div className="project-taxonomy-row is-tags"><span>标签</span><div>{project.tags.map((tag) => <em key={tag} style={{ "--taxonomy-color": project.tagColors?.[tag] ?? "#dce2e8" } as React.CSSProperties}>{tag}</em>)}</div></div>
        </div>
        {project.liveUrl && <LiveProjectButton href={project.liveUrl} label={project.linkLabel} />}
      </div>
    </header>
  );
}

function HeroShowcase({ project, onOpen }: { project: Project; onOpen: (media: PortfolioImage) => void }) {
  const paired = project.detailLayout === "poster-pair" && project.heroSupport;
  return (
    <section className={cn("mt-10 md:mt-14", paired && "grid gap-4 sm:grid-cols-2 md:gap-6")} aria-label="项目主视觉">
      <MediaFrame media={project.hero} onOpen={project.hero.type === "video" ? undefined : () => onOpen(project.hero)} />
      {paired && <MediaFrame media={project.heroSupport!} onOpen={() => onOpen(project.heroSupport!)} />}
      {!paired && project.heroSupport && <MediaFrame media={project.heroSupport} onOpen={() => onOpen(project.heroSupport!)} className="mt-4 md:mt-6" />}
    </section>
  );
}

function ProjectEvidence({ project }: { project: Project }) {
  if (!project.takeaways?.length) return null;
  return (
    <section className="mt-16 md:mt-24">
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
  if (!project.resources?.length) return null;
  return (
    <section className="mt-16 md:mt-24">
      <h3 className="text-xl font-medium text-white sm:text-2xl">项目资料</h3>
      <div className="mt-5 flex flex-wrap gap-3">
        {project.resources?.map((resource) => (
          <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer" className="liquid-glass apple-control flex min-h-12 items-center gap-3 rounded-lg px-4 py-3 text-sm text-white">
            <span><span className="font-medium">{resource.label}</span>{resource.note && <span className="mt-0.5 block text-xs text-white/55">{resource.note}</span>}</span>
            <ExternalLink className="h-4 w-4 text-white/55" />
          </a>
        ))}
      </div>
    </section>
  );
}

function ImageLightbox({ images, index, onChange, onClose }: { images: PortfolioImage[]; index: number; onChange: (index: number) => void; onClose: () => void }) {
  const media = images[index];
  const move = (offset: number) => onChange((index + offset + images.length) % images.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && images.length > 1) move(-1);
      if (event.key === "ArrowRight" && images.length > 1) move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="作品图片放大查看"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 px-4 py-20 sm:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <button type="button" onClick={onClose} autoFocus aria-label="关闭图片查看" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 sm:right-6 sm:top-6">
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="查看上一张图片" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 sm:left-6">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="查看下一张图片" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 sm:right-6">
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <motion.img
        key={media.src}
        src={media.src}
        alt={media.alt}
        className="max-h-[calc(100dvh-10rem)] max-w-full object-contain"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      />

      <div className="pointer-events-none absolute inset-x-16 bottom-5 flex items-center justify-center gap-3 text-center text-sm text-white/75 sm:bottom-7">
        <span>{media.caption ?? media.alt}</span>
        <span className="text-white/45">{index + 1} / {images.length}</span>
      </div>
    </motion.div>,
    document.body,
  );
}

export function ProjectDetail({ project, onBack, onPrevious, onNext }: { project: Project; onBack: () => void; onPrevious: () => void; onNext: () => void }) {
  const images = [project.hero, ...(project.heroSupport ? [project.heroSupport] : []), ...project.gallery].filter((media) => media.type !== "video");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openMedia = (media: PortfolioImage) => {
    const index = images.findIndex((image) => image.src === media.src);
    if (index >= 0) setLightboxIndex(index);
  };

  return (
    <>
      <FadeIn key={project.id} y={24}>
        <div className="project-page-width mx-auto">
          <nav className="mb-10 flex items-center justify-between gap-3 md:mb-14" aria-label="作品导航">
            <motion.button type="button" onClick={onBack} whileTap={{ scale: 0.96 }} className="liquid-glass apple-control flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-white"><ArrowLeft className="h-4 w-4" /> 返回作品列表</motion.button>
            <div className="flex gap-2">
              <motion.button type="button" onClick={onPrevious} whileTap={{ scale: 0.92 }} title="上一个作品" aria-label="上一个作品" className="liquid-glass apple-control flex h-11 w-11 items-center justify-center rounded-full"><ChevronLeft className="h-5 w-5" /></motion.button>
              <motion.button type="button" onClick={onNext} whileTap={{ scale: 0.92 }} title="下一个作品" aria-label="下一个作品" className="liquid-glass apple-control flex h-11 w-11 items-center justify-center rounded-full"><ChevronRight className="h-5 w-5" /></motion.button>
            </div>
          </nav>

          <article>
            <ProjectOverview project={project} />
            {project.blocks?.length ? <ProjectBlocks blocks={project.blocks} /> : <>
              <HeroShowcase project={project} onOpen={openMedia} />
              <ProjectEvidence project={project} />
              <Gallery project={project} onOpen={openMedia} />
            </>}
            <ProjectResources project={project} />
          </article>

          <nav className="mt-20 grid grid-cols-2 gap-2 border-t border-white/15 pt-5" aria-label="浏览其他作品">
            <button type="button" onClick={onPrevious} className="liquid-glass apple-control flex min-h-14 items-center justify-start gap-2 rounded-lg px-4 text-sm text-white/75 hover:text-white"><ChevronLeft className="h-5 w-5" /> 上一个作品</button>
            <button type="button" onClick={onNext} className="liquid-glass apple-control flex min-h-14 items-center justify-end gap-2 rounded-lg px-4 text-sm text-white/75 hover:text-white">下一个作品 <ChevronRight className="h-5 w-5" /></button>
          </nav>
        </div>
      </FadeIn>
      <AnimatePresence>{lightboxIndex !== null && <ImageLightbox images={images} index={lightboxIndex} onChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} />}</AnimatePresence>
    </>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => filter === "全部" ? projects : projects.filter((project) => projectFilter(project) === filter), [filter, projects]);
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
  }, [projects]);

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
            <FadeIn as="h2" className="cosmic-heading mx-auto pb-2 text-center text-[clamp(4rem,9vw,7.5rem)] leading-[0.9]">Selected Work</FadeIn>

            <FadeIn className="mx-auto mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-2" y={16}>
              {filters.map((item) => <motion.button key={item} type="button" onClick={() => { setFilter(item); setPage(1); }} whileTap={{ scale: 0.96 }} aria-pressed={filter === item} className="liquid-glass apple-control relative min-h-10 rounded-full px-4 text-sm text-white/65 hover:text-white aria-pressed:bg-white aria-pressed:text-black">{item}<span className="ml-2 text-xs opacity-55">{item === "全部" ? projects.length : projects.filter((project) => projectFilter(project) === item).length}</span></motion.button>)}
            </FadeIn>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${filter}-${page}`} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={appleSpring} className="mx-auto mt-10 grid max-w-[92rem] gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((project, index) => <FadeIn key={project.id} delay={index * 0.035} y={16} className="h-full"><PreviewCard project={project} onOpen={() => openProject(project.id)} /></FadeIn>)}
              </motion.div>
            </AnimatePresence>

            <div className="mx-auto mt-10 flex max-w-[92rem] items-center justify-center gap-3">
              <button type="button" disabled={page === 1} onClick={() => { setPage((value) => value - 1); scrollTop(); }} aria-label="上一页" className="liquid-glass apple-control flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
              <span className="min-w-20 text-center text-sm text-white/60">{page} / {pageCount}</span>
              <button type="button" disabled={page === pageCount} onClick={() => { setPage((value) => value + 1); scrollTop(); }} aria-label="下一页" className="liquid-glass apple-control flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
