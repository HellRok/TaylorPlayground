var Module = {
  print: (function() {
    return function(text) {
      console.log(text);
    };
  })(),
  printErr: function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    if (0) {
      dump(text + '\n');
    }
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
  const params = new URLSearchParams(window.location.search);
  let code = params.get('code');

  if (code) { code = LZString.decompressFromEncodedURIComponent(code) };

  return code;
}
