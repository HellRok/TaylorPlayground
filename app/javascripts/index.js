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
  document.querySelector('#reload').addEventListener('click', () => {
    const code = document.querySelector('#code').value;
    window.location.search = `?code=${LZString.compressToEncodedURIComponent(code)}`;
  });

  const codeArea = document.querySelector('#code');

  if (getCodeFromURL()) {
    codeArea.value = getCodeFromURL();
  }

  const code = CodeMirror.fromTextArea(
    codeArea, {
      lineNumbers: true
    });
  code.on('change', () => { code.save(); });
});

function getCodeFromURL() {
  const params = new URLSearchParams(window.location.search);
  let code = params.get('code');

  if (code) { code = LZString.decompressFromEncodedURIComponent(code) };

  return code;
}
