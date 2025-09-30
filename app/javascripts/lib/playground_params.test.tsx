import { playgroundParams } from "./playground_params";

describe("playgroundParams", () => {
  describe(".parse", () => {
    it("returns the defaults when passed an empty string", () => {
      expect(playgroundParams.parse("")).toEqual({
        version: "",
        code: "",
      });
    });

    it("returns the defaults when passed just a #", () => {
      expect(playgroundParams.parse("#")).toEqual({
        version: "",
        code: "",
      });
    });

    it("returns everything when present", () => {
      expect(
        playgroundParams.parse(
          "#version=the-version&code=MYGwhgzhAEBCCm8AOBueA7AJkA",
        ),
      ).toEqual({
        version: "the-version",
        code: "class Beep;end",
      });
    });
  });

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
