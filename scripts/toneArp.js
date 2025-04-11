// 🎹 GLOBAL SYNTH AND RECORDER SETUP
let synth = new Tone.PolySynth().toDestination();
let recorder = new Tone.Recorder();
let isRecording = false;

// 🔌 Connect synth to recorder for recording support
synth.connect(recorder);

// 🌀 Fibonacci generator
const fib = (n) => {
  let a = 0, b = 1, arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(a);
    [a, b] = [b, a + b];
  }
  return arr;
};

// 🎼 Scale: major intervals
const scale = [0, 2, 4, 7, 9, 12];

// 🎵 Arpeggio playback function
const playArp = () => {
  const fibSeq = fib(8); // First 8 Fibonacci numbers
  const notes = fibSeq.map((n) => 60 + (scale[n % scale.length]));
  const now = Tone.now();

  notes.forEach((note, i) => {
    synth.triggerAttackRelease(Tone.Frequency(note, "midi"), "8n", now + i * 0.3);
  });
};

// ▶️ START ARPEGGIO
document.getElementById("startArp").addEventListener("click", async () => {
  await Tone.start();
  console.log("🔊 Tone.js AudioContext started");
  playArp();
});

// ⏹️ STOP BUTTON
document.getElementById("stopBtn").onclick = () => {
  synth.releaseAll();
};

// 🎙️ RECORDING BUTTON
document.getElementById("recordBtn").onclick = async () => {
  await Tone.start(); // Ensure AudioContext is resumed

  if (!isRecording) {
    recorder.start();
    console.log("🔴 Recording started...");
    document.getElementById("recordBtn").textContent = "Stop Recording";
    isRecording = true;

    // Play arpeggio while recording
    playArp();
  } else {
    const recording = await recorder.stop();
    console.log("✅ Recording complete");

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
