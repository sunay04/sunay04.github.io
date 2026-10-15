import type { Project } from '../types';
const project = {
  "id": "ai-spine-game-art-workflow",
  "name": "AI 辅助游戏动态资产设计",
  "category": "游戏美术",
  "year": "2026.10",
  "summary": "从视觉匹配、角色资产生成、PS 修整拆层\n到 Spine 动画适配",
  "role": "全流程制作 / PS 手工拆分 / AI 辅助视觉与动画制作",
  "tags": [
    "Spine",
    "AIGC",
    "动态资产",
    "剧情演出"
  ],
  "detailLayout": "case-study",
  "hero": {
    "src": "/artworks/spine-workflow/background.png",
    "alt": "庄园入口剧情动画场景",
    "caption": "庄园入口剧情动画场景",
    "fit": "contain"
  },
  "heroSupport": {
    "src": "/artworks/spine-workflow/full-preview.gif",
    "alt": "剪刀剪荆棘、递花、开门与推进动态预览合辑",
    "caption": "庄园开场演出 / 制作预览合辑 · 自动循环",
    "fit": "contain"
  },
  "gallery": [],
  "blocks": [
    {
      "id": "task",
      "type": "text",
      "heading": "02 / Original Task｜让静态场景承接剧情",
      "body": "围绕庄园入口制作荆棘剪除、人物递花、铁门开启与镜头推进。既有场景需要保持统一构图，静态图像则需要转换为可独立控制的动画部件。"
    },
    {
      "id": "task-comparison",
      "type": "gallery",
      "columns": 2,
      "items": [
        {
          "src": "/artworks/spine-workflow/original-task.png",
          "alt": "原始需求｜既有 UI 与荆棘场景",
          "caption": "原始需求｜既有 UI 与荆棘场景",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/full-preview.gif",
          "alt": "目标效果｜四段演出制作预览合辑",
          "caption": "目标效果｜四段演出制作预览合辑",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "task-steps",
      "type": "metrics",
      "items": [
        "荆棘剪除",
        "人物递花",
        "铁门开启",
        "镜头推进"
      ]
    },
    {
      "id": "analysis",
      "type": "text",
      "heading": "03 / Visual Analysis｜从画面关系判断动作",
      "body": "剪刀需要围绕连接点开合，左右门扇需要围绕门轴向内开启；镜头推进时，门轴与场景关系也需要保持稳定。"
    },
    {
      "id": "motion-analysis",
      "type": "media",
      "media": {
        "src": "/artworks/spine-workflow/motion-analysis.svg",
        "alt": "剪刀轴心、左右门轴、人物位置与镜头方向标注图",
        "caption": "Static Image → Motion Relationship Analysis → Separable Assets",
        "fit": "contain"
      }
    },
    {
      "id": "ai",
      "type": "text",
      "heading": "04 / AI Generation & Refinement｜让生成结果满足制作需求",
      "body": "项目由我负责完整制作，视觉与动态制作使用 AI 辅助，PS 拆分由我手工完成。以庄园底图为例：首版去门底层可以辅助定位，但留下了大面积透明缺口，无法承接开门后的画面。我要求保留原构图，补全天空、草地与道路，重新生成完整底图后再用于分层制作。"
    },
    {
      "id": "ai-base-selection",
      "type": "gallery",
      "columns": 2,
      "items": [
        {
          "src": "/artworks/spine-workflow/ai-base-incomplete.png",
          "alt": "× 不作为完整底图｜地面缺口、透明区域",
          "caption": "× 不作为完整底图｜地面缺口、透明区域",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/ai-base-complete.png",
          "alt": "✓ 选用完整底图｜道路、草地与背景连续",
          "caption": "✓ 选用完整底图｜道路、草地与背景连续",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "ai-character",
      "type": "text",
      "heading": "角色生成｜锁定身份，再改变动作",
      "body": "以持篮人物为造型参考，保持镜头、面部、服装与光照一致，生成向前递花的姿态；重点检查头部与身体中心、双手及花篮边缘，保留完整轮廓。选用结果再进入 PS，准备持篮 / 递花两种可切换状态。底图补全使用 Seedream 5.0 Pro Edit，人物姿态使用内置图像编辑。"
    },
    {
      "id": "ai-character-process",
      "type": "gallery",
      "columns": 3,
      "items": [
        {
          "src": "/artworks/spine-workflow/ai-vivian-hold.png",
          "alt": "Reference｜持篮造型参考",
          "caption": "Reference｜持篮造型参考",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/ai-vivian-offer.png",
          "alt": "AI Generation｜花篮向前递出",
          "caption": "AI Generation｜花篮向前递出",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/vivian_offer.png",
          "alt": "PS Layered Asset｜递花状态切片",
          "caption": "PS Layered Asset｜递花状态切片",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "ps-control",
      "type": "text",
      "heading": "人工修整与定位｜让 AI 辅助制作变得可控",
      "body": "当第一版剪刀位置不符合要求时，我在场景 PSD 中直接摆好剪刀的位置、大小与角度，并保留前后刀片及连接点独立图层。后续开合与纵向运动依据这份定位稿制作，减少对剪切位置的猜测。"
    },
    {
      "id": "ps-placement-comparison",
      "type": "gallery",
      "columns": 2,
      "items": [
        {
          "src": "/artworks/spine-workflow/original-task.png",
          "alt": "Before｜原始场景 UI 参考",
          "caption": "Before｜原始场景 UI 参考",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/ps-placement.png",
          "alt": "After｜手工 PSD 定位与分层稿",
          "caption": "After｜手工 PSD 定位与分层稿",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "separation",
      "type": "text",
      "heading": "05 / Asset Separation｜按运动关系拆分",
      "body": "将剪刀拆为前刀片、后刀片与连接点，将荆棘和左右门扇独立分层；人物递花使用持篮与递出两种状态。拆层的目的，是让各部件围绕自己的运动关系控制，保留统一画风与完整轮廓。"
    },
    {
      "id": "scissors",
      "type": "gallery",
      "columns": 3,
      "items": [
        {
          "src": "/artworks/spine-workflow/blade_front.png",
          "alt": "Front Blade｜Rotation",
          "caption": "Front Blade｜Rotation",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/blade_back.png",
          "alt": "Back Blade｜Rotation",
          "caption": "Back Blade｜Rotation",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/screw.png",
          "alt": "Pivot｜24×24 原尺寸连接点",
          "caption": "Pivot｜24×24 原尺寸连接点",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "scene-parts",
      "type": "gallery",
      "columns": 2,
      "items": [
        {
          "src": "/artworks/spine-workflow/vine_left.png",
          "alt": "Vine L｜剪后下落与淡出",
          "caption": "Vine L｜剪后下落与淡出",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/vine_right.png",
          "alt": "Vine R｜剪后下落与淡出",
          "caption": "Vine R｜剪后下落与淡出",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/gate_left.png",
          "alt": "Gate L｜Pivot Rotation",
          "caption": "Gate L｜Pivot Rotation",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/gate_right.png",
          "alt": "Gate R｜Pivot Rotation",
          "caption": "Gate R｜Pivot Rotation",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "character-states",
      "type": "gallery",
      "columns": 2,
      "items": [
        {
          "src": "/artworks/spine-workflow/vivian_hold.png",
          "alt": "Hold｜Pose Transition",
          "caption": "Hold｜Pose Transition",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/vivian_offer.png",
          "alt": "Offer｜Pose Transition",
          "caption": "Offer｜Pose Transition",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "motion",
      "type": "text",
      "heading": "06 / Motion Design｜用分段动作组织叙事",
      "body": "剪除 → 人物揭示与递花 → 开门 → 镜头推进。分段动作便于独立检查节奏、透视与转场。"
    },
    {
      "id": "motion-clips",
      "type": "gallery",
      "columns": 3,
      "items": [
        {
          "src": "/artworks/spine-workflow/cut-preview.gif",
          "alt": "Scissors｜进场 → 剪合 → 荆棘落下",
          "caption": "Scissors｜进场 → 剪合 → 荆棘落下",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/vivian-offer-preview.gif",
          "alt": "Character｜Hold → Reach → Offer",
          "caption": "Character｜Hold → Reach → Offer",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/gate-preview.gif",
          "alt": "Gate｜恢复 → Opening → Open",
          "caption": "Gate｜恢复 → Opening → Open",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "spine-evidence",
      "type": "media",
      "media": {
        "src": "/artworks/spine-workflow/spine-control-evidence.svg",
        "alt": "Spine 控制骨层级与剪切事件时间线",
        "caption": "真实工程数据可视化 / 非 Spine 编辑器截图",
        "fit": "contain"
      }
    },
    {
      "id": "final",
      "type": "text",
      "heading": "07 / Final｜动态资产与引擎验证",
      "body": "已形成可编辑 Spine 工程与 JSON、atlas、PNG 交付包。剪除与原演出有本地 Unity 播放验证记录，镜头平稳推进有原生采样记录。下方合辑串联剪除、递花、新铁门开启与推进；新版铁门尚未合入当前 Unity，也未完成正式游戏验收。"
    },
    {
      "id": "final-animation",
      "type": "media",
      "media": {
        "src": "/artworks/spine-workflow/full-preview.gif",
        "alt": "FINAL ANIMATION｜庄园开场演出制作预览合辑",
        "caption": "自动循环 / 由不同版本的既有制作片段剪辑，非当前 Unity 完整录屏",
        "fit": "contain"
      }
    },
    {
      "id": "unity-evidence",
      "type": "gallery",
      "columns": 3,
      "items": [
        {
          "src": "/artworks/spine-workflow/unity-cut.png",
          "alt": "Unity Play｜剪刀与荆棘",
          "caption": "Unity Play｜剪刀与荆棘",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/unity-offer.png",
          "alt": "Unity Play｜人物递花",
          "caption": "Unity Play｜人物递花",
          "fit": "contain"
        },
        {
          "src": "/artworks/spine-workflow/unity-push.png",
          "alt": "Unity 原生采样｜平稳推进末态",
          "caption": "Unity 原生采样｜平稳推进末态",
          "fit": "contain"
        }
      ]
    },
    {
      "id": "pipeline",
      "type": "text",
      "heading": "AI Generation → PS Refinement → Asset Separation → Spine → Unity",
      "body": "生成与筛选 → 人工修整拆层 → 动画制作 → JSON / atlas / PNG → 本地运行验证"
    }
  ],
  "resources": [
    {
      "label": "Unity Play 验证记录",
      "href": "/artworks/spine-workflow/unity-play-evidence.txt",
      "note": "本地资源演示，非正式游戏或设备验收"
    },
    {
      "label": "镜头推进原生采样记录",
      "href": "/artworks/spine-workflow/unity-camera-evidence.txt",
      "note": "0 / 2.1 / 4.2 秒编辑态原生采样"
    }
  ]
} satisfies Project;
export default project;
