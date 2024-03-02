import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const sourceRoot = fileURLToPath(new URL("../src", import.meta.url));

export default defineConfig({
  logLevel: "silent",
  resolve: {
    alias: {
      "@": sourceRoot,
      [String(process.env.npm_package_name)]: sourceRoot,
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
