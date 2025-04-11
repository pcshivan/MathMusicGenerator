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
document.getElementById("startArp").addEventListener("click", async () => {
  await Tone.start();
  console.log("Tone.js AudioContext started");

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const scale = [0, 2, 4, 7, 9, 12];
  const fib = [0, 1, 1, 2, 3, 5, 8, 13];
  const notes = fib.map((n, i) => 60 + (scale[n % scale.length]));

  const now = Tone.now();
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(Tone.Frequency(note, "midi"), "8n", now + i * 0.3);
  });
});


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
