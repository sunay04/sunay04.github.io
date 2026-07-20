import { AudioToggle } from "./AudioToggle";
import { FadeIn } from "./FadeIn";
import { navLinks, profile } from "../content/portfolio";

type SiteNavigationProps = {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

export function SiteNavigation({
  activeSection,
  onNavigate,
}: SiteNavigationProps) {
  return (
    <FadeIn
      as="nav"
      immediate
      y={-20}
      aria-label="主导航"
      className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8 lg:px-16"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <a
          href="#home"
          aria-label={`${profile.name} home`}
          aria-current={activeSection === "home" ? "page" : undefined}
          onClick={(event) => {
            event.preventDefault();
            onNavigate("home");
          }}
          className="site-logo liquid-glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-3xl italic leading-none text-white"
        >
          {profile.name.charAt(0).toLowerCase()}
        </a>

        <ul className="liquid-glass nav-switcher flex min-w-0 items-center gap-1 overflow-x-auto rounded-full px-1.5 py-1.5">
          {navLinks.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href}>
                <a
                  className="block min-h-9 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-white/75 transition duration-200 hover:bg-white/10 hover:text-white sm:text-sm"
                  data-active={isActive}
                  aria-current={isActive ? "page" : undefined}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(sectionId);
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <AudioToggle />
      </div>
    </FadeIn>
  );
}
