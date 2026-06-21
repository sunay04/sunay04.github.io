export type PortfolioImage = {
  src: string;
  alt: string;
  type?: "image" | "video";
  fit?: "cover" | "contain";
  caption?: string;
  span?: "normal" | "wide";
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
  hero: PortfolioImage;
  gallery: PortfolioImage[];
  fullLayout?: PortfolioImage;
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
    hero: {
      src: "/portfolio/xuanzhi-keyframes.png",
      alt: "《悬置》AI 短片关键帧，包含压抑开场与温暖家庭段落",
      fit: "contain",
      caption: "成片关键帧",
      span: "wide",
    },
    gallery: [
      {
        src: "/portfolio/xuanzhi-board-01.jpg",
        alt: "AI 短片分镜图：角色情绪镜头",
        fit: "cover",
        caption: "分镜图 01",
        span: "wide",
      },
      {
        src: "/portfolio/xuanzhi-board-02.jpg",
        alt: "AI 短片分镜图：酒吧环境镜头",
        fit: "cover",
        caption: "分镜图 02",
      },
      {
        src: "/portfolio/xuanzhi-board-03.jpg",
        alt: "AI 短片分镜图：手部特写镜头",
        fit: "cover",
        caption: "分镜图 03",
      },
      {
        src: "/portfolio/xuanzhi-board-04.jpg",
        alt: "AI 短片分镜图：人物冲突镜头",
        fit: "cover",
        caption: "分镜图 04",
      },
      {
        src: "/portfolio/xuanzhi-board-05.jpg",
        alt: "AI 短片分镜图：人物表情特写",
        fit: "cover",
        caption: "分镜图 05",
      },
      {
        src: "/portfolio/xuanzhi-board-06.jpg",
        alt: "AI 短片分镜图：黑白人物镜头",
        fit: "cover",
        caption: "分镜图 06",
      },
      {
        src: "/portfolio/xuanzhi-frame-oppressive.png",
        alt: "《悬置》压抑开场关键帧",
        fit: "cover",
        caption: "压抑中心构图",
      },
      {
        src: "/portfolio/xuanzhi-storyboard.png",
        alt: "《悬置》AI 短片分镜表与镜头规划",
        fit: "contain",
        caption: "分镜表",
        span: "wide",
      },
      {
        src: "/portfolio/xuanzhi-process.png",
        alt: "《悬置》AI 短片课程展示与制作过程",
        fit: "contain",
        caption: "课堂展示过程",
        span: "wide",
      },
    ],
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
    resources: [
      {
        label: "打开完整版长图",
        href: "/portfolio/gentle-fold-full-layout.jpg",
        note: "原图文件",
      },
    ],
    hero: {
      src: "/portfolio/gentle-fold-main-visual-01.png",
      alt: "GENTLE MONSTER 折叠的维度主视觉，以虫观我",
      fit: "cover",
      caption: "主图 01",
      span: "wide",
    },
    gallery: [
      {
        src: "/portfolio/gentle-fold-main-visual-02.jpg",
        alt: "GENTLE MONSTER 折叠的维度主视觉，以镜观骨",
        fit: "cover",
        caption: "主图 02",
        span: "wide",
      },
      {
        src: "/portfolio/gentle-fold-cover.png",
        alt: "GENTLE MONSTER 折叠的维度项目封面",
        fit: "cover",
        caption: "项目封面",
        span: "wide",
      },
      {
        src: "/portfolio/gentle-fold-mockup-01.png",
        alt: "GENTLE MONSTER 折叠的维度橱窗样机，以镜观骨",
        fit: "cover",
        caption: "橱窗样机 01",
      },
      {
        src: "/portfolio/gentle-fold-mockup-02.png",
        alt: "GENTLE MONSTER 折叠的维度橱窗样机，以虫观我",
        fit: "cover",
        caption: "橱窗样机 02",
      },
      {
        src: "/portfolio/gentle-fold-dynamic-visual.mp4",
        alt: "GENTLE MONSTER 折叠的维度延展动态视觉",
        type: "video",
        fit: "cover",
        caption: "延展动态视觉",
        span: "wide",
      },
    ],
    fullLayout: {
      src: "/portfolio/gentle-fold-full-layout.jpg",
      alt: "GENTLE MONSTER 折叠的维度完整版长图排版",
      fit: "contain",
      caption: "完整版长图",
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
    hero: {
      src: "/portfolio/future-echoes-motion-poster.mp4",
      alt: "Future Echoes 动态海报视频",
      type: "video",
      fit: "contain",
      caption: "动态海报",
    },
    gallery: [
      {
        src: "/portfolio/future-echoes-poster.jpg",
        alt: "Future Echoes 主海报",
        fit: "contain",
        caption: "主海报",
      },
      {
        src: "/portfolio/future-echoes-badge.jpg",
        alt: "Future Echoes 嘉宾证与工作证物料样机",
        fit: "cover",
        caption: "证件物料",
      },
      {
        src: "/portfolio/future-echoes-space.jpg",
        alt: "Future Echoes 空间延展场景",
        fit: "cover",
        caption: "空间延展",
      },
      {
        src: "/portfolio/future-echoes-contact.png",
        alt: "Future Echoes 多媒介视觉延展合集",
        fit: "contain",
        caption: "延展合集",
      },
    ],
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
    hero: {
      src: "/portfolio/haina-market-service.png",
      alt: "海娜文化快闪集市现场服务与招牌",
      fit: "cover",
      caption: "线下快闪服务现场",
      span: "wide",
    },
    gallery: [
      {
        src: "/portfolio/haina-market-signage.png",
        alt: "海娜文化快闪集市招牌与摊位展示",
        fit: "contain",
        caption: "摊位招牌",
      },
      {
        src: "/portfolio/haina-henna-detail-02.png",
        alt: "海娜手绘服务交付细节",
        fit: "cover",
        caption: "服务交付细节",
      },
      {
        src: "/portfolio/haina-henna-detail-03.png",
        alt: "海娜手绘图案落地效果",
        fit: "cover",
        caption: "图案落地效果",
      },
      {
        src: "/portfolio/haina-market-reference.png",
        alt: "海娜文化快闪集市同类市集与摊位参考",
        fit: "contain",
        caption: "市集氛围参考",
      },
    ],
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
    hero: {
      src: "/portfolio/shanxia-songmont-hero.png",
      alt: "山下有松 Songmont 香氛主视觉插画",
      fit: "contain",
      caption: "香氛主视觉",
    },
    gallery: [
      {
        src: "/portfolio/shanxia-songmont-incense.png",
        alt: "山下有松 Songmont 香氛烟雾插画",
        fit: "contain",
        caption: "香气流动视觉",
      },
      {
        src: "/portfolio/shanxia-product-mockup.jpg",
        alt: "山下有松香氛产品与包装样机",
        fit: "cover",
        caption: "包装样机",
      },
      {
        src: "/portfolio/shanxia-product-concept.jpg",
        alt: "山下有松香氛产品理念页",
        fit: "contain",
        caption: "产品理念",
      },
      {
        src: "/portfolio/shanxia-contact.png",
        alt: "山下有松品牌插画发布与社媒数据",
        fit: "contain",
        caption: "社媒发布数据",
      },
    ],
  },
];
