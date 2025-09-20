import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Playground } from "./playground";
import { hashParams } from "./hash_params";

describe("Playground", () => {
  it("renders the toolbar", () => {
    render(<Playground />);

    expect(screen.getByTestId("toolbar")).toBeDefined();
  });

  describe("in the grid", () => {
    it("renders the editor", () => {
      const { container } = render(<Playground />);

      expect(screen.getByTestId("grid")).toContainElement(
        container.querySelector("#editor"),
      );
    });

    it("renders Taylor iframe", () => {
      render(<Playground />);

      expect(screen.getByTestId("grid")).toContainElement(
        screen.getByTestId("taylor-iframe"),
      );
    });
  });

  it("Loads welcome.rb for Taylor v0.4.0 by default", () => {
    render(<Playground />);

    const versionSelector: HTMLSelectElement = screen.getByTestId("version");
    expect(versionSelector.value).toEqual("v0.4.0");

    const exampleSelector: HTMLSelectElement = screen.getByTestId("example");
    expect(exampleSelector.value).toEqual("welcome.rb");

    const taylorSelector: HTMLIFrameElement =
      screen.getByTestId("taylor-iframe");
    const iframeUrl = new URL(taylorSelector.src);
    expect(iframeUrl.pathname).toEqual("/v0.4.0/");

    const params = hashParams.parse(iframeUrl.hash);
    expect(params.console).toBe(true);
    expect(params.code.length).toEqual(14);
  });
});
