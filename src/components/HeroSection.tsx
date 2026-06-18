import { ContactButton } from "./ContactButton";
import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { navLinks, profile } from "../content/portfolio";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-x-clip bg-ink">
      <FadeIn
        as="nav"
        immediate
        y={-20}
        className="relative z-20 px-6 pt-6 md:px-10 md:pt-8"
      >
        <ul className="flex items-center justify-between gap-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                className="block whitespace-nowrap text-sm font-medium uppercase tracking-wider text-mist transition duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn
        as="div"
        immediate
        delay={0.15}
        y={40}
        className="relative z-0 mt-8 overflow-hidden sm:mt-5 md:-mt-2"
      >
        <h1 className="hero-heading w-full whitespace-nowrap text-center text-[13vw] font-black uppercase leading-none tracking-tight sm:text-[14vw] md:text-[15.5vw] lg:text-[16.8vw]">
          {profile.heroTitle}
        </h1>
      </FadeIn>

      <FadeIn
        immediate
        delay={0.6}
        y={30}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
      >
        <Magnet
          padding={150}
          strength={3}
          className="pointer-events-auto"
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            className="h-auto w-full select-none object-contain"
            draggable="false"
            loading="eager"
          />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          immediate
          delay={0.35}
          y={20}
          className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[220px] md:max-w-[260px]"
        >
          {profile.heroDescription}
        </FadeIn>
        <FadeIn immediate delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
