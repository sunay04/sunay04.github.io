import type { Project } from "../types";
import interfacePage from "./assets/y3k-interface-page.png";
import interfaceEditor from "./assets/y3k-interface-unity-editor.png";
import villageEditor from "./assets/low-poly-village-editor.png";
import villageRiverside from "./assets/low-poly-village-riverside-render.png";
import villageForest from "./assets/low-poly-village-forest-render.png";
import villageCoastal from "./assets/low-poly-village-coastal-render.png";

const project = {
  id: "unity-interactive-scene-study",
  number: "11",
  name: "Unity 交互界面与场景搭建",
  category: "交互设计",
  role: "负责 Unity UI 与页面逻辑实现、素材整合、三维场景布置、材质调节、镜头与氛围呈现",
  year: "2026",
  summary:
    "围绕 Unity 的界面交互与实时场景进行两组实践：以 Y3K 液态金属视觉搭建带视频背景和页面切换的网页式 UI；使用 Unity 2021 整合建筑、河流、植被、路径与生活道具，完成低多边形自然村落的场景构建。",
  tags: ["交互设计", "三维制作", "实时场景"],
  metrics: ["2 组 Unity 实践", "完成多页面导航与视频背景", "完成 1 套低多边形村落场景"],
  takeaways: [
    "使用 Unity UI、VideoPlayer 与 C# 管理脚本组织首页、分页面和返回逻辑，形成基础网页式导航体验。",
    "按建筑、自然环境、路径和生活道具分层整合素材，使复杂场景保持清晰的空间层级。",
    "通过材质、镜头视角与环境氛围的连续调整，将编辑器中的素材组合推进为完整的实时画面。",
  ],
  hero: {
    src: interfacePage,
    alt: "Y3K 液态金属主题 Unity 交互页面",
    fit: "contain",
    caption: "Y3K 交互界面 / 页面呈现",
    span: "wide",
    orientation: "landscape",
  },
  heroSupport: {
    src: interfaceEditor,
    alt: "Y3K 交互界面的 Unity 编辑器实现",
    fit: "contain",
    caption: "Y3K 交互界面 / Unity 编辑器",
    orientation: "landscape",
  },
  gallery: [
    {
      src: villageEditor,
      alt: "低多边形自然村落 Unity 场景编辑器",
      fit: "contain",
      caption: "自然村落 / 场景搭建",
      orientation: "landscape",
    },
    {
      src: villageRiverside,
      alt: "低多边形自然村落河畔建筑实时渲染",
      fit: "cover",
      caption: "自然村落 / 河畔视角",
      orientation: "landscape",
    },
    {
      src: villageForest,
      alt: "低多边形自然村落林地与花田实时渲染",
      fit: "cover",
      caption: "自然村落 / 林地视角",
      orientation: "landscape",
    },
    {
      src: villageCoastal,
      alt: "低多边形自然村落滨水建筑实时渲染",
      fit: "cover",
      caption: "自然村落 / 滨水视角",
      orientation: "landscape",
    },
  ],
  galleryLayout: "sequence-grid",
} satisfies Project;

export default project;
