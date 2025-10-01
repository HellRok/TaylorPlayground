import { PlaygroundLinkForm } from "./share_form/playground_link_form";
import { EmbedForm } from "./share_form/embed_form";
import { useStateContext } from "./state";

export function ShareForm() {
  const [state, _] = useStateContext();

  const isCodeDifferentFromRunning = state.runningCode != state.code;

  return (
    <div data-testid="share-form" className="share-form">
      {isCodeDifferentFromRunning ? (
        <fieldset className="warning">
          <legend>Warning!</legend>
          You are sharing the code that is currently running, but that's
          different from what's in your editor. If you didn't mean to do this
          press "Run" to share the code in your editor.
        </fieldset>
      ) : (
        ""
      )}

      <PlaygroundLinkForm />
      <EmbedForm />
    </div>
  );
}
