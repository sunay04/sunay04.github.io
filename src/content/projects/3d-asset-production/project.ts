import type { Project } from "../types";
import pianoFront from "./assets/piano-final-render-front.png";
import pianoRear from "./assets/piano-final-render-rear.png";
import conceptReference from "./assets/piano-concept-reference.png";
import highPoly from "./assets/piano-high-poly-model.png";
import lowPoly from "./assets/piano-low-poly-topology.png";
import uvLayout from "./assets/piano-uv-layout.png";
import bakeCheck from "./assets/piano-texture-bake-check.png";
import materialLayers from "./assets/piano-material-layers.png";
import birdZun from "./assets/bird-shaped-zun-render.jpg";
import clockTowerFront from "./assets/clock-tower-front-render.png";
import clockTowerAngle from "./assets/clock-tower-angle-render.png";

const project = {
  id: "3d-asset-production",
  number: "10",
  name: "三维场景与资产制作",
  category: "三维设计 / 模型与材质",
  role: "负责中高模制作、低模拓扑、UV 整理、贴图烘焙、材质绘制与最终渲染",
  year: "2026",
  summary:
    "以旧钢琴场景为核心，完成从原画分析、中模搭建到高低模、UV、烘焙、材质与渲染的完整资产流程；同时整理乌尊与钟楼等独立资产，探索金属器物、模块化建筑及多类材质的表现方式。",
  tags: ["三维建模", "高低模流程", "UV 拆分", "贴图烘焙", "材质制作"],
  metrics: ["1 套完整场景资产流程", "3 类三维资产展示", "覆盖建模、贴图与渲染全流程"],
  takeaways: [
    "先以中模确定整体比例、道具层级与观看节奏，再进入高模细化，减少后续结构返工。",
    "通过低模拓扑、UV 分区和烘焙检查建立可落地的资产规范，兼顾造型可读性与制作效率。",
    "用木纹、磨损、金属反光和纸张道具的材质差异统一旧化风格，并通过灯光强化舞台式氛围。",
  ],
  hero: {
    src: pianoFront,
    alt: "旧钢琴三维场景正面最终渲染",
    fit: "contain",
    caption: "旧钢琴场景 / 最终渲染",
    span: "wide",
    orientation: "landscape",
  },
  heroSupport: {
    src: pianoRear,
    alt: "旧钢琴三维场景背面最终渲染",
    fit: "contain",
    caption: "旧钢琴场景 / 背面结构",
    orientation: "landscape",
  },
  gallery: [
    {
      src: conceptReference,
      alt: "旧钢琴三维场景原画参考",
      fit: "contain",
      caption: "原画参考",
      orientation: "landscape",
    },
    {
      src: highPoly,
      alt: "旧钢琴场景高模制作展示",
      fit: "contain",
      caption: "高模制作",
      orientation: "landscape",
    },
    {
      src: lowPoly,
      alt: "旧钢琴场景低模拓扑展示",
      fit: "contain",
      caption: "低模拓扑",
      orientation: "landscape",
    },
    {
      src: uvLayout,
      alt: "旧钢琴场景 UV 编辑与整理界面",
      fit: "contain",
      caption: "UV 编辑整理",
      orientation: "landscape",
    },
    {
      src: bakeCheck,
      alt: "旧钢琴场景烘焙贴图检查",
      fit: "contain",
      caption: "烘焙贴图检查",
      orientation: "landscape",
    },
    {
      src: materialLayers,
      alt: "旧钢琴场景贴图绘制与材质图层",
      fit: "contain",
      caption: "贴图与材质层",
      orientation: "portrait",
    },
    {
      src: birdZun,
      alt: "鸟形乌尊金属器物三维渲染",
      fit: "contain",
      caption: "乌尊 / 金属器物资产",
      orientation: "landscape",
    },
    {
      src: clockTowerFront,
      alt: "模块化钟楼三维资产正面渲染",
      fit: "contain",
      caption: "钟楼 / 正面渲染",
      orientation: "portrait",
    },
    {
      src: clockTowerAngle,
      alt: "模块化钟楼三维资产侧面渲染",
      fit: "contain",
      caption: "钟楼 / 侧面渲染",
      orientation: "portrait",
    },
  ],
} satisfies Project;

export default project;
