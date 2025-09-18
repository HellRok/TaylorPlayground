import LZString from "lz-string";

type HashParamsResult = {
  code: string,
  console: boolean,
}

export const hashParams = {
  // This is a little naive but I control a lot of the data going in, so it
  // should be pretty safe.
  parse: (hash: string): HashParamsResult => {
    let result: HashParamsResult = {
      code: "",
      console: false,
    }

    if (hash[0] === "#") {
      hash = hash.slice(1);
    }

    const parts = hash.split("&").map((part) => part.split("="));

    parts.forEach((part) => {
      const key = part[0];
      const value = part[1];
      if (key === "console") {
        result.console = true
      }

      if (key === "code" && value) {
        result.code = LZString.decompressFromEncodedURIComponent(value);
      }
    });

    return result;
  },

  generate: (params: HashParamsResult): string => {
    let parts: string[] = [];

    if (params.console) {
      parts.push("console");
    }

    parts.push(`code=${LZString.compressToEncodedURIComponent(params.code)}`);

    return `#${parts.join("&")}`;
  },
};
