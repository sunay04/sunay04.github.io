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
  return api<{ sha: string; commitSha: string; commitUrl: string }>("/api/content", {
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
  return api<{ url: string; originalName: string; displayName: string }>("/api/media", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: file.name, type: file.type, size: file.size, base64 }),
  });
}

export async function uploadRepositoryAudio(file: File, music: SiteContent["music"], trackId: string) {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error("读取音频文件失败"));
    reader.readAsDataURL(file);
  });
  return api<{ url: string; displayName: string; music: SiteContent["music"]; sha: string }>("/api/music/upload", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: file.name, type: file.type, size: file.size, base64, music, trackId }),
  });
}

export async function saveMusicPlaylist(music: SiteContent["music"]) {
  return api<{ music: SiteContent["music"]; sha: string }>("/api/music", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ music }),
  });
}

export type DeploymentStatus = {
  state: "queued" | "building" | "deploying" | "success" | "failure";
  progress: number;
  label: string;
  url?: string;
};

export async function getDeploymentStatus(commitSha: string) {
  return api<DeploymentStatus>(`/api/deployment?sha=${encodeURIComponent(commitSha)}`);
}
