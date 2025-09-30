import { useState } from "react";

interface CopyButtonProps {
  data: string;
}

export function CopyButton({ data }: CopyButtonProps) {
  const [state, setState] = useState("idle");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        setState("success");
        setTimeout(() => setState("idle"), 4000);
      })
      .catch((error) => {
        console.error(error.message);
        setState("failure");
      });
  };

  let copy = "Copy";
  let classes = "copy-button";

  if (state === "success") {
    classes += " green";
    copy = "Copied!";
  } else if (state === "failure") {
    classes += " red";
    copy = "Failed";
  }

  return (
    <button data-testid="copy-button" className={classes} onClick={handleCopy}>
      {copy}
    </button>
  );
}
