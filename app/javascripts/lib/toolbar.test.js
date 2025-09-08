import { Code } from "./code";
import { Toolbar } from "./toolbar";

describe("Toolbar", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    const runButtonElem = document.createElement("button");
    runButtonElem.setAttribute("id", "run");
    document.body.appendChild(runButtonElem);

    const exampleElem = document.createElement("select");
    exampleElem.setAttribute("id", "example");
    document.body.appendChild(exampleElem);
  });

  describe(".setup", () => {
    it("sets the elements", () => {
      expect(Toolbar.runElement).toBeUndefined();
      expect(Toolbar.exampleElement).toBeUndefined();
      Toolbar.setup();
      expect(Toolbar.runElement).toBeDefined();
      expect(Toolbar.exampleElement).toBeDefined();
    });

    it("sets a callback", () => {
      let listener = {};
      const mockRunAddEventListener = jest.fn((event, callback) => {
        listener[event] = callback;
      });
      const mockExampleAddEventListener = jest.fn();

      jest.spyOn(document, "querySelector").mockImplementation((selector) => {
        if (selector === "#run") {
          return { addEventListener: mockRunAddEventListener };
        } else if (selector === "#example") {
          return { addEventListener: mockExampleAddEventListener };
        }
      });

      Toolbar.setup();
      expect(mockRunAddEventListener).toHaveBeenCalled();
      expect(listener["click"]).toBe(Code.run);
      expect(mockExampleAddEventListener).toHaveBeenCalled();
    });
  });
});
