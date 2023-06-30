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
 * @param filePath {string} the file path
 * @param template {string} the symbolId template
 *
 * @returns {string}
 */
export function getSymbolId(filePath: string, template: string): string {
  let symbolId: string = template;

  if (symbolId.includes("[name]")) {
    symbolId = symbolId.replaceAll("[name]", path.basename(filePath, path.extname(filePath)));
  }

  if (symbolId.includes("[dirname]")) {
    const dir = path.dirname(filePath);

    symbolId = symbolId.replaceAll("[dirname]", dir.split(path.sep).filter(Boolean).join("-"));
  }

  return symbolId;
}
