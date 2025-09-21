import { cache } from "./cache";
import { useStateContext } from "./state";
import { embedParams } from "./embed_params";
import { TaylorIframe } from "./taylor_iframe";

export function Taylor() {
  const [state, _] = useStateContext();
  const params = embedParams.generate({
    console: true,
    code: state.runningCode,
  });

  if (state.runningCode != cache.code) {
    cache.bump(state.runningCode);
  }

  return (
    <TaylorIframe src={`/${state.version}/?c=${cache.version}${params}`} />
  );
}
