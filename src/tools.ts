import path from "node:path";

/**
 * Create svg sprite with symbols
 *
 * @param symbols {string[]}
 * @param inline {boolean} whether to inline the sprite
 * @returns {string}
 */
export function createSvgSprite(symbols: string[]): string {
  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>`;
}

/**
 * Create svg symbol from svg content
 *
 * @param svg {string} svg content
 * @param id {string} symbol id
 *
 * @returns {string} symbol
 */
export function createSvgSymbol(svg: string, id: string): string {
  // replace svg tag with symbol tag
  return svg.replace(/<svg([^>]*)>/, `<symbol id="${id}"$1>`).replace("</svg>", "</symbol>");
}

/**
 * Get symbol id with template
 *
 * @param id {string}
 * @param template {string}
 *
 * @returns {string}
 */
export function getSymbolId(id: string, template: string, basedir?: string): string {
  let symbolId: string = template;

  if (symbolId.includes("[name]")) {
    symbolId = symbolId.replaceAll("[name]", path.basename(id, path.extname(id)));
  }

  if (symbolId.includes("[dirname]")) {
    const dir = basedir ? path.relative(basedir, path.dirname(id)) : path.dirname(id);

    symbolId = symbolId.replaceAll("[dirname]", dir.split(path.sep).filter(Boolean).join("-"));
  }

  return symbolId;
}
