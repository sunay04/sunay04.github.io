import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const cdnBase =
  "https://cdn.jsdmirror.com/gh/sunay04/sunay04.github.io@cdn/";

export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE_PATH ?? (command === "build" ? cdnBase : "/"),
  root: "src",
  publicDir: "../public",
  build: {
    emptyOutDir: true,
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "src/index.html"),
        edits: resolve(projectRoot, "src/edits/index.html"),
      },
    },
  },
  plugins: [react()],
}));
