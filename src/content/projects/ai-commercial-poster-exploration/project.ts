import type { Project } from "../types";
import asset0 from "./assets/popmart-angry-molly-ai-poster.png";
import asset1 from "./assets/shanhaipang-bar-opening-poster.png";

const project = {
    id: "ai-commercial-poster-exploration",
    number: "05",
    name: "AI 商业海报与活动视觉探索",
    category: "AIGC / 海报设计",
    role: "负责命题概念、AI 画面生成、视觉方向整合与海报信息排版优化",
    year: "2026",
    summary:
      "两张面向不同传播任务的商业海报：MOLLY 20 周年命题以 AI 生成强化“愤怒转化为热爱”的情绪张力；山海旁酒吧开业项目则围绕真实活动信息，完成插画符号、文案层级与高识别色块的整合。",
    tags: ["AI 生成", "大广赛命题", "真实商业授权", "活动海报", "信息排版"],
    metrics: ["2 个商业传播命题", "AI 生成与人工排版整合", "1 个真实开业项目"],
    takeaways: [
      "根据不同品牌命题提炼情绪关键词，并转化为清晰的画面生成方向。",
      "对 AI 生成结果继续进行构图筛选、文字编排与品牌信息校正，保证可用性。",
      "针对赛事命题与真实开业活动采用不同的信息密度和视觉策略。",
    ],
    hero: {
      src: asset0,
      alt: "泡泡马特大广赛 AI 生成概念海报，Angry Molly",
      fit: "contain",
      caption: "泡泡马特大广赛命题 / AI 生成概念海报",
      height: "tall",
      orientation: "portrait",
    },
    heroSupport: {
      src: asset1,
      alt: "山海旁酒吧开业海报",
      fit: "contain",
      caption: "真实商业授权 / 酒吧开业活动海报",
      orientation: "portrait",
    },
    gallery: [],
    detailLayout: "poster-pair",
  } satisfies Project;

export default project;

