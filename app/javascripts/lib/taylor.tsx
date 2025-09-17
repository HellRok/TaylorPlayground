import LZString from "lz-string";

import { useStateContext } from "./state";

export function Taylor() {
  const [state, _] = useStateContext();
  // src={`/${version}/#console&code=${LZString.compressToEncodedURIComponent(code)}`}

  return(
    <iframe
      data-testid="taylor-iframe"
      className="right"
      src={`/${state.version}/?t=${(new Date).toString()}&console=1#${LZString.compressToEncodedURIComponent(state.runningCode)}`}
    ></iframe>
  );
}
