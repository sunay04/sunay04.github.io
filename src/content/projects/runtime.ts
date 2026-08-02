import { projects as bundledProjects } from "./index";
import type { Project } from "./types";

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
    if (!Array.isArray(data) || !data.every(isProject)) return bundledProjects;
    return data;
  } catch {
    return bundledProjects;
  }
}

export { bundledProjects };
