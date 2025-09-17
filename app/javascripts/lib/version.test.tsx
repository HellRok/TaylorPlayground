import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Version } from "./version";

describe("Version", () => {
  it("renders a select element", () => {
    render(<Version />);

    expect(screen.getByTestId("version").tagName).toEqual("SELECT");
  });

  it("contains all the versions in descending order", () => {
    render(<Version />);

    const optionElements: NodeListOf<HTMLOptionElement> = screen
      .getByTestId("version")
      .querySelectorAll("option");

    expect(Array.from(optionElements).map((elem) => elem.textContent)).toEqual([
      "v0.4.0",
      "v0.3.14.1",
    ]);
  });
});
