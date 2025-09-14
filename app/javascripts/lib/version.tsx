import { Dispatch, SetStateAction, ChangeEvent } from "react";

import { ExampleData } from "./example_data";

interface versionProps {
  version: string;
  setVersion: Dispatch<SetStateAction<string>>;
  loadExample: (example: string) => void;
}

export function Version({ version, setVersion, loadExample }: versionProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value;
    setVersion(newVersion);
    loadExample("welcome.rb");
  };

  return (
    <select data-testid="version" value={version} onChange={handleChange}>
      {ExampleData.versions().map((version, index) => (
        <option value={version} key={index}>
          {version}
        </option>
      ))}
    </select>
  );
}
