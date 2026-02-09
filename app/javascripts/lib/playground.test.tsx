import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Playground } from "./playground";
import { embedParams } from "./embed_params";

describe("Playground", () => {
  it("renders the toolbar", () => {
    render(<Playground />);

    expect(screen.getByTestId("toolbar")).toBeDefined();
  });

  describe("in the grid", () => {
    it("renders the editor", () => {
      render(<Playground />);

      expect(screen.getByTestId("grid")).toContainElement(
        document.querySelector("#editor"),
      );
    });

    it("renders Taylor iframe", () => {
      render(<Playground />);

      expect(screen.getByTestId("grid")).toContainElement(
        screen.getByTestId("taylor-iframe"),
      );
    });
  });

  it("Loads welcome.rb for Taylor v0.4.1 by default", () => {
    render(<Playground />);

    const versionSelector: HTMLSelectElement = screen.getByTestId("version");
    expect(versionSelector.value).toEqual("v0.4.1");

    const exampleSelector: HTMLSelectElement = screen.getByTestId("example");
    expect(exampleSelector.value).toEqual("welcome.rb");

    const taylorSelector: HTMLIFrameElement =
      screen.getByTestId("taylor-iframe");
    const iframeUrl = new URL(taylorSelector.src);
    expect(iframeUrl.pathname).toEqual("/v0.4.1/");

    const params = embedParams.parse(iframeUrl.hash);
    expect(params.console).toBe(true);
    // I don't love this test, but it works for now.
    expect(params.code.length).toEqual(828);
  });

  it("changes to share when the share button is clicked", async () => {
    const user = userEvent.setup();
    render(<Playground />);

    expect(document.querySelector("#editor")).toBeInTheDocument();
    expect(screen.queryByTestId("share-form")).not.toBeInTheDocument();

    const shareButton: HTMLButtonElement = screen.getByTestId("share");
    await user.click(shareButton);

    expect(document.querySelector("#editor")).not.toBeInTheDocument();
    expect(screen.queryByTestId("share-form")).toBeInTheDocument();
  });
});
