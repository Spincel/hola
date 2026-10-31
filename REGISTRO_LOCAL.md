# 📜 REGISTRO LOCAL DEL PROYECTO
## *El Viaje Mágico de Nuestro Amor ✦ El Mapa del Merodeador*
**Fecha de registro**: 30 de Octubre de 2026  
**Dedicado con toda el alma a**: Xóchitl Sinay Barba Cuevas  
**De**: Su esposo Sócrates  
**Familia**: Sócrates, Xóchitl Sinay, Sioned (hija mayor), Said (bebé varón), Saly (hija pequeña)  
**Producción Live**: [https://hola-gamma-eight.vercel.app/](https://hola-gamma-eight.vercel.app/)  
**Repositorio**: `git@github.com:Spincel/hola.git` (`branch: main`)

---

## 🏰 1. Resumen Ejecutivo de la Experiencia

Una aplicación web interactiva, inmersiva y cinematográfica inspirada en el universo mágico de **Harry Potter** y la estética de diseño de **MinaLima**, creada como un tributo romántico y familiar profundo.

La experiencia guía a Sinay a través de 4 estaciones interactivas (minijuegos mágicos) para reunir los 4 fragmentos sagrados del amor, activar el Giratiempo 3D y desplegar el auténtico **Mapa del Merodeador**.

---

## 🗺️ 2. El Auténtico Mapa del Merodeador

El modal del Mapa del Merodeador (`#marauder-map-modal`) cuenta con:

### A. Plano Arquitectónico de Hogwarts
- **Grabado gótico vectorial SVG** con muros de piedra tramados, arcos conopiales, torreones y rosa de los vientos.
- **Cámaras representadas**:
  - `Andén 9 ¾ 🚂`: El inicio del viaje.
  - `Torre de Gryffindor 🦁`: Sala común, devoción y pasadizo de los tapices.
  - `Torre de Astronomía 🌌`: Bajo las estrellas de Tepic.
  - `Gran Salón de los Recuerdos 💕`: Centro ceremonial donde se unen los destinos.
  - `Galería de la Familia ✨`: Espacio sagrado de nuestros hijos.
  - `Nuestra Cabaña en el Bosque 🌲🏡🌧️`: Destino prometido con chimenea crepitante, lluvia y paz eterna.

### B. Huellas Humanas Animadas de la Familia
- Pisadas de calzado humano adulto y diminutas huellas de piecitos de bebé (con deditos) que se van imprimiendo secuencialmente paso a paso (`@keyframes step-human-cadence`):
  - **`Sócrates 👣`**: Saliendo de Gryffindor hacia el Gran Salón.
  - **`Xóchitl Sinay 👣`**: Al encuentro de Sócrates en el Gran Salón y caminando juntos hacia la Cabaña.
  - **`Sioned 👣`**: La hija mayor explorando la Torre de Astronomía hacia la Galería.
  - **`Said 👣 (bebé)`**: Pasitos tiernos de bebé saliendo de la Galería hacia papá y mamá.
  - **`Saly 👣`**: Pasitos alegres recorriendo el pasadizo superior.
  - **`Nuestra Cabaña 🌲🏡`**: Confluencia de la familia en el refugio soñado.
- Cartelas flotantes de pergamino caligráfico sobre cada rastro.

### C. Hub de Navegación de 4 Botones
1. `✨ Diseños Mágicos Animados`: 4 ilustraciones estilo película de animación.
2. `📸 Álbum de Recuerdos Hechizados`: 9 fotos reales de la familia.
3. `📜 Pergamino de la Carta de Amor`: La carta completa con letra capital iluminada.
4. `⚡ Travesura Realizada`: Cierre con clímax mágico.

### D. Retratos Vivientes (*Living Portraits*)
Tanto las ilustraciones como las fotos reales tienen el movimiento característico de los cuadros de Hogwarts:
- Respiración orgánica suave (`scale(1)` a `scale(1.034)`).
- Oscilación angular sutil (`rotate(-0.55deg)` a `rotate(0.65deg)`).
- Destello de luz mágica (*shimmer*) que cruza el lienzo.
- Partículas de polvo de estrellas suspendidas.

### E. Cierre Cinemático "Travesura Realizada & Te Amo"
Overlay a pantalla completa (`#travesura-magica-overlay`):
- Atmósfera nocturna, niebla y partículas doradas.
- Letras doradas con tipografía de Harry Potter (*Cinzel Decorative*):
  - **« TRAVESURA REALIZADA »**
  - **« TE AMO CON TODA MI ALMA, XÓCHITL SINAY »**
  - **« ALWAYS ⚡ »**
  - *« No existe tren, reloj ni distancia en este mundo que pueda apartar tu recuerdo de mi mente. Vives en cada latido de mi corazón. »*

---

## 🎨 3. Inventario de Recursos Visuales

### Ilustraciones Mágicas Generadas (`public/photos/couple/`):
1. `art_hogwarts_couple.jpg`: Sócrates y Sinay con bufandas Gryffindor en el Andén 9 ¾ frente al Expreso de Hogwarts.
2. `art_patronus_couple.jpg`: Sócrates y Sinay en el bosque con sus varitas invocando el Ciervo y la Cierva Patronus.
3. `art_cabana_couple.jpg`: Sócrates y Sinay acurrucados en la cabaña con chimenea crepitante, nieve y cerveza de mantequilla.
4. `art_family_magic.jpg`: Toda la familia reunida como magos de Hogwarts con velas flotantes y lechuzas.

### Fotografías Reales Hechizadas (`public/photos/couple/`):
1. `hp_foto_1.jpg`: Gatsby & La Magia de los Años 20.
2. `hp_foto_2.jpg`: Sinay y Sócrates, nuestro destino en las estrellas.
3. `hp_foto_3.jpg`: Sonrisas que iluminan mi mundo (café y sonrisas).
4. `hp_foto_4.jpg`: Amor de madre, luz de nuestra vida.
5. `hp_foto_5.jpg`: El beso que paraliza el tiempo.
6. `hp_foto_6.jpg`: Bajo el atardecer de Tepic.
7. `hp_foto_7.jpg`: La alegría de caminar juntos.
8. `hp_foto_8.jpg`: Nuestra tribu sagrada en el mar.
9. `hp_foto_9.jpg`: La dulce espera de nuestra mayor bendición.

---

## 🛠️ 4. Pila Tecnológica & Arquitectura

- **Bundler**: Vite 6.
- **Tipografías**: *Cinzel Decorative*, *Cinzel*, *Playfair Display*, *Caveat*, *Plus Jakarta Sans*.
- **Audio**: Web Audio API nativo (`OscillatorNode`, `GainNode`, envolventes ADSR) con síntesis de arpegios celestiales, acordes de recompensa, trazo de pluma y sonido de varita sin dependencias externas.
- **Gráficos**: SVG paramétrico responsivo, Canvas 2D en ultra HD (1500x3300 px) para exportación descargable e imprimible del pergamino.
- **CSS**: Keyframes acelerados por GPU (`transform3d`, `opacity`, `backdrop-filter`).

---

*« Juro solemnemente que mis intenciones son amarte siempre... Always »*
