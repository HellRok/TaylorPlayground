import { useStateContext } from "./state";
import { Version } from "./version";
import { Example } from "./example";

export function Toolbar() {
  const [state, dispatch] = useStateContext();

  const handleClick = () => {
    dispatch({ type: "runCode" });
  };

  return (
    <div className="toolbar" data-testid="toolbar">
      <button id="run" onClick={handleClick}>
        Run
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
