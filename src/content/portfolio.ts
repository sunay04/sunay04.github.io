export type PortfolioImage = {
  src: string;
  alt: string;
  type?: "image" | "video";
  fit?: "cover" | "contain";
  caption?: string;
  span?: "normal" | "wide";
  height?: "standard" | "tall";
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
  takeaways?: string[];
  liveUrl?: string;
  linkLabel?: string;
  resources?: ProjectResource[];
  hero: PortfolioImage;
  heroSupport?: PortfolioImage;
  gallery: PortfolioImage[];
  galleryLayout?: "default" | "feature-left-stack-right";
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
    "我不是只会把作品做漂亮的人。我更在意一个想法如何被看见：它先要有清楚的主题，再有能撑住情绪的视觉语言，最后还要变成适合平台传播的内容。现在我希望进入成熟的公司实习，在 AIGC、内容运营或视觉设计方向继续把创意和执行力磨得更锋利。",
  availability: "北京线下实习 / 每周 4-5 天 / 3 个月",
  contactLabel: "查看作品集与简历",
  contactUrl: "#footer-contact",
  portfolioPdfUrl: "/portfolio/liuyan-portfolio-aigc.pdf",
  resumeOpsUrl: "/portfolio/liuyan-resume-aigc-ops.pdf",
  resumeVisualUrl: "/portfolio/liuyan-resume-visual-aigc.pdf",
};

export const highlights = [
  {
    label: "目标方向",
    value: "AI Native 视觉设计 / AIGC / 内容运营",
    detail: "适配互联网活动视觉、品牌传播、创意内容与 AI 工作流岗位。",
  },
  {
    label: "到岗条件",
    value: "北京线下 / 每周 4-5 天 / 3 个月",
    detail: "暑期可稳定实习，能尽快进入真实业务节奏。",
  },
  {
    label: "核心工具",
    value: "Figma / PS / PR / Blender / 3ds Max / Midjourney",
    detail: "同时使用即梦、可灵、豆包等 AI 工具完成图像、视频与流程探索。",
  },
  {
    label: "作品证据",
    value: "AI 短片、品牌视觉、真实团购、叙事插画",
    detail: "覆盖从概念、视觉、动态到内容发布的完整执行链路。",
  },
];

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
    takeaways: [
      "能把抽象主题拆解成镜头表、关键帧和成片节奏。",
      "熟悉 AIGC 从 Prompt 到视频生成、剪辑包装的实际流程。",
      "画面风格不是随机生成，而是围绕压抑、疏离、希望三段情绪推进。",
    ],
    resources: [
      {
        label: "观看《悬置》视频",
        href: "https://pan.quark.cn/s/4b79876358b1?pwd=ac8n",
        note: "夸克网盘 / 提取码 ac8n",
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
    heroSupport: {
      src: "/portfolio/xuanzhi-hero-support.png",
      alt: "《悬置》酒吧角色关键帧，蓝色压抑情绪",
      fit: "cover",
      caption: "情绪补充画面",
    },
    gallery: [
      {
        src: "/portfolio/xuanzhi-board-07-emotional-focus.jpg",
        alt: "AI 短片分镜图：主角情绪凝滞的室内镜头",
        fit: "cover",
        caption: "分镜图 07",
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
    takeaways: [
      "从主视觉出发延展到海报、橱窗、产品视觉和周边物料。",
      "用昆虫、骨骼、镜片和折叠结构建立先锋感与实验气质。",
      "适合证明品牌视觉系统、视觉统一性和落地应用能力。",
    ],
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
      fit: "contain",
      caption: "主图 01",
      span: "wide",
      height: "tall",
    },
    heroSupport: {
      src: "/portfolio/gentle-fold-main-visual-02.jpg",
      alt: "GENTLE MONSTER 折叠的维度主视觉，以镜观骨",
      fit: "contain",
      caption: "主图 02",
    },
    gallery: [
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
    role: "负责主题视觉、主海报、动态海报、空间延展与品牌介绍视频",
    year: "2026",
    summary:
      "以“未来回声”为主题做一组视觉延展练习：从主海报出发，继续发展到动态海报、空间装置和品牌介绍视频。这个项目更集中展示我把一个视觉概念延展成多媒介表达的能力，也补充了动态与空间方向的证据。",
    tags: ["主海报", "Motion Poster", "空间延展", "视觉统一"],
    metrics: ["3 张静态延展", "动态视频", "海报到空间场景"],
    takeaways: [
      "从一张主海报继续发展成动态海报、空间展示和视觉合集。",
      "补充动态设计和多媒介视觉延展能力。",
      "适合放在视觉设计岗位中证明风格延展与执行完整度。",
    ],
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
    galleryLayout: "feature-left-stack-right",
  },
  {
    id: "jinsha-rap-performance-visual",
    number: "04",
    name: "聚金沙 4.0 说唱演出视觉",
    category: "演出视觉 / 海报与票券",
    role: "负责演出主海报、入场券与邀请函视觉设计，完成从主视觉到活动物料的统一延展",
    year: "2025",
    summary:
      "为 BOOZE 豪饮俱乐部说唱演出“聚金沙 4.0”设计一套活动视觉物料。项目以复古版画、古塔图像和手写字体建立在地文化与街头说唱之间的冲突感，再延展到入场券和邀请函，形成可用于宣发、入场与定向邀约的完整视觉系统。",
    tags: ["演出海报", "入场券", "邀请函", "复古版画", "字体编排"],
    metrics: ["1 张主海报", "1 张入场券", "1 张邀请函", "活动物料统一"],
    takeaways: [
      "把本土建筑和说唱演出结合，形成有记忆点的活动主视觉。",
      "在主海报、票券、邀请函之间保持统一的字体、纹理和色彩关系。",
      "适合证明活动视觉、信息层级和线下物料落地能力。",
    ],
    hero: {
      src: "/portfolio/jinsha-rap-poster.png",
      alt: "聚金沙 4.0 说唱演出主海报",
      fit: "contain",
      caption: "演出主海报",
      height: "tall",
    },
    gallery: [
      {
        src: "/portfolio/jinsha-rap-alt-poster.png",
        alt: "聚金沙 4.0 说唱演出海报变体",
        fit: "contain",
        caption: "海报变体",
      },
      {
        src: "/portfolio/jinsha-rap-ticket.jpg",
        alt: "聚金沙 4.0 说唱演出入场券设计",
        fit: "cover",
        caption: "入场券",
      },
      {
        src: "/portfolio/jinsha-rap-invitation.jpg",
        alt: "聚金沙 4.0 说唱演出邀请函设计",
        fit: "cover",
        caption: "邀请函",
      },
    ],
    galleryLayout: "feature-left-stack-right",
  },
  {
    id: "ai-commercial-poster-exploration",
    number: "05",
    name: "AI 商业海报与活动视觉探索",
    category: "AIGC / 海报设计",
    role: "负责命题概念、AI 画面生成、视觉方向整合与海报信息排版优化",
    year: "2026",
    summary:
      "一组面向商业传播场景的海报作品。泡泡马特大广赛命题海报以 MOLLY 20 周年为创意背景，通过 AI 生成强化“愤怒转化为热爱”的情绪张力；山海旁酒吧开业海报为真实商业授权项目，侧重活动信息层级、插画符号和强识别色块的组织，展示我对 AIGC 画面、商业文案和活动视觉落地的综合处理能力。",
    tags: ["AI 生成", "大广赛命题", "真实商业授权", "活动海报", "信息排版"],
    metrics: ["2 张海报", "AIGC 视觉生成", "真实开业活动", "活动信息视觉化"],
    takeaways: [
      "能根据品牌命题提炼情绪关键词，并转化为强冲击力的海报视觉。",
      "在 AI 生成画面基础上继续处理文字、品牌标识和传播信息层级。",
      "适合证明商业海报、真实活动视觉和 AIGC 辅助设计能力。",
    ],
    hero: {
      src: "/portfolio/popmart-angry-molly-ai-poster.png",
      alt: "泡泡马特大广赛 AI 生成概念海报，Angry Molly",
      fit: "contain",
      caption: "泡泡马特大广赛命题 / AI 生成概念海报",
      height: "tall",
    },
    heroSupport: {
      src: "/portfolio/shanhaipang-bar-opening-poster.png",
      alt: "山海旁酒吧开业海报",
      fit: "contain",
      caption: "真实商业授权 / 酒吧开业活动海报",
    },
    gallery: [],
  },
  {
    id: "meituan-billiard-group-buying",
    number: "06",
    name: "美团团购真实落地案例",
    category: "本地生活运营视觉 / 团购物料",
    role: "负责团购套餐主图、优惠信息层级、活动卖点提炼与平台投放视觉设计",
    year: "2025",
    summary:
      "为立星乔氏台球俱乐部制作美团团购上线物料，将“66 代 300 元”“轻奢小包 4 小时”“中式黑八 1 小时”等套餐权益转化为高识别度的消费决策视觉。项目重点不是单纯做海报，而是在平台缩略图环境中快速传达价格、时长、权益和场景氛围，服务真实门店团购转化。",
    tags: ["真实落地", "美团团购", "本地生活", "活动主图", "权益视觉化"],
    metrics: ["4 张上线物料", "真实门店团购", "价格权益表达", "平台投放视觉"],
    takeaways: [
      "能把复杂套餐权益压缩成用户一眼能看懂的价格和时长信息。",
      "围绕美团平台浏览场景强化大字标题、强对比色块和核心卖点。",
      "适合证明真实商业落地、本地生活运营视觉和信息层级能力。",
    ],
    hero: {
      src: "/portfolio/meituan-billiard-66-300.png",
      alt: "美团团购真实落地案例，66 代 300 元优惠物料",
      fit: "cover",
      caption: "团购优惠主图",
      span: "wide",
    },
    gallery: [
      {
        src: "/portfolio/meituan-billiard-private-room-4h.png",
        alt: "美团团购轻奢小包 4 小时物料",
        fit: "cover",
        caption: "轻奢小包 4 小时",
      },
      {
        src: "/portfolio/meituan-billiard-black8-1h.png",
        alt: "美团团购中式黑八 1 小时物料",
        fit: "cover",
        caption: "中式黑八 1 小时",
      },
      {
        src: "/portfolio/meituan-billiard-beginner-coach.png",
        alt: "美团团购中式黑八初级教练 1 小时物料",
        fit: "cover",
        caption: "初级教练 1 小时",
      },
    ],
  },
  {
    id: "city-rooftop-narrative-illustration",
    number: "07",
    name: "城市天台叙事插画",
    category: "数字插画 / 角色叙事",
    role: "负责角色设定、场景氛围、动物意象与整体画面绘制",
    year: "2025",
    summary:
      "一张以城市天台为场景的叙事插画。画面通过拥抱中的角色、飞鸟、狐狸、鲨鱼等动物意象，建立现实城市与幻想元素并置的氛围。项目重点展示我在角色关系、画面动线、暖色光影和叙事情绪上的手绘表达能力。",
    tags: ["数字插画", "角色关系", "城市幻想", "场景叙事", "Procreate"],
    metrics: ["横版叙事构图", "角色与场景绘制", "动物意象设定"],
    takeaways: [
      "能用角色动作和场景元素组织画面叙事，而不是只画单个形象。",
      "通过暖色城市光、动物意象和前后景关系强化情绪氛围。",
      "适合补充证明手绘基础、审美表达和插画叙事能力。",
    ],
    hero: {
      src: "/portfolio/narrative-illustration-city-rooftop.jpg",
      alt: "城市天台叙事插画，人物拥抱与动物意象",
      fit: "contain",
      caption: "叙事插画",
      span: "wide",
    },
    gallery: [],
  },
  {
    id: "henna-pop-up-market",
    number: "08",
    name: "海娜文化快闪集市",
    category: "内容运营 / 线下项目",
    role: "2 人团队创业项目；负责品牌调研、招牌设计、运营宣发、活动策划、采购与服务交付",
    year: "2026",
    summary:
      "在山西大同东南邑落地 2 个月线下快闪项目。前期通过实地与线上调研观察 10+ 同类店铺，随后设计套餐、物料和小红书发布节奏，把文化体验转化为可被游客理解和购买的线下服务。",
    tags: ["线下快闪", "小红书运营", "服务设计", "活动策划"],
    metrics: ["2 个月运营", "10+ 店铺调研", "36 篇小红书笔记"],
    takeaways: [
      "不只是做视觉，也参与了调研、定价、物料、宣发和服务交付。",
      "能把文化体验包装成游客容易理解和愿意购买的线下产品。",
      "适合投内容运营或活动运营时作为真实项目证据。",
    ],
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
    number: "09",
    name: "山下有松香氛插画",
    category: "品牌插画 / 社媒传播",
    role: "负责香氛主题插画创作与小红书发布视觉表达",
    year: "2026",
    summary:
      "为山西在地品牌山下有松的香氛方向进行视觉探索，用自然、质朴、带有手作温度的插画语言承接品牌气质。它更适合作为补充项目，展示我的审美延展能力和社媒内容触达。",
    tags: ["品牌插画", "香氛", "小红书", "视觉探索"],
    metrics: ["270 赞", "91 收藏", "46 评论"],
    takeaways: [
      "用插画语言提炼自然、质朴、手作感的品牌气质。",
      "作为补充项目展示审美稳定性和社媒内容发布结果。",
      "数据不夸张，但能说明作品具备一定收藏和互动价值。",
    ],
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
