/**
 * ====================================================================
 * SISTEMA DE AUDIO CELESTIAL (Web Audio API + Audio Player)
 * ====================================================================
 * Proporciona un sintetizador ambiental cósmico en tiempo real,
 * efectos de sonido de campanas/caja de música y soporte para MP3 externo.
 */

import { config } from "./config.js";

class CelestialAudioSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.externalAudio = null;
    this.ambientInterval = null;
    this.activeOscillators = [];

    // Frecuencias pentatónicas para caja de música estelar (C5, D5, E5, G5, A5, C6, D6, E6)
    this.scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];
  }

  init() {
    if (this.ctx) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Si hay archivo de audio personalizado en config
      if (config.audioUrl) {
        this.externalAudio = new Audio(config.audioUrl);
        this.externalAudio.loop = true;
        this.externalAudio.volume = 0.5;
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

    // Si no hay audio externo o falló, arrancamos el sintetizador ambiental suave
    if (config.synthAmbientEnabled) {
      this.startAmbientDrone();
    }
  }

  // Genera un fondo ambiental cósmico suave con pads relajantes
  startAmbientDrone() {
    if (!this.ctx || this.ambientInterval) return;

    // Progresión de acordes etéreos (Fmaj7, Cmaj, Dm9, Am7)
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [130.81, 164.81, 196.0, 246.94], // C
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [110.0, 130.81, 164.81, 196.0],  // Am7
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.ctx) return;

      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      const duration = 7.5; // Duración larga para que se fundan

      currentChord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(800, now + duration / 2);
        filter.frequency.exponentialRampToValueAtTime(450, now + duration);

        // Envolvente suave: Fade in de 2s, sostenido, Fade out de 2.5s
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 2.0);
        gain.gain.setValueAtTime(0.035, now + duration - 2.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    };

    playChord();
    this.ambientInterval = setInterval(playChord, 6000);
  }

  // Tono de campana de cristal / caja de música
  playChime(noteIndex = 0) {
    if (!this.ctx || this.isMuted) return;

    const freq = this.scale[noteIndex % this.scale.length] || 523.25;
    const now = this.ctx.currentTime;

    // Oscilador principal (onda sinusoidal pura)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    // Armónico suave para dar brillo de campana mágica
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2.01, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.7);
    osc2.stop(now + 1.7);
  }

  // Acorde de recompensa celestial al desbloquear un fragmento
  playRewardChord() {
    if (!this.ctx || this.isMuted) return;

    // Arpegio ascendente rápido
    const notes = [0, 2, 4, 5, 7];
    notes.forEach((noteIdx, i) => {
      setTimeout(() => {
        this.playChime(noteIdx);
      }, i * 140);
    });
  }

  // Sonido simpático y tierno para respuesta incorrecta en trivia
  playWrongSound() {
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.35);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Estallido cósmico para la fusión de los 4 fragmentos
  playClimaxBurst() {
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;

    // 1. Barrido de resonancia
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 2.6);

    // 2. Cascada de notas estelares
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.playChime(i);
      }, 1000 + i * 90);
    }
  }

  // Fanfarria del ¡SÍ!
  playCelebrationFanfare() {
    if (!this.ctx || this.isMuted) return;

    const melody = [0, 2, 4, 5, 4, 5, 7, 7];
    melody.forEach((note, index) => {
      setTimeout(() => {
        this.playChime(note);
      }, index * 130);
    });
  }

  // Alternar silencio
  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.7;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }

    if (this.externalAudio) {
      this.externalAudio.muted = this.isMuted;
    }

    return this.isMuted;
  }
}

export const sound = new CelestialAudioSystem();
