import { profile } from "../content/site";
import type { Project } from "../content/projects";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function HeroSection({ content = profile, projects = [], onNavigate = (section: string) => { window.location.hash = section; } }: { content?: typeof profile; projects?: Project[]; onNavigate?: (section: string) => void }) {
  const featured = projects.filter(p => ["obrien-manor-game-art", "zoo-game-art", "xuanzhi-ai-short-film"].includes(p.id)).slice(0, 3);
  return <section className="portfolio-hero">
    <div className="hero-intro">
      <p className="hero-eyebrow">SUNAY / SELECTED PORTFOLIO</p>
      <h1><span className="hero-name">{content.heroTitle}</span><span className="hero-discipline">AI 游戏美术<br /><span>与 AIGC 视觉设计</span></span></h1>
      <p className="hero-description">从多模型测试、画风探索与锁定，<br className="hidden sm:block" />到角色、场景与道具的统一风格制作。</p>
      <p className="hero-education">{content.education.join(" · ")}</p>
      <div className="hero-actions">
        <button className="hero-primary" onClick={() => onNavigate("projects")}>查看精选作品 <ArrowRight size={17} /></button>
        <a className="hero-secondary" href="mailto:1147850266ly@gmail.com">联系我 <ArrowUpRight size={17} /></a>
      </div>
    </div>
    <div className="hero-selection">
      <div className="hero-selection-heading"><span>精选 / SELECTED WORK</span><span>01 — 03</span></div>
      {featured.map((p, i) => <button key={p.id} className={`hero-project hero-project-${i}`} onClick={() => { onNavigate("projects"); window.location.hash = `project/${p.id}`; }}>
        <img src={p.hero.src} alt={p.hero.alt} loading={i === 0 ? "eager" : "lazy"} />
        <span className="hero-project-overlay"><span><small>{p.category}</small><strong>{p.name}</strong></span><ArrowUpRight size={20} /></span>
      </button>)}
    </div>
    <div className="hero-bottom"><span>多模型测试 / 风格探索 / 资产制作</span><a href="mailto:1147850266ly@gmail.com">1147850266ly@gmail.com ↗</a></div>
  </section>;
}
