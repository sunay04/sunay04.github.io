import { projects as bundledProjects } from "./index";
import type { Project } from "./types";
import { bundledSite, type SiteContent } from "../site";

export const CONTENT_ENDPOINT = "/content/projects.json";

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Project>;
  return typeof item.id === "string" && typeof item.name === "string" && Array.isArray(item.gallery);
}

export async function loadPublishedProjects(signal?: AbortSignal): Promise<Project[]> {
  try {
    const response = await fetch(CONTENT_ENDPOINT, { signal, cache: "no-cache" });
    if (!response.ok) return bundledProjects;
    const data: unknown = await response.json();
    const projects = Array.isArray(data) ? data : (data as { projects?: unknown })?.projects;
    if (!Array.isArray(projects) || !projects.every(isProject)) return bundledProjects;
    return projects;
  } catch {
    return bundledProjects;
  }
}

export async function loadPublishedContent(signal?: AbortSignal): Promise<{ projects: Project[]; site: SiteContent }> {
  try {
    const response = await fetch(CONTENT_ENDPOINT, { signal, cache: "no-cache" });
    if (!response.ok) return { projects: bundledProjects, site: bundledSite };
    const data = await response.json() as { projects?: Project[]; site?: SiteContent } | Project[];
    if (Array.isArray(data)) return { projects: data, site: bundledSite };
    return { projects: Array.isArray(data.projects) ? data.projects : bundledProjects, site: data.site ?? bundledSite };
  } catch { return { projects: bundledProjects, site: bundledSite }; }
}

export { bundledProjects };
