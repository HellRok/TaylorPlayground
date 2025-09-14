import { useState, Dispatch, SetStateAction } from "react";

import { Version } from "./version";
import { Example } from "./example";
import { ExampleData } from "./example_data";

interface toolbarProps {
  // This is gross, the second type is only for mocking in tests
  setCode: Dispatch<SetStateAction<string>> | ((value: string) => void);
}

export function Toolbar({ setCode }: toolbarProps) {
  const [version, setVersion] = useState("v0.4.0");
  const [example, setExample] = useState("welcome.rb");
  setCode(ExampleData.codeFor(version, example));

  const loadExample = (example: string) => {
    setExample(example);
    setCode(ExampleData.codeFor(version, example));
  };

  return (
    <div className="toolbar" data-testid="toolbar">
      <Version
        version={version}
        setVersion={setVersion}
        loadExample={loadExample}
      />
      <Example version={version} example={example} loadExample={loadExample} />
      <a
        className="button"
        href="https://taylormadetech.dev/"
        target="_blank"
        data-testid="taylor"
      >
        Home
      </a>
    </div>
  );
}
