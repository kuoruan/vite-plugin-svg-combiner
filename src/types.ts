import type { FilterPattern } from "@rollup/pluginutils";
import type { Config } from "svgo";

export type SymbolIdFunction = (filePath: string) => string;

export type BaseDirFunction = (id: string) => string;

export interface RollupSvgCombinerOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  emitFile?: boolean | string;
  elementId?: string;
  symbolId?: string | SymbolIdFunction;
  baseDir?: string | BaseDirFunction;
  svgoConfig?: Config | string;
}
