import { Toolbar } from "./lib/toolbar";
import { Code } from "./lib/code";
import { Editor } from "./lib/editor";
import { Example } from "./lib/example";
import { Version } from "./lib/version";

document.addEventListener("DOMContentLoaded", () => {
  Editor.setup();

  // document.querySelector("#link").addEventListener("click", () => {
  //   generateLink();
  // });

  // const exampleSelector = document.querySelector("#example");
  // exampleSelector.addEventListener("change", () => {
  //   loadExample();
  //   runCode();
  // });

  // if (getCodeFromURL()) {
  //   exampleSelector.value = "#custom";
  //   document.querySelector(exampleSelector.value).textContent =
  //     getCodeFromURL();
  //   setCode(getCodeFromURL());
  // } else {
  //   exampleSelector.value = "#welcome";
  //   loadExample();
  // }
  // runCode();
  Toolbar.setup();

  Code.setup();
  Example.setup();
  Version.setup();
  Version.load();

  let code = Code.fromAnchor();
  console.log(code);

  Editor.setCode(Example.code());
  Code.run();
});

// function generateLink() {
//   const code = window.editor.state.doc.toString();
//   window.location.hash = `#${LZString.compressToEncodedURIComponent(code)}`;
// }
//
// function loadExample() {
//   const select = document.querySelector("#example");
//   setCode(document.querySelector(select.value).textContent);
// }
