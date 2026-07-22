import type { Project } from "../types";
import asset0 from "./assets/future-echoes-motion-poster.mp4";
import asset2 from "./assets/future-echoes-poster.jpg";
import asset3 from "./assets/future-echoes-space.jpg";

const project = {
    id: "future-echoes-visual-extension",
    number: "03",
    name: "Future Echoes 视觉延展",
    category: "视觉系统 / 动态海报",
    role: "负责主题视觉、主海报、动态海报、空间延展与品牌介绍视频",
    year: "2026",
    summary:
      "以“未来回声”为核心概念，从主海报建立字体、色彩与图形语言，并继续延展到动态海报、空间装置和品牌介绍视频，验证同一视觉系统在平面、动态与空间媒介中的一致性。",
    tags: ["主海报", "Motion Poster", "空间延展", "视觉统一"],
    metrics: ["2 张静态延展", "1 支动态海报", "覆盖平面、动态与空间"],
    takeaways: [
      "先定义稳定的字体、色彩与图形关系，再进入不同媒介，避免延展成为风格拼贴。",
      "动态海报以节奏和层级变化强化“回声”概念，而不是简单移动静态元素。",
      "空间场景保留主海报的识别核心，同时根据观看距离调整信息密度。",
    ],
    hero: {
      src: asset0,
      alt: "Future Echoes 动态海报视频",
      type: "video",
      fit: "contain",
      caption: "动态海报",
      orientation: "portrait",
    },
    gallery: [
      {
        src: asset2,
        alt: "Future Echoes 主海报",
        fit: "contain",
        caption: "主海报",
        orientation: "portrait",
      },
      {
        src: asset3,
        alt: "Future Echoes 空间延展场景",
        fit: "cover",
        caption: "空间延展",
        orientation: "landscape",
      },
    ],
    galleryLayout: "feature-left-stack-right",
  } satisfies Project;

export default project;
