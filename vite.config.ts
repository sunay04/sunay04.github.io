import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const cdnBase =
  "https://cdn.jsdmirror.com/gh/sunay04/sunay04.github.io@cdn/";

export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE_PATH ?? (command === "build" ? cdnBase : "/"),
  root: "src",
  publicDir: "../public",
  build: {
    emptyOutDir: true,
    outDir: "../dist",
  },
  plugins: [react()],
}));
