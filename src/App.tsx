import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { SiteNavigation } from "./components/SiteNavigation";
import { IntroAnimation } from "./components/IntroAnimation";
import { ExperienceSection } from "./components/ExperienceSection";
import { FriendsSection } from "./components/FriendsSection";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "./content/projects";
import { bundledProjects, loadPublishedContent } from "./content/projects/runtime";
import { bundledSite } from "./content/site";
import { EditorPage } from "./editor/EditorPage";

const sectionIds = ["about", "services", "experience", "projects", "friends"];

export function App() {
  const [projects, setProjects] = useState<Project[]>(bundledProjects);
  const [site, setSite] = useState(bundledSite);
  const viewportRef = useRef<HTMLDivElement>(null);
  const navigationTargetRef = useRef<string | null>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [introComplete, setIntroComplete] = useState(false);

  const completeIntro = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    const controller = new AbortController();
    loadPublishedContent(controller.signal).then((content) => { setProjects(content.projects); setSite(content.site); });
    return () => controller.abort();
  }, []);

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
    const hash = window.location.hash.slice(1);
    const targetId = hash.startsWith("project/") ? "projects" : hash || "about";

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
      <div className={introComplete ? "site-content is-ready" : "site-content"}>
        <SiteNavigation activeSection={activeSection} audioEnabled={introComplete} tracks={site.music ?? bundledSite.music} onNavigate={navigateTo} />
        <div ref={viewportRef} className="horizontal-viewport relative z-10">
          <div id="about" className="horizontal-panel">
            <HeroSection content={site.profile} />
          </div>
          <div id="services" className="horizontal-panel">
            <ServicesSection content={{ highlights: site.highlights, services: site.services }} />
          </div>
          <div id="experience" className="horizontal-panel">
            <ExperienceSection content={site.experiences} />
          </div>
          <div id="projects" className="horizontal-panel">
            <ProjectsSection projects={projects} />
          </div>
          <div id="friends" className="horizontal-panel">
            <FriendsSection content={site.friendLinks} />
          </div>
        </div>
      </div>
      <IntroAnimation onComplete={completeIntro} />
    </main>
  );
}

export function RootApp() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/edits" && window.location.hostname === "sunay04.github.io") {
    window.location.replace(`https://sunay-portfolio-editor.sunay04.workers.dev/edits${window.location.search}${window.location.hash}`);
    return null;
  }
  return path === "/edits" ? <EditorPage /> : <App />;
}
