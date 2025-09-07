// https://www.npmjs.com/package/@replit/codemirror-vim
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { StreamLanguage } from "@codemirror/language";

export const Editor = {
  editor: undefined,

  setup: () => {
    Editor.editor = new EditorView({
      parent: document.querySelector("#editor"),
    });
  },

  code: () => Editor.editor.state.doc.toString(),

  setCode: (code) => {
    Editor.editor.setState(
      EditorState.create({
        doc: code,
        extensions: [basicSetup, StreamLanguage.define(ruby), oneDark],
      }),
    );
  },
};
