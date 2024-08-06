import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    include: ["tests/*.{test,spec}.ts"],
    setupFiles: ["tests/setup.ts"],
  },
});
