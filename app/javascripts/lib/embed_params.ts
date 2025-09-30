import LZString from "lz-string";

type EmbedParamsResult = {
  version: string;
  code: string;
  console: boolean;
  cacheBust?: number;
};

export const embedParams = {
  // This is a little naive but I control a lot of the data going in, so it
  // should be pretty safe.
  parse: (hash: string): EmbedParamsResult => {
    let result: EmbedParamsResult = {
      code: "",
      console: false,
    };

    if (hash[0] === "#") {
      hash = hash.slice(1);
    }

    const parts = hash.split("&").map((part) => part.split("="));

    parts.forEach((part) => {
      const key = part[0];
      const value = part[1];
      if (key === "console") {
        result.console = true;
      }

      if (key === "code" && value) {
        result.code = LZString.decompressFromEncodedURIComponent(value);
      }
    });

    return result;
  },

  generateUrl: ({
    version,
    code,
    console,
    cacheBust,
  }: EmbedParamsResult): string => {
    let parts: string[] = [];

    if (console) {
      parts.push("console");
    }

    parts.push(`code=${LZString.compressToEncodedURIComponent(code)}`);

    let url = new URL(window.location.href);
    url.pathname = `/${version}`;

    let searchParams = new URLSearchParams();
    if (cacheBust) {
      searchParams.append("c", cacheBust.toString());
    }

    url.search = searchParams.toString();
    url.hash = `#${parts.join("&")}`;

    return url.href;
  },
};
