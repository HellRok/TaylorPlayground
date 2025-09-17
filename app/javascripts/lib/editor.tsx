import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { StreamLanguage } from "@codemirror/language";

import { useStateContext } from "./state";

export function Editor() {
  const [state, dispatch] = useStateContext();

  const handleChange = (newCode: string) => {
    dispatch({ type: 'setCode', code: newCode });
  };

  return (
    <CodeMirror
      id="editor"
      className="left"
      value={state.code}
      onChange={handleChange}
      theme={oneDark}
      extensions={[StreamLanguage.define(ruby)]}
    />
  );
};
