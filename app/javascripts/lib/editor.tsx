import { Dispatch, SetStateAction } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { StreamLanguage } from "@codemirror/language";

interface editorProps {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

export function Editor({ code, setCode }: editorProps) {
  return (
    <CodeMirror
      id="editor"
      className="left"
      value={code}
      onChange={setCode}
      theme={oneDark}
      extensions={[StreamLanguage.define(ruby)]}
    />
  );
}
