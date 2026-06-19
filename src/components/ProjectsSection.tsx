import { LiveProjectButton } from "./LiveProjectButton";
import { FadeIn } from "./FadeIn";
import { PortfolioImage, Project, projects } from "../content/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

type ProjectMediaProps = {
  media: PortfolioImage;
  className: string;
};

function ProjectMedia({ media, className }: ProjectMediaProps) {
  if (media.type === "video") {
    return (
      <video
        src={media.src}
        aria-label={media.alt}
        className={className}
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
      className={className}
      loading="lazy"
    />
  );
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <FadeIn delay={index * 0.08} y={36}>
      <article
        className="liquid-glass overflow-hidden rounded-[1.25rem] p-4 sm:p-6 md:p-8"
      >
        <div className="grid gap-5 pb-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-end md:gap-7 md:pb-8">
          <span className="font-heading text-[clamp(3.2rem,9vw,8rem)] italic leading-none text-white">
            {project.number}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="liquid-glass w-fit rounded-full px-3 py-1 text-xs font-light text-white/80 sm:text-sm">
                {project.category}
              </p>
              <p className="text-xs font-light uppercase text-white/45">{project.year}</p>
            </div>
            <h3 className="mt-3 font-heading text-[clamp(2.5rem,5.6vw,5.5rem)] italic leading-[0.92] text-white">
              {project.name}
            </h3>
          </div>
          <LiveProjectButton href={project.liveUrl} label={project.linkLabel} />
          </div>

        <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="grid gap-4">
            <ProjectMedia
              media={project.images.leftTop}
              className="glass-media h-[clamp(130px,16vw,230px)] w-full rounded-[1.25rem] object-cover"
            />
            <div className="liquid-glass rounded-[1.25rem] p-5">
              <p className="text-xs uppercase text-white/45">Role</p>
              <p className="cosmic-copy mt-3 text-sm font-light leading-relaxed">
                {project.role}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/78"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ProjectMedia
              media={project.images.leftBottom}
              className="glass-media h-[clamp(160px,22vw,340px)] w-full rounded-[1.25rem] object-cover"
            />
          </div>
          <div className="grid gap-4">
            <ProjectMedia
              media={project.images.featured}
              className="glass-media h-[360px] w-full rounded-[1.25rem] object-cover sm:h-[520px] lg:h-[560px]"
            />
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <p className="cosmic-copy max-w-3xl text-sm font-light leading-relaxed md:text-base">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 md:max-w-[320px] md:justify-end">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="liquid-glass rounded-full px-3 py-1 text-xs text-white/82"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
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
      <div className="mx-auto grid max-w-7xl gap-8 md:gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
