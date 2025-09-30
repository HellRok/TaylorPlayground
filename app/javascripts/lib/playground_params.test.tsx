import { playgroundParams } from "./playground_params";

describe("playgroundParams", () => {
  describe(".generateUrl", () => {
    it("has the code", () => {
      expect(
        playgroundParams.generateUrl({
          version: "the-version",
          code: "puts :blah",
        }),
      ).toEqual(
        "http://localhost/#version=the-version&code=A4VwLgzgBAXARgGwIYAsg",
      );
    });
  });
});
