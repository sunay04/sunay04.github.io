import { AboutSection } from "./components/AboutSection";
import { FooterSection } from "./components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { SiteNavigation } from "./components/SiteNavigation";
import { useCallback, useEffect, useRef, useState } from "react";

const sectionIds = ["home", "about", "services", "projects", "contact"];

export function App() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const navigationTargetRef = useRef<string | null>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  const navigateTo = useCallback((sectionId: string, updateHistory = true) => {
    const target = document.getElementById(sectionId);

    if (!target) return;

    navigationTargetRef.current = sectionId;
    setActiveSection(sectionId);

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
      inline: "start",
    });
    if (updateHistory) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  }, []);

  useEffect(() => {
    const targetId = window.location.hash.slice(1) || "home";

    if (sectionIds.includes(targetId)) {
      requestAnimationFrame(() => navigateTo(targetId, false));
    }
  }, [navigateTo]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncSectionFromPosition = () => {
      const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
      const nextSection = sectionIds[index];
      if (nextSection) setActiveSection(nextSection);
    };

    const updateActiveSection = () => {
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }

      if (!navigationTargetRef.current) {
        syncSectionFromPosition();
      }

      scrollEndTimerRef.current = setTimeout(() => {
        navigationTargetRef.current = null;
        syncSectionFromPosition();
      }, 140);
    };

    viewport.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", updateActiveSection);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-ink font-body text-white">
      <div className="site-backdrop" aria-hidden="true" />
      <SiteNavigation activeSection={activeSection} onNavigate={navigateTo} />
      <div ref={viewportRef} className="horizontal-viewport relative z-10">
        <div id="home" className="horizontal-panel">
          <HeroSection />
        </div>
        <div id="about" className="horizontal-panel">
          <AboutSection />
        </div>
        <div id="services" className="horizontal-panel">
          <ServicesSection />
        </div>
        <div id="projects" className="horizontal-panel">
          <ProjectsSection />
        </div>
        <div id="contact" className="horizontal-panel">
          <FooterSection />
        </div>
      </div>
    </main>
  );
}
