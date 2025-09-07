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
  });

  describe(".setup", () => {
    it("sets the element", () => {
      expect(Toolbar.element).toBeUndefined();
      Toolbar.setup();
      expect(Toolbar.element).toBeDefined();
    });

    it("sets a callback", () => {
      let listener = {};
      const mockAddEventListener = jest.fn((event, callback) => {
        listener[event] = callback;
      });

      jest.spyOn(document, "querySelector").mockImplementation((selector) => {
        if (selector === "#run") {
          return { addEventListener: mockAddEventListener };
        }
      });

      Toolbar.setup();
      expect(mockAddEventListener).toHaveBeenCalled();
      expect(listener["click"]).toBe(Code.run);
    });
  });
});
