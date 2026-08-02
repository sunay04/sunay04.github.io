import { friendLinks } from "../content/site";
import { FadeIn } from "./FadeIn";

export function FriendsSection({ content = friendLinks }: { content?: typeof friendLinks }) {
  return (
    <section className="relative min-h-full px-5 py-24 sm:px-8 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20 md:inset-x-16" />
      <div className="mx-auto w-full max-w-7xl">
        <FadeIn as="h2" className="cosmic-heading pb-2 text-center text-[clamp(3rem,8vw,7.5rem)] leading-[0.9]">Friend Link</FadeIn>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),18rem))] justify-center gap-4">
          {content.map((link, index) => (
            <FadeIn key={link.href} immediate delay={index * 0.08} className="h-full">
              <a href={link.href} target="_blank" rel="noreferrer" className="liquid-glass group flex h-full flex-col items-center rounded-[1.25rem] p-6 text-center transition duration-200 hover:bg-white/[0.09] active:scale-[0.99]">
                <img src={link.icon} alt={`${link.name} icon`} className="h-16 w-16 shrink-0 rounded-full bg-white object-cover" />
                <span className="mt-4 block text-lg font-medium text-white">{link.name}</span>
                <span className="mt-2 block text-sm font-light leading-relaxed text-white/58">{link.description}</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
