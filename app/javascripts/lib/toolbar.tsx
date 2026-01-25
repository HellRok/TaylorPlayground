import { Dispatch, SetStateAction } from "react";

import { cache } from "./cache";
import { useStateContext } from "./state";
import { Version } from "./version";
import { Example } from "./example";

interface ToolbarProps {
  showShare: boolean;
  setShowShare: Dispatch<SetStateAction<boolean>>;
}

export function Toolbar({ showShare, setShowShare }: ToolbarProps) {
  const [state, dispatch] = useStateContext();

  const handleRunClick = (e) => {
    e.preventDefault();
    dispatch({ type: "runCode" });
    cache.bump(state.runningCode);
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    setShowShare(!showShare);
  };

  return (
    <div className="toolbar" data-testid="toolbar">
      <a data-testid="run" className="button green toolbar--run-button" onClick={handleRunClick}>
        Run
      </a>
      <a data-testid="share" className="button blue toolbar--share-button" onClick={handleShareClick}>
        {showShare ? "Edit" : "Share"}
      </a>
      <Version />
      <Example />
      <a
        className="button"
        href="https://taylormadetech.dev/"
        target="_blank"
        data-testid="taylor"
      >
        Home
      </a>
      <a
        className="button"
        href={`https://taylormadetech.dev/documentation/taylor/${state.version}/`}
        target="_blank"
        data-testid="documentation"
      >
        Documentation
      </a>
    </div>
  );
}
