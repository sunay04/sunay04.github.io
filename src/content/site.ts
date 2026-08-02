import cloud09Icon from "./cloud09-icon.png";

export type Service = {
  number: string;
  name: string;
  description: string;
  tag: string;
};

export type Experience = {
  period: string;
  role: string;
  organization: string;
  type: "工作" | "实习" | "项目实践";
  description: string;
  highlights: string[];
};

export type FriendLink = {
  name: string;
  description: string;
  href: string;
  icon: string;
};

export type SiteContent = {
  profile: typeof profile;
  highlights: typeof highlights;
  services: Service[];
  experiences: Experience[];
  friendLinks: FriendLink[];
};

export const profile = {
  name: "sunay",
  title: "AIGC Creative Portfolio",
  heroTitle: "Sunay",
  education: ["太原理工大学（211）", "数字媒体艺术", "27届"],
};

export const highlights = [
  {
    label: "目标方向",
    value: "AI Native 视觉设计 / AIGC / 内容运营",
    detail: "适配互联网活动视觉、品牌传播、创意内容与 AI 工作流岗位。",
  },
  {
    label: "核心工具",
    value: "Figma / PS / PR / Blender / 3ds Max / Midjourney",
    detail: "同时使用即梦、可灵、豆包等 AI 工具完成图像、视频与流程探索。",
  },
];

export const navLinks = [
  { label: "关于", href: "#about" },
  { label: "技能", href: "#services" },
  { label: "履历", href: "#experience" },
  { label: "作品", href: "#projects" },
  { label: "友链", href: "#friends" },
];

export const experiences: Experience[] = [
  {
    period: "2026.7 — Present",
    role: "中国国家地理探索",
    organization: "设计与运营",
    type: "实习",
    description:
      "参与项目日常设计与运营支持，围绕自然探索、科普内容和活动传播场景完成视觉物料设计；协助内容选题、素材整理、社交媒体配图与发布支持，在保证品牌调性和信息准确性的基础上提升内容呈现效果。",
    highlights: ["视觉物料", "内容运营", "社媒支持"],
  },
];

export const friendLinks: FriendLink[] = [
  {
    name: "Cloud09_Space",
    description: "这里是最爱Sunay的管理员sama的Blog",
    href: "https://cloud09.space/",
    icon: cloud09Icon,
  },
];

export const services: Service[] = [
  {
    number: "01",
    name: "AIGC 影像叙事",
    tag: "AI Film",
    description:
      "从主题、剧本、分镜到提示词、画面生成和剪辑，搭建完整的 AI 影像制作流程，让概念不只停留在灵感阶段。",
  },
  {
    number: "02",
    name: "视觉系统设计",
    tag: "Visual System",
    description:
      "能处理品牌调性、字体、色彩、插画、海报、橱窗和延展物料，让视觉不只是单张图，而是一套可延展的表达系统。",
  },
  {
    number: "03",
    name: "内容运营策划",
    tag: "Content Ops",
    description:
      "理解社媒内容从选题、拍摄、文案到发布的链路，做过线下快闪项目和小红书内容发布，关注转化而不是只看表面数据。",
  },
  {
    number: "04",
    name: "三维镜头表现",
    tag: "Motion / 3D",
    description:
      "熟悉 PR、剪映、Blender、3ds Max 等工具，可以把静态视觉继续推进成动态镜头、空间氛围和展示视频。",
  },
  {
    number: "05",
    name: "跨工具执行",
    tag: "Workflow",
    description:
      "能在 Figma、PS、Midjourney、即梦、可灵、豆包等工具之间建立流程，用 AI 提升效率，同时保留自己的判断和审美。",
  },
];

export const bundledSite: SiteContent = { profile, highlights, services, experiences, friendLinks };
