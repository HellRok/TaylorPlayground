import { useState } from "react";

import { Toolbar } from "./toolbar";

export function Playground() {
  const [code, setCode] = useState("");

  return (
    <>
      <Toolbar setCode={setCode} />
      <div className="grid" data-testid="grid"></div>
    </>
  );
}
