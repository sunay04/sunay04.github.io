import type { Project } from "../types";
import asset0 from "./assets/narrative-illustration-city-rooftop.jpg";

const project = {
    id: "city-rooftop-narrative-illustration",
    number: "07",
    name: "城市天台叙事插画",
    category: "数字插画 / 角色叙事",
    role: "负责角色设定、场景氛围、动物意象与整体画面绘制",
    year: "2025",
    summary:
      "以城市天台为叙事场景，通过拥抱中的角色、飞鸟、狐狸与鲨鱼等意象，将现实空间和幻想元素并置。我重点处理角色关系、前后景动线与暖色光影，使单幅画面具备完整的情绪线索。",
    tags: ["数字插画", "角色关系", "城市幻想", "场景叙事", "Procreate"],
    metrics: ["1 幅完整叙事插画", "角色与场景独立绘制", "横版多层次构图"],
    takeaways: [
      "用角色动作与视线关系建立叙事中心，让观看顺序从人物自然延伸到环境。",
      "通过动物意象连接现实与幻想，使画面在单一场景中保留想象空间。",
      "以暖色城市光和清晰的前后景层次统一复杂元素，避免视觉焦点分散。",
    ],
    hero: {
      src: asset0,
      alt: "城市天台叙事插画，人物拥抱与动物意象",
      fit: "contain",
      caption: "叙事插画",
      span: "wide",
      orientation: "landscape",
    },
    gallery: [],
  } satisfies Project;

export default project;

