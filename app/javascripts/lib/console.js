export const Console = {
  element: undefined,
  setup: () => {
    Console.element = document.querySelector("#console");
  },

  show: () => {
    Console.element.classList.remove("hidden");
  },

  hide: () => {
    Console.element.classList.add("hidden");
  },

  log: (message) => {
    if (Console.element.textContent === "") {
      Console.element.textContent = message;
    } else {
      Console.element.textContent =
        Console.element.textContent + "\n" + message;
    }

    Console.element.scrollTop = Console.element.scrollHeight;
  },

  logError: function () {
    /*
     * `arguments` doesn't work with () => {} style functions as expected, at
     * least in jest.
     *
     * This method from emscripten can be called with any amount of arguments,
     * but they should all be strings, so we just reduce down to a single
     * string to log.
     */
    Console.log(
      Array.from(arguments)
        .reduce((message, error) => `${message} ${error}`, "")
        .slice(1),
    );
  },
};
