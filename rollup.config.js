import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { nodeExternals } from "rollup-plugin-node-externals";

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [
      {
        entryFileNames: "es/[name].js",
        format: "es",
        dir: "dist",
      },
      {
        entryFileNames: "cjs/[name].cjs",
        format: "cjs",
        dir: "dist",
        exports: "auto",
      },
    ],
    plugins: [
      nodeExternals(),
      replace({
        preventAssignment: true,
        values: {
          __packageName__: JSON.stringify(process.env.npm_package_name),
        },
      }),
      typescript({
        tsconfig: "./tsconfig.build.json",
      }),
      babel({
        babelHelpers: "bundled",
        configFile: true,
        browserslistEnv: "node",
        browserslistConfigFile: true,
        extensions: [".ts", ".js", ".mjs"],
      }),
    ],
  },
  {
    input: "./src/runtime.ts",
    output: [
      {
        entryFileNames: "es/[name].js",
        format: "es",
        dir: "dist",
      },
      {
        entryFileNames: "cjs/[name].cjs",
        format: "cjs",
        dir: "dist",
        exports: "auto",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.build.json",
      }),
      babel({
        babelHelpers: "bundled",
        configFile: true,
        browserslistEnv: "browser",
        browserslistConfigFile: true,
        extensions: [".ts", ".js", ".mjs"],
      }),
      terser(),
    ],
  },
]);
