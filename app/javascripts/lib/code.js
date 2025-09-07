import LZString from "lz-string";

import { Editor } from "./editor";

export const Code = {
  element: undefined,

  setup: () => {
    Code.element = document.querySelector("#code");
  },

  fromAnchor: () => {
    let code = window.location.hash.slice(1);

    if (code) {
      return LZString.decompressFromEncodedURIComponent(code);
    }
  },

  loadFromAnchor: () => {
    let code = Code.fromAnchor();

    if (code) {
      Code.element.textContent = code;
    }
  },

  compressed: () => {
    return LZString.compressToEncodedURIComponent(Editor.code());
  },

  run: () => {
    document.querySelectorAll("iframe").forEach((iframe) => iframe.remove());

    const iframe = document.createElement("iframe");
    iframe.setAttribute("class", "right");
    iframe.setAttribute("src", `./playground/?console=1#${Code.compressed()}`);
    document.querySelector(".grid").appendChild(iframe);
  },
};
