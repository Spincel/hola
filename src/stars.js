/**
 * ====================================================================
 * LIENZO CÓSMICO & MARINO (Estrellas, Luna, Olas de Aurora y Atardecer)
 * ====================================================================
 */

export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.stars = [];
    this.meteors = [];
    this.dust = [];
    this.width = 0;
    this.height = 0;
    this.animationFrame = null;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Escenografía dinámica: 'twilight' (anochecer), 'sunset' (atardecer), 'aurora' (mar boreal)
    this.currentTheme = "twilight";
    this.targetTheme = "twilight";
    this.themeTransition = 1.0;

    // Destello intenso al fusionar
    this.flashOpacity = 0.0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.createStars();
    this.createDust();
    this.animate();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);
  }

  createStars() {
    const count = Math.min(Math.floor((this.width * this.height) / 6500), 170);
    this.stars = [];

    const colors = [
      "rgba(255, 255, 255,",
      "rgba(253, 230, 138,", // Oro suave
      "rgba(56, 189, 248,",  // Cian bioluminiscente
      "rgba(243, 232, 255,", // Lavanda
      "rgba(254, 205, 211,", // Rosa tenue
    ];

    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.88, // Más concentradas en el cielo
        radius: Math.random() * 1.5 + 0.4,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  createDust() {
    const dustCount = Math.min(Math.floor(this.width / 45), 26);
    this.dust = [];
    for (let i = 0; i < dustCount; i++) {
      this.dust.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.25 - 0.05,
      });
    }
  }

  setTheme(themeName) {
    if (this.currentTheme !== themeName) {
      this.targetTheme = themeName;
      this.currentTheme = themeName;
    }
  }

  triggerFlash() {
    this.flashOpacity = 1.0;
  }

  spawnMeteor() {
    if (this.reducedMotion) return;
    if (Math.random() > 0.008 || this.meteors.length > 2) return;

    this.meteors.push({
      x: Math.random() * this.width * 0.8 + this.width * 0.1,
      y: Math.random() * this.height * 0.4,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 8 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      opacity: 1,
    });
  }

  // Dibuja el fondo dinámico según la fase (Atardecer, Anochecer u Océano Boreal)
  drawBackgroundSky() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);

    if (this.currentTheme === "sunset") {
      // Atardecer cálido en la playa: añil arriba, violeta y ámbar dorado abajo
      grad.addColorStop(0, "#081026");
      grad.addColorStop(0.45, "#1f1d46");
      grad.addColorStop(0.75, "#5b2649");
      grad.addColorStop(0.92, "#a04443");
      grad.addColorStop(1, "#d97736");
    } else if (this.currentTheme === "aurora") {
      // Noche marina con destellos boreales
      grad.addColorStop(0, "#020713");
      grad.addColorStop(0.5, "#061833");
      grad.addColorStop(0.8, "#082b4c");
      grad.addColorStop(1, "#0a3a5e");
    } else {
      // Twilight clásico
      grad.addColorStop(0, "#020817");
      grad.addColorStop(0.55, "#05162d");
      grad.addColorStop(0.9, "#092444");
      grad.addColorStop(1, "#0d3158");
    }

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // Dibuja la hermosa luna creciente con halo celestial
  drawMoon() {
    const x = this.width * 0.84;
    const y = Math.min(this.height * 0.14, 95);
    const radius = Math.min(this.width * 0.05, 24);

    // Halo lunar místico
    const halo = this.ctx.createRadialGradient(x, y, radius * 0.4, x, y, radius * 3.2);
    halo.addColorStop(0, "rgba(254, 240, 138, 0.28)");
    halo.addColorStop(0.4, "rgba(56, 189, 248, 0.15)");
    halo.addColorStop(1, "rgba(0, 0, 0, 0)");

    this.ctx.fillStyle = halo;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius * 3.2, 0, Math.PI * 2);
    this.ctx.fill();

    // Luna creciente plateada / dorada
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#fff8e7";
    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = "#fef08a";
    this.ctx.fill();

    // Sombra para recortar la media luna
    this.ctx.beginPath();
    this.ctx.arc(x - radius * 0.46, y - radius * 0.18, radius * 0.88, 0, Math.PI * 2);
    this.ctx.fillStyle = this.currentTheme === "sunset" ? "#1f1d46" : "#05162d";
    this.ctx.fill();
    this.ctx.restore();
  }

  // Dibuja las ondas de bioluminiscencia marina / aurora boreal sobre el agua
  drawBioluminescentWaves() {
    const time = performance.now() * 0.001;
    const baseY = this.height * 0.86;

    const layers = [
      {
        color: this.currentTheme === "sunset" ? "rgba(251, 146, 60, 0.25)" : "rgba(56, 189, 248, 0.22)",
        speed: 0.8,
        amp: 14,
        freq: 0.007,
        yOff: 0,
      },
      {
        color: this.currentTheme === "sunset" ? "rgba(244, 63, 94, 0.2)" : "rgba(45, 212, 191, 0.18)",
        speed: 1.1,
        amp: 18,
        freq: 0.005,
        yOff: 12,
      },
      {
        color: this.currentTheme === "sunset" ? "rgba(217, 119, 6, 0.16)" : "rgba(167, 139, 250, 0.15)",
        speed: 0.6,
        amp: 10,
        freq: 0.009,
        yOff: 24,
      },
    ];

    for (const w of layers) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);
      for (let x = 0; x <= this.width; x += 14) {
        const y = baseY + Math.sin(x * w.freq + time * w.speed) * w.amp + w.yOff;
        this.ctx.lineTo(x, y);
      }
      this.ctx.lineTo(this.width, this.height);
      this.ctx.closePath();
      this.ctx.fillStyle = w.color;
      this.ctx.fill();
    }
  }

  animate() {
    // 1. Cielo base dinámico
    this.drawBackgroundSky();

    // 2. Ondas de mar bioluminiscente / aurora
    this.drawBioluminescentWaves();

    // 3. Luna creciente
    this.drawMoon();

    // 4. Estrellas parpadeantes
    for (const star of this.stars) {
      if (!this.reducedMotion) {
        star.phase += star.twinkleSpeed;
      }
      const alpha = Math.max(0.12, Math.min(1, star.baseAlpha + Math.sin(star.phase) * 0.35));

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${star.colorBase} ${alpha})`;
      this.ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
      this.ctx.shadowColor = "#ffffff";
      this.ctx.fill();
    }
    this.ctx.shadowBlur = 0;

    // 5. Polvo estelar flotante
    for (const p of this.dust) {
      if (!this.reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = this.height + 5;
          p.x = Math.random() * this.width;
        }
        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 240, 200, ${p.alpha})`;
      this.ctx.fill();
    }

    // 6. Estrellas fugaces ocasionales
    this.spawnMeteor();
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      const endX = m.x - Math.cos(m.angle) * m.length;
      const endY = m.y - Math.sin(m.angle) * m.length;

      const grad = this.ctx.createLinearGradient(m.x, m.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
      grad.addColorStop(0.3, `rgba(254, 240, 138, ${m.opacity * 0.7})`);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      this.ctx.beginPath();
      this.ctx.moveTo(m.x, m.y);
      this.ctx.lineTo(endX, endY);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.8;
      this.ctx.stroke();

      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.opacity -= 0.02;

      if (m.opacity <= 0 || m.x > this.width + 100 || m.y > this.height + 100) {
        this.meteors.splice(i, 1);
      }
    }

    // 7. Destello intenso al unir los fragmentos
    if (this.flashOpacity > 0.01) {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.flashOpacity})`;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.flashOpacity -= 0.025; // Se desvanece suavemente
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
