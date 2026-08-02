import type { Project } from "../types";
import asset0 from "./assets/haina-market-service.png";
import asset1 from "./assets/haina-market-signage.png";
import asset2 from "./assets/haina-henna-detail-02.png";
import asset3 from "./assets/haina-henna-detail-03.png";
import asset4 from "./assets/haina-market-reference.png";

const project = {
    id: "henna-pop-up-market",
    number: "08",
    name: "海娜文化快闪集市",
    category: "内容运营",
    role: "2 人团队创业项目；负责品牌调研、招牌设计、运营宣发、活动策划、采购与服务交付",
    year: "2026",
    summary:
      "与搭档在山西大同东南邑运营为期 2 个月的海娜文化快闪。项目从 10+ 同类店铺调研出发，完成服务套餐、摊位物料、现场交付和小红书内容运营，把文化体验转化为游客易理解、可购买的线下服务。",
    tags: ["内容运营", "活动策划", "商业项目"],
    metrics: ["连续运营 2 个月", "调研 10+ 同类店铺", "发布 36 篇小红书笔记"],
    takeaways: [
      "根据同类店铺和游客需求调研，参与套餐设计、定价、采购及服务流程搭建。",
      "把海娜文化体验拆解为明确的图案、时长与价格选项，降低现场决策门槛。",
      "同步负责摊位视觉与 36 篇社媒内容，让线上种草与线下体验形成完整链路。",
    ],
    hero: {
      src: asset4,
      alt: "海娜文化快闪集市同类市集与摊位参考",
      fit: "contain",
      caption: "市集氛围参考",
      span: "wide",
      orientation: "panorama",
    },
    gallery: [
      {
        src: asset1,
        alt: "海娜文化快闪集市招牌与摊位展示",
        fit: "contain",
        caption: "摊位招牌",
        orientation: "panorama",
      },
      {
        src: asset2,
        alt: "海娜手绘服务交付细节",
        fit: "cover",
        caption: "服务交付细节",
        orientation: "portrait",
      },
      {
        src: asset3,
        alt: "海娜手绘图案落地效果",
        fit: "cover",
        caption: "图案落地效果",
        orientation: "portrait",
      },
      {
        src: asset0,
        alt: "海娜文化快闪集市现场服务与招牌",
        fit: "cover",
        caption: "线下快闪服务现场",
        orientation: "panorama",
      },
    ],
  } satisfies Project;

export default project;
