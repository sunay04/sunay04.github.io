export type Service = {
  number: string;
  name: string;
  description: string;
  tag: string;
};

export const profile = {
  name: "sunay",
  title: "AIGC Creative Portfolio",
  heroTitle: "Sunay",
  education: ["太原理工大学（211）", "数字媒体艺术", "27届"],
  heroDescription:
    "聚焦 AIGC 视觉叙事，具备从创意概念、提示词生成到剪辑发布的全流程落地与内容运营能力。",
  aboutIntro: "相比单纯的好看，我更加注重",
  aboutEmphasis: "内容的传播属性与落地价值",
  aboutClosing:
    "——从确立明确主题，到构建情绪化视觉，再到针对平台做定制化运营。希望加入成熟的团队（AIGC / 内容运营 / 视觉设计方向），在实际业务中继续锻炼自己的创意与全流程的执行力。",
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
  { label: "能力", href: "#services" },
  { label: "作品", href: "#projects" },
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
