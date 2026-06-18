import { ArrowUpRight } from "lucide-react";
import { ContactButton } from "./ContactButton";
import { FadingVideo } from "./FadingVideo";
import { profile } from "../content/portfolio";

const footerVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative z-20 min-h-[82dvh] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white sm:px-8 md:px-10 md:pt-32"
    >
      <FadingVideo
        src={footerVideo}
        className="inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/15 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[calc(82dvh-8rem)] max-w-7xl flex-col justify-between gap-16">
        <div className="max-w-5xl video-readable">
          <p className="cosmic-heading pb-2 text-[clamp(4rem,13vw,10rem)] leading-[0.86]">
            Build something unforgettable.
          </p>
        </div>
        <div className="liquid-glass grid gap-8 rounded-[1.25rem] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <p className="cosmic-copy max-w-xl text-sm font-light leading-relaxed md:text-base">
            Ready to shape a brand, website, render, or motion system with a cinematic edge.
          </p>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <ContactButton />
            <a
              href={profile.contactUrl}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/78 transition hover:text-white"
            >
              jack@example.com
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/65">
          <span>{profile.title}</span>
          <a
            href="#"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            Back to top
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
