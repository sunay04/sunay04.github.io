import type { Project } from "../types";
import asset0 from "./assets/meituan-billiard-66-300.png";
import asset1 from "./assets/meituan-billiard-private-room-4h.png";
import asset2 from "./assets/meituan-billiard-black8-1h.png";
import asset3 from "./assets/meituan-billiard-beginner-coach.png";

const project = {
    id: "meituan-billiard-group-buying",
    number: "06",
    name: "美团团购真实落地案例",
    category: "内容运营",
    role: "负责团购套餐主图、优惠信息层级、活动卖点提炼与平台投放视觉设计",
    year: "2025",
    summary:
      "为立星乔氏台球俱乐部制作美团团购上线物料，将价格、时长、包间和教练服务等套餐权益转化为适合平台缩略图浏览的决策信息，帮助用户快速比较并理解不同套餐。",
    tags: ["内容运营", "商业项目", "信息设计"],
    metrics: ["4 张平台上线物料", "覆盖 4 类团购权益", "服务真实门店投放"],
    takeaways: [
      "把复杂套餐压缩为价格、时长与服务内容三个优先层级，降低用户理解成本。",
      "针对美团缩略图浏览场景强化字号与色彩对比，确保核心权益在小尺寸下可读。",
      "用统一模板承载不同套餐，兼顾门店识别与后续物料扩展效率。",
    ],
    hero: {
      src: asset0,
      alt: "美团团购真实落地案例，66 代 300 元优惠物料",
      fit: "cover",
      caption: "团购优惠主图",
      span: "wide",
      orientation: "landscape",
    },
    gallery: [
      {
        src: asset1,
        alt: "美团团购轻奢小包 4 小时物料",
        fit: "cover",
        caption: "轻奢小包 4 小时",
        orientation: "landscape",
      },
      {
        src: asset2,
        alt: "美团团购中式黑八 1 小时物料",
        fit: "cover",
        caption: "中式黑八 1 小时",
        orientation: "landscape",
      },
      {
        src: asset3,
        alt: "美团团购中式黑八初级教练 1 小时物料",
        fit: "cover",
        caption: "初级教练 1 小时",
        orientation: "landscape",
      },
    ],
  } satisfies Project;

export default project;
