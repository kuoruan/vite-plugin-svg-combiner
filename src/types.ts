import type { FilterPattern } from "@rollup/pluginutils";
import type { Config } from "svgo";

export type SymbolIdFunction = (id: string) => string;

export interface RollupSvgSpriteOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  emitFile?: boolean | string;
  symbolId?: string | SymbolIdFunction;
  baseDir?: string;
  svgoConfig?: Config | string;
}
