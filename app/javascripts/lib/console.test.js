import { Console } from "./console";

describe("Console", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  beforeEach(() => {
    const consoleElem = document.createElement("textarea");
    consoleElem.setAttribute("id", "console");
    document.body.appendChild(consoleElem);
  });

  describe(".setup", () => {
    it("sets the element", () => {
      expect(Console.element).toBeUndefined();

      Console.setup();
      expect(Console.element).toBeDefined();
    });
  });

  describe(".show", () => {
    it("shows the console", () => {
      Console.setup();
      Console.show();
      expect(Console.element.classList).not.toContain("hidden");
    });
  });

  describe(".hide", () => {
    it("hides the console", () => {
      Console.setup();
      Console.hide();
      expect(Console.element.classList).toContain("hidden");
    });
  });

  describe(".log", () => {
    it("appends the message to the element", () => {
      Console.setup();

      expect(Console.element.textContent).toEqual("");

      Console.log("Hello");
      expect(Console.element.textContent).toEqual("Hello");

      Console.log("My friend!");
      expect(Console.element.textContent).toEqual("Hello\nMy friend!");
    });

    it("scrolls to show new content", () => {
      Console.setup();

      jest
        .spyOn(Console.element, "scrollHeight", "get")
        .mockImplementation(() => 100);

      expect(Console.element.scrollTop).toEqual(0);

      Console.log("");
      expect(Console.element.scrollTop).toEqual(100);
    });
  });

  describe(".logError", () => {
    it("appends the message to the element", () => {
      Console.setup();

      expect(Console.element.textContent).toEqual("");

      Console.logError("oops!");
      expect(Console.element.textContent).toEqual("oops!");

      Console.logError("multiple", "errors");
      expect(Console.element.textContent).toEqual("oops!\nmultiple errors");
    });
  });
});
