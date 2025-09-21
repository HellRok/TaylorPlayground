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

  const handleRunClick = () => {
    dispatch({ type: "runCode" });
    cache.bump(state.runningCode);
  };

  const handleShareClick = () => {
    setShowShare(!showShare);
  };

  return (
    <div className="toolbar" data-testid="toolbar">
      <button data-testid="run" onClick={handleRunClick}>
        Run
      </button>
      <button data-testid="share" onClick={handleShareClick}>
        Share
      </button>
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
