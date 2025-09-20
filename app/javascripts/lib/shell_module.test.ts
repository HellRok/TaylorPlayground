import { Console } from "./console";
import { ShellModule } from "./shell_module";

describe("ShellModule", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  beforeEach(() => {
    const canvasElem = document.createElement("canvas");
    canvasElem.setAttribute("id", "canvas");
    document.body.appendChild(canvasElem);
  });

  describe(".attach", () => {
    it("sets window.Module", () => {
      expect(window.Module).toBeUndefined();

      ShellModule.attach();

      expect(window.Module).toBeDefined();
      expect(window.Module.print).toBe(Console.log);
      expect(window.Module.printErr).toBe(Console.logError);
      expect(window.Module.canvas).toBe(document.querySelector("#canvas"));
    });
  });
});
