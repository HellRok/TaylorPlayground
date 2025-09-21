import { useState } from "react";

import { Editor } from "./editor";
import { ShareForm } from "./share_form";
import { StateProvider } from "./state";
import { Taylor } from "./taylor";
import { Toolbar } from "./toolbar";

export function Playground() {
  const [showShare, setShowShare] = useState(true);

  return (
    <StateProvider>
      <Toolbar showShare={showShare} setShowShare={setShowShare} />
      <div className="grid" data-testid="grid">
        {showShare ? <ShareForm /> : <Editor />}
        <Taylor />
      </div>
    </StateProvider>
  );
}
