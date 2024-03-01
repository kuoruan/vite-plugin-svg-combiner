import { fileURLToPath } from "node:url";

import { type RollupOutput } from "rollup";
import { mergeConfig } from "vite";
import { build } from "vite";

import svgCombiner from "@/index";

import viteConfig from "./vite.config";

const root = fileURLToPath(import.meta.url);

describe("build", () => {
  it("should build", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        root: root,
        build: {
          rollupOptions: {
            input: "/fixtures/basic.ts",
          },
        },
        plugins: [svgCombiner()],
      }),
    )) as RollupOutput;

    expect(data.output[0].code).toMatchSnapshot();
  });
});
