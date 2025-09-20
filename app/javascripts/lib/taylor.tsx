import { cache } from "./cache";
import { useStateContext } from "./state";
import { hashParams } from "./hash_params";
import { TaylorIframe } from "./taylor_iframe";

export function Taylor() {
  const [state, _] = useStateContext();
  const params = hashParams.generate({
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
