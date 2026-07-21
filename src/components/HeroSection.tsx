import { FadeIn } from "./FadeIn";
import { BlurText } from "./BlurText";
import { profile } from "../content/portfolio";
import { SiGmail, SiGithub, SiXiaohongshu } from "react-icons/si";

const contactLinks = [
  {
    label: "小红书",
    href: "https://www.xiaohongshu.com/user/profile/5c1d22d50000000005001f69",
    icon: SiXiaohongshu,
  },
  {
    label: "GitHub",
    href: "https://github.com/sunay04",
    icon: SiGithub,
  },
  {
    label: "Gmail",
    href: "mailto:1147850266ly@gmail.com",
    icon: SiGmail,
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden px-5 pb-10 pt-24 sm:px-8 md:px-10 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute left-[-15%] top-[12%] h-[34rem] w-[34rem] rounded-full border border-white/10" />
        <div className="absolute bottom-[-30%] right-[-12%] h-[38rem] w-[38rem] rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8.5rem)] max-w-5xl flex-col items-center justify-center text-center mist-readable lg:min-h-[calc(100dvh-9.5rem)]">
        <div className="flex min-w-0 flex-col items-center text-center">
          <FadeIn
            immediate
            delay={0.2}
            y={18}
            className="liquid-glass mb-6 flex w-full max-w-[18rem] flex-wrap items-center justify-center gap-2 rounded-[1.25rem] px-2 py-1 sm:w-auto sm:max-w-full sm:flex-nowrap sm:rounded-full"
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
            className="cosmic-heading max-w-full justify-center pb-2 text-[clamp(5rem,14vw,8rem)] leading-[0.82]"
          />

          <FadeIn
            immediate
            delay={0.5}
            y={16}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {profile.education.map((item) => (
              <span
                key={item}
                className="liquid-glass rounded-full px-3.5 py-1.5 text-xs font-medium text-white/90 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </FadeIn>

          <FadeIn
            as="p"
            immediate
            delay={0.6}
            y={18}
            className="mt-6 max-w-[46rem] text-base font-normal leading-relaxed text-white/92 sm:text-lg md:text-xl"
          >
            {profile.heroDescription}
          </FadeIn>
          <FadeIn
            as="p"
            immediate
            delay={0.75}
            y={18}
            className="mt-7 max-w-[50rem] border-t border-white/15 pt-6 text-sm font-light leading-relaxed text-white/68 sm:text-base"
          >
            {profile.aboutIntro}
            <span className="text-white/82">
              {profile.aboutEmphasis}
            </span>
            {profile.aboutClosing}
          </FadeIn>
          <FadeIn
            immediate
            delay={0.9}
            y={14}
            className="mt-7 flex items-center justify-center gap-3"
          >
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const isEmail = link.href.startsWith("mailto:");

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noreferrer"}
                  aria-label={link.label}
                  title={link.label}
                  className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full text-white/78 transition duration-200 hover:bg-white/10 hover:text-white active:scale-[0.96]"
                >
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
