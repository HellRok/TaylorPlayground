import LZString from "lz-string";

export const Code = {
  element: undefined,

  setup: () => {
    Code.element = document.querySelector("#code");
  },

  loadFromAnchor: () => {
    let code = window.location.hash.slice(1);

    if (code) {
      Code.element.textContent =
        LZString.decompressFromEncodedURIComponent(code);
    }
  },
};
