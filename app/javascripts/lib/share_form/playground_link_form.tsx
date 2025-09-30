import { useStateContext } from "../state";
import { playgroundParams } from "../playground_params";
import { CopyButton } from "./copy_button";

export function PlaygroundLinkForm() {
  const [state, _] = useStateContext();

  const url = playgroundParams.generateUrl({
    version: state.version,
    code: state.runningCode,
  });

  return (
    <fieldset data-testid="copy-form" className="link-form">
      <legend>Link to playground</legend>
      <input data-testid="copy-form-field" readOnly value={url} />
      <CopyButton data={url} />
    </fieldset>
  );
}
