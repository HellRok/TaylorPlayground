import { EditorState } from "@codemirror/state";

import { Editor } from "./editor";

describe("Editor", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  beforeEach(() => {
    const editorElem = document.createElement("div");
    editorElem.setAttribute("id", "editor");
    document.body.appendChild(editorElem);
  });

  describe(".setup", () => {
    it("sets up the editor", () => {
      expect(Editor.editor).toBeUndefined();
      Editor.setup();
      expect(Editor.editor).toBeDefined();
    });
  });

  describe(".code", () => {
    it("returns the code from the editor", () => {
      Editor.setup();

      expect(Editor.code()).toEqual("");

      Editor.editor.setState(
        EditorState.create({
          doc: "code goes here",
        }),
      );

      expect(Editor.code()).toEqual("code goes here");
    });
  });

  describe(".setCode", () => {
    it("sets the code in the editor", () => {
      Editor.setup();

      expect(Editor.editor.state.doc.toString()).toEqual("");

      Editor.setCode("ruby is great");

      expect(Editor.editor.state.doc.toString()).toEqual("ruby is great");
    });
  });
});
