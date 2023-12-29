let root: SVGSVGElement;

function insertSvgSprite() {
  if (!root) return;
  document.body.insertBefore(root, document.body.firstChild);
}

if (typeof document !== "undefined") {
  root = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  root.id = "svg-sprite";

  root.style.position = "absolute";
  root.style.left = "-1px";
  root.style.top = "-1px";
  root.style.width = "0px";
  root.style.height = "0px";
  root.style.visibility = "hidden";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertSvgSprite);
  } else {
    insertSvgSprite();
  }
}

export function setRootId(id: string): void {
  if (!root) return;
  root.id = id;
}

export function addSymbol(symbol: string): void {
  root?.insertAdjacentHTML("beforeend", symbol);
}
