import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH ?? "/",
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
