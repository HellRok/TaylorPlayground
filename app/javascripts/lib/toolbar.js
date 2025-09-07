import { Code } from "./code";

export const Toolbar = {
  element: undefined,

  setup: () => {
    Toolbar.element = document.querySelector("#run");
    Toolbar.element.addEventListener("click", Code.run);
  },
};
