/**
 * ====================================================================
 * CONTROLADOR PRINCIPAL: XÓCHITL SINAY ✦ ENTRE EL MAR Y LAS ESTRELLAS
 * ====================================================================
 */

import confetti from "canvas-confetti";
import { config } from "./config.js";
import { sound } from "./audio.js";
import { Starfield } from "./stars.js";

// Estallido de chispas, runas luminosas y onda expansiva de Hogwarts
export const triggerMagicalSparkBurst = (centerX, centerY) => {
  const container = document.body;

  // 1. Onda expansiva mágica de Hogwarts
  const shockwave = document.createElement("div");
  shockwave.className = "magic-shockwave";
  shockwave.style.left = `${centerX}px`;
  shockwave.style.top = `${centerY}px`;
  container.appendChild(shockwave);
  setTimeout(() => shockwave.remove(), 1000);

  // 2. Chispas luminosas, estrellas y runas mágicas
  const sparkSymbols = ["✧", "✦", "⚡", "★", "·", "✦", "✧", "⋆"];
  const colors = ["#facc15", "#fde047", "#fef08a", "#ffffff", "#f59e0b", "#38bdf8"];
  const count = 48;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "magic-spark-particle";

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
    const distance = 70 + Math.random() * 180;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = (Math.random() - 0.5) * 720;
    const duration = 0.65 + Math.random() * 0.45;
    const delay = Math.random() * 0.12;
    const size = 12 + Math.random() * 18;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const symbol = sparkSymbols[Math.floor(Math.random() * sparkSymbols.length)];

    spark.textContent = symbol;
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.color = color;
    spark.style.fontSize = `${size}px`;
    spark.style.setProperty("--tx", `${tx}px`);
    spark.style.setProperty("--ty", `${ty}px`);
    spark.style.setProperty("--rot", `${rot}deg`);
    spark.style.animation = `magic-spark-burst ${duration}s cubic-bezier(0.12, 0.8, 0.32, 1) ${delay}s forwards`;

    container.appendChild(spark);
    setTimeout(() => spark.remove(), (duration + delay) * 1000 + 100);
  }
};

// Chispas ligeras mágicas para clics en botones y tarjetas
export const triggerLightMagicBurst = (centerX, centerY) => {
  if (!centerX || !centerY) return;
  const container = document.body;
  const symbols = ["✧", "✦", "⚡", "★", "·"];
  const colors = ["#facc15", "#fde047", "#ffffff", "#f59e0b", "#38bdf8"];
  const count = 12;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "magic-spark-particle-light";

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
    const distance = 25 + Math.random() * 45;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = (Math.random() - 0.5) * 360;
    const size = 11 + Math.random() * 7;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    spark.textContent = symbol;
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.color = color;
    spark.style.fontSize = `${size}px`;
    spark.style.setProperty("--tx", `${tx}px`);
    spark.style.setProperty("--ty", `${ty}px`);
    spark.style.setProperty("--rot", `${rot}deg`);

    container.appendChild(spark);
    setTimeout(() => spark.remove(), 550);
  }
};

// Transición mágica de escena: velo dorado y chispas ascendentes
export const triggerSceneTransitionMagic = () => {
  const container = document.body;
  const veil = document.createElement("div");
  veil.className = "scene-magic-veil";
  container.appendChild(veil);
  setTimeout(() => veil.remove(), 750);

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const count = 16;
  const symbols = ["✧", "✦", "★", "·"];
  const colors = ["#facc15", "#fef08a", "#ffffff", "#38bdf8"];

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "magic-spark-particle-light";
    const x = cx + (Math.random() - 0.5) * (window.innerWidth * 0.65);
    const y = cy + (Math.random() - 0.5) * (window.innerHeight * 0.5);
    const tx = (Math.random() - 0.5) * 80;
    const ty = -35 - Math.random() * 55; // Ascienden como brasas doradas
    const rot = (Math.random() - 0.5) * 180;
    const size = 12 + Math.random() * 10;

    spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.fontSize = `${size}px`;
    spark.style.setProperty("--tx", `${tx}px`);
    spark.style.setProperty("--ty", `${ty}px`);
    spark.style.setProperty("--rot", `${rot}deg`);

    container.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
};

class ConstellationApp {
  constructor() {
    window.app = this;
    this.starfield = null;
    this.currentStageId = "scene-intro";
    this.collectedFragments = new Set();

    // Minijuego 1: Memoria del Mar & Vino (3 pares / 6 cartas)
    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.isCheckingMemory = false;

    // Minijuego 2: Trivia costera
    this.currentTriviaIndex = 0;

    // Minijuego 3: Constelación marina (7 estrellas en corazón, coordenadas porcentuales 100x100 sin recortes)
    this.currentConstellationStep = 1;
    this.constellationNodes = [
      { id: 1, x: 34, y: 24, label: "1" },
      { id: 2, x: 20, y: 44, label: "2" },
      { id: 3, x: 30, y: 66, label: "3" },
      { id: 4, x: 50, y: 80, label: "4" },
      { id: 5, x: 70, y: 66, label: "5" },
      { id: 6, x: 80, y: 44, label: "6" },
      { id: 7, x: 66, y: 24, label: "7" },
    ];

    // Carrusel de recuerdos
    this.currentSlide = 0;
    this.typewriterInterval = null;
    this.noButtonClicks = 0;
  }

  init() {
    // 1. Iniciar cielo estrellado y partículas
    const canvas = document.getElementById("stars-canvas");
    if (canvas) {
      this.starfield = new Starfield(canvas);
    }

    // 2. Establecer fondo escénico inicial (Módulo 1: Andén 9 3/4)
    this.setScenicBackground(1);

    // 3. Personalizar textos desde config
    this.applyConfig();

    // 4. Vincular eventos de navegación y botones
    this.bindEvents();
  }

  // Transición fluida de escenografía cinematográfica (Módulos 1 a 4)
  setScenicBackground(index) {
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`scenic-bg-${i}`);
      if (el) {
        el.classList.toggle("active", i === index);
      }
    }
  }

  applyConfig() {
    // Portada y Sobre Mágico de Hogwarts
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined) el.textContent = val;
    };

    setTxt("unfolded-title", config.intro.unfoldedTitle);
    setTxt("unfolded-subtitle", config.intro.unfoldedSubtitle);
    setTxt("start-btn-text", config.intro.startButtonText);

    // Carta y firma
    setTxt("letter-salutation", config.climax.letter.salutation);

    // Pregunta final
    setTxt("final-question", config.climax.finalQuestion);
    setTxt("btn-yes-text", config.climax.yesButtonText);
    setTxt("btn-no-text", config.climax.noButtonText);

    // Celebración
    setTxt("celeb-badge", config.climax.celebration.badge);
    setTxt("celeb-title", config.climax.celebration.title);
    setTxt("celeb-message", config.climax.celebration.message);
    setTxt("celeb-partner", config.partnerName);
    setTxt("celeb-sender", config.yourName);
    setTxt("celeb-date", config.climax.celebration.dateValue || "Plan a futuro: Nuestra cabaña mágica en el bosque 🌲☕💍");
    setTxt("celeb-date-label", config.climax.celebration.dateLabel || "Promesa sellada:");
  }

  // Transición fluida entre escenas en la misma ventana fija
  showStage(stageId) {
    const currentEl = document.getElementById(this.currentStageId);
    const nextEl = document.getElementById(stageId);
    const hud = document.getElementById("fragments-hud");

    // Ocultar HUD en la intro, en la carta final y fases del clímax para máximo lucimiento del pergamino
    if (hud) {
      const hideHudStages = ["scene-intro", "scene-climax-letter", "scene-climax-gallery", "scene-climax-question", "scene-celebration"];
      hud.classList.toggle("hidden", hideHudStages.includes(stageId));
    }

    if (currentEl) {
      currentEl.classList.remove("active");
    }

    // Efecto mágico en cada cambio de escena
    triggerSceneTransitionMagic();
    sound.playWandSwoosh();

    if (nextEl) {
      this.currentStageId = stageId;
      setTimeout(() => {
        nextEl.classList.add("active");
      }, 150);
    }
  }

  bindEvents() {
    // Escuchador global de magia en cada botón o elemento interactivo
    document.addEventListener("pointerdown", (e) => {
      const btn = e.target.closest("button, .relic-stone-btn, .game-card-btn, .choice-card, .btn-hogwarts-gold, .btn-primary, .wax-seal, .carousel-arrow, .carousel-dot, .sound-btn, .custom-choice");
      if (btn) {
        triggerLightMagicBurst(e.clientX, e.clientY);
        sound.playMagicClick();
      }
    }, { passive: true });

    // Botón de audio flotante
    const audioBtn = document.getElementById("audio-toggle-btn");
    audioBtn.addEventListener("click", () => {
      const isMuted = sound.toggleMute();
      audioBtn.classList.toggle("muted", isMuted);
      audioBtn.querySelector(".audio-icon").textContent = isMuted ? "🔇" : "🌧️";
    });

    // 0A. Sobre Mágico de Hogwarts Giratorio 3D con Arrastre Libre
    let envelopeOpened = false;
    let currentRotY = 0;
    let currentRotX = 0;
    let isPointerDown = false;
    let hasDragged = false;
    let startX = 0;
    let startY = 0;
    let startRotY = 0;
    let startRotX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocityX = 0;

    const envelopeScene = document.getElementById("envelope-3d-scene");
    const envelopeCard = document.getElementById("envelope-3d-card");
    const flipBtn = document.getElementById("btn-flip-envelope");
    const flipBackBtn = document.getElementById("btn-flip-back");
    const hintLabel = document.getElementById("hint-text-label");

    const updateEnvelopeTransform = (transition = "") => {
      if (!envelopeCard) return;
      envelopeCard.style.transition = transition;
      envelopeCard.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
    };

    const updateHint = () => {
      if (!hintLabel) return;
      const norm = ((currentRotY % 360) + 360) % 360;
      const isBackVisible = norm > 75 && norm < 285;
      hintLabel.textContent = isBackVisible
        ? "✨ Toca el Gran Sello de Hogwarts para romper el encantamiento y abrir"
        : "🪄 Arrastra con el ratón para girar el sobre en 3D libremente";
    };

    if (envelopeScene && envelopeCard) {
      let downTarget = null;

      envelopeScene.addEventListener("pointerdown", (e) => {
        if (envelopeOpened) return;
        isPointerDown = true;
        hasDragged = false;
        startX = e.clientX;
        startY = e.clientY;
        startRotY = currentRotY;
        startRotX = currentRotX;
        lastX = e.clientX;
        lastTime = performance.now();
        velocityX = 0;
        downTarget = document.elementFromPoint(e.clientX, e.clientY) || e.target;

        envelopeCard.style.transition = "none";
      });

      envelopeScene.addEventListener("pointermove", (e) => {
        if (!isPointerDown || envelopeOpened) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const dist = Math.hypot(dx, dy);

        if (dist > 6) {
          hasDragged = true;
          envelopeScene.classList.add("is-dragging");
          try {
            if (!envelopeScene.hasPointerCapture(e.pointerId)) {
              envelopeScene.setPointerCapture(e.pointerId);
            }
          } catch (_) {}

          const now = performance.now();
          const dt = now - lastTime;
          if (dt > 8) {
            velocityX = (e.clientX - lastX) / dt;
          }
          lastX = e.clientX;
          lastTime = now;

          currentRotY = startRotY + dx * 0.65;
          currentRotX = Math.max(-22, Math.min(22, startRotX - dy * 0.22));
          updateEnvelopeTransform("none");
          updateHint();
        }
      });

      const handlePointerUp = (e) => {
        if (!isPointerDown) return;
        isPointerDown = false;
        envelopeScene.classList.remove("is-dragging");
        try {
          if (envelopeScene.hasPointerCapture(e.pointerId)) {
            envelopeScene.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}

        if (hasDragged) {
          // Inercia suave y ajuste magnético a la cara más cercana
          currentRotY += velocityX * 100;
          currentRotY = Math.round(currentRotY / 180) * 180;
          currentRotX = 0;
          updateEnvelopeTransform("transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)");
          updateHint();
        } else {
          // Fue un clic o toque
          const upTarget = document.elementFromPoint(e.clientX, e.clientY) || e.target;
          const hit = downTarget || upTarget;

          const sealEl = hit?.closest("#btn-open-bottle") || upTarget?.closest("#btn-open-bottle");
          const flipEnvelopeBtn = hit?.closest("#btn-flip-envelope") || upTarget?.closest("#btn-flip-envelope");
          const flipBackBtnEl = hit?.closest("#btn-flip-back") || upTarget?.closest("#btn-flip-back");

          if (sealEl) {
            openEnvelope(e);
            return;
          }

          if (flipEnvelopeBtn) {
            currentRotY = Math.floor(currentRotY / 360) * 360 + 180;
            currentRotX = 0;
            updateEnvelopeTransform("transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1)");
            updateHint();
            if (sound) sound.playClick();
            return;
          }

          if (flipBackBtnEl) {
            currentRotY = Math.round(currentRotY / 360) * 360;
            currentRotX = 0;
            updateEnvelopeTransform("transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1)");
            updateHint();
            if (sound) sound.playClick();
            return;
          }

          // Clic sobre cualquier otra parte del sobre: alterna entre frente y reverso
          const norm = ((currentRotY % 360) + 360) % 360;
          if (norm > 75 && norm < 285) {
            currentRotY = Math.round(currentRotY / 360) * 360;
          } else {
            currentRotY = Math.floor(currentRotY / 360) * 360 + 180;
          }
          currentRotX = 0;
          updateEnvelopeTransform("transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1)");
          updateHint();
          if (sound) sound.playClick();
        }
      };

      envelopeScene.addEventListener("pointerup", handlePointerUp);
      envelopeScene.addEventListener("pointercancel", handlePointerUp);
    }

    if (flipBtn) {
      flipBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
      flipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentRotY = Math.floor(currentRotY / 360) * 360 + 180;
        currentRotX = 0;
        updateEnvelopeTransform("transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1)");
        updateHint();
        if (sound) sound.playClick();
      });
    }

    if (flipBackBtn) {
      flipBackBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
      flipBackBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentRotY = Math.round(currentRotY / 360) * 360;
        currentRotX = 0;
        updateEnvelopeTransform("transform 0.75s cubic-bezier(0.34, 1.25, 0.64, 1)");
        updateHint();
        if (sound) sound.playClick();
      });
    }

    // 0B. Escritura mágica progresiva estilo Harry Potter al abrir el sobre
    let introTypewriterInterval = null;

    const startIntroTypewriter = () => {
      const letterBody = document.getElementById("unfolded-subtitle");
      const quill = document.getElementById("intro-magic-quill");
      const skipBtn = document.getElementById("btn-skip-intro-typewriter");
      const startBtn = document.getElementById("btn-start");
      const unfoldedBox = document.getElementById("intro-unfolded-box");

      if (introTypewriterInterval) {
        clearInterval(introTypewriterInterval);
        introTypewriterInterval = null;
      }

      if (!letterBody) return;

      letterBody.innerHTML = "";
      if (quill) quill.classList.remove("hidden");
      if (skipBtn) skipBtn.classList.remove("hidden");
      if (startBtn) startBtn.classList.add("hidden");

      const paragraphs = [
        "Hice todo esto para recordarte algo que late en mi pecho a cada instante: que pienso en ti en cada momento de mi día, que te amo con toda mi alma y que eres, sin duda alguna, lo mejor y más hermoso de toda mi vida.",
        "Este viaje mágico recorre 4 rincones especiales de nuestro amor. Sigue cada estación para descubrir el gran plan a futuro que tengo reservado para los dos..."
      ];

      const finishIntroTypewriter = () => {
        if (introTypewriterInterval) {
          clearInterval(introTypewriterInterval);
          introTypewriterInterval = null;
        }
        letterBody.innerHTML = paragraphs
          .map((p) => `<p class="intro-letter-p">${p}</p>`)
          .join("");
        if (quill) quill.classList.add("hidden");
        if (skipBtn) skipBtn.classList.add("hidden");
        if (startBtn) {
          startBtn.classList.remove("hidden");
          startBtn.classList.add("btn-pulse");
        }
        sound.playRewardChord();
      };

      if (skipBtn) skipBtn.onclick = finishIntroTypewriter;
      if (unfoldedBox) {
        unfoldedBox.onclick = (e) => {
          if (e.target.closest("#btn-start")) return;
          if (introTypewriterInterval) {
            finishIntroTypewriter();
          }
        };
      }

      let pIndex = 0;
      let wIndex = 0;
      let wordsInP = paragraphs[0].split(" ");

      let currentPEl = document.createElement("p");
      currentPEl.className = "intro-letter-p";
      letterBody.appendChild(currentPEl);
      if (quill) currentPEl.appendChild(quill);

      let wordCounter = 0;

      introTypewriterInterval = setInterval(() => {
        if (pIndex >= paragraphs.length) {
          finishIntroTypewriter();
          return;
        }

        if (wIndex < wordsInP.length) {
          const wordText = wordsInP[wIndex];
          const span = document.createElement("span");
          span.className = "ink-word magic-ink-glow";
          span.textContent = (wIndex > 0 ? " " : "") + wordText;

          if (quill && quill.parentElement === currentPEl) {
            currentPEl.insertBefore(span, quill);
          } else {
            currentPEl.appendChild(span);
          }

          setTimeout(() => {
            span.classList.remove("magic-ink-glow");
          }, 300);

          wordCounter++;
          if (wordCounter % 3 === 0 && sound && typeof sound.playQuillScribe === "function") {
            try {
              sound.playQuillScribe();
            } catch (_) {}
          }

          wIndex++;
        } else {
          pIndex++;
          wIndex = 0;
          if (pIndex < paragraphs.length) {
            wordsInP = paragraphs[pIndex].split(" ");
            currentPEl = document.createElement("p");
            currentPEl.className = "intro-letter-p";
            letterBody.appendChild(currentPEl);
            if (quill) currentPEl.appendChild(quill);
          } else {
            finishIntroTypewriter();
          }
        }
      }, 45);
    };

    const openEnvelope = (e) => {
      if (e) {
        if (typeof e.stopPropagation === "function") e.stopPropagation();
      }
      if (envelopeOpened) return;
      envelopeOpened = true;

      sound.start();
      sound.playEnvelopeOpen();

      const seal = document.getElementById("btn-open-bottle");
      const flap = document.getElementById("envelope-flap");
      const flash = document.getElementById("supernova-flash");

      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;
      if (seal) {
        const rect = seal.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      if (seal) seal.classList.add("breaking");

      // Flash breve cálido mágico
      if (flash) {
        flash.classList.remove("hidden");
        flash.classList.add("active");
        setTimeout(() => {
          flash.classList.remove("active");
          setTimeout(() => flash.classList.add("hidden"), 500);
        }, 320);
      }

      // Solapa se abre en 3D
      setTimeout(() => {
        if (flap) flap.classList.add("open");
      }, 200);

      // Estallido de magia pura, chispas y estelas de Hogwarts (sin confeti)
      triggerMagicalSparkBurst(centerX, centerY);

      // El pergamino con la carta se revela y empieza a escribirse mágicamente
      setTimeout(() => {
        const bottleBox = document.getElementById("intro-bottle-box");
        const unfoldedBox = document.getElementById("intro-unfolded-box");
        if (bottleBox) bottleBox.classList.add("hidden");
        if (unfoldedBox) {
          unfoldedBox.classList.remove("hidden");
          startIntroTypewriter();
        }
      }, 720);
    };

    const sealBtn = document.getElementById("btn-open-bottle");
    if (sealBtn) {
      sealBtn.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });
      sealBtn.addEventListener("pointerup", (e) => {
        e.stopPropagation();
        openEnvelope(e);
      });
      sealBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openEnvelope(e);
      });
      sealBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openEnvelope(e);
        }
      });
    }
    const bottleInteractive = document.getElementById("bottle-interactive");
    if (bottleInteractive) bottleInteractive.addEventListener("click", openEnvelope);

    // 0B. Comenzar la expedición en el Expreso de Hogwarts
    document.getElementById("btn-start").addEventListener("click", () => {
      document.getElementById("fragments-hud").classList.remove("hidden");
      this.setScenicBackground(1);
      if (this.starfield) this.starfield.setTheme("whompingWillow");
      this.showStage("scene-m1-play");
      this.initMinigame1();
    });

    // 2. Avanzar de Recompensa 1 a Minijuego 2 (Cambio de escenografía al Bosque del Patronus)
    document.getElementById("btn-to-m2").addEventListener("click", () => {
      this.setScenicBackground(2);
      if (this.starfield) this.starfield.setTheme("greatHall");
      this.showStage("scene-m2-play");
      this.initMinigame2();
    });

    // 3. Avanzar de Recompensa 2 a Minijuego 3 (Encantamiento Patronus)
    document.getElementById("btn-to-m3").addEventListener("click", () => {
      this.setScenicBackground(3);
      if (this.starfield) this.starfield.setTheme("patronusCabin");
      this.showStage("scene-m3-play");
      this.initMinigame3();
    });

    // 4. Avanzar de Recompensa 3 a Minijuego 4 (Rompecabezas Sagrado: Always)
    const btnToM4 = document.getElementById("btn-to-m4");
    if (btnToM4) {
      btnToM4.addEventListener("click", () => {
        this.setScenicBackground(3);
        if (this.starfield) this.starfield.setTheme("patronusCabin");
        this.showStage("scene-m4-play");
        this.initMinigame4();
      });
    }

    // 5. Avanzar de Recompensa 4 al Clímax (El Giratiempo 3D & La Fusión)
    const btnToClimax = document.getElementById("btn-to-climax");
    if (btnToClimax) {
      btnToClimax.addEventListener("click", () => {
        this.setScenicBackground(4);
        if (this.starfield) this.starfield.setTheme("patronusCabin");
        this.showStage("scene-climax-pedestal");
        this.initClimaxPedestal();
      });
    }

    // 6. De la Carta a la Galería de Recuerdos
    document.getElementById("btn-to-gallery").addEventListener("click", () => {
      this.setScenicBackground(4);
      this.showStage("scene-climax-gallery");
      this.initCarousel();
    });

    // 7. De la Galería a la Gran Pregunta
    document.getElementById("btn-to-question").addEventListener("click", () => {
      this.setScenicBackground(4);
      this.showStage("scene-climax-question");
      this.initPlayfulNoButton();
    });

    // 8. Botón "¡Sí!" final
    document.getElementById("btn-yes").addEventListener("click", () => {
      this.triggerYesCelebration();
    });

    // 9. Desplegar el Mapa del Merodeador (Captura final con fotos y poema)
    const marauderModal = document.getElementById("marauder-map-modal");
    const closeMarauderBtn = document.getElementById("close-marauder-modal");
    const saveMarauderPngBtn = document.getElementById("btn-save-marauder-image");
    const printMarauderBtn = document.getElementById("btn-print-marauder");

    document.getElementById("btn-download-capture").addEventListener("click", () => {
      sound.playSpellSuccess();
      triggerMagicalSparkBurst(window.innerWidth / 2, window.innerHeight / 2);
      if (marauderModal) {
        marauderModal.classList.remove("hidden");
        const viewport = document.getElementById("marauder-scroll-viewport");
        if (viewport) viewport.scrollTop = 0;
      }
    });

    if (closeMarauderBtn && marauderModal) {
      closeMarauderBtn.addEventListener("click", () => {
        sound.playWandSwoosh();
        marauderModal.classList.add("hidden");
      });
    }

    if (printMarauderBtn) {
      printMarauderBtn.addEventListener("click", () => {
        sound.playQuillScribe();
        window.print();
      });
    }

    if (saveMarauderPngBtn) {
      saveMarauderPngBtn.addEventListener("click", () => {
        this.generateMarauderParchmentPng();
      });
    }
  }

  collectFragment(id) {
    if (this.collectedFragments.has(id)) return;
    this.collectedFragments.add(id);

    const slot = document.getElementById(`slot-${id}`);
    if (slot) {
      slot.classList.add("collected");
      const rect = slot.getBoundingClientRect();
      triggerMagicalSparkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    sound.playRewardChord();
  }

  // ==================================================================
  // ESTACIÓN 1: MINIJUEGO DE MEMORIA (BOSQUE & CABAÑA - 3 PARES)
  // ==================================================================
  initMinigame1() {
    const grid = document.getElementById("memory-grid");
    const countEl = document.getElementById("pairs-count");
    const modal = document.getElementById("pair-modal");
    const modalTitle = document.getElementById("pair-modal-title");
    const modalIcon = document.getElementById("pair-modal-icon");
    const modalPhrase = document.getElementById("pair-modal-phrase");
    const closeModalBtn = document.getElementById("close-pair-modal");

    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.isCheckingMemory = false;
    countEl.textContent = "0";
    grid.innerHTML = "";

    // 3 pares temáticos de bosque, cabaña y pasión
    const pairs = config.minigame1.pairs;
    const cardsData = [];
    pairs.forEach((pair) => {
      cardsData.push({ ...pair, uniqueId: `${pair.id}-a` });
      cardsData.push({ ...pair, uniqueId: `${pair.id}-b` });
    });

    // Barajar aleatoriamente
    cardsData.sort(() => Math.random() - 0.5);

    cardsData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.pairId = item.id;

      card.innerHTML = `
        <div class="memory-card-back">
          <span class="card-back-flourish tl">✦</span>
          <span class="card-back-flourish br">✦</span>
          <div class="card-back-crest">
            <span class="crest-bolt">⚡</span>
            <span class="crest-letter">H</span>
          </div>
        </div>
        <div class="memory-card-front">
          <div class="card-front-inner">
            <span class="card-icon">${item.icon}</span>
            <span class="card-title">${item.name}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        if (this.isCheckingMemory) return;
        if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

        sound.playChime(this.flippedCards.length + 1);
        card.classList.add("flipped");
        this.flippedCards.push({ card, item });

        if (this.flippedCards.length === 2) {
          this.isCheckingMemory = true;
          const [first, second] = this.flippedCards;

          if (first.item.id === second.item.id) {
            // ¡PAR ENCONTRADO!
            setTimeout(() => {
              first.card.classList.add("matched");
              second.card.classList.add("matched");
              this.matchedPairsCount++;
              countEl.textContent = this.matchedPairsCount;

              sound.playRewardChord();

              // Mostrar modal con la frase emotiva de este par
              modalIcon.textContent = `${first.item.icon} ✨`;
              modalTitle.textContent = first.item.name;
              modalPhrase.textContent = first.item.phrase;
              modal.classList.remove("hidden");

              this.flippedCards = [];
              this.isCheckingMemory = false;
            }, 450);
          } else {
            // No coinciden
            setTimeout(() => {
              sound.playWrongSound();
              first.card.classList.remove("flipped");
              second.card.classList.remove("flipped");
              this.flippedCards = [];
              this.isCheckingMemory = false;
            }, 900);
          }
        }
      });

      grid.appendChild(card);
    });

    closeModalBtn.onclick = () => {
      modal.classList.add("hidden");
      if (this.matchedPairsCount >= 3) {
        setTimeout(() => {
          this.collectFragment(1);
          this.showStage("scene-m1-reward");
        }, 300);
      }
    };
  }

  // ==================================================================
  // ESTACIÓN 2: CUESTIONARIO DE LA COSTA
  // ==================================================================
  initMinigame2() {
    this.currentTriviaIndex = 0;
    this.renderTriviaQuestion();

    document.getElementById("btn-next-question").addEventListener("click", () => {
      this.currentTriviaIndex++;
      if (this.currentTriviaIndex < config.minigame2.questions.length) {
        this.showStage("scene-m2-play");
        this.renderTriviaQuestion();
      } else {
        this.collectFragment(2);
        this.showStage("scene-m2-reward");
      }
    });
  }

  renderTriviaQuestion() {
    const qData = config.minigame2.questions[this.currentTriviaIndex];
    const total = config.minigame2.questions.length;

    document.getElementById("question-step").textContent = `Pregunta ${this.currentTriviaIndex + 1} de ${total}`;
    document.getElementById("question-text").textContent = qData.question;
    const scoreEl = document.getElementById("trivia-score");
    if (scoreEl) {
      scoreEl.textContent = this.currentTriviaIndex;
    }

    const feedbackEl = document.getElementById("trivia-feedback");
    feedbackEl.classList.add("hidden");

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    qData.options.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "grimoire-option-card";
      card.innerHTML = `
        <div class="option-card-border">
          <div class="option-illustration-box">
            <span class="corner-flourish tl">✦</span>
            <span class="corner-flourish tr">⚡</span>
            <div class="option-etching">
              <span class="option-icon">${opt.icon || "🪄"}</span>
            </div>
            <div class="option-title-banner">${opt.title || "Opción"}</div>
            <span class="corner-flourish bl">✦</span>
            <span class="corner-flourish br">☽</span>
          </div>
          <p class="option-desc">${opt.text}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        if (opt.correct) {
          sound.playChime(3);
          document.getElementById("polaroid-img").src = qData.photo;
          document.getElementById("polaroid-caption").textContent = qData.photoCaption;
          if (scoreEl) {
            scoreEl.textContent = this.currentTriviaIndex + 1;
          }
          this.showStage("scene-m2-polaroid");
        } else {
          sound.playWrongSound();
          card.classList.add("shake");
          setTimeout(() => card.classList.remove("shake"), 600);

          feedbackEl.textContent = opt.feedback || config.minigame2.retryPrompt;
          feedbackEl.classList.remove("hidden");
        }
      });

      optionsContainer.appendChild(card);
    });
  }

  // ==================================================================
  // ESTACIÓN 3: ENCANTAMIENTO EXPECTO PATRONUM CON VARITA MÁGICA
  // ==================================================================
  initMinigame3() {
    const guidePath = document.getElementById("spell-guide-path");
    const completedPath = document.getElementById("spell-completed-path");
    const runesContainer = document.getElementById("spell-runes");
    const wandActor = document.getElementById("wand-actor");
    const powerValEl = document.getElementById("wand-power-val");
    const burstEl = document.getElementById("spell-incantation-burst");
    const wrap = document.getElementById("spell-canvas-wrap");

    if (!guidePath || !completedPath || !runesContainer || !wandActor) return;

    if (burstEl) burstEl.classList.add("hidden");

    const totalLength = guidePath.getTotalLength();
    completedPath.style.strokeDasharray = `${totalLength}`;
    completedPath.style.strokeDashoffset = `${totalLength}`;

    let currentProgress = 0; // 0 a 1
    let isCompleted = false;

    const runesData = [
      { id: 1, ratio: 0.0, icon: "✦", label: "Inicio" },
      { id: 2, ratio: 0.28, icon: "⚡", label: "Giro" },
      { id: 3, ratio: 0.55, icon: "✧", label: "Bucle" },
      { id: 4, ratio: 0.78, icon: "☽", label: "Floreo" },
      { id: 5, ratio: 1.0, icon: "🦌", label: "Patronus" },
    ];

    runesContainer.innerHTML = "";
    const runeElements = [];

    runesData.forEach((rune, idx) => {
      const pt = guidePath.getPointAtLength(rune.ratio * totalLength);
      const el = document.createElement("button");
      el.className = "spell-rune-node";
      if (idx === 0) el.classList.add("completed");
      if (idx === 1) el.classList.add("active");
      el.style.left = `${(pt.x / 500) * 100}%`;
      el.style.top = `${(pt.y / 280) * 100}%`;
      el.innerHTML = `<span>${rune.icon}</span>`;
      el.title = `${rune.label} (${Math.round(rune.ratio * 100)}%)`;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isCompleted) return;
        animateWandTo(rune.ratio);
      });

      runesContainer.appendChild(el);
      runeElements.push({ el, ...rune });
    });

    const updateWandPosition = (ratio) => {
      currentProgress = Math.max(0, Math.min(1, ratio));
      const currentLen = currentProgress * totalLength;
      completedPath.style.strokeDashoffset = `${totalLength - currentLen}`;

      const pt = guidePath.getPointAtLength(currentLen);
      wandActor.style.left = `${(pt.x / 500) * 100}%`;
      wandActor.style.top = `${(pt.y / 280) * 100}%`;

      if (powerValEl) {
        powerValEl.textContent = `${Math.round(currentProgress * 100)}%`;
      }

      // Actualizar estado visual de las runas en el camino
      runeElements.forEach((r, idx) => {
        if (currentProgress >= r.ratio - 0.02) {
          r.el.classList.add("completed");
          r.el.classList.remove("active");
        } else {
          r.el.classList.remove("completed");
          const prevCompleted = idx === 0 || currentProgress >= runeElements[idx - 1].ratio - 0.02;
          if (prevCompleted && currentProgress < r.ratio) {
            r.el.classList.add("active");
          } else {
            r.el.classList.remove("active");
          }
        }
      });

      // Al alcanzar el 98% o más, se completa el hechizo con éxito
      if (currentProgress >= 0.98 && !isCompleted) {
        triggerSpellComplete();
      }
    };

    const triggerSpellComplete = () => {
      isCompleted = true;
      updateWandPosition(1.0);
      sound.playSpellSuccess();

      if (burstEl) {
        burstEl.classList.remove("hidden");
      }

      const rect = burstEl ? burstEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight * 0.45, width: 0, height: 0 };
      triggerMagicalSparkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

      setTimeout(() => {
        this.collectFragment(3);
        this.showStage("scene-m3-reward");
      }, 1900);
    };

    let animationFrameId = null;
    const animateWandTo = (targetRatio) => {
      if (isCompleted) return;
      sound.playWandSwoosh();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      const startRatio = currentProgress;
      const diff = targetRatio - startRatio;
      const duration = Math.max(300, Math.abs(diff) * 1000);
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // Easing suave cuadrático
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const newRatio = startRatio + diff * ease;
        updateWandPosition(newRatio);

        if (t < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          animationFrameId = null;
        }
      };
      animationFrameId = requestAnimationFrame(step);
    };

    // Colocar varita en posición inicial
    updateWandPosition(0);

    // Muestreo para arrastrar o tocar a lo largo de la curva
    let isDragging = false;

    const getRatioFromPoint = (clientX, clientY) => {
      const rect = wrap.getBoundingClientRect();
      const clickX = ((clientX - rect.left) / rect.width) * 500;
      const clickY = ((clientY - rect.top) / rect.height) * 280;

      let closestLen = 0;
      let minDistanceSq = Infinity;
      const samples = 70;
      for (let i = 0; i <= samples; i++) {
        const testLen = (i / samples) * totalLength;
        const pt = guidePath.getPointAtLength(testLen);
        const dx = pt.x - clickX;
        const dy = pt.y - clickY;
        const distSq = dx * dx + dy * dy;
        if (distSq < minDistanceSq) {
          minDistanceSq = distSq;
          closestLen = testLen;
        }
      }
      return closestLen / totalLength;
    };

    const onPointerDown = (e) => {
      if (isCompleted) return;
      isDragging = true;
      const ratio = getRatioFromPoint(e.clientX, e.clientY);
      if (ratio > currentProgress) {
        animateWandTo(ratio);
      }
    };

    const onPointerMove = (e) => {
      if (!isDragging || isCompleted) return;
      const ratio = getRatioFromPoint(e.clientX, e.clientY);
      if (ratio > currentProgress && ratio <= currentProgress + 0.35) {
        updateWandPosition(ratio);
        sound.playWandSwoosh();
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    wrap.onpointerdown = onPointerDown;
    wrap.onpointermove = onPointerMove;
    window.onpointerup = onPointerUp;
  }

  // ==================================================================
  // ESTACIÓN IV: EL ROMPECABEZAS SAGRADO: ALWAYS ⚡△⃒⃘ (ARRASTRAR & ENSAMBLAR)
  // ==================================================================
  initMinigame4() {
    this.assembledRelics = new Set();
    const countEl = document.getElementById("hallows-relics-count");
    const bannerEl = document.getElementById("hallows-always-banner");
    const msgEl = document.getElementById("relic-active-message");
    const msgText = document.getElementById("relic-message-text");
    const altarEl = document.getElementById("hallows-altar-container");
    const hintEl = document.getElementById("hallows-drag-hint");

    let selectedRelicId = null;

    if (countEl) countEl.textContent = "0";
    if (bannerEl) bannerEl.classList.add("hidden");
    if (msgEl) msgEl.classList.add("hidden");
    if (altarEl) {
      altarEl.classList.remove("drop-hover");
    }
    if (hintEl) {
      hintEl.innerHTML = "<span>✨ Toma y arrastra cada figura hacia su lugar en el altar ✨</span>";
    }

    const relicKeys = ["triangle", "circle", "wand"];

    const relicsConfig = {
      triangle: {
        name: "La Capa",
        phrase: "«Eres mi refugio seguro y el lugar donde mi alma siempre encuentra paz.»",
      },
      circle: {
        name: "La Piedra",
        phrase: "«Pienso en ti en cada instante de mi día; vives en cada latido de mi corazón.»",
      },
      wand: {
        name: "La Varita",
        phrase: "«Nuestro amor es la fuerza más pura e inquebrantable de este universo.»",
      },
    };

    // Reiniciar piezas en el SVG y figuras en la bandeja
    relicKeys.forEach((relicId) => {
      const pieceSvg = document.getElementById(`hallows-piece-${relicId}`);
      if (pieceSvg) pieceSvg.classList.add("hidden");

      const slotSvg = document.getElementById(`hallows-slot-${relicId}`);
      if (slotSvg) {
        slotSvg.classList.remove("slot-hover", "target-hint-active");
      }

      const pieceEl = document.getElementById(`piece-relic-${relicId}`);
      if (pieceEl) {
        pieceEl.classList.remove("placed", "is-dragging", "selected", "spring-back");
        pieceEl.style.transform = "translate3d(0, 0, 0)";
      }
    });

    const assembleRelic = (relicId, snapX, snapY) => {
      if (this.assembledRelics.has(relicId)) return;
      this.assembledRelics.add(relicId);

      const pieceEl = document.getElementById(`piece-relic-${relicId}`);
      if (pieceEl) {
        pieceEl.classList.remove("is-dragging", "selected", "spring-back");
        pieceEl.classList.add("placed");
        pieceEl.style.transform = "translate3d(0, 0, 0)";
      }

      const pieceSvg = document.getElementById(`hallows-piece-${relicId}`);
      if (pieceSvg) pieceSvg.classList.remove("hidden");

      const slotSvg = document.getElementById(`hallows-slot-${relicId}`);
      if (slotSvg) slotSvg.classList.remove("slot-hover", "target-hint-active");

      sound.playWandSwoosh();
      sound.playChime(this.assembledRelics.size);

      // Estallido de chispas en el altar sagrado
      const altarRect = altarEl ? altarEl.getBoundingClientRect() : null;
      const burstX = snapX || (altarRect ? altarRect.left + altarRect.width / 2 : window.innerWidth / 2);
      const burstY = snapY || (altarRect ? altarRect.top + altarRect.height / 2 : window.innerHeight / 2);
      triggerMagicalSparkBurst(burstX, burstY);

      if (countEl) countEl.textContent = this.assembledRelics.size.toString();

      if (msgEl && msgText && relicsConfig[relicId]) {
        msgText.textContent = relicsConfig[relicId].phrase;
        msgEl.classList.remove("hidden");
      }

      if (hintEl) {
        hintEl.innerHTML = `<span>✦ ¡${relicsConfig[relicId]?.name || "Reliquia"} ensamblada con éxito! ✦</span>`;
      }

      // Si se han colocado las 3 reliquias
      if (this.assembledRelics.size === 3) {
        sound.playSpellSuccess();

        if (bannerEl) {
          bannerEl.classList.remove("hidden");
        }

        const svgEl = document.getElementById("hallows-svg");
        if (svgEl) {
          const rect = svgEl.getBoundingClientRect();
          triggerMagicalSparkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        setTimeout(() => {
          this.collectFragment(4);
          setTimeout(() => {
            this.showStage("scene-m4-reward");
          }, 800);
        }, 2400);
      }
    };

    // Configurar arrastre táctil y de ratón en cada figura de la bandeja
    relicKeys.forEach((relicId) => {
      const pieceEl = document.getElementById(`piece-relic-${relicId}`);
      if (!pieceEl) return;

      let isDragging = false;
      let startX = 0;
      let startY = 0;

      const onPointerDown = (e) => {
        if (this.assembledRelics.has(relicId)) return;
        startX = e.clientX;
        startY = e.clientY;
        isDragging = false;

        try {
          pieceEl.setPointerCapture(e.pointerId);
        } catch (_) {}

        // Limpiar selección previa
        relicKeys.forEach((k) => {
          const other = document.getElementById(`piece-relic-${k}`);
          if (other) other.classList.remove("selected");
          const slot = document.getElementById(`hallows-slot-${k}`);
          if (slot) slot.classList.remove("target-hint-active");
        });
        selectedRelicId = null;
      };

      const onPointerMove = (e) => {
        if (this.assembledRelics.has(relicId)) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const dist = Math.hypot(dx, dy);

        if (dist > 8) {
          isDragging = true;
          pieceEl.classList.remove("spring-back", "selected");
          pieceEl.classList.add("is-dragging");

          // Mover la figura física directamente con el dedo o cursor
          pieceEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.12)`;

          // Iluminar la silueta correspondiente en el altar
          const slotSvg = document.getElementById(`hallows-slot-${relicId}`);
          if (slotSvg) slotSvg.classList.add("target-hint-active");

          if (hintEl) {
            hintEl.innerHTML = `<span>✨ Suelta ${relicsConfig[relicId]?.name} sobre el altar sagrado ✨</span>`;
          }

          if (altarEl) {
            const aRect = altarEl.getBoundingClientRect();
            const isHover = (
              e.clientX >= aRect.left - 30 &&
              e.clientX <= aRect.right + 30 &&
              e.clientY >= aRect.top - 30 &&
              e.clientY <= aRect.bottom + 30
            );
            altarEl.classList.toggle("drop-hover", isHover);
            if (slotSvg) slotSvg.classList.toggle("slot-hover", isHover);
          }
        }
      };

      const onPointerUp = (e) => {
        if (this.assembledRelics.has(relicId)) return;

        try {
          pieceEl.releasePointerCapture(e.pointerId);
        } catch (_) {}

        pieceEl.classList.remove("is-dragging");

        if (altarEl) {
          altarEl.classList.remove("drop-hover");
        }

        const slotSvg = document.getElementById(`hallows-slot-${relicId}`);
        if (slotSvg) slotSvg.classList.remove("slot-hover", "target-hint-active");

        const totalDist = Math.hypot(e.clientX - startX, e.clientY - startY);

        if (isDragging && totalDist > 25) {
          // El usuario arrastró físicamente la figura
          if (altarEl) {
            const aRect = altarEl.getBoundingClientRect();
            const isInside = (
              e.clientX >= aRect.left - 40 &&
              e.clientX <= aRect.right + 40 &&
              e.clientY >= aRect.top - 40 &&
              e.clientY <= aRect.bottom + 40
            );

            if (isInside) {
              // Encaje perfecto en el altar sagrado
              assembleRelic(relicId, e.clientX, e.clientY);
            } else {
              // No llegó al altar -> regresa elásticamente a su posición
              pieceEl.classList.add("spring-back");
              pieceEl.style.transform = "translate3d(0, 0, 0)";
              setTimeout(() => pieceEl.classList.remove("spring-back"), 400);
              sound.playWandSwoosh();
              if (hintEl) {
                hintEl.innerHTML = "<span>✨ Arrastra la figura hasta el círculo del altar sagrado ✨</span>";
              }
            }
          }
        } else {
          // Fue un simple clic o tap sin arrastrar -> NUNCA se acomoda solo
          pieceEl.style.transform = "translate3d(0, 0, 0)";
          pieceEl.classList.remove("shake-hint");
          void pieceEl.offsetWidth; // Forzar reflujo para reiniciar animación
          pieceEl.classList.add("shake-hint");
          setTimeout(() => pieceEl.classList.remove("shake-hint"), 500);

          sound.playMagicClick();
          if (hintEl) {
            hintEl.innerHTML = `<span>👆 ¡Debes arrastrar ${relicsConfig[relicId]?.name} con tu dedo o ratón hacia el altar! 👆</span>`;
          }
        }

        isDragging = false;
      };

      pieceEl.onpointerdown = onPointerDown;
      pieceEl.onpointermove = onPointerMove;
      pieceEl.onpointerup = onPointerUp;
      pieceEl.onpointercancel = onPointerUp;
    });
  }

  // ==================================================================
  // CLÍMAX: FUSIÓN DE FRAGMENTOS (EL GIRATIEMPO 3D & LA CARTA)
  // ==================================================================
  initClimaxPedestal() {
    const fuseBtn = document.getElementById("btn-fuse");
    fuseBtn.addEventListener("click", () => {
      fuseBtn.disabled = true;
      fuseBtn.textContent = "✦ Girando el Giratiempo a través del Tiempo... ⏳✨ ✦";

      const pedestal = document.getElementById("fusion-pedestal");
      // 1. Activar vórtice de giro 3D del Giratiempo
      pedestal.classList.add("vortex");
      sound.playChime(4);
      sound.playWandSwoosh();

      // 2. Al completar el giro, estallido supernova y destello
      setTimeout(() => {
        sound.playClimaxBurst();
        if (this.starfield) {
          this.starfield.triggerFlash();
        }

        const flashEl = document.getElementById("supernova-flash");
        if (flashEl) {
          flashEl.classList.remove("hidden");
          requestAnimationFrame(() => flashEl.classList.add("active"));
        }

        pedestal.classList.add("fusing");

        // 3. Revelar el pergamino real de Hogwarts tras el destello cegador
        setTimeout(() => {
          if (flashEl) {
            flashEl.classList.remove("active");
            setTimeout(() => flashEl.classList.add("hidden"), 800);
          }

          triggerMagicalSparkBurst(window.innerWidth / 2, window.innerHeight / 2);

          this.showStage("scene-climax-letter");
          this.startTypewriter();
        }, 1100);
      }, 2000);
    });
  }

  startTypewriter() {
    const container = document.getElementById("letter-body");
    const scrollArea = document.getElementById("letter-scroll-area");
    const quill = document.getElementById("magic-quill-holder");
    const skipBtn = document.getElementById("btn-skip-typewriter");
    const toGalleryBtn = document.getElementById("btn-to-gallery");
    const sigBox = document.getElementById("scroll-signature-box");

    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
      this.typewriterInterval = null;
    }

    container.innerHTML = "";
    if (scrollArea) scrollArea.scrollTop = 0;
    if (sigBox) sigBox.classList.add("hidden");
    if (toGalleryBtn) toGalleryBtn.classList.add("hidden");
    if (skipBtn) skipBtn.classList.remove("hidden");
    if (quill) quill.classList.remove("hidden");

    const paragraphs = config.climax.letter.paragraphs;
    const fullHtml = paragraphs
      .map((p) => `<p class="letter-parchment-p">${p}</p>`)
      .join("");

    const finishTypewriter = () => {
      if (this.typewriterInterval) {
        clearInterval(this.typewriterInterval);
        this.typewriterInterval = null;
      }
      container.innerHTML = fullHtml;
      if (quill) quill.classList.add("hidden");
      if (skipBtn) skipBtn.classList.add("hidden");
      if (sigBox) {
        sigBox.classList.remove("hidden");
        sigBox.classList.add("revealed");
      }
      if (toGalleryBtn) toGalleryBtn.classList.remove("hidden");
      sound.playRewardChord();
    };

    skipBtn.onclick = finishTypewriter;

    // Crear la estructura para escritura automática mágica palabra por palabra
    let currentPIndex = 0;
    let currentWordIndex = 0;
    let wordsInCurrentP = paragraphs[0].split(" ");

    let currentPEl = document.createElement("p");
    currentPEl.className = "letter-parchment-p";
    container.appendChild(currentPEl);
    if (quill) currentPEl.appendChild(quill);

    let wordCounter = 0;

    this.typewriterInterval = setInterval(() => {
      if (currentPIndex >= paragraphs.length) {
        finishTypewriter();
        return;
      }

      if (currentWordIndex < wordsInCurrentP.length) {
        const wordText = wordsInCurrentP[currentWordIndex];
        const span = document.createElement("span");
        span.className = "ink-word magic-ink-glow";
        span.textContent = (currentWordIndex > 0 ? " " : "") + wordText;

        if (quill && quill.parentElement === currentPEl) {
          currentPEl.insertBefore(span, quill);
        } else {
          currentPEl.appendChild(span);
        }

        setTimeout(() => {
          span.classList.remove("magic-ink-glow");
        }, 340);

        wordCounter++;
        if (wordCounter % 4 === 0) {
          sound.playQuillScribe();
        }

        currentWordIndex++;

        // Desplazamiento suave solo si el texto supera el 75% del área visible
        if (scrollArea && quill) {
          const scrollBottom = scrollArea.scrollTop + scrollArea.clientHeight;
          const quillBottom = quill.offsetTop + quill.offsetHeight;
          if (quillBottom > scrollBottom - 35) {
            scrollArea.scrollTo({
              top: quillBottom - scrollArea.clientHeight + 45,
              behavior: "smooth",
            });
          }
        }
      } else {
        // Pasar al siguiente párrafo
        currentPIndex++;
        if (currentPIndex < paragraphs.length) {
          currentWordIndex = 0;
          wordsInCurrentP = paragraphs[currentPIndex].split(" ");
          currentPEl = document.createElement("p");
          currentPEl.className = "letter-parchment-p";
          container.appendChild(currentPEl);
          if (quill) currentPEl.appendChild(quill);
        } else {
          finishTypewriter();
        }
      }
    }, 55);
  }

  initCarousel() {
    const track = document.getElementById("carousel-track");
    const dotsContainer = document.getElementById("carousel-dots");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const slides = config.climax.memoriesGallery;

    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    slides.forEach((item, idx) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.innerHTML = `
        <div class="slide-image-box">
          <img src="${item.url}" alt="${item.caption}" loading="lazy">
        </div>
        <div class="slide-info">
          <span class="slide-tag">${item.tag || "Recuerdo"}</span>
          <p class="slide-caption">«${item.caption}»</p>
        </div>
      `;
      track.appendChild(slide);

      const dot = document.createElement("div");
      dot.className = `carousel-dot ${idx === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => this.goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    prevBtn.onclick = () => {
      this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
      this.updateCarousel();
    };

    nextBtn.onclick = () => {
      this.currentSlide = (this.currentSlide + 1) % slides.length;
      this.updateCarousel();
    };
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const track = document.getElementById("carousel-track");
    track.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    document.querySelectorAll(".carousel-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === this.currentSlide);
    });
  }

  initPlayfulNoButton() {
    const btnNo = document.getElementById("btn-no");
    const msgEl = document.getElementById("no-playful-msg");
    const responses = config.climax.noButtonResponses;

    const dodgeButton = () => {
      this.noButtonClicks++;
      const randomMsg = responses[this.noButtonClicks % responses.length];

      msgEl.textContent = randomMsg;
      msgEl.classList.remove("hidden");

      // Desplazamiento limpio y acotado para no desfasar la tarjeta ni solapar el texto
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 6;

      btnNo.style.transform = `translate(${x}px, ${y}px)`;
    };

    btnNo.onmouseenter = dodgeButton;
    btnNo.ontouchstart = (e) => {
      e.preventDefault();
      dodgeButton();
    };
    btnNo.onclick = (e) => {
      e.preventDefault();
      dodgeButton();
    };
  }

  triggerYesCelebration() {
    sound.playCelebrationFanfare();

    const duration = 4000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#22c55e", "#f59e0b", "#f43f5e", "#fbbf24"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#22c55e", "#f59e0b", "#f43f5e", "#fbbf24"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      this.showStage("scene-celebration");
    }, 500);
  }

  // ==================================================================
  // GENERADOR HD DE PERGAMINO: EL MAPA DEL MERODEADOR (PNG)
  // ==================================================================
  async generateMarauderParchmentPng() {
    const saveBtn = document.getElementById("btn-save-marauder-image");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "✨ Encantando pergamino en HD... ⏳";
    }

    try {
      await document.fonts.ready;

      // Cargar las 3 fotos de la pareja
      const loadImage = (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });

      const [imgAnden, imgPatronus, imgCabana] = await Promise.all([
        loadImage("/photos/pareja_anden.jpg"),
        loadImage("/photos/pareja_patronus.jpg"),
        loadImage("/photos/pareja_cabana.jpg"),
      ]);

      // Lienzo de ultra alta definición (1400 x 2380 px)
      const canvas = document.createElement("canvas");
      canvas.width = 1400;
      canvas.height = 2380;
      const ctx = canvas.getContext("2d");

      // 1. Fondo de pergamino envejecido
      const bgGrad = ctx.createRadialGradient(700, 1190, 80, 700, 1190, 1300);
      bgGrad.addColorStop(0, "#fefaf0");
      bgGrad.addColorStop(0.5, "#f6e8c7");
      bgGrad.addColorStop(0.85, "#e9d1a3");
      bgGrad.addColorStop(1, "#d6bc8b");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Manchas sutiles de pátina vintage
      ctx.fillStyle = "rgba(100, 45, 15, 0.04)";
      ctx.beginPath();
      ctx.arc(140, 180, 120, 0, Math.PI * 2);
      ctx.arc(1260, 2200, 160, 0, Math.PI * 2);
      ctx.arc(1250, 300, 100, 0, Math.PI * 2);
      ctx.fill();

      // Doble borde del Mapa del Merodeador
      ctx.strokeStyle = "#5a2512";
      ctx.lineWidth = 4;
      ctx.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);

      ctx.strokeStyle = "rgba(90, 37, 18, 0.45)";
      ctx.lineWidth = 1.8;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(46, 46, canvas.width - 92, canvas.height - 92);
      ctx.setLineDash([]);

      // Florituras en las 4 esquinas
      const corners = [
        [60, 60],
        [canvas.width - 60, 60],
        [60, canvas.height - 60],
        [canvas.width - 60, canvas.height - 60],
      ];
      ctx.fillStyle = "#78350f";
      ctx.font = "bold 20px 'Playfair Display', Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      corners.forEach(([cx, cy]) => {
        ctx.fillText("✦", cx, cy);
      });

      // 2. Encabezado del Mapa del Merodeador
      ctx.textAlign = "center";
      ctx.fillStyle = "#63200f";
      ctx.font = "italic 21px 'Playfair Display', Georgia, serif";
      ctx.fillText("« Los Merodeadores de Nuestro Destino se enorgullecen en presentar »", 700, 105);

      // Línea superior del título
      ctx.strokeStyle = "rgba(90, 37, 18, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(180, 130);
      ctx.lineTo(1220, 130);
      ctx.stroke();

      // Título Principal
      ctx.fillStyle = "#431407";
      ctx.font = "900 50px 'Playfair Display', Georgia, serif";
      ctx.fillText("EL MAPA DEL MERODEADOR", 700, 180);

      // Línea inferior del título
      ctx.beginPath();
      ctx.moveTo(180, 202);
      ctx.lineTo(1220, 202);
      ctx.stroke();

      // Listón de subtítulo
      ctx.fillStyle = "#781c1d";
      ctx.beginPath();
      ctx.roundRect(420, 222, 560, 36, 18);
      ctx.fill();

      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 17px 'Playfair Display', Georgia, serif";
      ctx.fillText("DEL AMOR ETERNO & LOS PLANES SOÑADOS", 700, 246);

      // Dedicatoria a la esposa
      ctx.fillStyle = "#451a03";
      ctx.font = "italic 22px 'Playfair Display', Georgia, serif";
      ctx.fillText("Dedicado con toda el alma a la dueña absoluta de mi corazón:", 700, 298);

      ctx.fillStyle = "#781c1d";
      ctx.font = "900 36px 'Playfair Display', Georgia, serif";
      ctx.fillText("XÓCHITL SINAY BARBA CUEVAS", 700, 342);

      // Juramento solemne
      ctx.fillStyle = "#92400e";
      ctx.font = "italic bold 21px 'Playfair Display', Georgia, serif";
      ctx.fillText("« Juro solemnemente que mis intenciones son amarte siempre... Always »", 700, 385);

      ctx.fillStyle = "#b45309";
      ctx.font = "bold 18px 'Playfair Display', Georgia, serif";
      ctx.fillText("✧ ─── ✦ ─── ⚡ ─── ✦ ─── ✧", 700, 416);

      // 3. Pasillo del Mapa con Huellitas y Punto de Encuentro
      ctx.fillStyle = "rgba(139, 69, 19, 0.08)";
      ctx.fillRect(80, 436, 1240, 80);

      ctx.strokeStyle = "rgba(90, 37, 18, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(80, 436);
      ctx.lineTo(1320, 436);
      ctx.moveTo(80, 516);
      ctx.lineTo(1320, 516);
      ctx.stroke();
      ctx.setLineDash([]);

      // Huellas de Xóchitl
      ctx.fillStyle = "#fcf4dd";
      ctx.fillRect(100, 452, 160, 30);
      ctx.strokeStyle = "#78350f";
      ctx.strokeRect(100, 452, 160, 30);
      ctx.fillStyle = "#451a03";
      ctx.font = "bold 16px 'Playfair Display', Georgia, serif";
      ctx.fillText("Xóchitl Sinay 🐾", 180, 473);

      ctx.font = "20px system-ui, sans-serif";
      ctx.fillText("🐾   🐾   🐾", 330, 480);

      // Punto de encuentro: La Cabaña Soñada
      ctx.fillStyle = "#fef3c7";
      ctx.beginPath();
      ctx.roundRect(470, 448, 460, 56, 10);
      ctx.fill();
      ctx.strokeStyle = "#b45309";
      ctx.stroke();

      ctx.fillStyle = "#78350f";
      ctx.font = "bold 18px 'Playfair Display', Georgia, serif";
      ctx.fillText("💕  Nuestra Cabaña en el Bosque 🌲🏡🌧️  💕", 700, 483);

      // Huellas del Esposo
      ctx.font = "20px system-ui, sans-serif";
      ctx.fillText("🐾   🐾   🐾", 1070, 480);

      ctx.fillStyle = "#fcf4dd";
      ctx.fillRect(1140, 452, 160, 30);
      ctx.strokeStyle = "#78350f";
      ctx.strokeRect(1140, 452, 160, 30);
      ctx.fillStyle = "#451a03";
      ctx.font = "bold 16px 'Playfair Display', Georgia, serif";
      ctx.fillText("Tu Esposo 🐾", 1220, 473);

      // 4. Dibujar las 3 fotos en marcos polaroid vintage
      const drawFramedPhoto = (img, x, y, w, h, pinSymbol, caption) => {
        // Marco de papel polaroid
        ctx.save();
        ctx.shadowColor = "rgba(60, 30, 10, 0.25)";
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;
        ctx.fillStyle = "#fdfaf2";
        ctx.beginPath();
        ctx.roundRect(x - 10, y - 10, w + 20, h + 65, 8);
        ctx.fill();
        ctx.strokeStyle = "#c4a47c";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Foto recortada cover
        if (img) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, 4);
          ctx.clip();

          const imgRatio = img.width / img.height;
          const targetRatio = w / h;
          let sx = 0, sy = 0, sw = img.width, sh = img.height;
          if (imgRatio > targetRatio) {
            sh = img.height;
            sw = img.height * targetRatio;
            sx = (img.width - sw) / 2;
          } else {
            sw = img.width;
            sh = img.width / targetRatio;
            sy = (img.height - sh) / 2;
          }
          ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
          ctx.restore();
        }

        // Pin superior
        ctx.font = "20px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(pinSymbol, x + w / 2, y - 14);

        // Subtítulo de la foto
        ctx.fillStyle = "#451a03";
        ctx.font = "italic 15px 'Playfair Display', Georgia, serif";
        ctx.fillText(caption, x + w / 2, y + h + 34);
      };

      drawFramedPhoto(imgAnden, 80, 555, 380, 260, "⚡", "Andén 9 ¾ ✦ El Inicio de Nuestro Destino");
      drawFramedPhoto(imgPatronus, 510, 545, 380, 270, "✨", "Expecto Patronum ✦ Always");
      drawFramedPhoto(imgCabana, 940, 555, 380, 260, "🌲", "Nuestra Cabaña ✦ El Refugio Soñado");

      // 5. Carta y Poema de Amor Completa
      const letterBoxX = 80;
      const letterBoxY = 895;
      const letterBoxW = 1240;
      const letterBoxH = 1170;

      ctx.fillStyle = "rgba(255, 255, 255, 0.48)";
      ctx.beginPath();
      ctx.roundRect(letterBoxX, letterBoxY, letterBoxW, letterBoxH, 12);
      ctx.fill();
      ctx.strokeStyle = "rgba(139, 69, 19, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Saludo inicial
      ctx.textAlign = "left";
      ctx.fillStyle = "#601c0b";
      ctx.font = "bold 28px 'Playfair Display', Georgia, serif";
      ctx.fillText("Para mi amada esposa, Xóchitl Sinay Barba Cuevas:", letterBoxX + 40, letterBoxY + 54);

      ctx.strokeStyle = "rgba(139, 69, 19, 0.25)";
      ctx.beginPath();
      ctx.moveTo(letterBoxX + 40, letterBoxY + 70);
      ctx.lineTo(letterBoxX + letterBoxW - 40, letterBoxY + 70);
      ctx.stroke();

      // Envoltura de texto para los 4 párrafos
      const paragraphs = config.climax.letter.paragraphs;
      let textY = letterBoxY + 115;
      ctx.fillStyle = "#2b1408";
      ctx.font = "21px 'Playfair Display', Georgia, serif";
      const maxLineWidth = letterBoxW - 80;
      const lineHeight = 36;

      const renderParagraph = (text) => {
        const words = text.split(" ");
        let line = "";
        for (let i = 0; i < words.length; i++) {
          const testLine = line + (line ? " " : "") + words[i];
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxLineWidth && i > 0) {
            ctx.fillText(line, letterBoxX + 40, textY);
            line = words[i];
            textY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, letterBoxX + 40, textY);
        textY += lineHeight + 22; // Espacio entre párrafos
      };

      paragraphs.forEach((p) => renderParagraph(p));

      // Bloque de firma
      textY = Math.max(textY, letterBoxY + letterBoxH - 140);
      ctx.strokeStyle = "rgba(139, 69, 19, 0.35)";
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(letterBoxX + 40, textY);
      ctx.lineTo(letterBoxX + letterBoxW - 40, textY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.textAlign = "right";
      ctx.fillStyle = "#63200f";
      ctx.font = "italic 22px 'Playfair Display', Georgia, serif";
      ctx.fillText("Por siempre tuyo, con todo mi amor y devoción — Always,", letterBoxX + letterBoxW - 40, textY + 40);

      ctx.fillStyle = "#781c1d";
      ctx.font = "bold 34px 'Caveat', cursive, Georgia, serif";
      ctx.fillText("Tu esposo que piensa en ti en cada segundo y te ama con toda su alma", letterBoxX + letterBoxW - 40, textY + 85);

      // 6. Pie de Página: Sello de Cera de Hogwarts & Mischief Managed
      const sealY = 2175;
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 6;
      const sealGrad = ctx.createRadialGradient(700, sealY, 10, 700, sealY, 44);
      sealGrad.addColorStop(0, "#b91c1c");
      sealGrad.addColorStop(0.65, "#7f1d1d");
      sealGrad.addColorStop(1, "#450a0a");
      ctx.fillStyle = sealGrad;
      ctx.beginPath();
      ctx.arc(700, sealY, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#991b1b";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      ctx.textAlign = "center";
      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 24px 'Playfair Display', Georgia, serif";
      ctx.fillText("⚡△⃒⃘", 700, sealY + 8);

      ctx.fillStyle = "#5a2512";
      ctx.font = "900 20px 'Playfair Display', Georgia, serif";
      ctx.fillText("✦ TRAVESURA REALIZADA ✦ MISCHIEF MANAGED ✦ ALWAYS ✦", 700, 2275);

      // 7. Descargar la imagen
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Mapa_del_Merodeador_Xochitl_Sinay.png";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          a.remove();
          URL.revokeObjectURL(url);
        }, 1500);

        sound.playRewardChord();
        triggerMagicalSparkBurst(window.innerWidth / 2, window.innerHeight / 2);

        if (saveBtn) {
          saveBtn.textContent = "✓ ¡Pergamino Guardado con Éxito! 📜✨";
          setTimeout(() => {
            saveBtn.textContent = "📥 Descargar Pergamino (PNG HD)";
            saveBtn.disabled = false;
          }, 3500);
        }
      }, "image/png");
    } catch (err) {
      console.error("Error al generar el pergamino:", err);
      if (saveBtn) {
        saveBtn.textContent = "📥 Descargar Pergamino (PNG HD)";
        saveBtn.disabled = false;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new ConstellationApp();
  app.init();
});
