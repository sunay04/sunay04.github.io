import type { Project } from "../types";
import asset0 from "./assets/shanxia-songmont-hero.png";
import asset1 from "./assets/shanxia-songmont-incense.png";
import asset2 from "./assets/shanxia-product-mockup.jpg";
import asset3 from "./assets/shanxia-product-concept.jpg";
import asset4 from "./assets/shanxia-contact.png";

const project = {
    id: "shanxia-yousong-fragrance-illustration",
    number: "09",
    name: "山下有松香氛插画",
    category: "品牌插画 / 社媒传播",
    role: "负责香氛主题插画创作与小红书发布视觉表达",
    year: "2026",
    summary:
      "为山西在地品牌山下有松探索香氛主题视觉，以自然、质朴且保留手作温度的插画语言回应品牌气质，并将作品延展到产品概念、包装样机与小红书传播。",
    tags: ["品牌插画", "香氛", "小红书", "视觉探索"],
    metrics: ["270 次点赞", "91 次收藏", "46 条评论"],
    takeaways: [
      "从品牌的地域与香氛属性中提炼自然、质朴和手作感，建立统一插画语言。",
      "将主视觉延展至烟雾意象、产品概念与包装场景，保持跨物料的一致性。",
      "发布内容获得 270 次点赞与 91 次收藏，收藏占比体现了视觉内容的参考价值。",
    ],
    liveUrl:
      "https://www.xiaohongshu.com/discovery/item/69f8503f0000000023006d3a?source=webshare&xhsshare=pc_web&xsec_token=AB1aPAVasTLsu4cvIcOvxnYpV5XZtfwbY4yBOkCjJmdyA=&xsec_source=pc_share",
    linkLabel: "查看发布笔记",
    hero: {
      src: asset0,
      alt: "山下有松 Songmont 香氛主视觉插画",
      fit: "contain",
      caption: "香氛主视觉",
      orientation: "portrait",
    },
    gallery: [
      {
        src: asset1,
        alt: "山下有松 Songmont 香氛烟雾插画",
        fit: "contain",
        caption: "香气流动视觉",
        orientation: "portrait",
      },
      {
        src: asset2,
        alt: "山下有松香氛产品与包装样机",
        fit: "cover",
        caption: "包装样机",
        orientation: "portrait",
      },
      {
        src: asset3,
        alt: "山下有松香氛产品理念页",
        fit: "contain",
        caption: "产品理念",
        orientation: "landscape",
      },
      {
        src: asset4,
        alt: "山下有松品牌插画发布与社媒数据",
        fit: "contain",
        caption: "社媒发布数据",
        orientation: "panorama",
      },
    ],
    galleryLayout: "poster-grid",
  } satisfies Project;

export default project;

