import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LiveProjectButton } from "./LiveProjectButton";
import { FadeIn } from "./FadeIn";
import { Project, projects } from "../content/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

function ProjectCard({ project, index, total }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="relative h-auto py-8 md:h-[85vh]">
      <motion.article
        className="sticky top-20 overflow-hidden rounded-[32px] border-2 border-mist bg-ink p-4 sm:top-24 sm:rounded-[44px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          top: `calc(5rem + ${index * 28}px)`,
        }}
      >
        <div className="grid gap-6 pb-6 md:grid-cols-[0.32fr_0.28fr_1fr_auto] md:items-end md:gap-7 md:pb-8">
          <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-mist">
            {project.number}
          </span>
          <p className="text-sm font-medium uppercase tracking-widest text-mist/70 sm:text-base">
            {project.category}
          </p>
          <h3 className="text-[clamp(2rem,5vw,5.4rem)] font-black uppercase leading-none tracking-tight text-mist">
            {project.name}
          </h3>
          <LiveProjectButton href={project.liveUrl} />
        </div>

        <div className="grid gap-4 md:grid-cols-[0.4fr_0.6fr]">
          <div className="grid gap-4">
            <img
              src={project.images.leftTop.src}
              alt={project.images.leftTop.alt}
              className="h-[clamp(130px,16vw,230px)] w-full rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[52px]"
              loading="lazy"
            />
            <img
              src={project.images.leftBottom.src}
              alt={project.images.leftBottom.alt}
              className="h-[clamp(160px,22vw,340px)] w-full rounded-[28px] object-cover sm:rounded-[40px] md:rounded-[52px]"
              loading="lazy"
            />
          </div>
          <img
            src={project.images.featured.src}
            alt={project.images.featured.alt}
            className="h-[360px] w-full rounded-[28px] object-cover sm:h-[520px] sm:rounded-[40px] md:h-full md:min-h-[520px] md:rounded-[52px]"
            loading="lazy"
          />
        </div>
      </motion.article>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn as="h2" className="hero-heading mb-14 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20">
        Project
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
