import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { externals } from "rollup-plugin-node-externals";

export default defineConfig({
  input: ["./src/index.ts", "./src/runtime.ts"],
  output: [
    {
      entryFileNames: "[name].js",
      format: "es",
      dir: "dist",
    },
    {
      entryFileNames: "[name].cjs",
      format: "cjs",
      dir: "dist",
      exports: "auto",
    },
  ],
  plugins: [
    externals(),
    replace({
      preventAssignment: true,
      values: {
        __packageName__: JSON.stringify(process.env.npm_package_name),
      },
    }),
    typescript(),
  ],
});
