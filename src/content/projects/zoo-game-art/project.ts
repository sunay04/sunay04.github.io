import type { Project } from "../types";
const project = {
  "id": "zoo-game-art",
  "name": "动物园二合｜角色与地图设计",
  "category": "游戏美术",
  "year": "2026",
  "role": "前期角色设计 / 园区地图设计与多轮迭代",
  "summary": "围绕动物园主题与欧美卡通风格，开展前期角色设计和园区地图设计，并经历多轮地图方案迭代。",
  "tags": [
    "游戏美术",
    "角色设计",
    "地图设计",
    "实习项目"
  ],
  "hero": {
    "src": "/artworks/zoo/map.png",
    "alt": "动物园园区地图方案",
    "caption": "动物园园区地图方案",
    "fit": "contain"
  },
  "gallery": [],
  "blocks": [
    {
      "id": "intro",
      "type": "text",
      "heading": "亲和的角色，明亮的园区",
      "body": "通过角色服装、工具与表情表现动物园主题；地图结合木质建筑、动物活动区、水域与植物，呈现明亮的欧美卡通视觉。"
    },
    {
      "id": "characters",
      "type": "media",
      "media": {
        "src": "/artworks/zoo/characters.png",
        "alt": "前期角色设定：造型、表情、正背面与道具",
        "caption": "前期角色设定：造型、表情、正背面与道具",
        "fit": "contain"
      }
    },
    {
      "id": "map-intro",
      "type": "text",
      "heading": "园区地图 / 多轮迭代中的一版方案",
      "body": "地图经历了多轮版本调整。这里选取其中一版展示整体视觉与园区关系，不将单张方案标记为最终上线效果。"
    },
    {
      "id": "map",
      "type": "media",
      "media": {
        "src": "/artworks/zoo/map.png",
        "alt": "园区地图：建筑、水域与活动区域",
        "caption": "园区地图：建筑、水域与活动区域",
        "fit": "contain"
      }
    }
  ]
} satisfies Project;
export default project;
