import { defineConfig } from "vite";
import { readFileSync } from "fs";

export default defineConfig({
  publicDir: false,

  build: {
    assetsDir: "",
    emptyOutDir: true,
    minify: false,
    target: "es2020",

    rollupOptions: {
      input: "/src/main.ts",

      output: {
        format: "module",
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        manualChunks: undefined,
      },
    },
  },

  define: {
    WASM_BINDGEN_SCRIPT: readFileSync("./pkg/solomon.js", "utf-8"),
  },
});
