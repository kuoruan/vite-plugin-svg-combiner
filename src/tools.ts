import path from "node:path";

/**
 * Create svg sprite with symbols
 *
 * @param symbols {string[]}
 * @param inline {boolean} whether to inline the sprite
 * @returns {string}
 */
export function createSvgSprite(symbols: string[], id: string): string {
  return `<svg id="${id}" xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>`;
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
 * Get file path relative to baseDir
 *
 * @param moduleId {string} the module id of the file
 * @param baseDir {string} the base directory
 *
 * @returns {string} the relative file path
 */
export function getFilePath(moduleId: string, baseDir: string): string {
  return baseDir
    ? path.relative(baseDir, moduleId).replaceAll(path.win32.sep, path.posix.sep)
    : moduleId;
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

    symbolId = symbolId.replaceAll(
      "[dirname]",
      dir.replace(":", "").split(path.posix.sep).filter(Boolean).join("-"),
    );
  }

  return symbolId;
}

/**
 * Check if the module id is a svg file path.
 *
 * @param moduleId {string} id to check
 * @returns {boolean}
 */
export function isSvgFilePath(moduleId: string): boolean {
  if (!moduleId) return false;

  const queryIndex = moduleId.lastIndexOf("?");

  if (queryIndex !== -1) {
    moduleId = moduleId.slice(0, queryIndex);
  }

  return moduleId.endsWith(".svg");
}
