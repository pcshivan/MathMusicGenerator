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

let notesPlaying = false;

// 🎵 PLAY BUTTON
document.getElementById("startArp").addEventListener("click", async () => {
  await Tone.start();
  console.log("Tone.js AudioContext started");

  const scale = [0, 2, 4, 7, 9, 12];
  const fibSeq = fib(8);
  const notes = fibSeq.map((n) => 60 + (scale[n % scale.length]));

  const now = Tone.now();
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(Tone.Frequency(note, "midi"), "8n", now + i * 0.3);
  });

  notesPlaying = true;
});

// ⏹️ STOP BUTTON
document.getElementById("stopBtn").onclick = () => {
  synth.releaseAll();
  notesPlaying = false;
};

// 🎙️ RECORDING LOGIC
document.getElementById("recordBtn").onclick = async () => {
  if (!isRecording) {
    await Tone.start(); // Ensure audio context is resumed
    recorder.start();
    document.getElementById("recordBtn").textContent = "Stop Recording";
    isRecording = true;

    // Trigger notes immediately after starting recorder
    const scale = [0, 2, 4, 7, 9, 12];
    const fibSeq = fib(8);
    const notes = fibSeq.map((n) => 60 + (scale[n % scale.length]]);
    const now = Tone.now();

    notes.forEach((note, i) => {
      synth.triggerAttackRelease(Tone.Frequency(note, "midi"), "8n", now + i * 0.3);
    });
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
