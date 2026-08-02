import { experiences } from "../content/site";
import { FadeIn } from "./FadeIn";

export function ExperienceSection({ content = experiences }: { content?: typeof experiences }) {
  const groups = [
    { type: "工作", title: "工作经历", items: content.filter((item) => item.type === "工作") },
    { type: "实习", title: "实习经历", items: content.filter((item) => item.type === "实习") },
  ] as const;
  return (
    <section className="relative min-h-full px-5 py-24 sm:px-8 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20 md:inset-x-16" />
      <div className="mx-auto max-w-7xl">
        <FadeIn as="h2" className="cosmic-heading pb-2 text-center text-[clamp(3rem,8vw,7.5rem)] leading-[0.9]">
          Work Experience
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-5xl gap-14">
          {groups.map((group) => group.items.length > 0 && <section key={group.type} aria-label={group.title}><FadeIn as="h3" className="mb-5 text-sm font-medium text-white/50">{group.title}</FadeIn><div className="border-t border-white/18">{group.items.map((experience, index) => <FadeIn key={`${experience.period}-${experience.role}`} immediate delay={index * 0.08} className="border-b border-white/18 py-7 md:py-9"><div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8"><div className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><h4 className="font-heading text-3xl italic leading-[1.1] text-white sm:text-4xl">{experience.role}</h4><p className="text-sm text-white/48">{experience.organization}</p></div><time className="shrink-0 text-sm font-medium text-white/72">{experience.period}</time></div><p className="mt-4 max-w-3xl text-sm font-light leading-relaxed text-white/68 sm:text-base">{experience.description}</p>{experience.highlights.length > 0 && <ul className="mt-5 flex flex-wrap gap-2" aria-label="关键词">{experience.highlights.map((item) => <li key={item} className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/72">{item}</li>)}</ul>}</FadeIn>)}</div></section>)}
        </div>
      </div>
    </section>
  );
}
