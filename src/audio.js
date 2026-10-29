/**
 * ====================================================================
 * SISTEMA DE AUDIO: OLAS DE MAR + MÚSICA CELESTIAL
 * ====================================================================
 * Combina un suave murmullo de olas del mar generadas en tiempo real
 * con acordes ambientales y melodías de caja de música estelar.
 */

import { config } from "./config.js";

class CelestialAudioSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.melodyGain = null;
    this.oceanGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.externalAudio = null;
    this.ambientInterval = null;
    this.melodyInterval = null;
    this.oceanInterval = null;

    // Escala pentatónica estelar (C5, D5, E5, G5, A5, C6, D6, E6)
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

      // 1. Ganancia de fondo ambiental (pads cálidos)
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.16, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // 2. Ganancia de melodía suave tipo caja de música
      this.melodyGain = this.ctx.createGain();
      this.melodyGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.melodyGain.connect(this.masterGain);

      // 3. Ganancia de olas del mar
      this.oceanGain = this.ctx.createGain();
      this.oceanGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      this.oceanGain.connect(this.masterGain);

      // 4. Ganancia de efectos sonoros (campanas de interacción)
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Audio externo si el usuario coloca un archivo propio
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

    // Iniciar banda sonora con ambiente de mar y estrellas
    if (config.synthAmbientEnabled) {
      this.startAmbientSoundtrack();
      this.startOceanWaves();
    }
  }

  // Genera el sonido sutil de las olas del mar rompiendo en la orilla
  startOceanWaves() {
    if (!this.ctx || this.oceanInterval) return;

    // Buffer de ruido blanco filtrado para crear la espuma del mar
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    // Ruido rosa/marrón suave
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const playWave = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const waveDuration = 6.8;

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filtro pasa-bajos que se abre y cierra como el agua al llegar a la arena
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(520, now + 2.8);
      filter.frequency.exponentialRampToValueAtTime(180, now + waveDuration);

      const waveGain = this.ctx.createGain();
      waveGain.gain.setValueAtTime(0.001, now);
      // Ola que sube suavemente
      waveGain.gain.linearRampToValueAtTime(0.25, now + 2.8);
      // Espuma que retrocede lentamente
      waveGain.gain.exponentialRampToValueAtTime(0.001, now + waveDuration);

      whiteNoise.connect(filter);
      filter.connect(waveGain);
      waveGain.connect(this.oceanGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + waveDuration + 0.1);
    };

    playWave();
    this.oceanInterval = setInterval(playWave, 7000);
  }

  // Genera acordes de fondo etéreos
  startAmbientSoundtrack() {
    if (!this.ctx || this.ambientInterval) return;

    // Progresión marina y estelar en Fmaj7 - C - Dm7 - Bbmaj7
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [130.81, 164.81, 196.0, 246.94], // C
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [116.54, 146.83, 174.61, 220.0],  // Bbmaj7
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
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(750, now + duration / 2);
        filter.frequency.exponentialRampToValueAtTime(450, now + duration);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.032, now + 2.0);
        gain.gain.setValueAtTime(0.032, now + duration - 2.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    };

    // Melodía suave tipo caja de música de ensueño
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
          gain.gain.linearRampToValueAtTime(0.055, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

          osc.connect(gain);
          gain.connect(this.melodyGain);

          osc.start(now);
          osc.stop(now + 1.9);
        }, i * 360);
      });
    };

    playChord();
    this.ambientInterval = setInterval(playChord, 6000);

    setTimeout(() => {
      playMelodyMotif();
      this.melodyInterval = setInterval(playMelodyMotif, 4500);
    }, 2000);
  }

  // Tono de campana de cristal / caja de música interactiva
  playChime(noteIndex = 0) {
    if (!this.ctx || this.isMuted) return;

    const freq = this.scale[noteIndex % this.scale.length] || 523.25;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

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

    const notes = [0, 2, 4, 5, 7];
    notes.forEach((noteIdx, i) => {
      setTimeout(() => {
        this.playChime(noteIdx);
      }, i * 140);
    });
  }

  // Sonido simpático para respuestas juguetonas
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

  // Estallido de la fusión
  playClimaxBurst() {
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 2.6);

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

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.75;
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }

    if (this.externalAudio) {
      this.externalAudio.muted = this.isMuted;
    }

    return this.isMuted;
  }
}

export const sound = new CelestialAudioSystem();
