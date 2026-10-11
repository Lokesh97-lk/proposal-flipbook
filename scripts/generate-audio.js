// Node script to generate authentic audio files (PCM WAV format)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../public/audio');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function writeWav(filename, sampleRate, numChannels, samples) {
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    // Clamp sample between -1 and 1
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 32768 : s * 32767;
    buffer.writeInt16LE(Math.floor(val), offset);
    offset += 2;
  }

  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated ${filename}: ${buffer.length} bytes`);
}

const sampleRate = 44100;

// 1. Click sound (~0.08 sec) - delicate paper/wood tap
{
  const duration = 0.08;
  const len = Math.floor(sampleRate * duration);
  const samples = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 60);
    const osc = Math.sin(2 * Math.PI * 1800 * t) * 0.4 + Math.sin(2 * Math.PI * 920 * t) * 0.6;
    const noise = (Math.random() * 2 - 1) * 0.3;
    samples[i] = (osc + noise) * env * 0.5;
  }
  writeWav('click.mp3', sampleRate, 1, samples);
}

// 2. Page Turn sound (~0.55 sec) - physical paper whoosh & slide
{
  const duration = 0.55;
  const len = Math.floor(sampleRate * duration);
  const samples = new Float32Array(len);
  let b0 = 0, b1 = 0, b2 = 0; // simple IIR filter state
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    // Bell envelope
    const env = Math.sin(Math.PI * (t / duration)) * Math.exp(-t * 2.5) * 1.5;
    const white = Math.random() * 2 - 1;
    // Low-pass / band-pass filter sweep
    const cutoff = 0.1 + 0.25 * Math.sin(Math.PI * (t / duration));
    b0 = b0 + cutoff * (white - b0);
    b1 = b1 + cutoff * (b0 - b1);
    b2 = b2 + cutoff * (b1 - b2);
    // Subtle flutter modulation
    const flutter = 1 + 0.3 * Math.sin(2 * Math.PI * 35 * t);
    samples[i] = b2 * env * flutter * 0.7;
  }
  writeWav('page-turn.mp3', sampleRate, 1, samples);
}

// 3. Paper Open sound (~1.4 sec) - multi-stage unfolding rustle & soft whoosh
{
  const duration = 1.4;
  const len = Math.floor(sampleRate * duration);
  const samples = new Float32Array(len);
  let f1 = 0, f2 = 0;
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    // Multi-burst envelope for unfolding flaps
    const b1 = Math.exp(-Math.pow((t - 0.2) / 0.15, 2)) * 0.6;
    const b2 = Math.exp(-Math.pow((t - 0.6) / 0.22, 2)) * 0.8;
    const b3 = Math.exp(-Math.pow((t - 1.05) / 0.28, 2)) * 0.5;
    const env = b1 + b2 + b3;
    const white = Math.random() * 2 - 1;
    f1 = f1 + 0.15 * (white - f1);
    f2 = f2 + 0.15 * (f1 - f2);
    const crinkle = Math.sin(2 * Math.PI * 120 * t + Math.random() * 0.5) * 0.1;
    samples[i] = (f2 + crinkle) * env * 0.7;
  }
  writeWav('paper-open.mp3', sampleRate, 1, samples);
}

// 4. Paper Fold sound (~1.2 sec) - physical folding, crease snap & tuck
{
  const duration = 1.2;
  const len = Math.floor(sampleRate * duration);
  const samples = new Float32Array(len);
  let f1 = 0, f2 = 0;
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    const b1 = Math.exp(-Math.pow((t - 0.25) / 0.18, 2)) * 0.7;
    const b2 = Math.exp(-Math.pow((t - 0.7) / 0.16, 2)) * 0.9; // crease snap
    const b3 = Math.exp(-Math.pow((t - 0.95) / 0.12, 2)) * 0.4;
    const env = b1 + b2 + b3;
    const white = Math.random() * 2 - 1;
    f1 = f1 + 0.18 * (white - f1);
    f2 = f2 + 0.18 * (f1 - f2);
    samples[i] = f2 * env * 0.65;
  }
  writeWav('paper-fold.mp3', sampleRate, 1, samples);
}

// 5. Ambient sound (~12 sec seamlessly loopable) - warm, dreamy, gentle romantic music chords
{
  const duration = 12.0;
  const len = Math.floor(sampleRate * duration);
  const samples = new Float32Array(len);
  
  // Romantic warm chord progression: Dmaj9 -> Bm7 -> Gmaj7 -> Asus4
  // D4(293.66), F#4(369.99), A4(440), C#5(554.37), E5(659.25)
  const chords = [
    [293.66, 369.99, 440.00, 554.37], // Dmaj9 (0 - 3s)
    [246.94, 293.66, 369.99, 440.00], // Bm7 (3 - 6s)
    [196.00, 246.94, 293.66, 369.99], // Gmaj7 (6 - 9s)
    [220.00, 293.66, 329.63, 440.00], // Asus4 (9 - 12s)
  ];

  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    const chordIdx = Math.floor(t / 3.0) % chords.length;
    const chordNotes = chords[chordIdx];
    const chordT = (t % 3.0) / 3.0;
    // Gentle chord envelope with soft swell
    const chordEnv = Math.sin(Math.PI * chordT);

    let sum = 0;
    for (let c = 0; c < chordNotes.length; c++) {
      const freq = chordNotes[c];
      // Soft sine waves with gentle warm second harmonic
      const note = Math.sin(2 * Math.PI * freq * t) * 0.7 + Math.sin(2 * Math.PI * (freq * 2) * t) * 0.15;
      sum += note;
    }
    // Sub bass warmth
    const subBass = Math.sin(2 * Math.PI * (chordNotes[0] / 2) * t) * 0.35;
    // Soft high sparkle chime note
    const sparkleFreq = chordNotes[c_idx(chordIdx, t)];
    const sparkleEnv = Math.exp(-((t * 2) % 1) * 3) * 0.2;
    const sparkle = Math.sin(2 * Math.PI * sparkleFreq * 2 * t) * sparkleEnv;

    const raw = (sum * 0.15 + subBass * 0.12 + sparkle) * chordEnv;

    // Loop crossfade at boundaries (0.5s)
    let loopFade = 1.0;
    if (t < 0.5) loopFade = t / 0.5;
    else if (t > duration - 0.5) loopFade = (duration - t) / 0.5;

    samples[i] = raw * loopFade * 0.45;
  }

  function c_idx(ci, time) {
    const step = Math.floor(time * 2) % 4;
    return step % 4;
  }

  writeWav('ambient.mp3', sampleRate, 1, samples);
}
console.log('Audio generation completed successfully.');
