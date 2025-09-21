import { embedParams } from "./embed_params";

describe("embedParams", () => {
  describe(".parse", () => {
    it("returns the defaults when passed an empty string", () => {
      expect(embedParams.parse("")).toEqual({
        code: "",
        console: false,
      });
    });

    it("returns the defaults when passed just a #", () => {
      expect(embedParams.parse("#")).toEqual({
        code: "",
        console: false,
      });
    });

    it("returns the console true when console is present", () => {
      expect(embedParams.parse("#console")).toEqual({
        code: "",
        console: true,
      });
    });

    it("returns the code when compressed code is present", () => {
      expect(embedParams.parse("#code=A4VwLgzgBAXAFgUwDZIPZA")).toEqual({
        code: "puts :hello",
        console: false,
      });
    });

    it("returns everything when present", () => {
      expect(
        embedParams.parse("#console&code=MYGwhgzhAEBCCm8AOBueA7AJkA"),
      ).toEqual({
        code: "class Beep;end",
        console: true,
      });
    });
  });

  describe(".generate", () => {
    it("has the code", () => {
      expect(
        embedParams.generate({
          code: "puts :blah",
          console: false,
        }),
      ).toEqual("#code=A4VwLgzgBAXARgGwIYAsg");
    });

    it("adds the console", () => {
      expect(
        embedParams.generate({
          code: "p :beep",
          console: true,
        }),
      ).toEqual("#console&code=A4AgXARgplxA");
    });
  });
});
