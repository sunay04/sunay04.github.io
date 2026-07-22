import { FadeIn } from "./FadeIn";
import { Service, highlights, services } from "../content/site";
import { SiAutodesk, SiBlender, SiFigma } from "react-icons/si";
import { AiFillOpenAI } from "react-icons/ai";
import {
  TbBrandAdobePhotoshop,
  TbBrandAdobePremiere,
} from "react-icons/tb";
import type { ElementType } from "react";

type ToolIcon = ElementType;

const tools: { name: string; icon: ToolIcon }[] = [
  { name: "Figma", icon: SiFigma },
  { name: "Photoshop", icon: TbBrandAdobePhotoshop },
  { name: "Premiere Pro", icon: TbBrandAdobePremiere },
  { name: "Blender", icon: SiBlender },
  { name: "3ds Max", icon: SiAutodesk },
  { name: "Codex", icon: AiFillOpenAI },
];

function serviceTag(service: Service) {
  return service.tag;
}

function ToolItem({ tool }: { tool: (typeof tools)[number] }) {
  const Icon = tool.icon;

  return (
    <div className="tool-item liquid-glass flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-black">
        <Icon aria-hidden className="h-4 w-4" />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-white/82">
        {tool.name}
      </span>
    </div>
  );
}

function ToolMarquee() {
  return (
    <FadeIn immediate className="tool-marquee mx-auto max-w-7xl" aria-label="常用软件工具">
      <div className="tool-marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="tool-marquee-group" aria-hidden={copy === 1}>
            {tools.map((tool) => (
              <ToolItem key={`${copy}-${tool.name}`} tool={tool} />
            ))}
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

export function ServicesSection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-10"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/20 md:inset-x-16" />
      <FadeIn
        as="h2"
        className="cosmic-heading mx-auto mb-8 max-w-5xl pb-2 text-center text-[clamp(4rem,9vw,7.5rem)] leading-[0.9]"
      >
        Skill Set
      </FadeIn>
      <div className="mx-auto mb-5 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2">
        {highlights.map((item, index) => (
          <FadeIn
            key={item.label}
            immediate
            delay={index * 0.08}
            className="liquid-glass flex min-h-[118px] flex-col rounded-[1.25rem] p-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/42">
              {item.label}
            </p>
            <p className="mt-3 text-base font-medium leading-snug text-white">
              {item.value}
            </p>
            <p className="cosmic-copy mt-auto pt-3 text-xs font-light leading-relaxed text-white/64">
              {item.detail}
            </p>
          </FadeIn>
        ))}
      </div>
      <ToolMarquee />
      <div className="mx-auto mt-5 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service, index) => (
          <FadeIn
            key={service.name}
            immediate
            delay={index * 0.1}
            className="liquid-glass flex min-h-[220px] flex-col rounded-[1.25rem] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] bg-white text-xs font-semibold text-black">
                {service.number}
              </span>
              <span className="liquid-glass rounded-full px-3 py-1 text-[11px] font-light text-white/90">
                {serviceTag(service)}
              </span>
            </div>
            <div className="mt-auto pt-8">
              <h3 className="font-heading text-2xl italic leading-none text-white xl:text-3xl">
                {service.name}
              </h3>
              <p className="cosmic-copy mt-3 text-xs font-light leading-relaxed xl:text-sm">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
