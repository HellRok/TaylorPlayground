import LZString from "lz-string";

type PlaygroundParamsResult = {
  version: string;
  code: string;
};

export const playgroundParams = {
  parse: (hash: string): PlaygroundParamsResult => {
    let result: PlaygroundParamsResult = {
      version: "",
      code: "",
    };

    if (hash[0] === "#") {
      hash = hash.slice(1);
    }

    const hashParams = new URLSearchParams(hash);

    for (const [key, value] of hashParams) {
      if (key === "version" && value) {
        result.version = value;
      }

      if (key === "code" && value) {
        result.code = LZString.decompressFromEncodedURIComponent(value);
      }
    }

    return result;
  },

  generateUrl: ({ version, code }: PlaygroundParamsResult): string => {
    let parts: string[] = [];

    parts.push(`version=${version}`);
    parts.push(`code=${LZString.compressToEncodedURIComponent(code)}`);

    let url = new URL(window.location.href);
    url.pathname = "";
    url.search = "";
    url.hash = `#${parts.join("&")}`;

    return url.href;
  },
};
