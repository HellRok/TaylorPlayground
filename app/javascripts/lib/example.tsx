import { ExampleData } from "./example_data";

export function Example() {
  //const version: string = Object.keys(ExampleData).reverse()[0];
  const examples: string[] = Object.keys(ExampleData["v0.4.0"]);

  return (
    <select data-testid="example">
      {examples.map((example, index) => (
        <option value={example} key={index}>
          {example}
        </option>
      ))}
    </select>
  );
}

// import { ExampleData } from "./example_data";
// import { Version } from "./version";
// 
// export const Example = {
//   element: undefined,
// 
//   setup: () => {
//     Example.element = document.querySelector("#example");
//   },
// 
//   load: (examples) => {
//     Example.element.innerHTML = "";
// 
//     for (const example of Object.keys(examples)) {
//       const option = document.createElement("option");
//       option.setAttribute("value", example);
// 
//       if (example === "welcome.rb") {
//         option.setAttribute("selected", true);
//       }
// 
//       option.textContent = example;
//       Example.element.appendChild(option);
//     }
//   },
// 
//   current: () => {
//     return Example.element.value;
//   },
// 
//   code: () => {
//     return ExampleData[Version.current()][Example.current()];
//   },
// };
