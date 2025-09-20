import { Console } from "./lib/console";
import { hashParams } from "./lib/hash_params";
import { ShellModule } from "./lib/shell_module";

document.addEventListener("DOMContentLoaded", () => {
  ShellModule.attach();

  Console.setup();

  const params = hashParams.parse(window.location.hash);

  if (params.console) {
    Console.show();
  } else {
    Console.hide();
  }

  const code = document.querySelector("#code") as HTMLTextAreaElement;
  code.textContent = params.code;
});
