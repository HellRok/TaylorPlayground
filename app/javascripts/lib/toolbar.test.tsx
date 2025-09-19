import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toolbar } from "./toolbar";
import { StateProvider } from "./state";

describe("Toolbar", () => {
  xit("renders the run button", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("run")).toBeDefined();
  });

  xit("renders the share button", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("share")).toBeDefined();
  });

  it("renders the version selector", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("version")).toBeDefined();
  });

  it("renders the example selector", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("example")).toBeDefined();
  });

  it("links to the documentation for the selected version", async () => {
    const user = userEvent.setup();
    render(
      <StateProvider>
        <Toolbar />
      </StateProvider>
    );

    const docLink: HTMLAnchorElement = screen.getByTestId("documentation");
    expect(docLink.href).toEqual("https://taylormadetech.dev/documentation/taylor/v0.4.0/");

    await user.selectOptions(screen.getByTestId("version"), "v0.3.14.1");
    expect(docLink.href).toEqual("https://taylormadetech.dev/documentation/taylor/v0.3.14.1/");
  });

  it("links to the Taylor website", () => {
    render(<Toolbar />);

    const taylorLink: HTMLAnchorElement = screen.getByTestId("taylor");
    expect(taylorLink.href).toEqual("https://taylormadetech.dev/");
  });
});
