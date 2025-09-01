import LZString from "lz-string";

function setupModule() {
  window.Module = {
    print: (text) => logToConsole(text),
    printErr: (text) => {
      if (arguments.length > 1) {
        text = Array.prototype.slice.call(arguments).join(' ');
      }

      logToConsole(text);
    },

    canvas: document.getElementById('canvas'),
  };
}

function setupConsole() {
  const taylorConsole = document.querySelector('.console');
  const urlParams = new URLSearchParams(window.location.search);
  const showConsole = urlParams.get('console');

  if (showConsole) {
    taylorConsole.classList.remove("hidden");
  } else {
    taylorConsole.classList.add("hidden");
  }
}

function getCodeFromURL() {
  let code = window.location.hash.substr(1);
  if (code) { code = LZString.decompressFromEncodedURIComponent(code) };
  return code;
}

function logToConsole(message) {
  const taylorConsole = document.querySelector('.console');
  taylorConsole.textContent = taylorConsole.textContent + "\n" + message;
  taylorConsole.scrollTop = taylorConsole.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  setupModule();
  setupConsole();

  if (getCodeFromURL()) {
    document.querySelector('#code').value = getCodeFromURL();
  }
});
