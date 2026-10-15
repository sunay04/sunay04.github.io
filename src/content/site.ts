import cloud09Icon from "./cloud09-icon.png";

export type Service = {
  number: string;
  name: string;
  description: string;
  tag: string;
};

export type Experience = {
  period: string;
  startDate?: string;
  endDate?: string;
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

export type MusicTrack = {
  id: string;
  title: string;
  artist?: string;
  src: string;
};

export type SiteContent = {
  profile: typeof profile;
  highlights: typeof highlights;
  services: Service[];
  experiences: Experience[];
  friendLinks: FriendLink[];
  music: MusicTrack[];
};

export const profile = {
  "name": "sunay",
  "title": "AI 游戏美术 · AIGC 视觉设计",
  "heroTitle": "Sunay",
  "education": [
    "太原理工大学（211）",
    "数字媒体艺术",
    "2027 届"
  ]
};

export const highlights = [
  {
    "label": "求职方向",
    "value": "AI 游戏美术 / AIGC 视觉设计",
    "detail": "多模型测试、画风探索与锁定，以及角色、场景和道具的统一风格制作。"
  },
  {
    "label": "制作工具",
    "value": "ComfyUI / Photoshop / 即梦 / 可灵",
    "detail": "结合 Figma、PR、Blender 与 3ds Max，完成视觉设计、动态表现与三维实践。"
  }
];

export const navLinks = [{label:"关于",href:"#about"},{label:"作品",href:"#projects"},{label:"履历",href:"#experience"},{label:"技能",href:"#services"},{label:"联系",href:"#friends"}];

export const experiences: Experience[] = [
  {
    "period": "2026.08 — 2026.09",
    "startDate": "2026-08",
    "role": "游戏研发公司（匿名）",
    "organization": "AI美术实习生",
    "type": "实习",
    "description": "参与动物园、希腊神话换装及悬疑题材二合项目。负责动物园项目前期角色与地图设计；在悬疑项目中进行多模型测试、画风发散与锁定，并开展后续美术资产制作。",
    "highlights": [
      "多模型测试",
      "画风锁定",
      "角色与地图设计",
      "ComfyUI"
    ],
    "endDate": "2026-09"
  },
  {
    "period": "2026.07 — 2026.08",
    "role": "自然科普机构（匿名）",
    "organization": "运营实习生",
    "type": "实习",
    "description": "参与项目日常设计与运营支持，围绕自然探索、科普内容和活动传播场景完成视觉物料设计；协助内容选题、素材整理、社交媒体配图与发布支持，在保证品牌调性和信息准确性的基础上提升内容呈现效果。",
    "highlights": [
      "视觉物料",
      "内容运营",
      "社媒支持"
    ],
    "startDate": "2026-07",
    "endDate": "2026-08"
  }
];

export const friendLinks: FriendLink[] = [
  {
    name: "Cloud09_Space",
    description: "这里是最爱Sunay的管理员sama的Blog",
    href: "https://cloud09.space/",
    icon: cloud09Icon,
  },
];

export const music: MusicTrack[] = [
  {
    id: "lobby-time",
    title: "Lobby Time",
    artist: "Kevin MacLeod",
    src: `${import.meta.env.BASE_URL}audio/lobby-time.mp3`,
  },
];

export const services: Service[] = [
  {
    "number": "01",
    "name": "画风探索与锁定",
    "tag": "Art Direction",
    "description": "测试不同图像生成模型，发散角色与场景的视觉方向，通过方案对比与迭代确定项目画风。"
  },
  {
    "number": "02",
    "name": "游戏美术资产",
    "tag": "Game Art",
    "description": "在确定的视觉方向下制作角色、表情、场景、剧情关键帧及道具，关注同一项目中的风格一致性。"
  },
  {
    "number": "03",
    "name": "ComfyUI 工作流",
    "tag": "Workflow",
    "description": "搭建文生图与多参考图生成流程，连接模型、提示词、采样与输出环节，支持方案探索和图像迭代。"
  },
  {
    "number": "04",
    "name": "影像与视觉延展",
    "tag": "Visual / Motion",
    "description": "结合分镜、剪辑、平面设计与三维制作，将静态视觉延展为影像、品牌物料与空间呈现。"
  }
];

export const bundledSite: SiteContent = { profile, highlights, services, experiences, friendLinks, music };
