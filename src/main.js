/**
 * ====================================================================
 * CONTROLADOR PRINCIPAL: ENSAMBLANDO LA CONSTELACIÓN
 * ====================================================================
 */

import confetti from "canvas-confetti";
import { config } from "./config.js";
import { sound } from "./audio.js";
import { Starfield } from "./stars.js";

class ConstellationApp {
  constructor() {
    this.starfield = null;
    this.currentPhase = "intro";
    this.collectedFragments = new Set();

    // Estado Minijuego 1 (Luces)
    this.revealedLightsCount = 0;
    this.flashlightPos = { x: 0, y: 0 };
    this.isPointerInsideFlashlight = false;

    // Estado Minijuego 2 (Trivia)
    this.currentTriviaIndex = 0;

    // Estado Minijuego 3 (Constelación)
    this.currentConstellationStep = 1;
    this.constellationNodes = [
      { id: 1, x: 155, y: 85, label: "1" },
      { id: 2, x: 80, y: 155, label: "2" },
      { id: 3, x: 125, y: 245, label: "3" },
      { id: 4, x: 200, y: 325, label: "4" },
      { id: 5, x: 275, y: 245, label: "5" },
      { id: 6, x: 320, y: 155, label: "6" },
      { id: 7, x: 245, y: 85, label: "7" },
    ];

    // Estado Carrusel
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

    // 2. Personalizar textos iniciales desde config
    this.applyConfig();

    // 3. Vincular eventos globales
    this.bindEvents();
  }

  applyConfig() {
    // Título y textos de la intro
    document.getElementById("intro-badge").textContent = config.intro.badge;
    document.getElementById("intro-title").textContent = config.intro.title;
    document.getElementById("intro-subtitle").textContent = config.intro.subtitle;
    document.getElementById("intro-start-btn-text").textContent = config.intro.startButtonText;
    document.getElementById("intro-headphones").querySelector("span:last-child").textContent =
      config.intro.headphonesNotice;

    // Carta final
    document.getElementById("letter-salutation").textContent =
      config.climax.letter.salutation.replace("la persona más especial", config.partnerName || "ti");
    document.getElementById("letter-closing").textContent = config.climax.letter.closing;
    document.getElementById("letter-author").textContent = config.yourName;

    // Pregunta final
    document.getElementById("final-question").textContent = config.climax.finalQuestion;
    document.getElementById("btn-yes-text").textContent = config.climax.yesButtonText;
    document.getElementById("btn-no-text").textContent = config.climax.noButtonText;

    // Modal de celebración
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

  bindEvents() {
    // Botón de audio flotante
    const audioBtn = document.getElementById("audio-toggle-btn");
    audioBtn.addEventListener("click", () => {
      const isMuted = sound.toggleMute();
      audioBtn.classList.toggle("muted", isMuted);
      audioBtn.querySelector(".audio-icon").textContent = isMuted ? "🔇" : "🎵";
    });

    // Botón comenzar viaje (Fase 0 -> Fase 1)
    document.getElementById("start-btn").addEventListener("click", () => {
      sound.start();
      document.getElementById("fragments-hud").classList.remove("hidden");
      this.switchPhase("phase-minigame1");
      this.initMinigame1();
    });

    // Transición Fase 1 -> Fase 2
    document.getElementById("next-to-phase2").addEventListener("click", () => {
      this.switchPhase("phase-minigame2");
      this.initMinigame2();
    });

    // Transición Fase 2 -> Fase 3
    document.getElementById("next-to-phase3").addEventListener("click", () => {
      this.switchPhase("phase-minigame3");
      this.initMinigame3();
    });

    // Transición Fase 3 -> Fase 4
    document.getElementById("next-to-phase4").addEventListener("click", () => {
      this.switchPhase("phase-climax");
      this.initMinigame4();
    });
  }

  switchPhase(phaseId) {
    document.querySelectorAll(".phase-section").forEach((sec) => {
      sec.classList.remove("active");
    });
    const nextSec = document.getElementById(phaseId);
    if (nextSec) {
      nextSec.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  collectFragment(id) {
    if (this.collectedFragments.has(id)) return;
    this.collectedFragments.add(id);

    const slot = document.getElementById(`slot-${id}`);
    if (slot) {
      slot.classList.add("collected");
    }

    sound.playRewardChord();

    // Pequeña lluvia de confeti estelar
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.15 },
      colors: ["#f5d061", "#ffffff", "#ff8fa3", "#c084fc"],
      ticks: 180,
    });
  }

  // ==================================================================
  // FASE 1: MINIJUEGO 1 (ENCUENTRA LAS LUCES)
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

    // Posiciones estratégicas para las 4 luces en porcentaje (%)
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

    // Posición inicial centrada
    setTimeout(() => {
      const rect = area.getBoundingClientRect();
      this.flashlightPos = { x: rect.width / 2, y: rect.height / 2 };
      this.isPointerInsideFlashlight = true;
      resizeCanvas();
    }, 100);

    // Modal cerrar
    document.getElementById("close-light-modal").addEventListener("click", () => {
      document.getElementById("light-modal").classList.add("hidden");
    });
  }

  drawFlashlight(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);

    // Fondo oscuro completo
    ctx.fillStyle = "rgba(4, 7, 18, 0.94)";
    ctx.fillRect(0, 0, w, h);

    if (!this.isPointerInsideFlashlight) return;

    // Máscara de haz de linterna usando corte transparente
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    const radius = Math.min(w, h) * 0.32;
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

    // Mostrar modal con pensamiento
    document.getElementById("modal-light-title").textContent = lightData.label;
    document.getElementById("modal-light-phrase").textContent = lightData.phrase;
    document.getElementById("light-modal").classList.remove("hidden");

    if (this.revealedLightsCount >= config.minigame1.lights.length) {
      setTimeout(() => {
        document.getElementById("station1-reward").classList.remove("hidden");
        this.collectFragment(1);
      }, 700);
    }
  }

  // ==================================================================
  // FASE 2: MINIJUEGO 2 (CUESTIONARIO DE CÓMPLICES)
  // ==================================================================
  initMinigame2() {
    this.currentTriviaIndex = 0;
    this.renderTriviaQuestion();

    document.getElementById("next-question-btn").addEventListener("click", () => {
      this.currentTriviaIndex++;
      if (this.currentTriviaIndex < config.minigame2.questions.length) {
        document.getElementById("polaroid-reveal").classList.add("hidden");
        document.getElementById("trivia-card").classList.remove("hidden");
        this.renderTriviaQuestion();
      } else {
        // Fin de la trivia
        document.getElementById("polaroid-reveal").classList.add("hidden");
        document.getElementById("trivia-card").classList.add("hidden");
        document.getElementById("station2-reward").classList.remove("hidden");
        this.collectFragment(2);
      }
    });
  }

  renderTriviaQuestion() {
    const qData = config.minigame2.questions[this.currentTriviaIndex];
    const total = config.minigame2.questions.length;

    // Actualizar barra de progreso
    const progressPercent = ((this.currentTriviaIndex + 1) / total) * 100;
    document.getElementById("trivia-progress-bar").style.width = `${progressPercent}%`;

    document.getElementById("question-step").textContent = `Pregunta ${this.currentTriviaIndex + 1} de ${total}`;
    document.getElementById("question-text").textContent = qData.question;

    const feedbackEl = document.getElementById("trivia-feedback");
    feedbackEl.classList.add("hidden");

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    qData.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "trivia-option";
      btn.innerHTML = `<span class="opt-bullet">✧</span> <span>${opt.text}</span>`;

      btn.addEventListener("click", () => {
        if (opt.correct) {
          sound.playChime(3);
          // Ocultar tarjeta y mostrar polaroid
          document.getElementById("trivia-card").classList.add("hidden");

          const polaroidWrap = document.getElementById("polaroid-reveal");
          document.getElementById("polaroid-img").src = qData.photo;
          document.getElementById("polaroid-caption").textContent = qData.photoCaption;
          polaroidWrap.classList.remove("hidden");
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
  // FASE 3: MINIJUEGO 3 (CONECTAR LA CONSTELACIÓN)
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
        // Cerrar el corazón uniendo la última estrella con la primera
        const lastNode = this.constellationNodes[this.constellationNodes.length - 1];
        const firstNode = this.constellationNodes[0];
        this.drawConstellationLine(lastNode, firstNode);

        document.getElementById("next-star-num").textContent = "✓ ¡Lista!";

        setTimeout(() => {
          document.getElementById("station3-reward").classList.remove("hidden");
          this.collectFragment(3);
          setTimeout(() => this.collectFragment(4), 500);
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
  // FASE 4: EL CLÍMAX (FUSIÓN, CARTA Y GRAN PREGUNTA)
  // ==================================================================
  initMinigame4() {
    const fuseBtn = document.getElementById("fuse-btn");
    fuseBtn.addEventListener("click", () => {
      fuseBtn.disabled = true;
      fuseBtn.textContent = "✦ Fusión en proceso... ✦";

      sound.playClimaxBurst();

      const pedestal = document.getElementById("fusion-pedestal");
      pedestal.classList.add("fusing");

      setTimeout(() => {
        // Explosión de confeti dorado y de colores
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#f5d061", "#ff8fa3", "#c084fc", "#38bdf8", "#ffffff"],
        });

        // Ocultar pedestal y revelar carta
        document.getElementById("fusion-stage").classList.add("hidden");
        const revStage = document.getElementById("revelation-stage");
        revStage.classList.remove("hidden");

        this.startTypewriter();
        this.initCarousel();
        this.initPlayfulNoButton();
      }, 1600);
    });

    // Botón "¡Sí!"
    document.getElementById("btn-yes").addEventListener("click", () => {
      this.triggerYesCelebration();
    });

    // Guardar captura
    document.getElementById("btn-download-capture").addEventListener("click", () => {
      window.print();
    });
  }

  startTypewriter() {
    const container = document.getElementById("letter-body");
    const skipBtn = document.getElementById("skip-typewriter-btn");
    container.innerHTML = "";
    skipBtn.classList.remove("hidden");

    const paragraphs = config.climax.letter.paragraphs;
    let fullHtml = paragraphs.map((p) => `<p>${p}</p>`).join("");

    let charIndex = 0;
    const fullText = paragraphs.join("\n\n");

    skipBtn.onclick = () => {
      clearInterval(this.typewriterInterval);
      container.innerHTML = fullHtml;
      skipBtn.classList.add("hidden");
    };

    this.typewriterInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        charIndex += 2;
        const currentSlice = fullText.slice(0, charIndex);
        container.innerText = currentSlice;
      } else {
        clearInterval(this.typewriterInterval);
        container.innerHTML = fullHtml;
        skipBtn.classList.add("hidden");
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

    prevBtn.addEventListener("click", () => {
      this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
      this.updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      this.currentSlide = (this.currentSlide + 1) % slides.length;
      this.updateCarousel();
    });
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

      // Desplazamiento aleatorio divertido
      const maxOffset = 60;
      const x = (Math.random() - 0.5) * maxOffset * 2;
      const y = (Math.random() - 0.5) * maxOffset;

      btnNo.style.transform = `translate(${x}px, ${y}px)`;
    };

    btnNo.addEventListener("mouseenter", dodgeButton);
    btnNo.addEventListener("touchstart", (e) => {
      e.preventDefault();
      dodgeButton();
    });
    btnNo.addEventListener("click", (e) => {
      e.preventDefault();
      dodgeButton();
    });
  }

  triggerYesCelebration() {
    sound.playCelebrationFanfare();

    // Lluvia masiva de corazones y estrellas
    const duration = 4000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f43f5e", "#ff8fa3", "#f5d061"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f43f5e", "#ff8fa3", "#f5d061"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      document.getElementById("celebration-modal").classList.remove("hidden");
    }, 600);
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const app = new ConstellationApp();
  app.init();
});
