import { Mail } from "lucide-react";
import { profile } from "../content/portfolio";
import { cn } from "../lib/utils";

type ContactButtonProps = {
  className?: string;
};

export function ContactButton({ className }: ContactButtonProps) {
  return (
    <a
      href={profile.contactUrl}
      className={cn(
        "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[linear-gradient(123deg,#18011F_7%,#B600A8_37%,#7621B0_72%,#BE4C00_100%)] px-8 py-3 text-xs font-medium uppercase tracking-widest text-white shadow-contact-inner outline outline-2 -outline-offset-[3px] outline-white transition duration-200 hover:scale-[1.02] active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base",
        className,
      )}
      aria-label={`Contact ${profile.name}`}
    >
      <Mail aria-hidden="true" className="h-4 w-4 md:h-5 md:w-5" />
      <span>{profile.contactLabel}</span>
    </a>
  );
}
