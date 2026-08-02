import type { Project } from "../content/projects";

export type EditorUser = { login: string; avatarUrl: string; repository: string };

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, credentials: "include" });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((body as { error?: string }).error ?? "请求失败");
  return body as T;
}

export async function getEditorSession() {
  return api<{ authenticated: boolean; configured: boolean; user?: EditorUser }>("/api/auth/session");
}

export async function getRepositoryContent() {
  return api<{ projects: Project[]; sha: string | null }>("/api/content");
}

export async function publishRepositoryContent(projects: Project[], sha: string | null) {
  return api<{ sha: string; commitUrl: string }>("/api/content", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ projects, sha }),
  });
}
