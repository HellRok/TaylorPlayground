import { Toolbar } from "./toolbar";
import { Editor } from "./editor";
import { Taylor } from "./taylor";
import { StateProvider } from "./state";

export function Playground() {
  return (
    <StateProvider>
      <Toolbar />
      <div className="grid" data-testid="grid">
        <Editor />
        <Taylor />
      </div>
    </StateProvider>
  );
}
