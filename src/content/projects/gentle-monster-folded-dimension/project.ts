import type { Project } from "../types";
import asset0 from "./assets/gentle-fold-full-layout.jpg";
import asset1 from "./assets/gentle-fold-main-visual-01.png";
import asset2 from "./assets/gentle-fold-main-visual-02.jpg";
import asset3 from "./assets/gentle-fold-cover.png";
import asset4 from "./assets/gentle-fold-mockup-01.png";
import asset5 from "./assets/gentle-fold-mockup-02.png";
import asset6 from "./assets/gentle-fold-dynamic-visual.mp4";

const project = {
    id: "gentle-monster-folded-dimension",
    number: "02",
    name: "GENTLE MONSTER 折叠的维度",
    category: "品牌视觉 / 延展设计",
    role: "团队 5 人项目；负责草图、线稿、色稿、上色、字体与品牌延展等全流程视觉执行",
    year: "2026",
    summary:
      "围绕 GENTLE MONSTER 的先锋与实验气质，团队以昆虫、骨骼、镜片和折叠结构构建冒险叙事。我负责从草图到成稿及字体、橱窗和动态延展，将核心概念推进为可跨场景使用的品牌视觉系统。",
    tags: ["品牌命题", "主视觉", "字体设计", "橱窗 / 周边", "动态延展"],
    metrics: ["5 人团队协作", "6 类品牌应用场景", "静态与动态双线交付"],
    takeaways: [
      "从主视觉建立统一的造型与色彩规则，再延展至海报、橱窗、产品和周边物料。",
      "用昆虫、骨骼与镜片的形态关系回应品牌的异质感，而非依赖装饰性符号。",
      "在多人协作中承担主要视觉执行，确保不同媒介保持一致的识别度。",
    ],
    resources: [
      {
        label: "打开完整版长图",
        href: asset0,
        note: "原图文件",
      },
    ],
    hero: {
      src: asset1,
      alt: "GENTLE MONSTER 折叠的维度主视觉，以虫观我",
      fit: "contain",
      caption: "主图 01",
      span: "wide",
      orientation: "landscape",
    },
    heroSupport: {
      src: asset2,
      alt: "GENTLE MONSTER 折叠的维度主视觉，以镜观骨",
      fit: "contain",
      caption: "主图 02",
      orientation: "landscape",
    },
    gallery: [
      {
        src: asset3,
        alt: "GENTLE MONSTER 折叠的维度项目封面",
        fit: "cover",
        caption: "项目封面",
        span: "wide",
      },
      {
        src: asset4,
        alt: "GENTLE MONSTER 折叠的维度橱窗样机，以镜观骨",
        fit: "cover",
        caption: "橱窗样机 01",
      },
      {
        src: asset5,
        alt: "GENTLE MONSTER 折叠的维度橱窗样机，以虫观我",
        fit: "cover",
        caption: "橱窗样机 02",
      },
      {
        src: asset6,
        alt: "GENTLE MONSTER 折叠的维度延展动态视觉",
        type: "video",
        fit: "cover",
        caption: "延展动态视觉",
        span: "wide",
      },
    ],
  } satisfies Project;

export default project;
