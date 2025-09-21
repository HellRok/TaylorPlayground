import { Console } from "./lib/console";
import { embedParams } from "./lib/embed_params";
import { ShellModule } from "./lib/shell_module";

document.addEventListener("DOMContentLoaded", () => {
  ShellModule.attach();

  Console.setup();

  const params = embedParams.parse(window.location.hash);

  if (params.console) {
    Console.show();
  } else {
    Console.hide();
  }

  const code = document.querySelector("#code") as HTMLTextAreaElement;
  code.textContent = params.code;
});
