export type PortfolioImage = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

export type ProjectResource = {
  label: string;
  href: string;
  note?: string;
};

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  tags: string[];
  metrics: string[];
  liveUrl: string;
  linkLabel: string;
  resources?: ProjectResource[];
  images: {
    leftTop: PortfolioImage;
    leftBottom: PortfolioImage;
    featured: PortfolioImage;
  };
};

export type Service = {
  number: string;
  name: string;
  description: string;
  tag: string;
};

export type FriendLink = {
  label: string;
  href: string;
};

export const profile = {
  name: "sunay",
  title: "AIGC Creative Portfolio",
  heroTitle: "sunay",
  heroDescription:
    "数字媒体艺术在读，关注 AIGC 影像叙事、视觉系统与内容运营。能从概念、分镜、提示词、生成、剪辑到社媒发布，把想法做成可展示、可传播、可落地的作品。",
  aboutTitle: "About",
  about:
    "我不是只会把作品做漂亮的人。我更在意一个想法如何被看见：它先要有清楚的主题，再有能撑住情绪的视觉语言，最后还要变成适合平台传播的内容。现在我希望进入互联网大厂实习，在 AIGC、内容运营或视觉设计方向继续把创意和执行力磨得更锋利。",
  availability: "上海线下暑期实习 / 每周 5 天 / 3 个月以上",
  contactLabel: "查看作品集与简历",
  contactUrl: "#footer-contact",
  portfolioUrl: "/portfolio/liuyan-portfolio-aigc.pdf",
  resumeOpsUrl: "/portfolio/liuyan-resume-aigc-ops.pdf",
  resumeVisualUrl: "/portfolio/liuyan-resume-visual-aigc.pdf",
};

export const navLinks = [
  { label: "关于", href: "#about" },
  { label: "能力", href: "#services" },
  { label: "作品", href: "#projects" },
  { label: "联系", href: "#footer-contact" },
];

export const friendLinks: FriendLink[] = [
  {
    label: "小红书作品",
    href: "https://www.xiaohongshu.com/discovery/item/69f8503f0000000023006d3a?source=webshare&xhsshare=pc_web&xsec_token=AB1aPAVasTLsu4cvIcOvxnYpV5XZtfwbY4yBOkCjJmdyA=&xsec_source=pc_share",
  },
  { label: "GitHub", href: "https://github.com/sunay04/sunay04.github.io" },
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
    name: "动态与三维表达",
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

export const projects: Project[] = [
  {
    id: "xuanzhi-ai-short-film",
    number: "01",
    name: "《悬置》AI 短片",
    category: "AIGC / 影像叙事",
    role: "个人全流程：主题、剧本、49 镜头分镜、提示词、画面生成、视频生成、剪辑、配音、字幕、调色",
    year: "2026",
    summary:
      "一支 3 分钟自我表达短片，以年轻人被现实与理想拉扯的双重生活为核心。项目把剧本拆成可执行的镜头系统，再用 AI 生成与剪辑完成压抑到温暖的情绪转向，重点展示我对主题、分镜、镜头情绪和成片节奏的控制。",
    tags: ["49 镜头分镜", "Midjourney", "即梦", "可灵", "PR / 剪映"],
    metrics: ["3 分钟成片", "成片关键帧", "从剧本到成片独立完成"],
    liveUrl: "/portfolio/liuyan-portfolio-aigc.pdf",
    linkLabel: "打开作品集 PDF",
    resources: [
      {
        label: "观看《悬置》视频",
        href: "/portfolio/xuanzhi-film.mp4",
        note: "网页播放版",
      },
      {
        label: "打开分镜剧本",
        href: "/portfolio/xuanzhi-story-script.pdf",
        note: "PDF",
      },
      {
        label: "查看《悬置》PPT",
        href: "#xuanzhi-ppt",
        note: "可返回本板块",
      },
    ],
    images: {
      leftTop: {
        src: "/portfolio/xuanzhi-storyboard.png",
        alt: "《悬置》AI 短片分镜表与镜头规划",
      },
      leftBottom: {
        src: "/portfolio/xuanzhi-process.png",
        alt: "《悬置》AI 短片课程展示与制作过程",
      },
      featured: {
        src: "/portfolio/xuanzhi-film.mp4",
        alt: "《悬置》AI 短片关键帧，包含压抑开场与温暖家庭段落",
        type: "video",
      },
    },
  },
  {
    id: "gentle-monster-folded-dimension",
    number: "02",
    name: "GENTLE MONSTER 折叠的维度",
    category: "品牌视觉 / 延展设计",
    role: "团队 5 人项目；负责草图、线稿、色稿、上色、字体与品牌延展等全流程视觉执行",
    year: "2026",
    summary:
      "围绕 GENTLE MONSTER 的先锋、异质和实验感，建立一套带有冒险叙事的品牌视觉系统。项目覆盖主视觉、海报、橱窗、产品视觉、周边与动态延展，重点体现从单张视觉到品牌应用场景的完整推演。",
    tags: ["品牌命题", "主视觉", "字体设计", "橱窗 / 周边", "动态延展"],
    metrics: ["5 人团队协作", "完整品牌延展", "多场景应用"],
    liveUrl: "/portfolio/liuyan-portfolio-aigc.pdf",
    linkLabel: "查看项目页",
    images: {
      leftTop: {
        src: "/portfolio/gentle-system.jpg",
        alt: "GENTLE MONSTER 项目的字体与视觉系统",
      },
      leftBottom: {
        src: "/portfolio/gentle-application.jpg",
        alt: "GENTLE MONSTER 项目的品牌延展应用",
      },
      featured: {
        src: "/portfolio/gentle-hero.jpg",
        alt: "GENTLE MONSTER 折叠的维度主视觉",
      },
    },
  },
  {
    id: "future-echoes-visual-extension",
    number: "03",
    name: "Future Echoes 视觉延展",
    category: "视觉系统 / 动态海报",
    role: "负责主题视觉、主海报、动态海报、证件样机、空间延展与品牌介绍视频",
    year: "2026",
    summary:
      "以“未来回声”为主题做一组视觉延展练习：从主海报出发，继续发展到动态海报、工作证、空间装置和品牌介绍视频。这个项目更集中展示我把一个视觉概念延展成多媒介表达的能力，也补充了动态与空间方向的证据。",
    tags: ["主海报", "Motion Poster", "物料样机", "空间延展", "视觉统一"],
    metrics: ["4 张静态延展", "3 段动态视频", "海报到空间场景"],
    liveUrl: "/portfolio/future-echoes-motion-poster.mp4",
    linkLabel: "观看动态海报",
    images: {
      leftTop: {
        src: "/portfolio/future-echoes-badge.jpg",
        alt: "Future Echoes 嘉宾证与工作证物料样机",
      },
      leftBottom: {
        src: "/portfolio/future-echoes-space.jpg",
        alt: "Future Echoes 空间延展场景",
      },
      featured: {
        src: "/portfolio/future-echoes-motion-poster.mp4",
        alt: "Future Echoes 动态海报视频",
        type: "video",
      },
    },
  },
  {
    id: "henna-pop-up-market",
    number: "04",
    name: "海娜文化快闪集市",
    category: "内容运营 / 线下项目",
    role: "2 人团队创业项目；负责品牌调研、招牌设计、运营宣发、活动策划、采购与服务交付",
    year: "2026",
    summary:
      "在山西大同东南邑落地 2 个月线下快闪项目。前期通过实地与线上调研观察 10+ 同类店铺，随后设计套餐、物料和小红书发布节奏，把文化体验转化为可被游客理解和购买的线下服务。",
    tags: ["线下快闪", "小红书运营", "服务设计", "活动策划"],
    metrics: ["2 个月运营", "10+ 店铺调研", "36 篇小红书笔记"],
    liveUrl: "/portfolio/liuyan-portfolio-aigc.pdf",
    linkLabel: "查看运营案例",
    images: {
      leftTop: {
        src: "/portfolio/haina-contact.png",
        alt: "海娜文化快闪集市项目视觉与运营素材合集",
      },
      leftBottom: {
        src: "/portfolio/haina-scene.jpg",
        alt: "海娜文化快闪集市线下服务场景",
      },
      featured: {
        src: "/portfolio/haina-contact.png",
        alt: "海娜文化快闪集市内容运营与活动物料",
      },
    },
  },
  {
    id: "shanxia-yousong-fragrance-illustration",
    number: "05",
    name: "山下有松香氛插画",
    category: "品牌插画 / 社媒传播",
    role: "负责香氛主题插画创作与小红书发布视觉表达",
    year: "2026",
    summary:
      "为山西在地品牌山下有松的香氛方向进行视觉探索，用自然、质朴、带有手作温度的插画语言承接品牌气质。它更适合作为补充项目，展示我的审美延展能力和社媒内容触达。",
    tags: ["品牌插画", "香氛", "小红书", "视觉探索"],
    metrics: ["270 赞", "91 收藏", "46 评论"],
    liveUrl:
      "https://www.xiaohongshu.com/discovery/item/69f8503f0000000023006d3a?source=webshare&xhsshare=pc_web&xsec_token=AB1aPAVasTLsu4cvIcOvxnYpV5XZtfwbY4yBOkCjJmdyA=&xsec_source=pc_share",
    linkLabel: "查看发布笔记",
    images: {
      leftTop: {
        src: "/portfolio/shanxia-hero.jpg",
        alt: "山下有松香氛插画视觉细节",
      },
      leftBottom: {
        src: "/portfolio/shanxia-contact.png",
        alt: "山下有松品牌插画发布与延展素材",
      },
      featured: {
        src: "/portfolio/shanxia-contact.png",
        alt: "山下有松香氛插画项目合集",
      },
    },
  },
];
