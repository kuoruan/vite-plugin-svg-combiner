import fs from "node:fs";

import { createFilter } from "@rollup/pluginutils";
import deepmerge from "deepmerge";
import { type Config as SvgoConfig, loadConfig, optimize } from "svgo";
import type { Plugin } from "vite";

import { createSvgSprite, createSvgSymbol, getFilePath, getSymbolId } from "./tools";
import type { BaseDirFunction, RollupSvgCombinerOptions, SymbolIdFunction } from "./types";

export * from "./types";

const defaultSymbolId = "[name]";
const defaultFileName = "svg-sprite.svg";

const defaultSvgoConfig: SvgoConfig = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false, // keep viewBox attr
        },
      },
    },
    "cleanupIds", // clean up ids, we will use symbol id instead
    "removeDimensions", // remove width/height attributes, set viewBox instead
    "removeXMLNS", // remove xmlns attribute
  ],
};

const defaultBaseDir: string = process.cwd();

/**
 * Normalize svgo config, load config from file if config is a string.
 *
 * @param config {string | SvgoConfig} svgo config
 * @returns {Promise<SvgoConfig>}
 */
async function normalizeSvgoConfig(config?: string | SvgoConfig): Promise<SvgoConfig> {
  if (!config) {
    return defaultSvgoConfig;
  }

  if (typeof config === "string") {
    const c = await loadConfig(config);

    return deepmerge(defaultSvgoConfig, c);
  }

  return deepmerge(defaultSvgoConfig, config);
}

/**
 * Normalize symbol id function.
 *
 * @param symbolId {string | SymbolIdFn} symbol id or symbol id function
 * @returns {SymbolIdFn}
 */
function normalizeSymbolIdFunction(symbolId?: string | SymbolIdFunction): SymbolIdFunction {
  return typeof symbolId === "function" ? symbolId : () => symbolId || defaultSymbolId;
}

/**
 * Normalize base dir function.
 *
 * @param baseDir {string | BaseDirFunction} base dir or base dir function
 * @returns {BaseDirFunction}
 */
function normalizeBaseDirFunction(baseDir?: string | BaseDirFunction): BaseDirFunction {
  if (baseDir === undefined) {
    return () => defaultBaseDir;
  }

  return typeof baseDir === "function" ? baseDir : () => baseDir;
}

export default async function svgCombiner(options: RollupSvgCombinerOptions = {}): Promise<Plugin> {
  const filter = createFilter(options.include, options.exclude);

  const baseDirFunction = normalizeBaseDirFunction(options.baseDir);

  const symbolIdFunction = normalizeSymbolIdFunction(options.symbolId);

  const svgoConfig: SvgoConfig = await normalizeSvgoConfig(options.svgoConfig);

  const svgSymbols: Map<string, string> = new Map();

  return {
    name: "vite:svg-combiner",
    enforce: "pre",
    async load(id) {
      if (!id.endsWith(".svg") || !filter(id)) {
        // ignore, other load function will handle it
        return null;
      }

      let baseDir = baseDirFunction(id);
      if (baseDir) {
        baseDir = baseDir.replaceAll(/\\/, "/").replace(/\/$/, "");
      }

      if (!!baseDir && !id.startsWith(baseDir)) {
        this.error(`File path "${id}" is not in baseDir "${baseDir}".`);
      }

      const filePath = getFilePath(id, baseDir);

      const symbolIdTemplate = symbolIdFunction(filePath);

      if (!symbolIdTemplate) {
        this.error(`Symbol id is empty, please check your symbolId option.`);
      }

      const symbolId = getSymbolId(filePath, symbolIdTemplate);

      if (svgSymbols.has(symbolId)) {
        this.warn(`Symbol id "${symbolId}" already exists, will be overwritten.`);
      }

      const code: string = await fs.promises.readFile(id, "utf8");

      const result = optimize(code, svgoConfig);

      const symbol = createSvgSymbol(result.data, symbolId);

      svgSymbols.set(symbolId, symbol);

      const defaultExport = `export default ${JSON.stringify(symbolId)};`;

      if (!options.emitFile) {
        return {
          code: [
            `import { addSymbol } from "${__packageName__}/runtime";`,
            "",
            `addSymbol(${JSON.stringify(symbol)});`,
            "",
            defaultExport,
          ].join("\n"),
          map: { mappings: "" },
        };
      }

      return {
        code: defaultExport,
        map: { mappings: "" },
      };
    },
    transform(code, id, opts) {
      if (options.emitFile || !options.domId || opts?.ssr) {
        return null;
      }

      if (this.getModuleInfo(id)?.isEntry) {
        return (
          [
            `import { setRootId } from "${__packageName__}/runtime";`,
            "",
            `setRootId(${JSON.stringify(options.domId)});`,
            "",
          ].join("\n") + code
        );
      }

      return null;
    },
    generateBundle() {
      if (svgSymbols.size <= 0) return;

      if (options.emitFile) {
        this.emitFile({
          type: "asset",
          fileName: typeof options.emitFile === "string" ? options.emitFile : defaultFileName,
          source: createSvgSprite([...svgSymbols.values()]),
        });
      }

      svgSymbols.clear();
    },
  };
}
