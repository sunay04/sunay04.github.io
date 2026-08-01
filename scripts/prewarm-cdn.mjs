import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const cdnBase =
  process.env.CDN_BASE_URL ??
  "https://cdn.jsdmirror.com/gh/sunay04/sunay04.github.io@cdn/";
const fullDownloadLimit = 1024 * 1024;
const rangeEnd = 64 * 1024 - 1;
const concurrency = 6;

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath)));
    } else if (entry.isFile()) {
      const fileStat = await stat(absolutePath);
      files.push({
        path: path.relative(distDir, absolutePath).split(path.sep).join("/"),
        size: fileStat.size,
      });
    }
  }

  return files;
}

async function requestFile(file) {
  const url = new URL(file.path, cdnBase);
  const headers = { "Accept-Encoding": "identity" };
  if (file.size > fullDownloadLimit) {
    headers.Range = `bytes=0-${rangeEnd}`;
  }

  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  await response.arrayBuffer();
}

async function warmFile(file) {
  const retryDelays = [0, 2_000, 5_000, 10_000, 20_000];
  let lastError;

  for (const delay of retryDelays) {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    try {
      await requestFile(file);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`${file.path}: ${lastError.message}`);
}

async function main() {
  const files = await listFiles(distDir);
  let nextIndex = 0;
  let completed = 0;

  async function worker() {
    while (nextIndex < files.length) {
      const file = files[nextIndex];
      nextIndex += 1;
      await warmFile(file);
      completed += 1;
      console.log(`[${completed}/${files.length}] ${file.path}`);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, files.length) }, () => worker()),
  );

  console.log(`Prewarmed ${files.length} CDN files.`);
}

main().catch((error) => {
  console.error(`CDN prewarm failed: ${error.message}`);
  process.exitCode = 1;
});
