import { AudioToggle } from "./AudioToggle";
import { FadeIn } from "./FadeIn";
import { navLinks, profile } from "../content/site";
import type { MusicTrack } from "../content/site";

type SiteNavigationProps = {
  activeSection: string;
  audioEnabled: boolean;
  tracks: MusicTrack[];
  onNavigate: (sectionId: string) => void;
};

export function SiteNavigation({ activeSection, audioEnabled, tracks, onNavigate }: SiteNavigationProps) {
  const handleNavigate = (sectionId: string) => onNavigate(sectionId);

  const mobileNavigation = <ul className="capsule-mobile-tabs" aria-label="页面导航">
    {navLinks.map((link) => { const sectionId = link.href.slice(1); const isActive = activeSection === sectionId; return <li key={link.href}><a data-active={isActive} aria-current={isActive ? "page" : undefined} href={link.href} onClick={(event) => { event.preventDefault(); handleNavigate(sectionId); }}>{link.label}</a></li>; })}
  </ul>;

  return <FadeIn as="nav" immediate y={-20} aria-label="主导航" className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8 lg:px-16">
    <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3">
      <a href="#about" aria-label={`${profile.name} about`} aria-current={activeSection === "about" ? "page" : undefined} onClick={(event) => { event.preventDefault(); handleNavigate("about"); }} className="site-logo liquid-glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-3xl italic leading-none text-white">{profile.name.charAt(0).toUpperCase()}</a>
      <ul className="liquid-glass nav-switcher absolute left-1/2 hidden min-w-0 -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full px-1.5 py-1.5 md:flex">
        {navLinks.map((link) => { const sectionId = link.href.slice(1); const isActive = activeSection === sectionId; return <li key={link.href}><a className="block min-h-9 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-white/75 transition duration-200 hover:bg-white/10 hover:text-white sm:text-sm" data-active={isActive} aria-current={isActive ? "page" : undefined} href={link.href} onClick={(event) => { event.preventDefault(); handleNavigate(sectionId); }}>{link.label}</a></li>; })}
      </ul>
      <div className="ml-auto flex items-center"><AudioToggle enabled={audioEnabled} tracks={tracks} mobileNavigation={mobileNavigation} /></div>
    </div>
  </FadeIn>;
}
