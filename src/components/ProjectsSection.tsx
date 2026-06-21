import { LiveProjectButton } from "./LiveProjectButton";
import { FadeIn } from "./FadeIn";
import { PortfolioImage, Project, projects } from "../content/portfolio";
import { cn } from "../lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

type ProjectMediaProps = {
  media: PortfolioImage;
  className?: string;
};

function ProjectMedia({ media, className }: ProjectMediaProps) {
  const fitClass =
    media.fit === "contain"
      ? "object-contain bg-[#f3f0ea]"
      : "object-cover";

  if (media.type === "video") {
    return (
      <video
        src={media.src}
        aria-label={media.alt}
        className={cn("glass-media h-full w-full", fitClass, className)}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={media.src}
      alt={media.alt}
      className={cn("glass-media h-full w-full", fitClass, className)}
      loading="lazy"
    />
  );
}

function MediaFrame({
  media,
  variant = "gallery",
}: {
  media: PortfolioImage;
  variant?: "hero" | "gallery";
}) {
  const isWide = media.span === "wide";

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035]",
        variant === "hero"
          ? "h-[clamp(420px,56vw,760px)]"
          : "h-[clamp(260px,34vw,440px)]",
        isWide && variant === "gallery" ? "md:col-span-2" : "",
      )}
    >
      <ProjectMedia media={media} />
      {media.caption ? (
        <figcaption className="absolute left-3 top-3 rounded-full bg-black/42 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ProjectResources({ resources }: { resources?: Project["resources"] }) {
  if (!resources?.length) {
    return null;
  }

  return (
    <div className="liquid-glass rounded-[1.25rem] p-5">
      <p className="text-xs uppercase text-white/45">Materials</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {resources.map((resource) => {
          const isPageJump = resource.href.startsWith("#");

          return (
            <a
              key={resource.href}
              href={resource.href}
              target={isPageJump ? undefined : "_blank"}
              rel={isPageJump ? undefined : "noreferrer"}
              className="group rounded-[1rem] border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/[0.12]"
            >
              <span className="block font-medium">{resource.label}</span>
              {resource.note ? (
                <span className="mt-1 block text-xs text-white/48 transition group-hover:text-white/70">
                  {resource.note}
                </span>
              ) : null}
            </a>
          );
        })}
      </div>
    </div>
  );
}
function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <FadeIn delay={index * 0.08} y={36}>
      <article id={project.id} className="liquid-glass scroll-mt-24 overflow-hidden rounded-[1.25rem] p-4 sm:p-6 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.45fr)] lg:items-stretch">
          <MediaFrame media={project.hero} variant="hero" />

          <div className="flex min-w-0 flex-col gap-6 rounded-[1.25rem] bg-black/14 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-5">
              <span className="font-heading text-[clamp(3.4rem,8vw,7rem)] italic leading-none text-white">
                {project.number}
              </span>
              <div className="flex flex-col items-end gap-2 pt-2">
                <p className="liquid-glass w-fit rounded-full px-3 py-1 text-xs font-light text-white/80">
                  {project.category}
                </p>
                <p className="text-xs font-light uppercase text-white/45">
                  {project.year}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-[clamp(2.4rem,4.6vw,4.8rem)] italic leading-[0.94] text-white">
                {project.name}
              </h3>
              <p className="cosmic-copy mt-5 text-sm font-light leading-relaxed md:text-base">
                {project.summary}
              </p>
            </div>

            <div className="mt-auto space-y-5">
              <div>
                <p className="text-xs uppercase text-white/45">Role</p>
                <p className="cosmic-copy mt-2 text-sm font-light leading-relaxed">
                  {project.role}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/78"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="liquid-glass rounded-full px-3 py-1 text-xs text-white/82"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <LiveProjectButton href={project.liveUrl} label={project.linkLabel} />

              <ProjectResources resources={project.resources} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {project.gallery.map((media) => (
            <MediaFrame key={`${project.id}-${media.src}`} media={media} />
          ))}
        </div>
      </article>
    </FadeIn>
  );
}

function XuanzhiPptSection() {
  return (
    <FadeIn y={36}>
      <article
        id="xuanzhi-ppt"
        className="mx-auto mt-10 max-w-[92rem] scroll-mt-24 overflow-hidden rounded-[1.25rem] border border-white/12 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 md:p-8"
      >
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Presentation</p>
            <h3 className="mt-3 font-heading text-[clamp(2.4rem,5vw,5rem)] italic leading-[0.95] text-white">
              《悬置》PPT
            </h3>
            <p className="cosmic-copy mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/72">
              这里嵌入课程 PPT，点击悬置板块里的 PPT 入口会跳转到这里；看完后可以用右侧按钮返回悬置项目。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#xuanzhi-ai-short-film"
              className="rounded-full border border-white/18 bg-white/10 px-5 py-2 text-sm text-white transition hover:border-white/38 hover:bg-white/16"
            >
              返回悬置板块
            </a>
            <a
              href="/portfolio/xuanzhi-presentation.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-2 text-sm text-black transition hover:bg-white/82"
            >
              新窗口打开 PPT
            </a>
          </div>
        </div>
        <object
          data="/portfolio/xuanzhi-presentation.pdf#toolbar=1"
          type="application/pdf"
          className="h-[72dvh] min-h-[520px] w-full rounded-[1rem] bg-black/35"
        >
          <div className="rounded-[1rem] border border-white/12 bg-black/30 p-6 text-sm text-white/72">
            浏览器暂时无法内嵌显示 PDF，可以点击上方“新窗口打开 PPT”查看。
          </div>
        </object>
      </article>
    </FadeIn>
  );
}
export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20 md:inset-x-16" />
      <FadeIn
        as="h2"
        className="cosmic-heading mb-5 pb-2 text-center text-[clamp(4.2rem,12vw,9.5rem)] leading-[0.9]"
      >
        Selected Work
      </FadeIn>
      <FadeIn
        as="p"
        className="cosmic-copy mx-auto mb-14 max-w-2xl text-center text-sm font-light leading-relaxed sm:mb-20 md:text-base"
      >
        这里不是把作品一张张贴上来，而是按面试官最容易理解的方式展示：我做了什么、为什么这样做、用了哪些工具、最终留下了什么结果。
      </FadeIn>
      <div className="mx-auto grid max-w-[92rem] gap-8 md:gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
      <XuanzhiPptSection />
    </section>
  );
}

