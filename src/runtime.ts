const root = document.createElementNS("http://www.w3.org/2000/svg", "svg");

root.id = "svg-sprite";

root.style.position = "absolute";
root.style.left = "-1px";
root.style.top = "-1px";
root.style.width = "0px";
root.style.height = "0px";

function insertSvgSprite() {
  document.body.insertBefore(root, document.body.firstChild);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", insertSvgSprite);
} else {
  insertSvgSprite();
}

export function addSymbol(symbol: string): void {
  root.insertAdjacentHTML("beforeend", symbol);
}
