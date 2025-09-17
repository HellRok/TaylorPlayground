import { ChangeEvent } from "react";

import { useStateContext } from "./state";
import { ExampleData } from "./example_data";

export function Version() {
  const [state, dispatch] = useStateContext();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'setVersion', version: e.target.value });
  };

  return (
    <select data-testid="version" value={state.version} onChange={handleChange}>
      {ExampleData.versions().map((version, index) => (
        <option value={version} key={index}>
          {version}
        </option>
      ))}
    </select>
  );
}
