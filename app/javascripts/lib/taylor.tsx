import { useStateContext } from "./state";
import { hashParams} from "./hash_params";

export function Taylor() {
  const [state, _] = useStateContext();
  const params = hashParams.generate({
    console: true,
    code: state.runningCode,
  });

  return(
    <iframe
      data-testid="taylor-iframe"
      className="right"
      src={`/${state.version}/${params}`}
    ></iframe>
  );
}
