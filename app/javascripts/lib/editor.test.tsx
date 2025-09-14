import { render, screen } from "@testing-library/react";

import { Editor } from "./editor";

describe("Editor", () => {
  it("renders with the 'left' class", () => {
    const { container } = render(<Editor />);

    expect(container.querySelector(".left")).toBeDefined();
  });
});
