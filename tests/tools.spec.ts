import { createSvgSprite, createSvgSymbol, getSymbolId } from "@/tools";

describe("tools", () => {
  describe("createSvgSprite", () => {
    it("should create an SVG sprite with symbols", () => {
      const symbols = ['<symbol id="symbol1"></symbol>', '<symbol id="symbol2"></symbol>'];
      const result = createSvgSprite(symbols);

      expect(result).toContain('<svg xmlns="http://www.w3.org/2000/svg">');
      expect(result).toContain('<symbol id="symbol1"></symbol>');
      expect(result).toContain('<symbol id="symbol2"></symbol>');
    });
  });

  describe("createSvgSymbol", () => {
    it("should create an SVG symbol from SVG content", () => {
      const svg = '<svg><rect x="0" y="0" width="100" height="100"/></svg>';
      const id = "symbol1";
      const result = createSvgSymbol(svg, id);

      expect(result).toContain(`<symbol id="${id}"`);
      expect(result).toContain('<rect x="0" y="0" width="100" height="100"/>');
    });
  });

  describe("getSymbolId", () => {
    it("should get symbol ID with template", () => {
      const id = "/path/to/file.svg";
      const template = "[name]";
      const result = getSymbolId(id, template);

      expect(result).toBe("file");
    });

    it("should get symbol ID with dirname template", () => {
      const id = "/path/to/file.svg";
      const template = "[dirname]";
      const result = getSymbolId(id, template);

      expect(result).toBe("path-to");
    });

    it("should get symbol ID with basedir and dirname template", () => {
      const id = "/path/to/file.svg";
      const template = "[dirname]";
      const basedir = "/path";
      const result = getSymbolId(id, template, basedir);

      expect(result).toBe("to");
    });

    it("should get symbol ID with name and dirname template", () => {
      const id = "/path/to/file.svg";
      const template = "[dirname]-[name]";
      const basedir = "/path";
      const result = getSymbolId(id, template, basedir);

      expect(result).toBe("to-file");
    });
  });
});
