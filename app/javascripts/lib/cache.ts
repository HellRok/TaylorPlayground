export const cache = {
  version: 0,
  code: "",

  bump: (code: string) => {
    cache.version = cache.version + 1;
    cache.code = code;
  },
};
