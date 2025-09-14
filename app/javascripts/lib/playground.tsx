import { Toolbar } from "./toolbar";

export function Playground() {
  return (
    <>
      <Toolbar />
      <div className="grid" data-testid="grid"></div>
    </>
  );
}
