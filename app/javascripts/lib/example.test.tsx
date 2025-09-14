import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Example } from "./example";

describe("Example", () => {
  it("renders a select element", () => {
    render(<Example />);

    expect(screen.getByTestId("example").tagName).toEqual("SELECT");
  });

  it("contains all the examples for the current version", () => {
    render(<Example />);

    const optionElements: NodeListOf<HTMLOptionElement> = screen
      .getByTestId("example")
      .querySelectorAll("option");

    expect(Array.from(optionElements).map((elem) => elem.textContent)).toEqual([
      "custom.rb",
      "welcome.rb",
    ]);
  });
});

// import { Example } from "./example";
// import { Version } from "./version";
// 
// describe("Example", () => {
//   afterEach(() => {
//     document.body.innerHTML = "";
//   });
// 
//   beforeEach(() => {
//     const exampleElem = document.createElement("select");
//     exampleElem.setAttribute("id", "example");
//     document.body.appendChild(exampleElem);
// 
//     const versionElem = document.createElement("select");
//     versionElem.setAttribute("id", "version");
//     document.body.appendChild(versionElem);
//   });
// 
//   describe(".setup", () => {
//     it("sets the element", () => {
//       expect(Example.element).toBeUndefined();
//       Example.setup();
//       expect(Example.element).toBeDefined();
//     });
//   });
// 
//   describe(".load", () => {
//     it("loads the examples into the element", () => {
//       Example.setup();
// 
//       expect(Example.element.querySelectorAll("option").length).toEqual(0);
// 
//       Example.load({
//         "one.rb": "code 1",
//         "two.rb": "code 2",
//         "welcome.rb": "welcome!",
//       });
// 
//       expect(Example.element.querySelectorAll("option").length).toEqual(3);
//       expect(Example.element.querySelectorAll("option")[0].value).toEqual(
//         "one.rb",
//       );
//       expect(Example.element.querySelectorAll("option")[0].textContent).toEqual(
//         "one.rb",
//       );
//       expect(Example.element.querySelectorAll("option")[1].value).toEqual(
//         "two.rb",
//       );
//       expect(Example.element.querySelectorAll("option")[1].textContent).toEqual(
//         "two.rb",
//       );
//       expect(Example.element.querySelectorAll("option")[2].value).toEqual(
//         "welcome.rb",
//       );
//       expect(Example.element.querySelectorAll("option")[2].textContent).toEqual(
//         "welcome.rb",
//       );
//     });
// 
//     it("selects 'welcome.rb' by default", () => {
//       Example.setup();
// 
//       Example.load({
//         "one.rb": "code 1",
//         "two.rb": "code 2",
//         "welcome.rb": "welcome!",
//       });
// 
//       expect(Example.element.value).toEqual("welcome.rb");
//     });
//   });
// 
//   describe(".current", () => {
//     it("returns the currently selected example", () => {
//       Example.setup();
//       Version.setup();
//       Version.load();
// 
//       expect(Example.current()).toEqual("welcome.rb");
//     });
//   });
// 
//   describe(".code", () => {
//     it("returns the code for the current example", () => {
//       Example.setup();
//       Version.setup();
//       Version.load();
// 
//       expect(Example.code()).toBeDefined();
//       // Check length instead of silly long code string
//       expect(Example.code().length).toEqual(744);
//     });
//   });
// });
