import { Dispatch, SetStateAction, ChangeEvent } from "react";

import { ExampleData } from "./example_data";

interface exampleProps {
  version: string;
  example: string;
  loadExample: (example: string) => void
}

export function Example({
  version,
  example,
  loadExample,
}: exampleProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    loadExample(e.target.value);
  };

  return (
    <select
      data-testid="example"
      value={example}
      onChange={handleChange}
    >
      {ExampleData.examplesFor(version).map((example, index) => (
        <option value={example} key={index}>
          {example}
        </option>
      ))}
    </select>
  );
}
