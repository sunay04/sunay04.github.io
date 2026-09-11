import { handleApi, type Env } from "./_github.js";

function environment(): Env {
  return {
    ASSETS: {
      fetch: () => Promise.resolve(new Response("Not found", { status: 404 })),
    },
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? "",
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? "",
    SESSION_SECRET: process.env.SESSION_SECRET ?? "",
    REPO_OWNER: process.env.REPO_OWNER,
    REPO_NAME: process.env.REPO_NAME,
    CONTENT_PATH: process.env.CONTENT_PATH,
  };
}

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const path = url.searchParams.get("__path");
    if (path) {
      url.pathname = `/api/${path}`;
      url.searchParams.delete("__path");
      request = new Request(url, request);
    }
    return handleApi(request, environment());
  },
};
