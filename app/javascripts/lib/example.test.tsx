import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Example } from "./example";

describe("Example", () => {
  it("renders a select element", () => {
    render(<Example />);

    expect(screen.getByTestId("example").tagName).toEqual("SELECT");
  });

  it("contains all the examples for the current version", () => {
    render(<Example />);

    const optionElements: NodeListOf<HTMLOptionElement> = screen
      .getByTestId("example")
      .querySelectorAll("option");

    expect(Array.from(optionElements).map((elem) => elem.textContent)).toEqual([
      "benchmark.rb",
      "custom.rb",
      "welcome.rb",
    ]);
  });
});
