import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Toolbar } from "./toolbar";

describe("Toolbar", () => {
  const defaultProps = {
    setCode: (value: string) => {},
  };

  xit("renders the run button", () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByTestId("run")).toBeDefined();
  });

  xit("renders the share button", () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByTestId("share")).toBeDefined();
  });

  it("renders the version selector", () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByTestId("version")).toBeDefined();
  });

  it("renders the example selector", () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByTestId("example")).toBeDefined();
  });

  xit("links to the documentation", () => {
    render(<Toolbar {...defaultProps} />);

    expect(screen.getByTestId("documentation")).toBeDefined();
  });

  it("links to the Taylor website", () => {
    render(<Toolbar {...defaultProps} />);

    const taylorLink: HTMLAnchorElement = screen.getByTestId("taylor");
    expect(taylorLink.href).toEqual("https://taylormadetech.dev/");
  });
});
