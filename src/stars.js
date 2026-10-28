/**
 * ====================================================================
 * LIENZO CÓSMICO (Canvas de Estrellas, Nebulosa y Polvo Estelar)
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
    const count = Math.min(Math.floor((this.width * this.height) / 7000), 160);
    this.stars = [];

    const colors = [
      "rgba(255, 255, 255,",
      "rgba(253, 230, 138,", // Oro suave
      "rgba(224, 231, 255,", // Azul pálido
      "rgba(243, 232, 255,", // Lavanda
      "rgba(254, 205, 211,", // Rosa tenue
    ];

    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.4,
        baseAlpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  createDust() {
    const dustCount = Math.min(Math.floor(this.width / 40), 30);
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

  spawnMeteor() {
    if (this.reducedMotion) return;
    if (Math.random() > 0.007 || this.meteors.length > 2) return;

    this.meteors.push({
      x: Math.random() * this.width * 0.8 + this.width * 0.1,
      y: Math.random() * this.height * 0.4,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 8 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      opacity: 1,
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Dibujar estrellas parpadeantes
    for (const star of this.stars) {
      if (!this.reducedMotion) {
        star.phase += star.twinkleSpeed;
      }
      const alpha = Math.max(0.1, Math.min(1, star.baseAlpha + Math.sin(star.phase) * 0.35));

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${star.colorBase} ${alpha})`;
      this.ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
      this.ctx.shadowColor = "#ffffff";
      this.ctx.fill();
    }
    this.ctx.shadowBlur = 0;

    // 2. Dibujar polvo estelar flotante
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
      this.ctx.fillStyle = `rgba(255, 230, 200, ${p.alpha})`;
      this.ctx.fill();
    }

    // 3. Estrellas fugaces ocasionales
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

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
