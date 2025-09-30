import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { useStateContext } from "../state";
import { embedParams } from "../embed_params";
import { CopyButton } from "./copy_button";

export function EmbedForm() {
  const [showConsole, setShowConsole] = useState(false);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(480);

  const [state, _] = useStateContext();

  const url = embedParams.generateUrl({
    version: state.version,
    code: state.runningCode,
    console: showConsole,
  });

  const iframeHtml = renderToStaticMarkup(
    <iframe
      width={width || undefined}
      height={height || undefined}
      src={url}
    />,
  );

  return (
    <fieldset data-testid="embed-form" className="embed-form">
      <legend>Embed this example</legend>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={showConsole}
          onChange={(e) => setShowConsole(e.target.checked)}
        />
        Show the console
      </label>

      <label>
        Width
        <input
          id="width"
          type="text"
          inputMode="numeric"
          value={width}
          min="1"
          onChange={(e) => setWidth(parseInt(e.target.value))}
        />
      </label>

      <label>
        Height
        <input
          type="text"
          inputMode="numeric"
          value={height}
          min="1"
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
      </label>

      <textarea data-testid="embed-form-field" readOnly value={iframeHtml} />
      <CopyButton data={iframeHtml} />
    </fieldset>
  );
}
