let synth = new Tone.PolySynth().toDestination();
let recorder = new Tone.Recorder();
let isRecording = false;

synth.connect(recorder);

// Fibonacci generator
const fib = (n) => {
  let a = 0, b = 1, arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(a);
    [a, b] = [b, a + b];
  }
  return arr;
};

let seq;

// 🎵 PLAY BUTTON
document.getElementById("playBtn").onclick = async () => {
  await Tone.start();

  // ✅ Debug: check audio context
  console.log("Tone.js audio context started:", Tone.context.state);

  // ✅ Debug: test sine beep
  const osc = new Tone.Oscillator(440, "sine").toDestination();
  osc.start();
  setTimeout(() => osc.stop(), 1000); // stop beep after 1 sec

  // 🎼 Generate Fibonacci-based MIDI notes
  const notes = fib(16).map(n => 60 + (n % 12)); // C major-ish
  let now = Tone.now();
  notes.forEach((n, i) => {
    synth.triggerAttackRelease(Tone.Frequency(n, "midi"), "8n", now + i * 0.3);
  });
};

// ⏹️ STOP BUTTON
document.getElementById("stopBtn").onclick = () => {
  synth.releaseAll();
};

// 🎙️ RECORDING LOGIC
document.getElementById("recordBtn").onclick = async () => {
  if (!isRecording) {
    recorder.start();
    document.getElementById("recordBtn").textContent = "Stop Recording";
    isRecording = true;
  } else {
    const recording = await recorder.stop();
    const url = URL.createObjectURL(await recording);
    const anchor = document.createElement("a");
    anchor.download = "harmonic-arpeggio.wav";
    anchor.href = url;
    document.getElementById("downloadBtn").disabled = false;
    document.getElementById("downloadBtn").onclick = () => anchor.click();
    document.getElementById("recordBtn").textContent = "Start Recording";
    isRecording = false;
  }
};
