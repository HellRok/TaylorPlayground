import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Playground } from "./playground";

describe("Playground", () => {
  it("renders the toolbar", () => {
    render(<Playground />);

    expect(screen.getByTestId("toolbar")).toBeDefined();
  });

  describe("in the grid", () => {
    it("renders the editor", () => {
      render(<Playground />);

      expect(screen.getByTestId("grid")).toContainElement(
        screen.getByTestId("editor"),
      );
    });

    xit("renders Taylor iframe", () => {
      render(<Playground />);

      expect(screen.getByTestId("grid")).toContainElement(
        screen.getByTestId("taylor"),
      );
    });
  });

  it("Loads welcome.rb for Taylor v0.4.0 by default", () => {
    render(<Playground />);

    const versionSelector: HTMLSelectElement = screen.getByTestId("version");
    expect(versionSelector.value).toEqual("v0.4.0");

    const exampleSelector: HTMLSelectElement = screen.getByTestId("example");
    expect(exampleSelector.value).toEqual("welcome.rb");
  });
});
