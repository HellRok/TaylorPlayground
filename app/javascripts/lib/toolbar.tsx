import { useStateContext } from "./state";
import { Version } from "./version";
import { Example } from "./example";

export function Toolbar() {
  const [state, _] = useStateContext();

  return (
    <div className="toolbar" data-testid="toolbar">
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
