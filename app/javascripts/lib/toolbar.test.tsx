import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toolbar } from "./toolbar";
import { StateProvider } from "./state";

const ToolbarProps = {
  showShare: false,
  setShowShare: () => {},
};

describe("Toolbar", () => {
  it("renders the run button", () => {
    render(<Toolbar {...ToolbarProps} />);

    expect(screen.getByTestId("run")).toBeDefined();
  });

  it("renders the share button", () => {
    render(<Toolbar {...ToolbarProps} />);

    expect(screen.getByTestId("share")).toBeDefined();
  });

  it("renders the version selector", () => {
    render(<Toolbar {...ToolbarProps} />);

    expect(screen.getByTestId("version")).toBeDefined();
  });

  it("renders the example selector", () => {
    render(<Toolbar {...ToolbarProps} />);

    expect(screen.getByTestId("example")).toBeDefined();
  });

  it("links to the documentation for the selected version", async () => {
    const user = userEvent.setup();
    render(
      <StateProvider>
        <Toolbar {...ToolbarProps} />
      </StateProvider>,
    );

    const docLink: HTMLAnchorElement = screen.getByTestId("documentation");
    expect(docLink.href).toEqual(
      "https://taylormadetech.dev/documentation/taylor/v0.4.1/",
    );

    await user.selectOptions(screen.getByTestId("version"), "v0.3.14.1");
    expect(docLink.href).toEqual(
      "https://taylormadetech.dev/documentation/taylor/v0.3.14.1/",
    );
  });

  it("links to the Taylor website", () => {
    render(<Toolbar {...ToolbarProps} />);

    const taylorLink: HTMLAnchorElement = screen.getByTestId("taylor");
    expect(taylorLink.href).toEqual("https://taylormadetech.dev/");
  });
});
