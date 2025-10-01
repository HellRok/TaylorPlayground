import LZString from "lz-string";

type EmbedParamsResult = {
  code: string;
  console: boolean;
};

type EmbedParams = {
  version: string;
  code: string;
  console: boolean;
  cacheBust?: number;
};

export const embedParams = {
  parse: (hash: string): EmbedParamsResult => {
    let result: EmbedParamsResult = {
      code: "",
      console: false,
    };

    if (hash[0] === "#") {
      hash = hash.slice(1);
    }

    const hashParams = new URLSearchParams(hash);

    for (const [key, value] of hashParams) {
      if (key === "console") {
        result.console = true;
      }

      if (key === "code" && value) {
        result.code = LZString.decompressFromEncodedURIComponent(value);
      }
    }

    return result;
  },

  generateUrl: ({ version, code, console, cacheBust }: EmbedParams): string => {
    let hashParams = new URLSearchParams();

    if (console) {
      hashParams.append("console", "");
    }

    hashParams.append("code", LZString.compressToEncodedURIComponent(code));

    let url = new URL(window.location.href);
    url.pathname = `/${version}/`;

    let searchParams = new URLSearchParams();
    if (cacheBust) {
      searchParams.append("c", cacheBust.toString());
    }

    url.search = searchParams.toString();
    url.hash = hashParams.toString();

    return url.href;
  },
};
