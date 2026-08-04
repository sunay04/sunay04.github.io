interface AssetsBinding { fetch(request: Request): Promise<Response> }

interface Env {
  ASSETS: AssetsBinding;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  SESSION_SECRET: string;
  REPO_OWNER?: string;
  REPO_NAME?: string;
  CONTENT_PATH?: string;
}

type Session = { accessToken: string; login: string; avatarUrl: string; exp: number };

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function json(data: unknown, status = 200, headers?: HeadersInit) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
}

function base64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function standardBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(normalized), (char) => char.charCodeAt(0));
}

function cookie(request: Request, name: string) {
  const match = request.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

async function encryptionKey(secret: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt", "decrypt"]);
}

async function seal(session: Session, secret: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await encryptionKey(secret), encoder.encode(JSON.stringify(session)));
  const payload = new Uint8Array(iv.length + encrypted.byteLength);
  payload.set(iv); payload.set(new Uint8Array(encrypted), iv.length);
  return base64Url(payload);
}

async function unseal(value: string | null, secret: string): Promise<Session | null> {
  if (!value || !secret) return null;
  try {
    const payload = fromBase64Url(value);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: payload.slice(0, 12) }, await encryptionKey(secret), payload.slice(12));
    const session = JSON.parse(decoder.decode(decrypted)) as Session;
    return session.exp > Date.now() ? session : null;
  } catch { return null; }
}

function config(env: Env) {
  return { owner: env.REPO_OWNER ?? "sunay04", repo: env.REPO_NAME ?? "sunay04.github.io", path: env.CONTENT_PATH ?? "public/content/projects.json" };
}

async function github<T>(path: string, token: string, init?: RequestInit): Promise<{ data: T; response: Response }> {
  const response = await fetch(`https://api.github.com${path}`, { ...init, headers: { accept: "application/vnd.github+json", authorization: `Bearer ${token}`, "user-agent": "sunay-portfolio-editor", "x-github-api-version": "2022-11-28", ...init?.headers } });
  const data = await response.json().catch(() => ({})) as T;
  return { data, response };
}

type StoredTrack = { id: string; title: string; artist?: string; src: string };

function validMusic(value: unknown): value is StoredTrack[] {
  return Array.isArray(value) && value.length <= 100 && value.every((track) => track && typeof track === "object" && typeof (track as StoredTrack).id === "string" && typeof (track as StoredTrack).title === "string" && typeof (track as StoredTrack).src === "string");
}

async function persistMusic(music: StoredTrack[], session: Session, env: Env) {
  const { owner, repo, path } = config(env);
  const current = await github<{ content?: string; sha?: string }>(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken);
  if (!current.response.ok || !current.data.content || !current.data.sha) return { response: json({ error: "无法读取播放列表内容" }, current.response.status), sha: null };
  let document: Record<string, unknown>;
  try { document = JSON.parse(decoder.decode(Uint8Array.from(atob(current.data.content.replace(/\n/g, "")), (char) => char.charCodeAt(0)))) as Record<string, unknown>; }
  catch { return { response: json({ error: "播放列表内容格式无效" }, 422), sha: null }; }
  const site = document.site && typeof document.site === "object" ? document.site as Record<string, unknown> : {};
  const serialized = JSON.stringify({ ...document, site: { ...site, music } }, null, 2) + "\n";
  const result = await github<{ content?: { sha?: string } }>(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "content: update music playlist from portfolio editor", content: standardBase64(encoder.encode(serialized)), sha: current.data.sha, branch: "main" }),
  });
  if (!result.response.ok) return { response: json({ error: "播放列表保存失败" }, result.response.status), sha: null };
  return { response: null, sha: result.data.content?.sha ?? current.data.sha };
}

async function canEdit(session: Session, env: Env) {
  const { owner, repo } = config(env);
  if (session.login.toLowerCase() === owner.toLowerCase()) return true;
  const { data, response } = await github<{ permission?: string }>(`/repos/${owner}/${repo}/collaborators/${session.login}/permission`, session.accessToken);
  return response.ok && ["admin", "maintain", "write"].includes(data.permission ?? "");
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function handleApi(request: Request, env: Env) {
  const url = new URL(request.url);
  const configured = Boolean(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET && env.SESSION_SECRET);
  const session = await unseal(cookie(request, "sunay_session"), env.SESSION_SECRET);

  if (url.pathname === "/api/auth/session") {
    if (!session) return json({ authenticated: false, configured });
    const allowed = await canEdit(session, env);
    if (!allowed) return json({ authenticated: false, configured, error: "当前 GitHub 用户没有仓库编辑权限" }, 403);
    const { owner, repo } = config(env);
    return json({ authenticated: true, configured, user: { login: session.login, avatarUrl: session.avatarUrl, repository: `${owner}/${repo}` } });
  }

  if (url.pathname === "/api/auth/github") {
    if (!configured) return json({ error: "GitHub OAuth 尚未配置" }, 503);
    const state = base64Url(crypto.getRandomValues(new Uint8Array(24)));
    const redirect = new URL("https://github.com/login/oauth/authorize");
    redirect.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
    redirect.searchParams.set("redirect_uri", `${url.origin}/api/auth/callback`);
    redirect.searchParams.set("scope", "public_repo");
    redirect.searchParams.set("state", state);
    return new Response(null, { status: 302, headers: { location: redirect.toString(), "set-cookie": `sunay_oauth_state=${state}; Path=/api/auth/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=600` } });
  }

  if (url.pathname === "/api/auth/callback") {
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    if (!state || state !== cookie(request, "sunay_oauth_state") || !code) return json({ error: "OAuth state 校验失败" }, 400);
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", { method: "POST", headers: { accept: "application/json", "content-type": "application/json" }, body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${url.origin}/api/auth/callback` }) });
    const tokenBody = await tokenResponse.json() as { access_token?: string; error_description?: string };
    if (!tokenBody.access_token) return json({ error: tokenBody.error_description ?? "GitHub 登录失败" }, 401);
    const user = await github<{ login: string; avatar_url: string }>("/user", tokenBody.access_token);
    if (!user.response.ok) return json({ error: "无法读取 GitHub 用户信息" }, 401);
    const nextSession: Session = { accessToken: tokenBody.access_token, login: user.data.login, avatarUrl: user.data.avatar_url, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
    if (!await canEdit(nextSession, env)) return json({ error: "当前 GitHub 用户不是仓库所有者或协作者" }, 403);
    const sealed = await seal(nextSession, env.SESSION_SECRET);
    return new Response(null, { status: 302, headers: { location: "/edits", "set-cookie": `sunay_session=${sealed}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800` } });
  }

  if (url.pathname === "/api/auth/logout") return new Response(null, { status: 302, headers: { location: "/edits", "set-cookie": "sunay_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" } });
  if (!session || !await canEdit(session, env)) return json({ error: "没有仓库编辑权限" }, 403);

  if (url.pathname === "/api/content" && request.method === "GET") {
    const { owner, repo, path } = config(env);
    const { data, response } = await github<{ content?: string; sha?: string }>(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken);
    if (response.status === 404) return json({ projects: [], sha: null });
    if (!response.ok || !data.content) return json({ error: "无法读取仓库内容" }, response.status);
    try { const parsed = JSON.parse(decoder.decode(Uint8Array.from(atob(data.content.replace(/\n/g, "")), (char) => char.charCodeAt(0)))); return json(Array.isArray(parsed) ? { projects: parsed, sha: data.sha ?? null } : { ...parsed, sha: data.sha ?? null }); }
    catch { return json({ error: "仓库内容格式无效" }, 422); }
  }

  if (url.pathname === "/api/content" && request.method === "PUT") {
    if (!sameOrigin(request)) return json({ error: "拒绝跨站写入" }, 403);
    const body = await request.json().catch(() => null) as { projects?: unknown[]; site?: unknown; sha?: string | null } | null;
    if (!body || !Array.isArray(body.projects) || body.projects.length > 100) return json({ error: "作品数据无效" }, 400);
    const serialized = JSON.stringify({ projects: body.projects, site: body.site }, null, 2) + "\n";
    if (serialized.length > 5_000_000) return json({ error: "内容文件不能超过 5MB" }, 413);
    const { owner, repo, path } = config(env);
    const content = standardBase64(encoder.encode(serialized));
    const payload: Record<string, unknown> = { message: `content: update portfolio from ${session.login}`, content, branch: "main" };
    if (body.sha) payload.sha = body.sha;
    const { data, response } = await github<{ content?: { sha?: string }; commit?: { sha?: string; html_url?: string } }>(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (response.status === 409 || response.status === 422) return json({ error: "仓库内容已被更新，请刷新后重新编辑" }, 409);
    if (!response.ok) return json({ error: "GitHub 提交失败" }, response.status);
    return json({ sha: data.content?.sha, commitSha: data.commit?.sha, commitUrl: data.commit?.html_url });
  }

  if (url.pathname === "/api/deployment" && request.method === "GET") {
    const commitSha = url.searchParams.get("sha");
    if (!commitSha || !/^[a-f0-9]{40}$/i.test(commitSha)) return json({ error: "提交版本无效" }, 400);
    const { owner, repo } = config(env);
    const runs = await github<{ workflow_runs?: Array<{ id: number; status: string; conclusion: string | null; html_url?: string }> }>(`/repos/${owner}/${repo}/actions/runs?head_sha=${commitSha}&event=push&per_page=5`, session.accessToken);
    if (!runs.response.ok) return json({ error: "无法读取部署进度" }, runs.response.status);
    const run = runs.data.workflow_runs?.[0];
    if (!run) return json({ state: "queued", progress: 10, label: "等待构建任务" });
    if (run.status === "completed" && run.conclusion !== "success") return json({ state: "failure", progress: 100, label: "部署失败", url: run.html_url });
    if (run.status === "completed") return json({ state: "success", progress: 100, label: "部署完成", url: run.html_url });
    const jobs = await github<{ jobs?: Array<{ name: string; status: string; conclusion: string | null }> }>(`/repos/${owner}/${repo}/actions/runs/${run.id}/jobs?per_page=20`, session.accessToken);
    const build = jobs.data.jobs?.find((job) => job.name.toLowerCase() === "build");
    const deploy = jobs.data.jobs?.find((job) => job.name.toLowerCase() === "deploy");
    if (deploy?.status === "in_progress") return json({ state: "deploying", progress: 85, label: "正在部署站点", url: run.html_url });
    if (build?.status === "completed") return json({ state: "deploying", progress: 70, label: "等待部署站点", url: run.html_url });
    if (build?.status === "in_progress") return json({ state: "building", progress: 40, label: "正在构建站点", url: run.html_url });
    return json({ state: "queued", progress: 20, label: "构建任务已排队", url: run.html_url });
  }

  if (url.pathname === "/api/music" && request.method === "PUT") {
    if (!sameOrigin(request)) return json({ error: "拒绝跨站写入" }, 403);
    const body = await request.json<{ music?: unknown }>().catch(() => ({}));
    if (!validMusic(body.music)) return json({ error: "播放列表数据无效" }, 400);
    const saved = await persistMusic(body.music, session, env);
    return saved.response ?? json({ music: body.music, sha: saved.sha });
  }

  if (url.pathname === "/api/music/upload" && request.method === "POST") {
    if (!sameOrigin(request)) return json({ error: "拒绝跨站写入" }, 403);
    const body = await request.json<{ name?: string; type?: string; size?: number; base64?: string; music?: unknown; trackId?: string }>();
    if (!body.name || !body.base64 || !body.size || !body.trackId || !validMusic(body.music)) return json({ error: "音频或播放列表数据不完整" }, 400);
    const extension = body.name.match(/\.([^.]+)$/)?.[1]?.toLowerCase() ?? "";
    if (!/^audio\//.test(body.type ?? "") && !["mp3", "m4a", "ogg", "wav", "webm", "aac", "flac"].includes(extension)) return json({ error: "仅支持音频文件" }, 415);
    if (body.size > 20 * 1024 * 1024) return json({ error: "单个音频文件不能超过 20 MB" }, 413);
    const normalizedName = Array.from(body.name.normalize("NFKC"), (char) => char.charCodeAt(0) < 32 || /[\\/:*?"<>|]/.test(char) ? "-" : char).join("").replace(/\s+/g, " ").trim();
    const safeName = (normalizedName || `music.${extension || "mp3"}`).slice(-120);
    const path = `public/audio/${Date.now()}-${safeName}`;
    const publicUrl = `/${path.replace(/^public\//, "")}`;
    const { owner, repo } = config(env);
    const uploaded = await github(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: `music: upload ${safeName} from portfolio editor`, content: body.base64, branch: "main" }),
    });
    if (!uploaded.response.ok) return json({ error: "音频上传失败" }, uploaded.response.status);
    const displayName = body.name.replace(/\.[^.]+$/, "");
    const music = body.music.map((track) => track.id === body.trackId ? { ...track, src: publicUrl, title: !track.title || track.title === "未命名曲目" ? displayName : track.title } : track);
    const saved = await persistMusic(music, session, env);
    if (saved.response) return saved.response;
    return json({ url: publicUrl, displayName, music, sha: saved.sha });
  }

  if (url.pathname === "/api/media" && request.method === "POST") {
    const origin = request.headers.get("origin");
    if (origin && origin !== url.origin) return json({ error: "请求来源无效" }, 403);
    const body = await request.json<{ name?: string; type?: string; size?: number; base64?: string }>();
    if (!body.name || !body.base64 || !body.size) return json({ error: "文件数据不完整" }, 400);
    const extension = body.name.match(/\.([^.]+)$/)?.[1]?.toLowerCase() ?? "";
    const isAudio = /^audio\//.test(body.type ?? "") || ["mp3", "m4a", "ogg", "wav", "webm", "aac", "flac"].includes(extension);
    const maxSize = isAudio ? 20 * 1024 * 1024 : 8 * 1024 * 1024;
    if (body.size > maxSize) return json({ error: `单个${isAudio ? "音频" : "媒体"}文件不能超过 ${isAudio ? 20 : 8} MB` }, 413);
    if (!isAudio && !/^(image|video)\//.test(body.type ?? "")) return json({ error: "仅支持图片、视频和音频" }, 415);
    const normalizedName = Array.from(body.name.normalize("NFKC"), (char) => char.charCodeAt(0) < 32 || /[\\/:*?"<>|]/.test(char) ? "-" : char).join("").replace(/\s+/g, " ").trim();
    const safeName = (normalizedName || `media${extension ? `.${extension}` : ""}`).slice(-120);
    const directory = isAudio ? "audio" : "uploads";
    const path = `public/${directory}/${Date.now()}-${safeName}`;
    const { owner, repo } = config(env);
    const { response } = await github(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: `media: upload ${safeName} from portfolio editor`, content: body.base64, branch: "main" }),
    });
    if (!response.ok) return json({ error: "媒体上传失败" }, response.status);
    return json({ url: `/${path.replace(/^public\//, "")}`, originalName: body.name, displayName: body.name.replace(/\.[^.]+$/, "") });
  }

  return json({ error: "Not found" }, 404);
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return handleApi(request, env);
    if (url.pathname === "/" || url.pathname === "/edits" || url.pathname === "/edits/") {
      url.pathname = url.pathname === "/" ? "/index.html" : "/edits/index.html";
      const response = await env.ASSETS.fetch(new Request(url, request));
      const headers = new Headers(response.headers);
      headers.set("cache-control", "no-store");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return env.ASSETS.fetch(request);
  },
};
