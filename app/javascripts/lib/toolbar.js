import { Code } from "./code";
import { Editor } from "./editor";
import { Example } from "./example";

export const Toolbar = {
  exampleElement: undefined,
  runElement: undefined,

  setup: () => {
    Toolbar.runElement = document.querySelector("#run");
    Toolbar.runElement.addEventListener("click", Code.run);

    Toolbar.exampleElement = document.querySelector("#example");
    Toolbar.exampleElement.addEventListener("change", () => {
      Editor.setCode(Example.code());
      Code.run();
    });
  },
};
