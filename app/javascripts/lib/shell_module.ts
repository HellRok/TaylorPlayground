import { Console } from "./console";

export const ShellModule = {
  attach: () => {
    window.Module = {
      print: Console.log,
      printErr: Console.logError,
      canvas: document.querySelector("#canvas"),
    };
  },
};
