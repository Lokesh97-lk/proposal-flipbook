/**
 * Audio Engine Utility
 * Provides HTML5 Audio playback with procedural Web Audio API synthesis fallback.
 * Guarantees zero silence, zero decode crashes, and smooth responsive sound.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.ambientSource = null;
    this.ambientGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.volume = 0.48;
    this.audioElements = {};
    this.ambientTimer = null;
    this.isAmbientPlaying = false;
    this.hasInitiatedAmbient = false;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.ambientGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Preload HTML5 audio elements
  preloadAudio() {
    if (typeof window === 'undefined') return;
    const files = {
      click: '/audio/click.mp3',
      'page-turn': '/audio/page-turn.mp3',
      'paper-open': '/audio/paper-open.mp3',
      'paper-fold': '/audio/paper-fold.mp3',
      ambient: '/audio/muzumathi.mp3?v=20261012'
    };

    Object.entries(files).forEach(([key, src]) => {
      try {
        const audio = new Audio();
        audio.src = src;
        audio.preload = 'auto';
        if (key === 'ambient') {
          audio.loop = true;
          audio.volume = this.volume;
          audio.onerror = () => {
            if (audio.src.indexOf('muzumathi.mp3') !== -1) {
              audio.src = '/audio/ambient.mp3?v=20261012';
              audio.load();
              if (this.isAmbientPlaying && !this.isMuted) {
                audio.play().catch(() => {});
              }
            }
          };
        }
        this.audioElements[key] = audio;
      } catch (e) {
        console.warn('Audio preload warning for ' + key, e);
      }
    });
  }

  // Play a sound effect with procedural synthesis fallback
  playSFX(name) {
    if (this.isMuted) return;
    this.initContext();

    // Try HTML5 audio file first
    const el = this.audioElements[name];
    if (el) {
      try {
        const clone = el.cloneNode();
        clone.volume = 0.5;
        const promise = clone.play();
        if (promise) {
          promise.catch(() => {
            // If browser blocked or file decode failed, use procedural synthesis
            this.synthesizeSFX(name);
          });
          return;
        }
      } catch (err) {
        // Fallback to synthesis
      }
    }

    this.synthesizeSFX(name);
  }

  // Real-time Web Audio API Procedural Synthesis for crisp tactile paper sounds
  synthesizeSFX(name) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    switch (name) {
      case 'click': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case 'page-turn': {
        // Realistic paper swoosh using filtered white noise
        const bufferSize = this.ctx.sampleRate * 0.45;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 1.8;
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.2);
        filter.frequency.exponentialRampToValueAtTime(600, now + 0.45);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + 0.46);
        break;
      }

      case 'paper-open': {
        // Multi-stage unfolding rustle
        const duration = 1.2;
        const bufferSize = Math.floor(this.ctx.sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.8;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(2200, now + 0.6);
        filter.frequency.exponentialRampToValueAtTime(500, now + 1.2);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.2);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + duration + 0.05);
        break;
      }

      case 'paper-fold': {
        // Crease tuck & fold snap
        const duration = 0.9;
        const bufferSize = Math.floor(this.ctx.sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.7;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 2.0;
        filter.frequency.setValueAtTime(1600, now);
        filter.frequency.exponentialRampToValueAtTime(450, now + 0.9);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(now);
        noise.stop(now + duration + 0.05);
        break;
      }

      case 'unlock': {
        // Melodic music box arpeggio chime (C5, E5, G5, C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.001, now + idx * 0.09);
          gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.09 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.85);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.9);
        });
        break;
      }

      default:
        break;
    }
  }

  // Start background ambient music
  playAmbient() {
    this.hasInitiatedAmbient = true;
    if (this.isAmbientPlaying || this.isMuted) return;
    this.initContext();
    this.isAmbientPlaying = true;

    // Try HTML5 audio file first
    const ambientEl = this.audioElements['ambient'];
    if (ambientEl) {
      ambientEl.volume = this.volume;
      const promise = ambientEl.play();
      if (promise) {
        promise.then(() => {
          return;
        }).catch(() => {
          // If browser blocked or file format failed, start procedural ambient
          this.startProceduralAmbient();
        });
        return;
      }
    }

    this.startProceduralAmbient();
  }

  // Procedural warm ambient piano/chords progression
  startProceduralAmbient() {
    if (!this.ctx) return;
    this.stopProceduralAmbient();

    const chords = [
      [293.66, 369.99, 440.00, 554.37], // Dmaj9
      [246.94, 293.66, 369.99, 440.00], // Bm7
      [196.00, 246.94, 293.66, 369.99], // Gmaj7
      [220.00, 293.66, 329.63, 440.00]  // Asus4
    ];

    let chordStep = 0;
    const playChordStep = () => {
      if (!this.isAmbientPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = chords[chordStep % chords.length];
      chordStep++;

      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.2);

        osc.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(now);
        osc.stop(now + 4.5);
      });

      this.ambientTimer = setTimeout(playChordStep, 3800);
    };

    playChordStep();
  }

  stopProceduralAmbient() {
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  stopAmbient() {
    this.isAmbientPlaying = false;
    this.stopProceduralAmbient();
    const ambientEl = this.audioElements['ambient'];
    if (ambientEl) {
      try {
        ambientEl.pause();
        ambientEl.currentTime = 0;
      } catch (e) {}
    }
  }

  setMute(muted) {
    this.isMuted = Boolean(muted);
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx?.currentTime || 0);
    }
    const ambientEl = this.audioElements['ambient'];
    if (ambientEl) {
      ambientEl.muted = this.isMuted;
    }

    if (this.isMuted) {
      if (ambientEl && !ambientEl.paused) {
        ambientEl.pause();
      }
      this.stopProceduralAmbient();
    } else {
      if (this.hasInitiatedAmbient && !this.isAmbientPlaying) {
        this.playAmbient();
      }
    }
    return this.isMuted;
  }

  toggleMute() {
    return this.setMute(!this.isMuted);
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    const ambientEl = this.audioElements['ambient'];
    if (ambientEl) {
      ambientEl.volume = this.volume;
    }
  }
}

export const soundEngine = new SoundEngine();

export default soundEngine;
