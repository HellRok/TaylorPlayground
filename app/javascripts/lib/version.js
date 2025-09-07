import { Example } from "./example";
import { ExampleData } from "./example_data";

export const Version = {
  element: undefined,

  setup: () => {
    Version.element = document.querySelector("#version");

    for (const example of Object.keys(ExampleData)) {
      const option = document.createElement("option");
      option.setAttribute("value", example);
      option.textContent = example;
      Version.element.appendChild(option);
    }
  },

  load: () => {
    Example.load(ExampleData[Version.element.value]);
  },

  current: () => {
    return Version.element.value;
  },
};
