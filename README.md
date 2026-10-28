# ✦ Ensamblando la Constelación ✦
### *Un viaje interactivo y cápsula del tiempo de recuerdos*

Una experiencia web interactiva, delicada y cinematográfica diseñada para sorprender a esa persona especial. Planteado como un misterio lúdico («El Mensaje Fragmentado»), donde debe superar 3 estaciones interactivas (minijuegos) para reunir 4 fragmentos estelares y revelar la carta final.

---

## 🌌 Estructura de la Experiencia

1. **Fase 0: Introducción & Ambiente**
   - Música celestial suave (sintetizada en vivo con Web Audio API o tu propia canción MP3).
   - Cielo nocturno con estrellas parpadeantes y polvo cósmico flotante.
   - Mensaje intrigante: *"Hay un mensaje que se fragmentó en el camino hacia ti..."*.

2. **Estación 1: Minijuego «Encuentra las Luces Ocultas»**
   - Pantalla nocturna con efecto de linterna (funciona con el dedo en móvil o cursor en PC).
   - 4 destellos escondidos que al tocar revelan frases sobre lo que ilumina en tu vida.
   - Recompensa: **Fragmento 1 (Luz de la Mirada)** + Poema de la estación.

3. **Estación 2: Minijuego «El Cuestionario de Cómplices»**
   - 3 preguntas íntimas y divertidas de su historia.
   - Si se equivoca: mensaje tierno y cómico para reintentar.
   - Si acierta: revela una fotografía instantánea estilo Polaroid con dedicatoria.
   - Recompensa: **Fragmento 2 (Eco de Nuestras Risas)** + Poema de la estación.

4. **Estación 3: Minijuego «Hilos del Destino (La Constelación)»**
   - Conectar estrellas numeradas (del 1 al 7) al compás de notas de caja de música estelar.
   - Al unirlas todas, forman la figura del corazón iluminado.
   - Recompensa: **Fragmentos 3 y 4 (Hilos del Destino & Latido Central)** + Poema estelar.

5. **El Clímax Espectacular: La Revelación**
   - Botón: *✦ Unir los 4 Fragmentos ✦*.
   - Los fragmentos viajan al centro y estallan en una lluvia brillante de confeti.
   - **Carta romántica** escrita con efecto máquina de escribir (con botón para saltar animación si desea leerla rápido).
   - **Carrusel de fotos** con recuerdos y momentos especiales.
   - **La Gran Pregunta** con botones interactivos:
     - *«¡Sí, por siempre! ❤️»*: Lanza celebración completa con música festiva y certificado de promesa sellada.
     - *«Déjame pensarlo... 😜»*: Botón juguetón que esquiva el dedo y muestra frases divertidas.

---

## 🛠️ Cómo Probarlo en Tu Computadora

1. Abre la terminal en esta carpeta (`hola/`)
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Haz clic en el enlace local que aparece (usualmente `http://localhost:5173`) para probarlo en tu navegador.

---

## 🎨 Cómo Personalizarlo a tu Gusto

Todo se configura fácilmente desde un solo archivo: `src/config.js`.

### 1. Nombre de ella y tu firma
En `src/config.js`:
```javascript
partnerName: "Sofía",        // Su nombre o apodo cariñoso
yourName: "Alejandro",       // Tu nombre
```

### 2. Cambiar la música
Por defecto tiene un sintetizador celestial que suena hermoso y no necesita descargas.
Si quieres poner una canción que sea especial para ambos:
1. Copia tu archivo de audio (por ejemplo `cancion.mp3`) dentro de la carpeta `public/`
2. En `src/config.js` cambia:
   ```javascript
   audioUrl: "/cancion.mp3",
   ```

### 3. Cambiar las Fotos por las Suyas
Puedes usar tus propias fotos colocándolas en la carpeta `public/photos/`:
- Ejemplo: Guarda `public/photos/foto1.jpg`, `public/photos/foto2.jpg`, etc.
- En `src/config.js`, cambia las rutas:
  ```javascript
  photo: "/photos/foto1.jpg",
  ```

### 4. Personalizar las Preguntas y la Carta
En `src/config.js` puedes modificar el texto de las 3 preguntas, las opciones de respuesta, los poemas de cada estación y los párrafos de la carta final.

---

## 🚀 Cómo Subirlo a Vercel (Paso a Paso)

### Opción A: Mediante GitHub y Vercel (Recomendada y más fácil)

1. **Sube tu proyecto a GitHub**:
   - Crea un repositorio nuevo en [GitHub.com](https://github.com/new) (puede ser Privado o Público).
   - En tu terminal ejecuta:
     ```bash
     git add .
     git commit -m "Mi viaje interactivo de recuerdos"
     git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
     git push -u origin main
     ```

2. **Conéctalo a Vercel**:
   - Entra en [vercel.com](https://vercel.com) e inicia sesión (con tu cuenta de GitHub).
   - Haz clic en el botón azul **"Add New..."** → **"Project"**.
   - Verás tu repositorio en la lista. Haz clic en **"Import"**.
   - En "Framework Preset" verás que detecta **Vite** automáticamente.
   - Haz clic en **"Deploy"**.

3. **¡Listo!**: En menos de 1 minuto Vercel te dará un enlace público (ejemplo: `https://tu-proyecto.vercel.app`) que puedes enviarle por WhatsApp o abrir en su teléfono.

---

### Opción B: Directamente desde la Terminal con Vercel CLI

Si no quieres usar GitHub ahora mismo, puedes publicarlo directo desde la terminal:

1. Ejecuta:
   ```bash
   npx vercel
   ```
2. Te pedirá iniciar sesión con tu cuenta de Vercel en el navegador.
3. Responde a las preguntas de configuración (presionando `Enter` a todo por defecto).
4. Para el despliegue final a producción:
   ```bash
   npx vercel --prod
   ```
5. La terminal te imprimirá directamente el enlace web listo para compartir.
