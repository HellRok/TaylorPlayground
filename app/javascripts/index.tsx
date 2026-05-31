import { Playground } from "./lib/playground";

import { createRoot } from "react-dom/client";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#playground");
  const root = createRoot(container!);
  root.render(<Playground />);
});
