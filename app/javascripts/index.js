let code;

window.addEventListener('resize', () => { code.setSize("100%", window.innerHeight - 43); });

document.addEventListener("DOMContentLoaded", () => {
  code = CodeMirror.fromTextArea(
    document.querySelector('#code'), {
      lineNumbers: true
    }
  );
  code.on('change', () => { code.save(); });
  // -25 pixels to ignore the toolbar
  code.setSize("100%", window.innerHeight - 25);

  document.querySelector('#run').addEventListener('click', () => { runCode(); });
  document.querySelector('#link').addEventListener('click', () => { generateLink(); });

  const exampleSelector = document.querySelector('#example');
  exampleSelector.addEventListener('change', () => { loadExample(); runCode(); });

  if (getCodeFromURL()) {
    exampleSelector.value = '#custom';
    document.querySelector(exampleSelector.value).textContent = getCodeFromURL();
    code.setValue(getCodeFromURL());
  } else {
    exampleSelector.value = '#welcome';
    loadExample();
  }
  runCode();
});

function getCodeFromURL() {
  let code = window.location.hash.substr(1);
  if (code) { code = LZString.decompressFromEncodedURIComponent(code) };
  return code;
}

function runCode() {
  const iframe = document.querySelector('iframe');
  const code = document.querySelector('#code').value;
  const uri = new URL(iframe.src);
  uri.hash = `#${LZString.compressToEncodedURIComponent(code)}`;

  iframe.src = uri;
  // Not really sure why this needs to be delayed, but doing it this way
  // makes sure the initial load works, I guess we can't reload using an anchor
  // tag too early?
  setTimeout(() => { iframe.contentWindow.location.reload() }, 0);
}

function generateLink() {
  const code = document.querySelector('#code').value;
  window.location.hash = `#${LZString.compressToEncodedURIComponent(code)}`;
}

function loadExample() {
  const select = document.querySelector('#example');
  code.setValue(document.querySelector(select.value).textContent);
}
