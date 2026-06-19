import { ArrowUpRight } from "lucide-react";
import { AudioToggle } from "./AudioToggle";
import { ContactButton } from "./ContactButton";
import { FadeIn } from "./FadeIn";
import { BlurText } from "./BlurText";
import { navLinks, profile } from "../content/portfolio";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <FadeIn
        as="nav"
        immediate
        y={-20}
        className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <a
            href="#"
            aria-label={`${profile.name} home`}
            className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full font-heading text-3xl italic leading-none text-white"
          >
            {profile.name.charAt(0).toLowerCase()}
          </a>

          <ul className="liquid-glass hidden items-center gap-1 rounded-full px-1.5 py-1.5 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="block whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-white/90 transition duration-200 hover:bg-white/10 hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <AudioToggle />
        </div>
      </FadeIn>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center mist-readable">
        <FadeIn
          immediate
          delay={0.35}
          y={20}
          className="liquid-glass mb-5 flex w-full max-w-[16rem] flex-wrap items-center justify-center gap-2 rounded-[1.25rem] px-2 py-1 sm:inline-flex sm:w-auto sm:max-w-full sm:flex-nowrap sm:rounded-full"
        >
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
            Portfolio
          </span>
          <span className="min-w-0 basis-full whitespace-normal px-2 text-center text-xs font-light text-white/90 sm:basis-auto sm:pr-3 sm:text-sm">
            AIGC Creative / Content Ops / Visual Design
          </span>
        </FadeIn>

        <BlurText
          text={profile.heroTitle}
          className="cosmic-heading max-w-3xl justify-center pb-1 text-[clamp(5rem,17vw,9rem)] leading-[0.82]"
        />

        <FadeIn
          as="p"
          immediate
          delay={0.75}
          y={20}
          className="cosmic-copy mt-5 w-full max-w-xs text-sm font-light leading-tight sm:max-w-2xl md:text-base"
        >
          {profile.heroDescription}
        </FadeIn>

        <FadeIn
          immediate
          delay={1}
          y={18}
          className="mt-7 flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:max-w-full sm:flex-row sm:flex-wrap"
        >
          <ContactButton />
          <a
            href={profile.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-white/10 active:scale-[0.98]"
          >
            下载 PDF 作品集
            <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
          </a>
          <a
            href="#projects"
            className="liquid-glass inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-white/10 active:scale-[0.98]"
          >
            View Projects
            <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
          </a>
        </FadeIn>
      </div>

      <FadeIn
        immediate
        delay={1.2}
        y={18}
        className="relative z-10 flex flex-col items-center gap-4 px-5 pb-8 text-center mist-readable"
      >
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
          {profile.availability}
        </span>
        <div className="grid max-w-sm grid-cols-2 justify-center gap-x-10 gap-y-3 font-heading text-2xl italic leading-none text-white sm:flex sm:max-w-full sm:flex-wrap md:gap-x-14 md:text-3xl">
          <span>AIGC</span>
          <span>Content</span>
          <span>Visual</span>
          <span>Motion</span>
        </div>
      </FadeIn>
    </section>
  );
}
