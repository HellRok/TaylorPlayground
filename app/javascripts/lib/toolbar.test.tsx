import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Toolbar } from "./toolbar";

describe("Toolbar", () => {
  xit("renders the run button", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("run")).toBeDefined();
  });

  xit("renders the share button", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("share")).toBeDefined();
  });

  xit("renders the version selector", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("version")).toBeDefined();
  });

  xit("renders the example selector", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("example")).toBeDefined();
  });

  xit("links to the documentation", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("documentation")).toBeDefined();
  });

  xit("links to the Taylor website", () => {
    render(<Toolbar />);

    const taylorLink: HTMLAnchorElement = screen.getByTestId("taylor");
    expect(taylorLink.href).toEqual("https://taylormadetech.dev/");
  });
});

// describe("Toolbar", () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
//
//   beforeEach(() => {
//     const runButtonElem = document.createElement("button");
//     runButtonElem.setAttribute("id", "run");
//     document.body.appendChild(runButtonElem);
//
//     const exampleElem = document.createElement("select");
//     exampleElem.setAttribute("id", "example");
//     document.body.appendChild(exampleElem);
//   });
//
//   describe(".setup", () => {
//     it("sets the elements", () => {
//       expect(Toolbar.runElement).toBeUndefined();
//       expect(Toolbar.exampleElement).toBeUndefined();
//       Toolbar.setup();
//       expect(Toolbar.runElement).toBeDefined();
//       expect(Toolbar.exampleElement).toBeDefined();
//     });
//
//     it("sets a callback", () => {
//       let listener = {};
//       const mockRunAddEventListener = jest.fn((event, callback) => {
//         listener[event] = callback;
//       });
//       const mockExampleAddEventListener = jest.fn();
//
//       jest.spyOn(document, "querySelector").mockImplementation((selector) => {
//         if (selector === "#run") {
//           return { addEventListener: mockRunAddEventListener };
//         } else if (selector === "#example") {
//           return { addEventListener: mockExampleAddEventListener };
//         }
//       });
//
//       Toolbar.setup();
//       expect(mockRunAddEventListener).toHaveBeenCalled();
//       expect(listener["click"]).toBe(Code.run);
//       expect(mockExampleAddEventListener).toHaveBeenCalled();
//     });
//   });
// });
