import { useState } from "react";

import { Toolbar } from "./toolbar";
import { Editor } from "./editor";

export function Playground() {
  const [code, setCode] = useState("");

  return (
    <>
      <Toolbar setCode={setCode} />
      <div className="grid" data-testid="grid">
        <Editor code={code} setCode={setCode} />
      </div>
    </>
  );
}
