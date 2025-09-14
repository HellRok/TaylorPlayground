import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Toolbar } from "./toolbar";

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

  xit("links to the documentation", () => {
    render(<Toolbar />);

    expect(screen.getByTestId("documentation")).toBeDefined();
  });

  it("links to the Taylor website", () => {
    render(<Toolbar />);

    const taylorLink: HTMLAnchorElement = screen.getByTestId("taylor");
    expect(taylorLink.href).toEqual("https://taylormadetech.dev/");
  });
});
