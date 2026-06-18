import { ArrowUpRight } from "lucide-react";
import { ContactButton } from "./ContactButton";
import { profile } from "../content/portfolio";

export function FooterSection() {
  return (
    <footer id="contact" className="bg-ink px-5 pb-10 pt-4 text-mist sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-mist/20 pt-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[clamp(2.6rem,9vw,7rem)] font-black uppercase leading-none tracking-tight">
            Build something
            <br />
            unforgettable.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <ContactButton />
          <a
            href={profile.contactUrl}
            className="inline-flex items-center gap-2 text-base font-medium text-mist/75 transition hover:text-mist"
          >
            jack@example.com
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
