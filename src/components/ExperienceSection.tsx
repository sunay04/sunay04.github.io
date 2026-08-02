import { BriefcaseBusiness } from "lucide-react";
import { experiences } from "../content/site";
import { FadeIn } from "./FadeIn";

export function ExperienceSection({ content = experiences }: { content?: typeof experiences }) {
  return (
    <section className="relative min-h-full px-5 py-24 sm:px-8 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20 md:inset-x-16" />
      <div className="mx-auto max-w-7xl">
        <FadeIn as="h2" className="cosmic-heading pb-2 text-center text-[clamp(3rem,8vw,7.5rem)] leading-[0.9]">
          Work Experience
        </FadeIn>

        <div className="mx-auto mt-10 max-w-5xl border-t border-white/18">
          {content.map((experience, index) => (
            <FadeIn key={`${experience.period}-${experience.role}`} immediate delay={index * 0.08} className="grid gap-5 border-b border-white/18 py-7 md:grid-cols-[11rem_1fr] md:gap-10 md:py-9">
              <div>
                <p className="text-sm font-medium text-white/85">{experience.period}</p>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/55">
                  <BriefcaseBusiness aria-hidden className="h-3.5 w-3.5" />
                  {experience.type}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-heading text-3xl italic leading-[1.1] text-white sm:text-4xl">{experience.role}</h3>
                  <p className="text-sm text-white/48">{experience.organization}</p>
                </div>
                <p className="mt-4 max-w-3xl text-sm font-light leading-relaxed text-white/68 sm:text-base">{experience.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="工作内容">
                  {experience.highlights.map((item) => (
                    <li key={item} className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/72">{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
