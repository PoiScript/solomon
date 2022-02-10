import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
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
