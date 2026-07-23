import type { Project } from "../types";
import asset0 from "./assets/jinsha-rap-poster.png";
import asset1 from "./assets/jinsha-rap-alt-poster.png";
import asset2 from "./assets/jinsha-rap-ticket.jpg";
import asset3 from "./assets/jinsha-rap-invitation.jpg";
import asset4 from "./assets/jinsha-rap-display-board.png";
import asset5 from "./assets/jinsha-rap-bottle-mockup.png";

const project = {
    id: "jinsha-rap-performance-visual",
    number: "04",
    name: "聚金沙 4.0 说唱演出视觉",
    category: "演出视觉 / 海报与票券",
    role: "负责演出主海报、入场券与邀请函视觉设计，完成从主视觉到活动物料的统一延展",
    year: "2025",
    summary:
      "为 BOOZE 豪饮俱乐部“聚金沙 4.0”说唱演出设计宣发与现场物料。我以复古版画、古塔图像和手写字体连接在地文化与街头表达，并将主视觉延展到入场券和邀请函。",
    tags: ["演出海报", "入场券", "邀请函", "复古版画", "字体编排"],
    metrics: ["1 套演出主视觉", "3 类活动物料", "覆盖宣发、入场与邀约"],
    takeaways: [
      "以本土建筑作为核心识别符号，在文化语境与说唱演出气质之间建立关联。",
      "通过字号、对比与留白梳理演出阵容、时间地点和票务信息的阅读顺序。",
      "在海报、票券与邀请函之间保持统一的字体、纹理和色彩规则。",
    ],
    hero: {
      src: asset0,
      alt: "聚金沙 4.0 说唱演出主海报",
      fit: "contain",
      caption: "演出主海报",
      height: "tall",
      orientation: "portrait",
    },
    gallery: [
      {
        src: asset1,
        alt: "聚金沙 4.0 说唱演出海报变体",
        fit: "contain",
        caption: "海报变体",
        orientation: "portrait",
      },
      {
        src: asset2,
        alt: "聚金沙 4.0 说唱演出入场券设计",
        fit: "cover",
        caption: "入场券",
        orientation: "panorama",
      },
      {
        src: asset3,
        alt: "聚金沙 4.0 说唱演出邀请函设计",
        fit: "cover",
        caption: "邀请函",
        orientation: "panorama",
      },
      {
        src: asset4,
        alt: "聚金沙 4.0 说唱演出主视觉展板应用",
        fit: "cover",
        caption: "现场展板应用",
        orientation: "landscape",
      },
      {
        src: asset5,
        alt: "聚金沙 4.0 说唱演出 BOOZE 酒瓶视觉样机",
        fit: "cover",
        caption: "酒瓶视觉样机",
        orientation: "landscape",
      },
    ],
    galleryLayout: "feature-poster",
  } satisfies Project;

export default project;
