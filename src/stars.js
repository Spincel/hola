/**
 * ====================================================================
 * LIENZO DEL BOSQUE, LLUVIA & LUCIÉRNAGAS ✦
 * ====================================================================
 * Representa una atmósfera inmersiva de bosque de pinos, lluvia suave,
 * neblina envolvente y cálidas luciérnagas doradas con el resplandor
 * de una cabaña acogedora.
 */

export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.raindrops = [];
    this.splashes = [];
    this.fireflies = [];
    this.pines = [];
    this.width = 0;
    this.height = 0;
    this.animationFrame = null;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Escenografía temática: 'misty' (neblina), 'rainy' (lluvia fresca), 'cozy' (cabaña y chimenea)
    this.currentTheme = "misty";
    this.targetTheme = "misty";
    this.flashOpacity = 0.0;
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.createRaindrops();
    this.createFireflies();
    this.createPines();
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
    this.createPines();
  }

  createRaindrops() {
    const count = Math.min(Math.floor(this.width / 8), 110);
    this.raindrops = [];
    for (let i = 0; i < count; i++) {
      this.raindrops.push({
        x: Math.random() * (this.width + 100) - 50,
        y: Math.random() * this.height,
        length: Math.random() * 22 + 12,
        speed: Math.random() * 8 + 10,
        opacity: Math.random() * 0.35 + 0.15,
        thickness: Math.random() * 0.8 + 0.6,
      });
    }
  }

  createFireflies() {
    const count = Math.min(Math.floor(this.width / 35), 32);
    this.fireflies = [];
    for (let i = 0; i < count; i++) {
      this.fireflies.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.85 + this.height * 0.1,
        radius: Math.random() * 2.2 + 1.2,
        baseAlpha: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  createPines() {
    // Genera siluetas de pinos en el horizonte inferior
    const count = Math.ceil(this.width / 55) + 4;
    this.pines = [];
    for (let i = 0; i < count; i++) {
      const x = (i - 1) * 55 + (Math.random() - 0.5) * 20;
      const treeHeight = Math.random() * 65 + 85;
      const width = Math.random() * 20 + 35;
      this.pines.push({ x, height: treeHeight, width });
    }
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    this.targetTheme = themeName;
  }

  triggerFlash() {
    this.flashOpacity = 1.0;
  }

  drawBackgroundForest() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);

    if (this.currentTheme === "cozy") {
      // Cabaña acogedora: noche verde profundo arriba y resplandor cálido de chimenea abajo
      grad.addColorStop(0, "#020a07");
      grad.addColorStop(0.5, "#081c14");
      grad.addColorStop(0.8, "#1a2517");
      grad.addColorStop(1, "#382312"); // Resplandor dorado de madera y fuego
    } else if (this.currentTheme === "rainy") {
      // Lluvia fresca y niebla en el bosque
      grad.addColorStop(0, "#020807");
      grad.addColorStop(0.5, "#051610");
      grad.addColorStop(0.82, "#0a261c");
      grad.addColorStop(1, "#103326");
    } else {
      // Misty / Bosque nocturno con pinos
      grad.addColorStop(0, "#020907");
      grad.addColorStop(0.6, "#061b13");
      grad.addColorStop(0.9, "#0b281d");
      grad.addColorStop(1, "#0f3527");
    }

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawPineSilhouette() {
    const baseY = this.height;
    this.ctx.save();
    this.ctx.fillStyle = "rgba(1, 10, 7, 0.75)";

    this.pines.forEach((pine) => {
      const topY = baseY - pine.height;
      this.ctx.beginPath();
      this.ctx.moveTo(pine.x, topY);
      this.ctx.lineTo(pine.x + pine.width / 2, baseY);
      this.ctx.lineTo(pine.x - pine.width / 2, baseY);
      this.ctx.closePath();
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  drawRain() {
    if (this.reducedMotion) return;

    this.ctx.save();
    const wind = 0.12; // Leve inclinación por la brisa

    this.raindrops.forEach((drop) => {
      this.ctx.strokeStyle = `rgba(186, 230, 253, ${drop.opacity})`;
      this.ctx.lineWidth = drop.thickness;
      this.ctx.lineCap = "round";

      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x + wind * drop.length, drop.y + drop.length);
      this.ctx.stroke();

      drop.y += drop.speed;
      drop.x += wind * drop.speed;

      // Al tocar el fondo, crear un suave salpicado y reiniciar arriba
      if (drop.y > this.height) {
        if (Math.random() < 0.25 && this.splashes.length < 15) {
          this.splashes.push({
            x: drop.x,
            y: this.height - 4,
            radius: 1,
            maxRadius: Math.random() * 4 + 2,
            alpha: 0.35,
          });
        }
        drop.y = -drop.length;
        drop.x = Math.random() * (this.width + 100) - 50;
      }
    });

    // Dibujar pequeñas ondas de lluvia al caer
    for (let i = this.splashes.length - 1; i >= 0; i--) {
      const s = this.splashes[i];
      this.ctx.strokeStyle = `rgba(186, 230, 253, ${s.alpha})`;
      this.ctx.lineWidth = 0.8;
      this.ctx.beginPath();
      this.ctx.ellipse(s.x, s.y, s.radius * 1.5, s.radius * 0.6, 0, 0, Math.PI * 2);
      this.ctx.stroke();

      s.radius += 0.4;
      s.alpha -= 0.04;
      if (s.alpha <= 0) {
        this.splashes.splice(i, 1);
      }
    }

    this.ctx.restore();
  }

  drawFireflies() {
    this.time += 0.02;

    this.fireflies.forEach((f) => {
      f.phase += f.pulseSpeed;
      const currentAlpha = f.baseAlpha + Math.sin(f.phase) * 0.35;
      const alpha = Math.max(0.08, Math.min(0.95, currentAlpha));

      // Movimiento errático y suave de luciérnaga
      f.x += f.vx + Math.sin(this.time + f.phase) * 0.3;
      f.y += f.vy + Math.cos(this.time + f.phase) * 0.25;

      // Rebotar en los bordes
      if (f.x < 10) f.x = this.width - 10;
      if (f.x > this.width - 10) f.x = 10;
      if (f.y < 20) f.y = this.height - 30;
      if (f.y > this.height - 20) f.y = 30;

      // Resplandor cálido dorado
      const glowGrad = this.ctx.createRadialGradient(
        f.x,
        f.y,
        0,
        f.x,
        f.y,
        f.radius * 4
      );
      glowGrad.addColorStop(0, `rgba(254, 240, 138, ${alpha})`);
      glowGrad.addColorStop(0.35, `rgba(245, 158, 11, ${alpha * 0.6})`);
      glowGrad.addColorStop(1, "rgba(245, 158, 11, 0)");

      this.ctx.fillStyle = glowGrad;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius * 4, 0, Math.PI * 2);
      this.ctx.fill();

      // Núcleo brillante
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius * 0.7, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawFlash() {
    if (this.flashOpacity <= 0) return;

    this.ctx.save();
    // Destello dorado de chimenea y fuego
    const grad = this.ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      20,
      this.width / 2,
      this.height / 2,
      this.width * 0.8
    );
    grad.addColorStop(0, `rgba(255, 255, 255, ${this.flashOpacity})`);
    grad.addColorStop(0.35, `rgba(254, 240, 138, ${this.flashOpacity * 0.9})`);
    grad.addColorStop(0.7, `rgba(245, 158, 11, ${this.flashOpacity * 0.6})`);
    grad.addColorStop(1, `rgba(6, 26, 20, ${this.flashOpacity * 0.3})`);

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();

    this.flashOpacity -= 0.025;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawBackgroundForest();
    this.drawPineSilhouette();
    this.drawRain();
    this.drawFireflies();
    this.drawFlash();

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
