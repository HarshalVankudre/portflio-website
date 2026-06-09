import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outputPath = join(projectRoot, "public", "audio", "portfolio-bed.wav");

const sampleRate = 44100;
const channels = 2;
const seconds = 12;
const totalSamples = sampleRate * seconds;
const bpm = 120;
const beatSeconds = 60 / bpm;
const twoPi = Math.PI * 2;
const maxInt16 = 32767;

const notes = {
  A2: 110,
  C3: 130.81,
  F2: 87.31,
  G2: 98,
  C4: 261.63,
  E4: 329.63,
  F4: 349.23,
  G4: 392,
  A4: 440,
  B4: 493.88,
  C5: 523.25,
  E5: 659.25,
  G5: 783.99,
};

const progression = [
  { root: notes.A2, chord: [notes.A4, notes.C5, notes.E5, notes.G5] },
  { root: notes.F2, chord: [notes.F4, notes.A4, notes.C5, notes.E5] },
  { root: notes.C3, chord: [notes.C4, notes.E4, notes.G4, notes.B4] },
  { root: notes.G2, chord: [notes.G4, notes.B4, notes.C5, notes.E5] },
];

let seed = 0x1a2b3c4d;
const noise = () => {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 0xffffffff - 0.5;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const sine = (frequency, time) => Math.sin(twoPi * frequency * time);
const saw = (frequency, time) => 2 * ((time * frequency) % 1) - 1;

const envelope = (age, duration, attack, release) => {
  if (age < 0 || age > duration) return 0;
  const fadeIn = clamp(age / attack, 0, 1);
  const fadeOut = clamp((duration - age) / release, 0, 1);
  return Math.min(fadeIn, fadeOut);
};

const getSection = (time) => progression[Math.min(3, Math.floor(time / 3))];

const padAt = (time) => {
  const section = getSection(time);
  const local = time % 3;
  const env = envelope(local, 3, 0.4, 0.55);

  return (
    section.chord.reduce((sum, frequency, index) => {
      const detune = index % 2 === 0 ? 0.997 : 1.003;
      return sum + sine(frequency * detune, time) * 0.09;
    }, 0) * env
  );
};

const bassAt = (time) => {
  const section = getSection(time);
  const beat = Math.floor(time / beatSeconds);
  const age = time - beat * beatSeconds;
  const env = envelope(age, 0.42, 0.015, 0.22);
  const octaveBump = beat % 4 === 3 ? 1.5 : 1;
  const frequency = section.root * octaveBump;

  return (sine(frequency, time) * 0.28 + sine(frequency * 2, time) * 0.08) * env;
};

const arpAt = (time) => {
  const section = getSection(time);
  const stepDuration = beatSeconds / 2;
  const step = Math.floor(time / stepDuration);
  const age = time - step * stepDuration;
  const frequency = section.chord[step % section.chord.length] * (step % 8 === 7 ? 2 : 1);
  const env = envelope(age, stepDuration, 0.01, 0.12);

  return (sine(frequency, time) * 0.18 + saw(frequency * 2, time) * 0.045) * env;
};

const drumsAt = (time) => {
  const beat = Math.floor(time / beatSeconds);
  const beatAge = time - beat * beatSeconds;
  const eighth = Math.floor(time / (beatSeconds / 2));
  const hatAge = time - eighth * (beatSeconds / 2);

  const kickEnv = beat % 2 === 0 ? envelope(beatAge, 0.22, 0.005, 0.18) : 0;
  const kickPitch = 52 + 85 * Math.exp(-beatAge * 18);
  const kick = sine(kickPitch, time) * kickEnv * 0.58;

  const snareEnv = beat % 4 === 2 ? envelope(beatAge, 0.18, 0.004, 0.12) : 0;
  const snare = (noise() * 0.7 + sine(190, time) * 0.3) * snareEnv * 0.18;

  const hatEnv = envelope(hatAge, 0.055, 0.002, 0.04);
  const hat = noise() * hatEnv * 0.08;

  return kick + snare + hat;
};

const writeString = (buffer, offset, value) => {
  for (let i = 0; i < value.length; i += 1) {
    buffer.writeUInt8(value.charCodeAt(i), offset + i);
  }
};

mkdirSync(dirname(outputPath), { recursive: true });

const dataBytes = totalSamples * channels * 2;
const buffer = Buffer.alloc(44 + dataBytes);

writeString(buffer, 0, "RIFF");
buffer.writeUInt32LE(36 + dataBytes, 4);
writeString(buffer, 8, "WAVE");
writeString(buffer, 12, "fmt ");
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * 2, 28);
buffer.writeUInt16LE(channels * 2, 32);
buffer.writeUInt16LE(16, 34);
writeString(buffer, 36, "data");
buffer.writeUInt32LE(dataBytes, 40);

for (let sample = 0; sample < totalSamples; sample += 1) {
  const time = sample / sampleRate;
  const masterFade = Math.min(
    clamp(time / 0.35, 0, 1),
    clamp((seconds - time) / 0.65, 0, 1)
  );
  const rhythmGate = 0.94 + 0.06 * Math.sin(twoPi * (time / beatSeconds));
  const dry = (padAt(time) + bassAt(time) + arpAt(time) + drumsAt(time)) * masterFade * rhythmGate;
  const side = Math.sin(twoPi * 0.09 * time) * 0.04;
  const left = clamp(dry * (0.86 + side), -0.95, 0.95);
  const right = clamp(dry * (0.86 - side), -0.95, 0.95);
  const offset = 44 + sample * channels * 2;

  buffer.writeInt16LE(Math.round(left * maxInt16), offset);
  buffer.writeInt16LE(Math.round(right * maxInt16), offset + 2);
}

writeFileSync(outputPath, buffer);
console.log(`Generated ${outputPath}`);
