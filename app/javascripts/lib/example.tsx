import { ChangeEvent } from "react";

import { useStateContext } from "./state";
import { ExampleData } from "./example_data";

export function Example() {
  const [state, dispatch] = useStateContext();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "setExample", example: e.target.value });
  };

  return (
    <select data-testid="example" value={state.example} onChange={handleChange}>
      {ExampleData.examplesFor(state.version).map((example, index) => (
        <option value={example} key={index}>
          {example}
        </option>
      ))}
    </select>
  );
}
