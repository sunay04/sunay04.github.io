import type { Project } from "../types";

const project = {
  "id": "hbn-daguangsai-film",
  "name": "HBN 大广赛广告短片",
  "category": "品牌影像",
  "year": "2023",
  "summary": "2023 年大广赛 HBN 命题广告短片，获省一等奖。我负责创意策划、拍摄与剪辑，以绘画场景和产品镜头组织短片的视觉叙事，将创意构思落实为完整影像。",
  "tags": [
    "省一等奖",
    "大广赛",
    "创意策划",
    "拍摄剪辑"
  ],
  "bilibiliVideoId": "BV1MVhm6ZEtT",
  "hero": {
    "src": "/artworks/hbn-daguangsai/cover-selected.png",
    "alt": "HBN 产品与画中人物的广告短片封面",
    "fit": "cover",
    "caption": "作品封面"
  },
  "gallery": [
    {
      "src": "/artworks/hbn-daguangsai/story.jpg",
      "alt": "HBN 广告短片中的画作场景",
      "caption": "画作场景"
    },
    {
      "src": "/artworks/hbn-daguangsai/scene.jpg",
      "alt": "HBN 广告短片中的人物与绘画场景",
      "caption": "人物与绘画场景"
    }
  ],
  "blocks": [
    {
      "id": "hbn-award",
      "type": "text",
      "heading": "获奖成果",
      "body": "2023 年大广赛 · 省一等奖"
    },
    {
      "id": "hbn-role",
      "type": "text",
      "heading": "担任角色",
      "body": "创意策划 / 拍摄 / 剪辑"
    },
    {
      "id": "hbn-contribution",
      "type": "text",
      "heading": "创作与执行",
      "body": "围绕 HBN 命题进行创意策划，负责拍摄与后期剪辑，完成从创意构思到成片的执行。"
    },
    {
      "id": "hbn-gallery",
      "type": "gallery",
      "columns": 2,
      "items": [
        {
          "src": "/artworks/hbn-daguangsai/story.jpg",
          "alt": "HBN 广告短片中的画作场景",
          "caption": "画作场景"
        },
        {
          "src": "/artworks/hbn-daguangsai/scene.jpg",
          "alt": "HBN 广告短片中的人物与绘画场景",
          "caption": "人物与绘画场景"
        }
      ]
    }
  ],
  "resources": [
    {
      "label": "在 B 站观看 HBN 广告短片",
      "href": "https://www.bilibili.com/video/BV1MVhm6ZEtT/",
      "note": "完整作品"
    }
  ],
  "startDate": ""
} satisfies Project;

export default project;
