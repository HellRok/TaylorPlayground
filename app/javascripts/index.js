import { StreamLanguage } from "@codemirror/language";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";

import LZString from "lz-string";

document.addEventListener("DOMContentLoaded", () => {
  window.editor = new EditorView({ parent: document.querySelector(".left") });

  document.querySelector("#run").addEventListener("click", () => {
    runCode();
  });
  document.querySelector("#link").addEventListener("click", () => {
    generateLink();
  });
  const exampleSelector = document.querySelector("#example");
  exampleSelector.addEventListener("change", () => {
    loadExample();
    runCode();
  });

  if (getCodeFromURL()) {
    exampleSelector.value = "#custom";
    document.querySelector(exampleSelector.value).textContent =
      getCodeFromURL();
    setCode(getCodeFromURL());
  } else {
    exampleSelector.value = "#welcome";
    loadExample();
  }
  runCode();
});

function getCodeFromURL() {
  let code = window.location.hash.substr(1);
  if (code) {
    code = LZString.decompressFromEncodedURIComponent(code);
  }
  return code;
}

function runCode() {
  const iframe = document.querySelector("iframe");
  const code = window.editor.state.doc.toString();
  const uri = new URL(iframe.src);
  uri.hash = `#${LZString.compressToEncodedURIComponent(code)}`;

  iframe.src = uri;
  // Not really sure why this needs to be delayed, but doing it this way
  // makes sure the initial load works, I guess we can't reload using an anchor
  // tag too early?
  setTimeout(() => {
    iframe.contentWindow.location.reload();
  }, 0);
}

function generateLink() {
  const code = window.editor.state.doc.toString();
  window.location.hash = `#${LZString.compressToEncodedURIComponent(code)}`;
}

function setCode(code) {
  window.editor.setState(
    EditorState.create({
      doc: code,
      extensions: [basicSetup, StreamLanguage.define(ruby), oneDark],
    }),
  );
}

function loadExample() {
  const select = document.querySelector("#example");
  setCode(document.querySelector(select.value).textContent);
}
