/**
 * ====================================================================
 * CONTROLADOR PRINCIPAL: MARTHA ✦ ENTRE EL MAR Y LAS ESTRELLAS
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
    // 1. Iniciar cielo estrellado
    const canvas = document.getElementById("stars-canvas");
    if (canvas) {
      this.starfield = new Starfield(canvas);
    }

    // 2. Personalizar textos desde config
    this.applyConfig();

    // 3. Vincular eventos de navegación y botones
    this.bindEvents();
  }

  applyConfig() {
    // Portada y Botella
    document.getElementById("intro-badge").textContent = config.intro.badge;
    document.getElementById("bottle-tag").textContent = config.intro.bottleTag;
    document.getElementById("bottle-teaser").textContent = config.intro.bottleTeaser;
    document.getElementById("open-bottle-text").textContent = config.intro.openBottleText;
    document.getElementById("unfolded-title").textContent = config.intro.unfoldedTitle;
    document.getElementById("unfolded-subtitle").textContent = config.intro.unfoldedSubtitle;
    document.getElementById("start-btn-text").textContent = config.intro.startButtonText;

    // Carta y firma
    document.getElementById("letter-salutation").textContent = config.climax.letter.salutation;

    // Pregunta final
    document.getElementById("final-question").textContent = config.climax.finalQuestion;
    document.getElementById("btn-yes-text").textContent = config.climax.yesButtonText;
    document.getElementById("btn-no-text").textContent = config.climax.noButtonText;

    // Celebración
    document.getElementById("celeb-badge").textContent = config.climax.celebration.badge;
    document.getElementById("celeb-title").textContent = config.climax.celebration.title;
    document.getElementById("celeb-message").textContent = config.climax.celebration.message;
    document.getElementById("celeb-partner").textContent = config.partnerName;
    document.getElementById("celeb-sender").textContent = config.yourName;
    document.getElementById("celeb-date").textContent = config.climax.celebration.dateValue || "Este fin de semana frente al mar 🌊🌴";
    const dateLabelEl = document.getElementById("celeb-date-label");
    if (dateLabelEl) {
      dateLabelEl.textContent = config.climax.celebration.dateLabel || "Cita oficial:";
    }
  }

  // Transición fluida entre escenas en la misma ventana fija
  showStage(stageId) {
    const currentEl = document.getElementById(this.currentStageId);
    const nextEl = document.getElementById(stageId);

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
      audioBtn.querySelector(".audio-icon").textContent = isMuted ? "🔇" : "🎵";
    });

    // 0A. Abrir la botella misteriosa
    const openBottle = () => {
      sound.start();
      sound.playChime(4);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#38bdf8", "#2dd4bf", "#f5d061", "#ffffff"],
      });

      document.getElementById("intro-bottle-box").classList.add("hidden");
      document.getElementById("intro-unfolded-box").classList.remove("hidden");
    };

    document.getElementById("btn-open-bottle").addEventListener("click", openBottle);
    document.getElementById("bottle-interactive").addEventListener("click", openBottle);

    // 0B. Comenzar la expedición marina tras descorchar
    document.getElementById("btn-start").addEventListener("click", () => {
      document.getElementById("fragments-hud").classList.remove("hidden");
      if (this.starfield) this.starfield.setTheme("twilight");
      this.showStage("scene-m1-play");
      this.initMinigame1();
    });

    // 2. Avanzar de Recompensa 1 a Minijuego 2 (Cambio de escenografía a Atardecer en la playa)
    document.getElementById("btn-to-m2").addEventListener("click", () => {
      if (this.starfield) this.starfield.setTheme("sunset");
      this.showStage("scene-m2-play");
      this.initMinigame2();
    });

    // 3. Avanzar de Recompensa 2 a Minijuego 3 (Cambio de escenografía a Océano Boreal con Luna y Olas de Aurora)
    document.getElementById("btn-to-m3").addEventListener("click", () => {
      if (this.starfield) this.starfield.setTheme("aurora");
      this.showStage("scene-m3-play");
      this.initMinigame3();
    });

    // 4. Avanzar de Recompensa 3 al Clímax (Pedestal)
    document.getElementById("btn-to-climax").addEventListener("click", () => {
      if (this.starfield) this.starfield.setTheme("aurora");
      this.showStage("scene-climax-pedestal");
      this.initClimaxPedestal();
    });

    // 5. De la Carta a la Galería de Recuerdos
    document.getElementById("btn-to-gallery").addEventListener("click", () => {
      this.showStage("scene-climax-gallery");
      this.initCarousel();
    });

    // 6. De la Galería a la Gran Pregunta
    document.getElementById("btn-to-question").addEventListener("click", () => {
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
      colors: ["#38bdf8", "#2dd4bf", "#f5d061", "#ffffff", "#fb7185"],
      ticks: 180,
    });
  }

  // ==================================================================
  // ESTACIÓN 1: MINIJUEGO DE MEMORIA (MAR & VINO - 3 PARES / 6 CARTAS)
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

    // 3 pares temáticos de mar, vino y atracción
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
        <div class="memory-card-back">🌊</div>
        <div class="memory-card-front">
          <span class="card-icon">${item.icon}</span>
          <span class="card-title">${item.name}</span>
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

    const progressPercent = ((this.currentTriviaIndex + 1) / total) * 100;
    document.getElementById("trivia-progress-bar").style.width = `${progressPercent}%`;

    document.getElementById("question-step").textContent = `Pregunta ${this.currentTriviaIndex + 1} de ${total}`;
    document.getElementById("question-text").textContent = qData.question;

    const feedbackEl = document.getElementById("trivia-feedback");
    feedbackEl.classList.add("hidden");

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    qData.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "trivia-option";
      btn.innerHTML = `<span class="opt-bullet">🌊</span> <span>${opt.text}</span>`;

      btn.addEventListener("click", () => {
        if (opt.correct) {
          sound.playChime(3);
          document.getElementById("polaroid-img").src = qData.photo;
          document.getElementById("polaroid-caption").textContent = qData.photoCaption;
          this.showStage("scene-m2-polaroid");
        } else {
          sound.playWrongSound();
          btn.classList.add("shake");
          setTimeout(() => btn.classList.remove("shake"), 600);

          feedbackEl.textContent = opt.feedback || config.minigame2.retryPrompt;
          feedbackEl.classList.remove("hidden");
        }
      });

      optionsContainer.appendChild(btn);
    });
  }

  // ==================================================================
  // ESTACIÓN 3: CONSTELACIÓN SOBRE EL MAR (COORDENADAS PORCENTUALES)
  // ==================================================================
  initMinigame3() {
    this.currentConstellationStep = 1;
    const nodesContainer = document.getElementById("stars-nodes");
    const svgLines = document.getElementById("svg-lines");
    nodesContainer.innerHTML = "";
    svgLines.innerHTML = "";

    document.getElementById("next-star-num").textContent = "1";

    this.constellationNodes.forEach((node) => {
      const el = document.createElement("div");
      el.className = "star-node";
      el.id = `star-node-${node.id}`;
      el.textContent = node.label;
      // Posición porcentual exacta
      el.style.left = `${node.x}%`;
      el.style.top = `${node.y}%`;

      if (node.id === 1) {
        el.classList.add("target");
      }

      el.addEventListener("click", () => this.handleStarClick(node));
      nodesContainer.appendChild(el);
    });
  }

  handleStarClick(node) {
    if (node.id === this.currentConstellationStep) {
      const currentNodeEl = document.getElementById(`star-node-${node.id}`);
      currentNodeEl.classList.remove("target");
      currentNodeEl.classList.add("connected");

      sound.playChime(this.currentConstellationStep);

      // Si no es la primera, trazar línea con la anterior
      if (this.currentConstellationStep > 1) {
        const prevNode = this.constellationNodes.find((n) => n.id === this.currentConstellationStep - 1);
        if (prevNode) {
          this.drawConstellationLine(prevNode, node);
        }
      }

      this.currentConstellationStep++;

      if (this.currentConstellationStep <= this.constellationNodes.length) {
        document.getElementById("next-star-num").textContent = this.currentConstellationStep;
        const nextNodeEl = document.getElementById(`star-node-${this.currentConstellationStep}`);
        if (nextNodeEl) {
          nextNodeEl.classList.add("target");
        }
      } else {
        // Cerrar el corazón uniendo la 7 con la 1 en la cima
        const lastNode = this.constellationNodes[this.constellationNodes.length - 1];
        const firstNode = this.constellationNodes[0];
        this.drawConstellationLine(lastNode, firstNode);

        document.getElementById("next-star-num").textContent = "✓ ¡Completa!";

        setTimeout(() => {
          this.collectFragment(3);
          setTimeout(() => {
            this.collectFragment(4);
            this.showStage("scene-m3-reward");
          }, 450);
        }, 600);
      }
    }
  }

  drawConstellationLine(fromNode, toNode) {
    const svgLines = document.getElementById("svg-lines");
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    // Coordenadas coincidentes con el viewBox="0 0 100 100"
    line.setAttribute("x1", fromNode.x);
    line.setAttribute("y1", fromNode.y);
    line.setAttribute("x2", toNode.x);
    line.setAttribute("y2", toNode.y);
    svgLines.appendChild(line);
  }

  // ==================================================================
  // CLÍMAX: FUSIÓN DE FRAGMENTOS (VÓRTICE GIRATORIO & CARTA)
  // ==================================================================
  initClimaxPedestal() {
    const fuseBtn = document.getElementById("btn-fuse");
    fuseBtn.addEventListener("click", () => {
      fuseBtn.disabled = true;
      fuseBtn.textContent = "✦ Girando y fusionando... ✦";

      const pedestal = document.getElementById("fusion-pedestal");
      // 1. Activar vórtice de giro de fragmentos
      pedestal.classList.add("vortex");
      sound.playChime(4);

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

        // 3. Revelar la carta tras el destello cegador
        setTimeout(() => {
          if (flashEl) {
            flashEl.classList.remove("active");
            setTimeout(() => flashEl.classList.add("hidden"), 800);
          }

          confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#38bdf8", "#2dd4bf", "#f5d061", "#fb7185", "#ffffff"],
          });

          this.showStage("scene-climax-letter");
          this.startTypewriter();
        }, 1100);
      }, 1600);
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
        colors: ["#38bdf8", "#2dd4bf", "#fb7185", "#f5d061"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#38bdf8", "#2dd4bf", "#fb7185", "#f5d061"],
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
