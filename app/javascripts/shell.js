var Module = {
  print: (function() {
    return function(text) {
      logToConsole(text);
    };
  })(),
  printErr: function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    logToConsole(text);
  },
  canvas: (function() {
    return document.getElementById('canvas');
  })()
};

document.addEventListener("DOMContentLoaded", () => {
  const codeArea = document.querySelector('#code');

  if (getCodeFromURL()) {
    codeArea.value = getCodeFromURL();
  }
});

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
