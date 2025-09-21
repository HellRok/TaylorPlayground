import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { StateProvider } from "./state";
import { ShareForm } from "./share_form";

describe("ShareForm", () => {
  it("lets you copy a URL to the current state of the playground", () => {
    render(
      <StateProvider>
        <ShareForm />
      </StateProvider>,
    );

    const copyField: HTMLInputElement =  screen.getByTestId("copy-form-field");
    expect(copyField).toBeInTheDocument();
    expect(copyField.value).toEqual("snthsnth");
    expect(screen.getByTestId("copy-form-button")).toBeInTheDocument();
  });
});
