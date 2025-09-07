import { Example } from "./example";
import { Version } from "./version";

describe("Version", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  beforeEach(() => {
    const exampleElem = document.createElement("select");
    exampleElem.setAttribute("id", "example");
    document.body.appendChild(exampleElem);

    const versionElem = document.createElement("select");
    versionElem.setAttribute("id", "version");
    document.body.appendChild(versionElem);

    Example.setup();
  });

  describe(".setup", () => {
    it("sets the element", () => {
      expect(Version.element).toBeUndefined();
      Version.setup();
      expect(Version.element).toBeDefined();
    });

    it("sets the options", () => {
      expect(document.querySelectorAll("#version option").length).toEqual(0)

      Version.setup();
      const versionOptions = Version.element.querySelectorAll("option");
      expect(versionOptions.length).toEqual(1);
      expect(versionOptions[0].value).toEqual("v0.3.14.1");
      expect(versionOptions[0].textContent).toEqual("v0.3.14.1");
    });
  });

  describe(".load", () => {
    it("loads the examples into the Example.element", () => {
      Version.setup();

      expect(Example.element.querySelectorAll("option").length).toEqual(0);

      // "v0.3.14.1" is selected by default
      Version.load();

      const exampleOptions = Example.element.querySelectorAll("option");
      expect(exampleOptions.length).toEqual(9);
    });
  });

  describe(".current", () => {
    it("returns the currently selected example", () => {
      Version.setup();
      Version.load();

      expect(Version.current()).toEqual("v0.3.14.1");
    });
  });
});
