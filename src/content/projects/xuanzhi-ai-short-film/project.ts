import type { Project } from "../types";
import asset0 from "./assets/xuanzhi-story-script.pdf";
import asset1 from "./assets/xuanzhi-hero-support.png";
import asset3 from "./assets/xuanzhi-board-07-emotional-focus.jpg";
import asset4 from "./assets/xuanzhi-board-02.jpg";
import asset5 from "./assets/xuanzhi-board-03.jpg";
import asset6 from "./assets/xuanzhi-board-04.jpg";
import asset7 from "./assets/xuanzhi-board-05.jpg";
import asset8 from "./assets/xuanzhi-board-06.jpg";
import asset9 from "./assets/xuanzhi-frame-oppressive.png";
import presentation from "./assets/xuanzhi-presentation.pdf";

const project = {
    id: "xuanzhi-ai-short-film",
    number: "01",
    name: "《悬置》AI 短片",
    category: "AIGC 影像",
    role: "个人全流程：主题、剧本、49 镜头分镜、提示词、画面生成、视频生成、剪辑、配音、字幕、调色",
    year: "2026",
    summary:
      "围绕年轻人在现实压力与个人理想之间的拉扯，独立完成一支 3 分钟 AI 叙事短片。我将剧本拆解为 49 个可执行镜头，并通过统一提示词、关键帧控制与后期剪辑，完成从压抑到温暖的情绪转向。",
    tags: ["AIGC", "影像叙事", "动态设计", "个人项目"],
    metrics: ["3 分钟完整成片", "49 镜头分镜系统", "个人独立完成全流程"],
    takeaways: [
      "把抽象主题拆成镜头表、关键帧与剪辑节奏，使生成过程具备明确的执行标准。",
      "建立从提示词、图像生成、视频生成到配音、字幕和调色的完整工作流。",
      "以压抑、疏离、希望三段情绪控制色彩与构图，让视觉变化服务叙事推进。",
    ],
    resources: [
      {
        label: "观看《悬置》视频",
        href: "https://pan.quark.cn/s/4b79876358b1?pwd=ac8n",
        note: "夸克网盘 / 提取码 ac8n",
      },
      {
        label: "打开分镜剧本",
        href: asset0,
        note: "PDF",
      },
      {
        label: "查看《悬置》PPT",
        href: presentation,
        note: "可返回本板块",
      },
    ],
    hero: {
      src: asset1,
      alt: "《悬置》酒吧角色关键帧，蓝色压抑情绪",
      fit: "cover",
      caption: "情绪关键帧",
      span: "wide",
      orientation: "landscape",
    },
    gallery: [
      {
        src: asset3,
        alt: "AI 短片分镜图：主角情绪凝滞的室内镜头",
        fit: "cover",
        caption: "分镜图 01",
        span: "wide",
      },
      {
        src: asset4,
        alt: "AI 短片分镜图：酒吧环境镜头",
        fit: "cover",
        caption: "分镜图 02",
      },
      {
        src: asset5,
        alt: "AI 短片分镜图：手部特写镜头",
        fit: "cover",
        caption: "分镜图 03",
      },
      {
        src: asset6,
        alt: "AI 短片分镜图：人物冲突镜头",
        fit: "cover",
        caption: "分镜图 04",
      },
      {
        src: asset7,
        alt: "AI 短片分镜图：人物表情特写",
        fit: "cover",
        caption: "分镜图 05",
      },
      {
        src: asset8,
        alt: "AI 短片分镜图：黑白人物镜头",
        fit: "cover",
        caption: "分镜图 06",
      },
      {
        src: asset9,
        alt: "《悬置》压抑开场关键帧",
        fit: "cover",
        caption: "压抑中心构图",
        orientation: "landscape",
      },
    ],
    galleryLayout: "sequence-grid",
  } satisfies Project;

export default project;
