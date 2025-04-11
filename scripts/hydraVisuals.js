const hydra = new Hydra({
  canvas: document.getElementById("hydra-canvas"),
  detectAudio: false,
  enableStreamCapture: false
});

osc(10, 0.1, 1)
  .color(0.6, 0.3, 0.8)
  .rotate(() => time * 0.2)
  .modulate(osc(3).kaleid(4))
  .out();
