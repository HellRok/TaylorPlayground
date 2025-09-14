import LZString from "lz-string";
import { Code } from "./code";
import { Editor } from "./editor";

xdescribe("Code", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    const codeElem = document.createElement("textarea");
    codeElem.setAttribute("id", "code");
    document.body.appendChild(codeElem);

    const editorElem = document.createElement("div");
    editorElem.setAttribute("id", "editor");
    document.body.appendChild(editorElem);

    const gridElem = document.createElement("div");
    gridElem.setAttribute("class", "grid");
    document.body.appendChild(gridElem);

    Editor.setup();
    Editor.setCode("code");
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
        window.location.hash = "";
        Code.setup();

        expect(document.querySelector("#code").textContent).toEqual("");
        Code.loadFromAnchor();
        expect(document.querySelector("#code").textContent).toEqual("");
      });
    });
  });

  describe(".fromAnchor", () => {
    describe("with an anchor", () => {
      it("returns the code from the anchor", () => {
        window.location.hash = `#${LZString.compressToEncodedURIComponent("Hi!")}`;
        expect(Code.fromAnchor()).toEqual("Hi!");
      });
    });

    describe("with no anchor", () => {
      it("returns undefined", () => {
        window.location.hash = "";
        expect(Code.fromAnchor()).toBeUndefined();
      });
    });
  });

  describe(".compressed", () => {
    it("compresses the code from the editor", () => {
      Editor.setCode("hello there");

      expect(Code.compressed()).toEqual("BYUwNmD2AEAuoCcRA");
    });
  });

  describe(".run", () => {
    it("creates an iframe with the right attributes", () => {
      expect(document.querySelectorAll("iframe").length).toEqual(0);

      Code.run();

      expect(document.querySelectorAll("iframe").length).toEqual(1);
      const iframe = document.querySelector("iframe");
      expect(iframe.src).toEqual(
        "http://localhost/playground/?console=1#MYewJgpkA",
      );
      expect(iframe.classList).toMatchObject({ 0: "right" });
    });

    it("only creates one iframe no matter how many times it's called", () => {
      expect(document.querySelectorAll("iframe").length).toEqual(0);

      Code.run();
      Code.run();
      Code.run();

      expect(document.querySelectorAll("iframe").length).toEqual(1);
    });
  });
});
