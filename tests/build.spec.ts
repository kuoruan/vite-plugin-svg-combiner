import { type RollupOutput } from "rollup";
import { build, mergeConfig } from "vite";

import svgCombiner from "@/index";

import viteConfig from "./vite.config";

describe("build", () => {
  it("basic", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
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

  it("sub directory", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        build: {
          rollupOptions: {
            input: "/fixtures/sub-directory.ts",
          },
        },
        plugins: [svgCombiner()],
      }),
    )) as RollupOutput;

    expect(data.output[0].code).toMatchSnapshot();
  });

  it("minify", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        build: {
          rollupOptions: {
            input: "/fixtures/minify.ts",
          },
        },
        plugins: [svgCombiner()],
      }),
    )) as RollupOutput;

    expect(data.output[0].code).toMatchSnapshot();
  });

  it("glob import", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        build: {
          rollupOptions: {
            input: "/fixtures/glob.ts",
          },
        },
        plugins: [svgCombiner()],
      }),
    )) as RollupOutput;

    expect(data.output[0].code).toMatchSnapshot();
  });
});

describe("build file", () => {
  it("basic", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        build: {
          rollupOptions: {
            input: "/fixtures/basic.ts",
          },
        },
        plugins: [
          svgCombiner({
            emitFile: true,
          }),
        ],
      }),
    )) as RollupOutput;

    expect(data.output[1]).toMatchSnapshot();
  });

  it("custom file name", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        build: {
          rollupOptions: {
            input: "/fixtures/minify.ts",
          },
        },
        plugins: [
          svgCombiner({
            emitFile: "custom.svg",
          }),
        ],
      }),
    )) as RollupOutput;

    expect(data.output[1]).toMatchSnapshot();
  });
});

describe("custom filter", () => {
  it("include files", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        build: {
          rollupOptions: {
            input: "/fixtures/include.ts",
          },
        },
        plugins: [svgCombiner({ include: /window/ })],
      }),
    )) as RollupOutput;

    expect(data.output[0].code).toMatchSnapshot();
  });

  it("exclude files", async () => {
    const data = (await build(
      mergeConfig(viteConfig, {
        build: {
          rollupOptions: {
            input: "/fixtures/exclude.ts",
          },
        },
        plugins: [svgCombiner({ exclude: /window/ })],
      }),
    )) as RollupOutput;

    expect(data.output[0].code).toMatchSnapshot();
  });
});
