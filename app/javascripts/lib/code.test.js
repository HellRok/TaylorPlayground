import LZString from "lz-string";
import { Code } from "./code";

describe("Code", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  beforeEach(() => {
    const codeElem = document.createElement("textarea");
    codeElem.setAttribute("id", "code");
    document.body.appendChild(codeElem);
  });

  describe(".setup", () => {
    it("sets the element", () => {
      expect(Code.element).toBeUndefined();
      Code.setup();
      expect(Code.element).toBeDefined();
    });
  });

  describe(".loadFromAnchor", () => {
    describe("with an anchor", () => {
      it("returns the code from the anchor", () => {
        window.location.hash = `#${LZString.compressToEncodedURIComponent("Hi!")}`;
        Code.setup();

        expect(document.querySelector("#code").textContent).toEqual("");
        Code.loadFromAnchor();
        expect(document.querySelector("#code").textContent).toEqual("Hi!");
      });
    });

    describe("with no anchor", () => {
      it("returns undefined", () => {
        window.location.hash = ``;
        Code.setup();

        expect(document.querySelector("#code").textContent).toEqual("");
        Code.loadFromAnchor();
        expect(document.querySelector("#code").textContent).toEqual("");
      });
    });
  });
});
