/**
 * ====================================================================
 * CONTROLADOR PRINCIPAL: XÓCHITL SINAY ✦ ENTRE EL MAR Y LAS ESTRELLAS
 * ====================================================================
 */

import confetti from "canvas-confetti";
import { config } from "./config.js";
import { sound } from "./audio.js";
import { Starfield } from "./stars.js";

class ConstellationApp {
  constructor() {
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

    if (nextEl) {
      this.currentStageId = stageId;
      setTimeout(() => {
        nextEl.classList.add("active");
      }, 150);
    }
  }

  bindEvents() {
    // Botón de audio flotante
    const audioBtn = document.getElementById("audio-toggle-btn");
    audioBtn.addEventListener("click", () => {
      const isMuted = sound.toggleMute();
      audioBtn.classList.toggle("muted", isMuted);
      audioBtn.querySelector(".audio-icon").textContent = isMuted ? "🔇" : "🌧️";
    });

    // 0A. Abrir el Sobre Mágico de Hogwarts
    let envelopeOpened = false;
    const openEnvelope = () => {
      if (envelopeOpened) return;
      envelopeOpened = true;

      sound.start();
      sound.playEnvelopeOpen();

      const seal = document.getElementById("btn-open-bottle");
      const flap = document.getElementById("envelope-flap");
      const flash = document.getElementById("supernova-flash");

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

      // Chispas mágicas de bienvenida
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#f59e0b", "#facc15", "#38bdf8", "#fef08a", "#ffffff"],
      });

      // El pergamino con la carta se revela
      setTimeout(() => {
        const bottleBox = document.getElementById("intro-bottle-box");
        const unfoldedBox = document.getElementById("intro-unfolded-box");
        if (bottleBox) bottleBox.classList.add("hidden");
        if (unfoldedBox) unfoldedBox.classList.remove("hidden");
      }, 720);
    };

    const sealBtn = document.getElementById("btn-open-bottle");
    if (sealBtn) sealBtn.addEventListener("click", openEnvelope);
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

    // 3. Avanzar de Recompensa 2 a Minijuego 3 (Cambio de escenografía al Giratiempo Dorado)
    document.getElementById("btn-to-m3").addEventListener("click", () => {
      this.setScenicBackground(3);
      if (this.starfield) this.starfield.setTheme("patronusCabin");
      this.showStage("scene-m3-play");
      this.initMinigame3();
    });

    // 4. Avanzar de Recompensa 3 al Clímax (La Cabaña Mágica con chimenea y lluvia)
    document.getElementById("btn-to-climax").addEventListener("click", () => {
      this.setScenicBackground(4);
      if (this.starfield) this.starfield.setTheme("patronusCabin");
      this.showStage("scene-climax-pedestal");
      this.initClimaxPedestal();
    });

    // 5. De la Carta a la Galería de Recuerdos
    document.getElementById("btn-to-gallery").addEventListener("click", () => {
      this.setScenicBackground(4);
      this.showStage("scene-climax-gallery");
      this.initCarousel();
    });

    // 6. De la Galería a la Gran Pregunta
    document.getElementById("btn-to-question").addEventListener("click", () => {
      this.setScenicBackground(4);
      this.showStage("scene-climax-question");
      this.initPlayfulNoButton();
    });

    // 7. Botón "¡Sí!" final
    document.getElementById("btn-yes").addEventListener("click", () => {
      this.triggerYesCelebration();
    });

    // 8. Captura final
    document.getElementById("btn-download-capture").addEventListener("click", () => {
      window.print();
    });
  }

  collectFragment(id) {
    if (this.collectedFragments.has(id)) return;
    this.collectedFragments.add(id);

    const slot = document.getElementById(`slot-${id}`);
    if (slot) {
      slot.classList.add("collected");
    }

    sound.playRewardChord();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.12 },
      colors: ["#22c55e", "#f59e0b", "#f43f5e", "#fef08a", "#bae6fd"],
      ticks: 180,
    });
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

      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#38bdf8", "#facc15", "#fef08a", "#ffffff", "#bae6fd"],
      });

      setTimeout(() => {
        this.collectFragment(3);
        setTimeout(() => {
          this.collectFragment(4);
          this.showStage("scene-m3-reward");
        }, 550);
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

          confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#f59e0b", "#facc15", "#38bdf8", "#fef08a", "#ffffff"],
          });

          this.showStage("scene-climax-letter");
          this.startTypewriter();
        }, 1100);
      }, 2000);
    });
  }

  startTypewriter() {
    const container = document.getElementById("letter-body");
    const skipBtn = document.getElementById("btn-skip-typewriter");
    const toGalleryBtn = document.getElementById("btn-to-gallery");
    container.innerHTML = "";

    const paragraphs = config.climax.letter.paragraphs;
    const fullHtml = paragraphs.map((p) => `<p>${p}</p>`).join("");
    const fullText = paragraphs.join("\n\n");

    let charIndex = 0;

    const finishTypewriter = () => {
      clearInterval(this.typewriterInterval);
      container.innerHTML = fullHtml;
      skipBtn.classList.add("hidden");
      toGalleryBtn.classList.remove("hidden");
      const scrollParent = container.parentElement;
      if (scrollParent) scrollParent.scrollTop = scrollParent.scrollHeight;
    };

    skipBtn.onclick = finishTypewriter;

    // Se escribe poco a poco palabra por palabra
    this.typewriterInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        charIndex += 2;
        container.innerText = fullText.slice(0, charIndex);
        const scrollParent = container.parentElement;
        if (scrollParent) scrollParent.scrollTop = scrollParent.scrollHeight;
      } else {
        finishTypewriter();
      }
    }, 28);
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
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new ConstellationApp();
  app.init();
});
