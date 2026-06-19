import { AboutSection } from "./components/AboutSection";
import { FooterSection } from "./components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";

export function App() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink font-body text-white">
      <div className="site-backdrop" aria-hidden="true" />
      <div className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <FooterSection />
      </div>
    </main>
  );
}
