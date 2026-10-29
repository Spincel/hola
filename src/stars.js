/**
 * ====================================================================
 * LIENZO MÁGICO DINÁMICO: ANDÉN 9 ¾, EL SAUCE, HOGWARTS Y EL PATRONUS
 * ====================================================================
 * Transporta en cada escena a un lugar icónico del mundo de Harry Potter:
 * - 'platform934': Andén 9 ¾ con vapor de tren, faroles victorianos y ladrillo.
 * - 'whompingWillow': El Sauce Boxeador, bosque de pinos, lluvia y niebla.
 * - 'greatHall': El Gran Comedor con velas flotantes y silueta del Castillo.
 * - 'patronusCabin': El resplandor plateado del Patronus y la chimenea de la cabaña.
 */

export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 0;
    this.height = 0;
    this.animationFrame = null;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Escenografía activa: 'platform934', 'whompingWillow', 'greatHall', 'patronusCabin'
    this.currentTheme = "platform934";
    this.flashOpacity = 0.0;
    this.time = 0;

    // Partículas y elementos interactivos
    this.raindrops = [];
    this.splashes = [];
    this.floatingCandles = [];
    this.steamClouds = [];
    this.sparks = [];
    this.pines = [];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.createRaindrops();
    this.createCandles();
    this.createSteam();
    this.createSparks();
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

  setTheme(themeName) {
    this.currentTheme = themeName;
  }

  triggerFlash() {
    this.flashOpacity = 1.0;
  }

  // 1. Gotas de lluvia sutiles y tenues
  createRaindrops() {
    // Muy pocas gotas para mantener la vista limpia, relajante y nada enfadosa (máximo 22)
    const count = Math.min(Math.floor(this.width / 40), 22);
    this.raindrops = [];
    for (let i = 0; i < count; i++) {
      this.raindrops.push({
        x: Math.random() * (this.width + 60) - 30,
        y: Math.random() * this.height,
        length: Math.random() * 8 + 5,
        speed: Math.random() * 2 + 2,
        opacity: Math.random() * 0.06 + 0.025,
        thickness: 0.5,
      });
    }
  }

  // 2. Velas flotantes para El Gran Comedor
  createCandles() {
    const count = Math.min(Math.floor(this.width / 38), 24);
    this.floatingCandles = [];
    for (let i = 0; i < count; i++) {
      this.floatingCandles.push({
        x: Math.random() * (this.width - 60) + 30,
        y: Math.random() * (this.height * 0.45) + 35,
        width: 6,
        height: Math.random() * 16 + 18,
        baseY: 0,
        floatSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        flicker: Math.random() * 0.3 + 0.7,
      });
    }
    this.floatingCandles.forEach(c => c.baseY = c.y);
  }

  // 3. Vapor de tren para el Andén 9 ¾
  createSteam() {
    const count = 18;
    this.steamClouds = [];
    for (let i = 0; i < count; i++) {
      this.steamClouds.push({
        x: Math.random() * this.width,
        y: this.height - Math.random() * 180,
        radius: Math.random() * 60 + 40,
        alpha: Math.random() * 0.2 + 0.05,
        vx: Math.random() * 0.4 + 0.2,
        vy: -Math.random() * 0.25 - 0.1,
      });
    }
  }

  // 4. Chispas doradas / mágicas
  createSparks() {
    const count = 28;
    this.sparks = [];
    for (let i = 0; i < count; i++) {
      this.sparks.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.01,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.4 - 0.1,
      });
    }
  }

  // 5. Siluetas de árboles y pinos
  createPines() {
    const count = Math.ceil(this.width / 50) + 4;
    this.pines = [];
    for (let i = 0; i < count; i++) {
      const x = (i - 1) * 50 + (Math.random() - 0.5) * 15;
      const treeHeight = Math.random() * 70 + 80;
      const width = Math.random() * 20 + 35;
      this.pines.push({ x, height: treeHeight, width });
    }
  }

  // Dibuja el fondo de la escena activa
  drawBackground() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);

    if (this.currentTheme === "platform934") {
      // Andén 9 ¾: Noche victoriana mística, ladrillo oscuro y faroles dorados
      grad.addColorStop(0, "#05070f");
      grad.addColorStop(0.5, "#0d131f");
      grad.addColorStop(0.85, "#241812"); // Toque ladrillo
      grad.addColorStop(1, "#3f2714");    // Calidez del farol
    } else if (this.currentTheme === "whompingWillow") {
      // Sauce Boxeador & Bosque Prohibido: Niebla profunda de pinos y lluvia
      grad.addColorStop(0, "#020806");
      grad.addColorStop(0.5, "#061811");
      grad.addColorStop(0.85, "#0b261b");
      grad.addColorStop(1, "#123828");
    } else if (this.currentTheme === "greatHall") {
      // El Gran Comedor / Castillo: Cielo estrellado encantado y luz de velas
      grad.addColorStop(0, "#030612");
      grad.addColorStop(0.4, "#08142c");
      grad.addColorStop(0.75, "#181d38");
      grad.addColorStop(1, "#2e2118");    // Resplandor dorado de los ventanales
    } else {
      // Patronus & Cabaña: Resplandor plateado celestial arriba y chimenea cálida abajo
      grad.addColorStop(0, "#030914");
      grad.addColorStop(0.35, "#09192f"); // Luz plateada del Patronus
      grad.addColorStop(0.7, "#16221c");
      grad.addColorStop(1, "#3a2210");    // Fuego de la chimenea
    }

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // Dibuja el Castillo de Hogwarts en la distancia (para la escena de Gran Comedor)
  drawHogwartsSilhouette() {
    if (this.currentTheme !== "greatHall") return;

    this.ctx.save();
    this.ctx.fillStyle = "rgba(4, 8, 20, 0.7)";
    const baseY = this.height * 0.88;
    const startX = this.width * 0.55;

    // Silueta estilizada de torres y almenas de Hogwarts
    this.ctx.beginPath();
    this.ctx.moveTo(startX, baseY);
    // Gran Torre
    this.ctx.lineTo(startX + 30, baseY - 90);
    this.ctx.lineTo(startX + 40, baseY - 140); // Espira alta
    this.ctx.lineTo(startX + 50, baseY - 90);
    this.ctx.lineTo(startX + 80, baseY - 70);
    // Torre de Astronomía
    this.ctx.lineTo(startX + 100, baseY - 160);
    this.ctx.lineTo(startX + 115, baseY - 160);
    this.ctx.lineTo(startX + 130, baseY - 80);
    // Muro almenado
    this.ctx.lineTo(startX + 170, baseY - 50);
    this.ctx.lineTo(startX + 220, baseY - 60);
    this.ctx.lineTo(startX + 230, baseY);
    this.ctx.closePath();
    this.ctx.fill();

    // Ventanas doradas encendidas en el castillo
    this.ctx.fillStyle = "rgba(254, 240, 138, 0.75)";
    this.ctx.fillRect(startX + 42, baseY - 80, 5, 8);
    this.ctx.fillRect(startX + 105, baseY - 130, 4, 7);
    this.ctx.fillRect(startX + 112, baseY - 100, 4, 7);
    this.ctx.fillRect(startX + 160, baseY - 40, 5, 5);

    this.ctx.restore();
  }

  // Dibuja el Sauce Boxeador en la escena del Bosque
  drawWhompingWillow() {
    if (this.currentTheme !== "whompingWillow") return;

    this.ctx.save();
    this.ctx.strokeStyle = "rgba(4, 15, 10, 0.85)";
    this.ctx.lineWidth = 14;
    this.ctx.lineCap = "round";

    const treeX = this.width * 0.15;
    const baseY = this.height;

    // Tronco retorcido
    this.ctx.beginPath();
    this.ctx.moveTo(treeX, baseY);
    this.ctx.bezierCurveTo(treeX - 20, baseY - 60, treeX + 30, baseY - 110, treeX, baseY - 150);
    this.ctx.stroke();

    // Ramas ondulantes con el viento
    const sway = Math.sin(this.time * 0.8) * 8;
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(treeX, baseY - 150);
    this.ctx.quadraticCurveTo(treeX - 50 + sway, baseY - 180, treeX - 70 + sway, baseY - 130);
    this.ctx.moveTo(treeX, baseY - 150);
    this.ctx.quadraticCurveTo(treeX + 40 - sway, baseY - 190, treeX + 75 - sway, baseY - 140);
    this.ctx.moveTo(treeX, baseY - 150);
    this.ctx.quadraticCurveTo(treeX - 10, baseY - 200, treeX - 25 + sway, baseY - 240);
    this.ctx.stroke();

    this.ctx.restore();
  }

  // Dibuja el resplandor místico plateado del ciervo Patronus
  drawPatronusGlow() {
    if (this.currentTheme !== "patronusCabin") return;

    this.ctx.save();
    const px = this.width * 0.82;
    const py = Math.min(this.height * 0.22, 140);
    const pulse = Math.sin(this.time * 1.2) * 12;

    // Halo místico de energía plateada
    const grad = this.ctx.createRadialGradient(px, py, 10, px, py, 110 + pulse);
    grad.addColorStop(0, "rgba(224, 242, 254, 0.75)");
    grad.addColorStop(0.35, "rgba(186, 230, 253, 0.4)");
    grad.addColorStop(0.7, "rgba(125, 211, 252, 0.15)");
    grad.addColorStop(1, "rgba(56, 189, 248, 0)");

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(px, py, 110 + pulse, 0, Math.PI * 2);
    this.ctx.fill();

    // Silueta elegante de cornamenta plateada
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(px - 14, py - 6);
    this.ctx.quadraticCurveTo(px - 25, py - 24, px - 35, py - 40);
    this.ctx.moveTo(px - 25, py - 24);
    this.ctx.lineTo(px - 20, py - 35);

    this.ctx.moveTo(px + 14, py - 6);
    this.ctx.quadraticCurveTo(px + 25, py - 24, px + 35, py - 40);
    this.ctx.moveTo(px + 25, py - 24);
    this.ctx.lineTo(px + 20, py - 35);
    this.ctx.stroke();

    this.ctx.restore();
  }

  // Dibuja el vapor del tren en el Andén 9 ¾
  drawSteam() {
    if (this.currentTheme !== "platform934" || this.reducedMotion) return;

    this.ctx.save();
    this.steamClouds.forEach((cloud) => {
      const grad = this.ctx.createRadialGradient(
        cloud.x,
        cloud.y,
        0,
        cloud.x,
        cloud.y,
        cloud.radius
      );
      grad.addColorStop(0, `rgba(254, 243, 199, ${cloud.alpha})`);
      grad.addColorStop(0.5, `rgba(214, 211, 209, ${cloud.alpha * 0.6})`);
      grad.addColorStop(1, "rgba(214, 211, 209, 0)");

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
      this.ctx.fill();

      cloud.x += cloud.vx;
      cloud.y += cloud.vy;

      if (cloud.y < this.height - 240 || cloud.x > this.width + cloud.radius) {
        cloud.x = Math.random() * (this.width * 0.6);
        cloud.y = this.height - Math.random() * 80;
      }
    });
    this.ctx.restore();
  }

  // Dibuja las velas flotantes de El Gran Comedor
  drawCandles() {
    if (this.currentTheme !== "greatHall") return;

    this.ctx.save();
    this.floatingCandles.forEach((c) => {
      // Oscilación suave
      c.phase += c.floatSpeed;
      c.y = c.baseY + Math.sin(c.phase) * 6;
      c.flicker = Math.sin(this.time * 6 + c.phase) * 0.15 + 0.85;

      // Cuerpo blanco de la vela
      this.ctx.fillStyle = "rgba(254, 243, 199, 0.85)";
      this.ctx.fillRect(c.x - c.width / 2, c.y, c.width, c.height);

      // Mecha
      this.ctx.strokeStyle = "#444";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(c.x, c.y);
      this.ctx.lineTo(c.x, c.y - 3);
      this.ctx.stroke();

      // Llama de la vela con resplandor dorado
      const flameGrad = this.ctx.createRadialGradient(
        c.x,
        c.y - 8,
        1,
        c.x,
        c.y - 8,
        12 * c.flicker
      );
      flameGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
      flameGrad.addColorStop(0.3, "rgba(254, 240, 138, 0.9)");
      flameGrad.addColorStop(0.7, "rgba(245, 158, 11, 0.4)");
      flameGrad.addColorStop(1, "rgba(245, 158, 11, 0)");

      this.ctx.fillStyle = flameGrad;
      this.ctx.beginPath();
      this.ctx.arc(c.x, c.y - 8, 12 * c.flicker, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.restore();
  }

  // Lluvia muy tenue, delicada y relajante (sin interferir en el Gran Comedor interior)
  drawRain() {
    if (this.reducedMotion || this.currentTheme === "greatHall") return;

    this.ctx.save();
    const wind = 0.08;

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

      if (drop.y > this.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * (this.width + 60) - 30;
      }
    });

    this.ctx.restore();
  }

  // Chispas doradas mágicas flotando
  drawSparks() {
    this.sparks.forEach((s) => {
      s.phase += s.speed;
      const alpha = s.alpha + Math.sin(s.phase) * 0.25;

      s.x += s.vx;
      s.y += s.vy;

      if (s.y < 0) s.y = this.height;
      if (s.x < 0) s.x = this.width;
      if (s.x > this.width) s.x = 0;

      this.ctx.fillStyle = `rgba(253, 224, 71, ${Math.max(0.1, alpha)})`;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  // Destello supernova / giratiempo
  drawFlash() {
    if (this.flashOpacity <= 0) return;

    this.ctx.save();
    const grad = this.ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      20,
      this.width / 2,
      this.height / 2,
      this.width * 0.85
    );
    grad.addColorStop(0, `rgba(255, 255, 255, ${this.flashOpacity})`);
    grad.addColorStop(0.35, `rgba(254, 240, 138, ${this.flashOpacity * 0.9})`);
    grad.addColorStop(0.7, `rgba(245, 158, 11, ${this.flashOpacity * 0.6})`);
    grad.addColorStop(1, `rgba(5, 7, 15, ${this.flashOpacity * 0.3})`);

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();

    this.flashOpacity -= 0.022;
  }

  animate() {
    this.time += 0.02;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawBackground();
    this.drawHogwartsSilhouette();
    this.drawWhompingWillow();
    this.drawPatronusGlow();
    this.drawCandles();
    this.drawSteam();
    this.drawRain();
    this.drawSparks();
    this.drawFlash();

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
