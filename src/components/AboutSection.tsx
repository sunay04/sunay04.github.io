import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./ContactButton";
import { FadeIn } from "./FadeIn";
import { profile } from "../content/portfolio";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[90dvh] items-center justify-center overflow-hidden px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-1/2 top-0 h-px w-[85vw] -translate-x-1/2 bg-white/20" />
        <div className="absolute left-[-10%] top-[20%] h-[40rem] w-[40rem] rounded-full border border-white/10" />
        <div className="absolute bottom-[-20%] right-[-12%] h-[34rem] w-[34rem] rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          y={40}
          className="cosmic-heading pb-2 text-[clamp(4.4rem,13vw,10rem)] leading-[0.9]"
        >
          {profile.aboutTitle}
        </FadeIn>
        <div className="liquid-glass flex flex-col items-center gap-12 rounded-[1.25rem] px-6 py-8 sm:px-10 sm:py-12 md:gap-14">
          <p className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase text-black">
            {profile.title}
          </p>
          <AnimatedText
            text={profile.about}
            className="cosmic-copy max-w-[620px] text-center text-[clamp(1rem,2vw,1.35rem)] font-light leading-relaxed"
          />
          <div className="flex flex-wrap justify-center gap-2 text-xs text-white/78">
            <span className="liquid-glass rounded-full px-3 py-1">Figma</span>
            <span className="liquid-glass rounded-full px-3 py-1">PS / PR / 剪映</span>
            <span className="liquid-glass rounded-full px-3 py-1">Midjourney</span>
            <span className="liquid-glass rounded-full px-3 py-1">即梦 / 可灵 / 豆包</span>
            <span className="liquid-glass rounded-full px-3 py-1">Blender / 3ds Max</span>
          </div>
          <FadeIn delay={0.25} y={24}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
