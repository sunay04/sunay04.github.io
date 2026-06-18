import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./ContactButton";
import { FadeIn } from "./FadeIn";
import { decorativeAssets, profile } from "../content/portfolio";
import { cn } from "../lib/utils";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-ink px-5 py-20 sm:px-8 md:px-10"
    >
      {decorativeAssets.map((asset) => (
        <FadeIn
          key={asset.src}
          delay={asset.motion.delay}
          x={asset.motion.x}
          y={asset.motion.y}
          duration={asset.motion.duration}
          className={cn("pointer-events-none absolute z-0 hidden select-none sm:block", asset.className)}
        >
          <img src={asset.src} alt={asset.alt} className="h-auto w-full" loading="lazy" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn as="h2" y={40} className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
          {profile.aboutTitle}
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={profile.about}
            className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-mist"
          />
          <FadeIn delay={0.25} y={24}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
