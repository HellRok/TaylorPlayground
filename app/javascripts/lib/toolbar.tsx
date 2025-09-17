import { Version } from "./version";
import { Example } from "./example";

export function Toolbar() {
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
    </div>
  );
}
