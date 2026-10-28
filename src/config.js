/**
 * ====================================================================
 * ARCHIVO DE CONFIGURACIÓN PERSONALIZABLE
 * ====================================================================
 * Aquí puedes cambiar todos los textos, nombres, preguntas, fotos,
 * poemas y música para que sea 100% tu historia.
 */

export const config = {
  // 1. Nombres
  partnerName: "Mi Amor", // Nombre o apodo de ella (ej: "Sofía", "Princesa", etc.)
  yourName: "Tu persona favorita", // Tu nombre o firma

  // 2. Música de fondo
  // Si tienes una canción propia en MP3, guárdala en /public/musica.mp3 y pon: "/musica.mp3"
  // Si dejas null, la web usará el sintetizador celestial suave generado automáticamente en vivo.
  audioUrl: null, // Cambia a "/musica.mp3" si subes tu archivo a la carpeta public/
  synthAmbientEnabled: true, // Si es true y audioUrl es null, suena un ambiente cósmico relajante

  // 3. Fase 0: Introducción
  intro: {
    badge: "✦ Una Expedición de Recuerdos ✦",
    title: "El Mensaje Fragmentado",
    subtitle:
      "Hay un mensaje muy especial que se fragmentó en el camino hacia ti. Para revelarlo, debes recorrer este sendero y reunir los 4 fragmentos ocultos...",
    startButtonText: "Comenzar el viaje ✨",
    headphonesNotice: "Ponte audífonos para una mejor experiencia 🎧",
  },

  // 4. Los 4 Fragmentos que irá desbloqueando
  fragments: [
    {
      id: 1,
      name: "Luz de la Mirada",
      icon: "✦",
      color: "#f5d061",
      shortDesc: "Lo que iluminas sin darte cuenta",
    },
    {
      id: 2,
      name: "Eco de Nuestras Risas",
      icon: "✧",
      color: "#ff8fa3",
      shortDesc: "Nuestras anécdotas y complicidad",
    },
    {
      id: 3,
      name: "Hilos del Destino",
      icon: "⋆",
      color: "#a78bfa",
      shortDesc: "Las constelaciones que nos unieron",
    },
    {
      id: 4,
      name: "Latido Central",
      icon: "❤",
      color: "#f43f5e",
      shortDesc: "El corazón de este viaje",
    },
  ],

  // 5. Minijuego 1: «Encuentra las Luces»
  minigame1: {
    stationNumber: "Estación I",
    title: "Encuentra las Luces Ocultas",
    instructions:
      "La noche es profunda. Mueve la linterna (con tu dedo o ratón) y descubre los 4 destellos escondidos en la oscuridad.",
    foundCountLabel: "Luces encontradas:",
    lights: [
      {
        id: "light-1",
        label: "Destello de Calidez",
        phrase:
          "«Tu sonrisa tiene la costumbre de arreglar mis peores días sin pedir permiso.»",
      },
      {
        id: "light-2",
        label: "Destello de Alegría",
        phrase:
          "«Esa chispa tan tuya de emocionarte por las pequeñas cosas del mundo.»",
      },
      {
        id: "light-3",
        label: "Destello de Paz",
        phrase:
          "«La tranquilidad que siento cada vez que me miras y el tiempo se detiene.»",
      },
      {
        id: "light-4",
        label: "Destello de Magia",
        phrase:
          "«Tu risa, que sin duda es mi melodía favorita en todo el universo.»",
      },
    ],
    rewardPoemTitle: "✦ Primer Fragmento Recuperado ✦",
    rewardPoem: [
      "En la noche más callada y fría,",
      "bastó un destello de tu mirada",
      "para entender que la luz no viene del sol,",
      "sino de quien te hace sonreír con el alma.",
    ],
    nextButtonText: "Avanzar a la Estación II →",
  },

  // 6. Minijuego 2: «El Cuestionario de Cómplices»
  minigame2: {
    stationNumber: "Estación II",
    title: "El Cuestionario de Cómplices",
    instructions:
      "Solo quien guarda estos momentos en el corazón conoce las verdaderas respuestas. Responde 3 preguntas:",
    questions: [
      {
        question: "¿Cuál es nuestro superpoder secreto cuando estamos juntos?",
        options: [
          {
            text: "Reírnos hasta que nos duela la panza por cualquier tontería",
            correct: true,
            feedback: "¡Exacto! Nuestras risas rompen cualquier ley de la física.",
          },
          {
            text: "Ser personas extremadamente serias y aburridas",
            correct: false,
            feedback: "¡Oye no! Si somos los más cómplices y divertidos del mundo 🤭",
          },
          {
            text: "Dormir 16 horas seguidas sin pestañear",
            correct: false,
            feedback: "Tentador... pero no es nuestro mayor superpoder 🥰",
          },
        ],
        // Foto que se revela al acertar (puedes poner /photos/foto1.jpg o dejar enlace)
        photo:
          "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
        photoCaption: "Nuestra complicidad es única en el mundo.",
      },
      {
        question: "¿Qué fue lo primero que pensé cuando te conocí mejor?",
        options: [
          {
            text: "«Tiene una luz tan bonita que dan ganas de quedarse cerca para siempre»",
            correct: true,
            feedback: "¡Tal cual! Y cada día que pasa me lo confirmas más.",
          },
          {
            text: "«Seguro es un agente secreto de la NASA»",
            correct: false,
            feedback: "Demasiado hermosa para ser verdad, pero no de la NASA 😂",
          },
          {
            text: "«Parece que come limones enteros en el desayuno»",
            correct: false,
            feedback: "¡Jajaja jamás! Aunque tus caras raras son adorables.",
          },
        ],
        photo:
          "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
        photoCaption: "Desde el primer instante supe que eras irrepetible.",
      },
      {
        question: "Si tuviéramos un día entero solo para nosotros, ¿cuál sería el mejor plan?",
        options: [
          {
            text: "Caminar sin prisa, comer rico y hablar de la vida hasta la noche",
            correct: true,
            feedback: "El mejor destino del mundo siempre será a tu lado ❤️",
          },
          {
            text: "Hacer una fila de banco durante 9 horas",
            correct: false,
            feedback: "¡Qué pesadilla! Elige el plan con amor por favor 😅",
          },
          {
            text: "Ver un maratón de videos de cómo doblar calcetines",
            correct: false,
            feedback: "Mmm... ¡podemos armar un plan mil veces más divertido!",
          },
        ],
        photo:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        photoCaption: "Contigo cualquier lugar ordinario se vuelve mágico.",
      },
    ],
    retryPrompt: "¡Caaasi! Inténtalo con el corazón...",
    rewardPoemTitle: "✦ Segundo Fragmento Recuperado ✦",
    rewardPoem: [
      "Entre anécdotas, bromas tontas y miradas cómplices,",
      "construimos un lenguaje que solo dos personas entienden.",
      "Y en cada risa compartida,",
      "el tiempo parece detenerse a nuestro favor.",
    ],
    nextButtonText: "Avanzar a la Estación III →",
  },

  // 7. Minijuego 3: «Conectar la Constelación»
  minigame3: {
    stationNumber: "Estación III",
    title: "Conectar la Constelación",
    instructions:
      "Toca o arrastra los puntos estelares en orden numérico (del 1 al 7) para trazar la figura que el cielo guardó para ti.",
    starCount: 7,
    constellationName: "«Constelación del Corazón Eterno»",
    rewardPoemTitle: "✦ Tercer y Cuarto Fragmento Recuperados ✦",
    rewardPoem: [
      "Dicen que la luz de las estrellas tarda milenios en llegar a la Tierra.",
      "Quizás todas ellas brillaron en silencio a través del tiempo,",
      "esperando el segundo exacto",
      "en el que nuestros caminos se cruzaran.",
    ],
    nextButtonText: "¡Reunir todos los fragmentos! ✨",
  },

  // 8. Fase 4: El Clímax Espectacular (La Gran Revelación)
  climax: {
    stationNumber: "El Clímax",
    title: "El Origen Revelado",
    fuseButtonText: "✦ Unir los 4 Fragmentos ✦",
    assemblingMessage: "Los 4 fragmentos se atraen en el centro del cosmos...",
    revelationTitle: "Carta para Ti",

    // La carta emotiva principal
    letter: {
      salutation: "Para la persona más especial de mi vida,",
      paragraphs: [
        "Si llegaste hasta aquí, habrás notado que cada pequeño juego guardaba un pedacito de lo que significas para mí. No quería decírtelo con un simple mensaje de texto ni de golpe; las cosas verdaderamente valiosas merecen ser descubiertas con asombro, paso a paso, como se descubren las constelaciones en el cielo.",
        "Desde que estás en mi vida, los días comunes tienen brillo propio, las conversaciones se vuelven infinitas y el futuro se siente como un lugar emocionante al cual caminar. Admiro tu bondad, tu inteligencia, tu hermosa forma de ser y la calidez con la que llenas todo a tu alrededor.",
        "No creo en las casualidades. Creo firmemente que conocerte ha sido uno de los momentos más bonitos que me han sucedido, y hoy quiero dar un paso más a tu lado...",
      ],
      closing: "Con todo mi amor y cariño,",
    },

    // Pequeño carrusel de fotos especiales
    memoriesGallery: [
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
        caption: "Nuestras primeras anécdotas juntos",
        tag: "Momentos Inolvidables",
      },
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
        caption: "Cualquier atardecer a tu lado se convierte en poesía",
        tag: "Paz Contigo",
      },
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
        caption: "Por miles de risas, historias y abrazos más",
        tag: "Infinitos Recuerdos",
      },
    ],

    // La gran pregunta final
    finalQuestion: "¿Quieres ser mi novia y seguir construyendo este universo juntos?",
    yesButtonText: "¡Sí, acepto con todo el corazón! ❤️",
    noButtonText: "Déjame pensarlo... 😜",

    // Respuestas juguetonas cuando pasa el cursor o toca el botón "No"
    noButtonResponses: [
      "¿Segura segura? Mira que te consiento mucho 🙈",
      "¡Ese botón tiene virus del desamor, no lo toques! 😜",
      "¡El botón verde brilla mucho más bonito, mira hacia la izquierda! 👉",
      "No se aceptan devoluciones en este corazón 🥰",
      "¡Ups! Ese botón resbala... mejor presiona el que dice Sí ❤️",
    ],

    // Pantalla de celebración tras decir que SÍ
    celebration: {
      badge: "✦ Promesa Sellada entre las Estrellas ✦",
      title: "¡Dijo que SÍ! 💖🎉",
      message:
        "Este es solo el comienzo de nuestra historia. Prometo hacerte reír, cuidarte, apoyarte en cada sueño y quererte en cada versión de ti.",
      signature: "Siempre tuyo,",
    },
  },
};
