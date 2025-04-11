const gw = Gibberwocky();

gw.init();

document.getElementById("runCodeBtn").onclick = () => {
  const code = document.getElementById("codeArea").value;
  gw.evaluate(code);
};

document.getElementById("saveCodeBtn").onclick = () => {
  localStorage.setItem("gibber_code", document.getElementById("codeArea").value);
  alert("Code saved!");
};

document.getElementById("loadCodeBtn").onclick = () => {
  const code = localStorage.getItem("gibber_code");
  if (code) {
    document.getElementById("codeArea").value = code;
    alert("Code loaded!");
  } else {
    alert("No saved code found.");
  }
};
