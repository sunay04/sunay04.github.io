import { ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

type LiveProjectButtonProps = {
  href: string;
  className?: string;
};

export function LiveProjectButton({ href, className }: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-mist px-6 py-3 text-xs font-medium uppercase tracking-widest text-mist transition duration-200 hover:bg-mist/10 active:scale-[0.98] sm:px-8 sm:py-3.5 sm:text-sm md:px-10",
        className,
      )}
      aria-label="Open live project"
    >
      <span>Live Project</span>
      <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
