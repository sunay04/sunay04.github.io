import type { Project } from "../content/projects";
import type { SiteContent } from "../content/site";

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
  return api<{ projects: Project[]; site?: SiteContent; sha: string | null }>("/api/content");
}

export async function publishRepositoryContent(projects: Project[], site: SiteContent, sha: string | null) {
  return api<{ sha: string; commitUrl: string }>("/api/content", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ projects, site, sha }),
  });
}

export async function uploadRepositoryMedia(file: File) {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error("读取文件失败"));
    reader.readAsDataURL(file);
  });
  return api<{ url: string }>("/api/media", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: file.name, type: file.type, size: file.size, base64 }),
  });
}
