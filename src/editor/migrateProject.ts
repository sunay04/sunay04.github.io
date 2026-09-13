import type { Project, ProjectBlock } from "../content/projects/types";

export function migrateProject(project: Project): Project {
  const dated = { ...project, startDate: project.startDate ?? (project.year ? `${project.year}-01` : "") };
  if (project.blocks !== undefined) return dated;
  const blocks: ProjectBlock[] = [];
  const uid = () => `${project.id}-legacy-${blocks.length}`;
  if (project.role) blocks.push({ id: uid(), type: "text", heading: "担任角色", body: project.role });
  if (project.metrics?.length) blocks.push({ id: uid(), type: "metrics", items: project.metrics });
  blocks.push({ id: uid(), type: "media", media: { ...project.hero } });
  if (project.heroSupport) blocks.push({ id: uid(), type: "media", media: { ...project.heroSupport } });
  if (project.takeaways?.length) blocks.push({ id: uid(), type: "text", heading: "关键决策与贡献", body: project.takeaways.join("\n") });
  if (project.gallery.length) blocks.push({ id: uid(), type: "gallery", items: project.gallery, columns: 2 });
  return { ...dated, blocks, role: undefined, metrics: undefined };
}

