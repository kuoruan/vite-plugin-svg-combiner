import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
  logLevel: "silent",
  resolve: {
    alias: {
      "@": fileURLToPath(import.meta.resolve("../src")),
      [String(process.env.npm_package_name)]: fileURLToPath(import.meta.resolve("../src")),
    },
  },
  build: {
    minify: false,
    write: false,
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]",
        chunkFileNames: "[name].js",
        entryFileNames: "index.js",
      },
    },
  },
});
