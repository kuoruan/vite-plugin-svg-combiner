let root: SVGSVGElement;

const symbols: string[] = [];

if (typeof document !== "undefined") {
  root = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  root.id = "svg-sprite";

  root.style.position = "absolute";
  root.style.left = "-1px";
  root.style.top = "-1px";
  root.style.width = "0px";
  root.style.height = "0px";
  root.style.visibility = "hidden";

  const insertSvgSprite = () => {
    document.body.insertBefore(root, document.body.firstChild);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertSvgSprite);
  } else {
    insertSvgSprite();
  }
}

export function addSymbol(symbol: string, symbolId: string): void {
  if (!root) return;

  // eslint-disable-next-line unicorn/prefer-includes
  if (symbols.indexOf(symbolId) > -1) {
    try {
      const symbolNode = root.querySelector(`#${symbolId}`);
      if (symbolNode) {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        root.removeChild(symbolNode);
      }
    } catch {
      console.warn(`svg symbol #${symbolId} is not a valid selector, cannot remove old.`);
    }
  } else {
    symbols.push(symbolId);
  }

  root.insertAdjacentHTML("beforeend", symbol);
}
