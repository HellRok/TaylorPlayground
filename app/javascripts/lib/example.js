import { ExampleData } from "./example_data";
import { Version } from "./version";

export const Example = {
  element: undefined,

  setup: () => {
    Example.element = document.querySelector("#example");
  },

  load: (examples) => {
    Example.element.innerHTML = "";

    for (const example of Object.keys(examples)) {
      const option = document.createElement("option");
      option.setAttribute("value", example);

      if (example === "welcome.rb") {
        option.setAttribute("selected", true);
      }

      option.textContent = example;
      Example.element.appendChild(option);
    }
  },

  current: () => {
    return Example.element.value
  },

  code: () => {
    return ExampleData[Version.current()][Example.current()];
  },
};
