import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Playground } from "./playground";

describe("Playground", () => {
  // afterEach(() => {
  //   document.body.innerHTML = "";
  // });

  // beforeEach(() => {
  //   const consoleElem = document.createElement("div");
  //   consoleElem.setAttribute("id", "playground");
  //   document.body.appendChild(consoleElem);
  // });

  describe(".view", () => {
    it("renders stuff", () => {
      render(<Playground />);

      expect(screen.getByTestId("playground")).toHaveTextContent(
        "Clicker clicked 0 times",
      );
    });
  });
});
