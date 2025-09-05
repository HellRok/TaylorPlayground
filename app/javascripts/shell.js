import { Code } from "./lib/code";
import { Console } from "./lib/console";
import { ShellModule } from "./lib/shell_module";

document.addEventListener("DOMContentLoaded", () => {
  Code.setup();
  Code.loadFromAnchor();

  ShellModule.attach();

  Console.setup();

  const urlParams = new URLSearchParams(window.location.search);
  const showConsole = urlParams.get("console");

  if (showConsole) {
    Console.show();
  } else {
    Console.hide();
  }
});
