import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AudioToggle } from "./AudioToggle";
import { FadeIn } from "./FadeIn";
import { navLinks, profile } from "../content/site";

type SiteNavigationProps = {
  activeSection: string;
  audioEnabled: boolean;
  onNavigate: (sectionId: string) => void;
};

export function SiteNavigation({
  activeSection,
  audioEnabled,
  onNavigate,
}: SiteNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !mobileMenuRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const handleNavigate = (sectionId: string) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <FadeIn
      as="nav"
      immediate
      y={-20}
      aria-label="主导航"
      className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8 lg:px-16"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3">
        <a
          href="#about"
          aria-label={`${profile.name} about`}
          aria-current={activeSection === "about" ? "page" : undefined}
          onClick={(event) => {
            event.preventDefault();
            handleNavigate("about");
          }}
          className="site-logo liquid-glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-3xl italic leading-none text-white"
        >
          {profile.name.charAt(0).toUpperCase()}
        </a>

        <ul className="liquid-glass nav-switcher hidden min-w-0 items-center gap-1 overflow-x-auto rounded-full px-1.5 py-1.5 md:flex">
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
                    handleNavigate(sectionId);
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <AudioToggle enabled={audioEnabled} />

          <div ref={mobileMenuRef} className="relative md:hidden">
            <button
              type="button"
              className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white transition duration-200 hover:bg-white/10 active:scale-[0.98]"
              aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  id="mobile-navigation-menu"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-14 w-44 origin-top-right"
                >
                  <div className="liquid-glass-strong overflow-hidden rounded-2xl p-2 shadow-2xl shadow-black/30">
                    <ul className="space-y-1">
                      {navLinks.map((link) => {
                        const sectionId = link.href.slice(1);
                        const isActive = activeSection === sectionId;

                        return (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              data-active={isActive}
                              aria-current={isActive ? "page" : undefined}
                              className="block min-h-11 rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition duration-200 hover:bg-white/10 hover:text-white data-[active=true]:bg-white data-[active=true]:text-ink"
                              onClick={(event) => {
                                event.preventDefault();
                                handleNavigate(sectionId);
                              }}
                            >
                              {link.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
