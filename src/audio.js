/**
 * ====================================================================
 * SISTEMA DE AUDIO: LLUVIA EN EL BOSQUE + CHIMENEA & MELODÍA ACÚSTICA
 * ====================================================================
 * Combina un relajante sonido de lluvia suave sobre el tejado de madera,
 * sutiles crujidos de leña en la chimenea y acordes acústicos cálidos.
 */

import { config } from "./config.js";

class ForestAudioSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.melodyGain = null;
    this.rainGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.externalAudio = null;
    this.ambientInterval = null;
    this.melodyInterval = null;
    this.rainInterval = null;

    // Escala acústica cálida (C5, D5, E5, G5, A5, C6, D6, E6)
    this.scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];
  }

  init() {
    if (this.ctx) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Ganancia de fondo ambiental (pads cálidos de madera)
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // 2. Ganancia de melodía suave acústica
      this.melodyGain = this.ctx.createGain();
      this.melodyGain.gain.setValueAtTime(0.13, this.ctx.currentTime);
      this.melodyGain.connect(this.masterGain);

      // 3. Ganancia de lluvia continua en el bosque (muy bajita y tenue de fondo)
      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      this.rainGain.connect(this.masterGain);

      // 4. Ganancia de efectos sonoros (campanillas de madera e interacción)
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      if (config.audioUrl) {
        this.externalAudio = new Audio(config.audioUrl);
        this.externalAudio.loop = true;
        this.externalAudio.volume = 0.55;
      }
    } catch (e) {
      console.warn("Web Audio API no soportado:", e);
    }
  }

  async start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    this.isPlaying = true;

    if (this.externalAudio) {
      try {
        await this.externalAudio.play();
        return;
      } catch (err) {
        console.warn("No se pudo reproducir audio externo, usando sintetizador:", err);
      }
    }

    if (config.synthAmbientEnabled) {
      this.startAmbientSoundtrack();
      this.startRainAndFireplace();
    }
  }

  // Genera lluvia suave continua y sutil crepitar de chimenea
  startRainAndFireplace() {
    if (!this.ctx || this.rainInterval) return;

    // Buffer de lluvia suave (ruido filtrado)
    const bufferSize = this.ctx.sampleRate * 4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = output[i];
      output[i] *= 0.75;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    // Filtro pasa-bajos cálido para que sea una lluvia lejana muy suave y sin siseos molestos
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(500, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(120, this.ctx.currentTime);

    rainSource.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(this.rainGain);

    rainSource.start();

    // Crepitar ocasional de leña en la chimenea
    this.rainInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;
      if (Math.random() > 0.4) {
        this.playFireplaceCrackle();
      }
    }, 1800);
  }

  // Crepitar de leña
  playFireplaceCrackle() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(Math.random() * 120 + 80, now);

    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.rainGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Acordes cálidos de cabaña
  startAmbientSoundtrack() {
    if (!this.ctx || this.ambientInterval) return;

    // Progresión acogedora en Cmaj7 - Am7 - Fmaj7 - G
    const chords = [
      [130.81, 164.81, 196.0, 246.94], // Cmaj7
      [110.0, 130.81, 164.81, 196.0],  // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [146.83, 196.0, 246.94, 293.66], // G
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.ctx) return;

      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      const duration = 7.5;

      currentChord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(500, now);
        filter.frequency.exponentialRampToValueAtTime(800, now + duration / 2);
        filter.frequency.exponentialRampToValueAtTime(500, now + duration);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 1.8);
        gain.gain.setValueAtTime(0.035, now + duration - 2.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    };

    // Melodía tipo kalimba / piano acústico
    const melodyNotes = [
      [523.25, 659.25, 783.99], // C - E - G
      [880.0, 783.99, 659.25],  // A - G - E
      [587.33, 659.25, 880.0],  // D - E - A
      [1046.5, 880.0, 783.99],  // C6 - A - G
    ];

    let melodyStep = 0;
    const playMelodyMotif = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;

      const motif = melodyNotes[melodyStep % melodyNotes.length];
      melodyStep++;

      motif.forEach((freq, i) => {
        setTimeout(() => {
          if (!this.isPlaying || !this.ctx || this.isMuted) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.06, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

          osc.connect(gain);
          gain.connect(this.melodyGain);

          osc.start(now);
          osc.stop(now + 1.9);
        }, i * 380);
      });
    };

    playChord();
    this.ambientInterval = setInterval(playChord, 6000);

    setTimeout(() => {
      playMelodyMotif();
      this.melodyInterval = setInterval(playMelodyMotif, 4500);
    }, 2000);
  }

  playChime(noteIndex = 0) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const baseNote = this.scale[noteIndex % this.scale.length] || 523.25;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(baseNote, now);
    osc.frequency.exponentialRampToValueAtTime(baseNote * 1.002, now + 0.8);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 1.3);
  }

  playRewardChord() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chordNotes = [523.25, 659.25, 783.99, 1046.5];

    chordNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const noteNow = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteNow);

        gain.gain.setValueAtTime(0.0001, noteNow);
        gain.gain.linearRampToValueAtTime(0.08, noteNow + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteNow + 1.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(noteNow);
        osc.stop(noteNow + 1.7);
      }, idx * 110);
    });
  }

  playWrongSound() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.35);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // Sonido de apertura del sobre de Hogwarts con rasgado de lacre y chispas
  playEnvelopeOpen() {
    if (!this.ctx) return;
    const notes = [392.0, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.09, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 1.3);
      }, idx * 80);
    });
  }

  // Sonido del trazo de la varita mágica conjurando el encantamiento
  playWandSwoosh() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.12);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(750, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Sonido de pluma mágica escribiendo con tinta en el pergamino
  playQuillScribe() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(580 + Math.random() * 260, now);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(850, now);
    filter.Q.setValueAtTime(2.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.02, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Estallido de éxito al completar el movimiento de varita
  playSpellSuccess() {
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.09, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 1.9);
      }, idx * 75);
    });
  }

  playClimaxBurst() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const arpeggio = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51];

    arpeggio.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 2.1);
      }, i * 140);
    });
  }

  playCelebrationFanfare() {
    if (!this.ctx) return;
    const fanfare = [
      { f: 523.25, d: 0.2 },
      { f: 659.25, d: 0.2 },
      { f: 783.99, d: 0.35 },
      { f: 1046.5, d: 0.8 },
    ];

    let delay = 0;
    fanfare.forEach((n) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(n.f, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.d);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + n.d + 0.05);
      }, delay * 1000);
      delay += n.d * 0.75;
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.75;
      this.masterGain.gain.setValueAtTime(target, this.ctx.currentTime);
    }
    if (this.externalAudio) {
      this.externalAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }
}

export const sound = new ForestAudioSystem();
