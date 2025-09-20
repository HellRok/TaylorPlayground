import { memo } from "react";

export const TaylorIframe = memo(({ src }: { src: string }) => {
  return (
    <iframe data-testid="taylor-iframe" className="right" src={src}></iframe>
  );
});
