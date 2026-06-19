import { ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

type LiveProjectButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export function LiveProjectButton({ href, label = "View Project", className }: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noreferrer"}
      className={cn(
        "liquid-glass inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-white/10 active:scale-[0.98]",
        className,
      )}
      aria-label={label}
    >
      <span>{label}</span>
      <ExternalLink aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
