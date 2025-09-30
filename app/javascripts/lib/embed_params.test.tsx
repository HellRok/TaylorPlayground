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

  describe(".generateUrl", () => {
    it("has the code and version", () => {
      expect(
        embedParams.generateUrl({
          version: "the-version",
          code: "puts :blah",
          console: false,
        }),
      ).toEqual("http://localhost/the-version#code=A4VwLgzgBAXARgGwIYAsg");
    });

    it("adds the console", () => {
      expect(
        embedParams.generateUrl({
          version: "the-version",
          code: "p :beep",
          console: true,
        }),
      ).toEqual("http://localhost/the-version#console&code=A4AgXARgplxA");
    });

    it("adds the cache buster", () => {
      expect(
        embedParams.generateUrl({
          version: "the-version",
          code: "p :beep",
          console: true,
          cacheBust: 1,
        }),
      ).toEqual("http://localhost/the-version?c=1#console&code=A4AgXARgplxA");
    });
  });
});
