/**
 * ====================================================================
 * CONTROLADOR PRINCIPAL: MARTHA ✦ ENTRE EL MAR Y LAS ESTRELLAS
 * Experiencia centrada en ventana única, sin scroll, con transiciones suaves.
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

    // Minijuego 1: Destellos en la marea
    this.revealedLightsCount = 0;
    this.flashlightPos = { x: 0, y: 0 };
    this.isPointerInsideFlashlight = false;

    // Minijuego 2: Trivia costera
    this.currentTriviaIndex = 0;

    // Minijuego 3: Constelación marina (7 nodos formando un corazón sobre el mar)
    this.currentConstellationStep = 1;
    this.constellationNodes = [
      { id: 1, x: 150, y: 80, label: "1" },
      { id: 2, x: 75, y: 150, label: "2" },
      { id: 3, x: 115, y: 245, label: "3" },
      { id: 4, x: 200, y: 325, label: "4" },
      { id: 5, x: 285, y: 245, label: "5" },
      { id: 6, x: 325, y: 150, label: "6" },
      { id: 7, x: 250, y: 80, label: "7" },
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
    // Portada
    document.getElementById("intro-badge").textContent = config.intro.badge;
    document.getElementById("intro-title").textContent = config.intro.title;
    document.getElementById("intro-subtitle").textContent = config.intro.subtitle;
    document.getElementById("intro-start-btn-text").textContent = config.intro.startButtonText;
    document.getElementById("intro-headphones").querySelector("span:last-child").textContent =
      config.intro.headphonesNotice;

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

    // Fecha actual formateada
    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    document.getElementById("celeb-date").textContent = now.toLocaleDateString("es-ES", options);
  }

  // Transición fluida entre escenas dentro de la misma ventana
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

    // 1. Comenzar el viaje (Intro -> Minijuego 1)
    document.getElementById("btn-start").addEventListener("click", () => {
      sound.start();
      document.getElementById("fragments-hud").classList.remove("hidden");
      this.showStage("scene-m1-play");
      this.initMinigame1();
    });

    // 2. Avanzar de Recompensa 1 a Minijuego 2
    document.getElementById("btn-to-m2").addEventListener("click", () => {
      this.showStage("scene-m2-play");
      this.initMinigame2();
    });

    // 3. Avanzar de Recompensa 2 a Minijuego 3
    document.getElementById("btn-to-m3").addEventListener("click", () => {
      this.showStage("scene-m3-play");
      this.initMinigame3();
    });

    // 4. Avanzar de Recompensa 3 al Clímax (Pedestal)
    document.getElementById("btn-to-climax").addEventListener("click", () => {
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
  // ESTACIÓN 1: LINTERNA EN LA MAREA
  // ==================================================================
  initMinigame1() {
    const area = document.getElementById("flashlight-area");
    const canvas = document.getElementById("flashlight-canvas");
    const container = document.getElementById("lights-container");
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const rect = area.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      this.drawFlashlight(ctx, rect.width, rect.height);
    };

    window.addEventListener("resize", resizeCanvas);

    const positions = [
      { top: "25%", left: "22%" },
      { top: "30%", left: "76%" },
      { top: "72%", left: "32%" },
      { top: "68%", left: "78%" },
    ];

    container.innerHTML = "";
    config.minigame1.lights.forEach((light, i) => {
      const pos = positions[i] || { top: "50%", left: "50%" };
      const el = document.createElement("div");
      el.className = "hidden-light";
      el.id = `light-btn-${i}`;
      el.style.top = pos.top;
      el.style.left = pos.left;
      el.innerHTML = `<div class="light-spark"></div>`;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        this.revealLight(i, light, el);
      });

      container.appendChild(el);
    });

    const updateCoords = (clientX, clientY) => {
      const rect = area.getBoundingClientRect();
      this.flashlightPos.x = clientX - rect.left;
      this.flashlightPos.y = clientY - rect.top;
      this.isPointerInsideFlashlight = true;
      this.drawFlashlight(ctx, rect.width, rect.height);
    };

    area.addEventListener("mousemove", (e) => updateCoords(e.clientX, e.clientY));
    area.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    });
    area.addEventListener("touchstart", (e) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    setTimeout(() => {
      const rect = area.getBoundingClientRect();
      this.flashlightPos = { x: rect.width / 2, y: rect.height / 2 };
      this.isPointerInsideFlashlight = true;
      resizeCanvas();
    }, 120);

    // Cerrar modal de pensamiento
    document.getElementById("close-light-modal").addEventListener("click", () => {
      document.getElementById("light-modal").classList.add("hidden");
    });
  }

  drawFlashlight(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);

    // Oscuridad marina sobre las olas
    ctx.fillStyle = "rgba(2, 9, 20, 0.94)";
    ctx.fillRect(0, 0, w, h);

    if (!this.isPointerInsideFlashlight) return;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    const radius = Math.min(w, h) * 0.35;
    const grad = ctx.createRadialGradient(
      this.flashlightPos.x,
      this.flashlightPos.y,
      radius * 0.15,
      this.flashlightPos.x,
      this.flashlightPos.y,
      radius
    );
    grad.addColorStop(0, "rgba(0, 0, 0, 1)");
    grad.addColorStop(0.7, "rgba(0, 0, 0, 0.75)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.flashlightPos.x, this.flashlightPos.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  revealLight(index, lightData, element) {
    if (element.classList.contains("revealed")) return;

    element.classList.add("revealed");
    this.revealedLightsCount++;
    document.getElementById("lights-count").textContent = this.revealedLightsCount;

    sound.playChime(this.revealedLightsCount);

    document.getElementById("modal-light-title").textContent = lightData.label;
    document.getElementById("modal-light-phrase").textContent = lightData.phrase;
    document.getElementById("light-modal").classList.remove("hidden");

    if (this.revealedLightsCount >= config.minigame1.lights.length) {
      setTimeout(() => {
        document.getElementById("light-modal").classList.add("hidden");
        this.collectFragment(1);
        this.showStage("scene-m1-reward");
      }, 1100);
    }
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
          // Cambiar en la misma ventana a la Polaroid
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
  // ESTACIÓN 3: CONSTELACIÓN SOBRE EL MAR
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
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;

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
        // Cerrar el corazón uniendo la 7 con la 1
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
    line.setAttribute("x1", fromNode.x);
    line.setAttribute("y1", fromNode.y);
    line.setAttribute("x2", toNode.x);
    line.setAttribute("y2", toNode.y);
    svgLines.appendChild(line);
  }

  // ==================================================================
  // CLÍMAX: FUSIÓN DE FRAGMENTOS & CARTA
  // ==================================================================
  initClimaxPedestal() {
    const fuseBtn = document.getElementById("btn-fuse");
    fuseBtn.addEventListener("click", () => {
      fuseBtn.disabled = true;
      fuseBtn.textContent = "✦ Fusión en proceso... ✦";

      sound.playClimaxBurst();

      const pedestal = document.getElementById("fusion-pedestal");
      pedestal.classList.add("fusing");

      setTimeout(() => {
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#38bdf8", "#2dd4bf", "#f5d061", "#fb7185", "#ffffff"],
        });

        // Cambiar en la misma ventana a la Carta Romántica
        this.showStage("scene-climax-letter");
        this.startTypewriter();
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
    };

    skipBtn.onclick = finishTypewriter;

    this.typewriterInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        charIndex += 2;
        container.innerText = fullText.slice(0, charIndex);
      } else {
        finishTypewriter();
      }
    }, 25);
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

      const maxOffset = 50;
      const x = (Math.random() - 0.5) * maxOffset * 2;
      const y = (Math.random() - 0.5) * maxOffset;

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
