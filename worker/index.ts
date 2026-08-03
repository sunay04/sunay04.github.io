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
    const { data, response } = await github<{ content?: { sha?: string }; commit?: { html_url?: string } }>(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (response.status === 409 || response.status === 422) return json({ error: "仓库内容已被更新，请刷新后重新编辑" }, 409);
    if (!response.ok) return json({ error: "GitHub 提交失败" }, response.status);
    return json({ sha: data.content?.sha, commitUrl: data.commit?.html_url });
  }

  if (url.pathname === "/api/media" && request.method === "POST") {
    const origin = request.headers.get("origin");
    if (origin && origin !== url.origin) return json({ error: "请求来源无效" }, 403);
    const body = await request.json<{ name?: string; type?: string; size?: number; base64?: string }>();
    if (!body.name || !body.base64 || !body.size) return json({ error: "文件数据不完整" }, 400);
    const isAudio = /^audio\//.test(body.type ?? "");
    const maxSize = isAudio ? 20 * 1024 * 1024 : 8 * 1024 * 1024;
    if (body.size > maxSize) return json({ error: `单个${isAudio ? "音频" : "媒体"}文件不能超过 ${isAudio ? 20 : 8} MB` }, 413);
    if (!/^(image|video|audio)\//.test(body.type ?? "")) return json({ error: "仅支持图片、视频和音频" }, 415);
    const safeName = body.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-100) || "media";
    const path = `public/uploads/${Date.now()}-${safeName}`;
    const { owner, repo } = config(env);
    const { response } = await github(`/repos/${owner}/${repo}/contents/${path}`, session.accessToken, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: `media: upload ${safeName} from portfolio editor`, content: body.base64, branch: "main" }),
    });
    if (!response.ok) return json({ error: "媒体上传失败" }, response.status);
    return json({ url: `/${path.replace(/^public\//, "")}` });
  }

  return json({ error: "Not found" }, 404);
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return handleApi(request, env);
    return env.ASSETS.fetch(request);
  },
};
