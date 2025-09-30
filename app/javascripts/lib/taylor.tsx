import { cache } from "./cache";
import { useStateContext } from "./state";
import { embedParams } from "./embed_params";
import { TaylorIframe } from "./taylor_iframe";

export function Taylor() {
  const [state, _] = useStateContext();

  const embedUrl = embedParams.generateUrl({
    version: state.version,
    console: true,
    code: state.runningCode,
    cacheBust: cache.version,
  });

  if (state.runningCode != cache.code) {
    cache.bump(state.runningCode);
  }

  return <TaylorIframe src={embedUrl} />;
}
