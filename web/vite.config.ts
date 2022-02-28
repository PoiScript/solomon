import { defineConfig } from "vite";

const { WORKER_NAME = "blogdev" } = process.env;

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : `https://${WORKER_NAME}.poi.cat/`,

  publicDir: "../public",

  build: {
    assetsDir: "",
    emptyOutDir: true,
    manifest: true,

    rollupOptions: {
      // don't include index.html in output bundle
      input: command === "build" ? "/src/main.ts" : undefined,
    },
  },
}));
