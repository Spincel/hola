/**
 * ====================================================================
 * CONFIGURACIÓN PERSONALIZADA PARA MARTHA ✦
 * ====================================================================
 * Una sorpresa interactiva, tierna y divertida que celebra
 * la complicidad y la química especial que siempre ha existido.
 */

export const config = {
  // 1. Nombres
  partnerName: "Martha", // Nombre de ella
  yourName: "Tu amigo cómplice", // Tu nombre o apodo cariñoso

  // 2. Música de fondo
  // El sintetizador celestial ambiental está activo y crea una melodía relajante
  // estilo caja de música y lofi en tiempo real sin necesidad de descargar archivos.
  // Si en el futuro tienes un MP3 propio, puedes colocarlo en /public/cancion.mp3
  audioUrl: null,
  synthAmbientEnabled: true,

  // 3. Fase 0: Introducción
  intro: {
    badge: "✦ Una Sorpresa Entre las Estrellas ✦",
    title: "El Mensaje Fragmentado",
    subtitle:
      "Martha, hay un mensaje que se fragmentó en el camino hacia ti. Para descubrir de qué se trata, debes recorrer este sendero y reunir 4 fragmentos estelares...",
    startButtonText: "Comenzar la aventura ✨",
    headphonesNotice: "Ponte audífonos para una mejor experiencia 🎧",
  },

  // 4. Los 4 Fragmentos que irá desbloqueando
  fragments: [
    {
      id: 1,
      name: "La Chispa",
      icon: "✦",
      color: "#f5d061",
      shortDesc: "Esa mirada y esa energía única tuya",
    },
    {
      id: 2,
      name: "Nuestras Risas",
      icon: "✧",
      color: "#ff8fa3",
      shortDesc: "Las anécdotas donde el tiempo vuela",
    },
    {
      id: 3,
      name: "Hilos del Destino",
      icon: "⋆",
      color: "#a78bfa",
      shortDesc: "Las coincidencias que nos unieron",
    },
    {
      id: 4,
      name: "La Química",
      icon: "❤",
      color: "#f43f5e",
      shortDesc: "Eso que no se puede explicar con palabras",
    },
  ],

  // 5. Minijuego 1: «Encuentra las Luces»
  minigame1: {
    stationNumber: "Estación I",
    title: "Encuentra las Luces Ocultas",
    instructions:
      "La noche guarda secretos. Mueve la linterna (con tu dedo en el teléfono o con el ratón) y descubre los 4 destellos escondidos en la oscuridad.",
    foundCountLabel: "Luces encontradas:",
    lights: [
      {
        id: "light-1",
        label: "Destello de Autenticidad",
        phrase:
          "«Tu risa espontánea, Martha: es de esas que contagian a cualquiera y alegran el día sin esfuerzo.»",
      },
      {
        id: "light-2",
        label: "Destello de Complicidad",
        phrase:
          "«Esa mirada en la que no necesitamos decir una sola palabra para saber de qué nos estamos riendo.»",
      },
      {
        id: "light-3",
        label: "Destello de Calma",
        phrase:
          "«La facilidad con la que contigo todo fluye tan natural, sin poses ni complicaciones.»",
      },
      {
        id: "light-4",
        label: "Destello de Química",
        phrase:
          "«Esa vibra inexplicable que se siente cada vez que estamos cerca... algo que no pasa con nadie más.»",
      },
    ],
    rewardPoemTitle: "✦ Primer Fragmento Recuperado: La Chispa ✦",
    rewardPoem: [
      "Entre todas las personas y lugares del mundo,",
      "hay miradas que tienen una gravedad especial.",
      "Contigo no hicieron falta pretextos, Martha:",
      "bastó conocerte para saber que eres diferente a todas.",
    ],
    nextButtonText: "Avanzar a la Estación II →",
  },

  // 6. Minijuego 2: «El Cuestionario de Cómplices»
  minigame2: {
    stationNumber: "Estación II",
    title: "El Cuestionario de Cómplices",
    instructions:
      "Solo alguien con buena memoria y buen corazón puede responder estas 3 preguntas sobre nosotros:",
    questions: [
      {
        question: "¿Cuál es nuestro mayor superpoder cuando nos ponemos a platicar?",
        options: [
          {
            text: "Hacer que las horas parezcan minutos entre risas y temas infinitos",
            correct: true,
            feedback: "¡Totalmente! Cuando estamos hablando, el reloj pierde el control.",
          },
          {
            text: "Fingir que somos personas extremadamente serias y formales",
            correct: false,
            feedback: "¡Jajaja por favor! Si contigo la seriedad dura 3 segundos 🤭",
          },
          {
            text: "Hablar del clima con cara de aburrimiento",
            correct: false,
            feedback: "Jamás en la vida. Inténtalo con sinceridad, Martha...",
          },
        ],
        photo: "/photos/recuerdo1.png",
        photoCaption: "Nuestras charlas donde el mundo entero se pausa.",
      },
      {
        question: "Seamos 100% sinceros... ¿qué es lo más evidente cuando estamos juntos?",
        options: [
          {
            text: "Esa química y esa vibra única que se nota a kilómetros, por más que digamos 'solo somos amigos' 😉",
            correct: true,
            feedback: "¡Exacto! Hay cosas tan obvias que hasta el universo las nota ✨",
          },
          {
            text: "Que los dos tenemos sueño todo el día",
            correct: false,
            feedback: "Bueno... tal vez a veces, ¡pero esa no es la respuesta correcta! 😂",
          },
          {
            text: "Que somos dos científicos de la NASA",
            correct: false,
            feedback: "Científicos no, pero de que hay química... la hay 🔬❤️",
          },
        ],
        photo: "/photos/recuerdo2.png",
        photoCaption: "Esa chispa que no se puede fingir ni esconder.",
      },
      {
        question: "Si tuviéramos una tarde libre sin pendientes, ¿cuál sería el plan ideal?",
        options: [
          {
            text: "Caminar sin prisa, comer algo rico y reírnos de cualquier tontería",
            correct: true,
            feedback: "El plan perfecto siempre es compartir un buen momento contigo.",
          },
          {
            text: "Ir a renovar la credencial de elector y hacer 5 horas de fila",
            correct: false,
            feedback: "¡Qué pesadilla! Elige algo más bonito por favor 😅",
          },
          {
            text: "Contar cuántas hormigas cruzan la calle",
            correct: false,
            feedback: "Mmm... ¡creo que se nos ocurre algo 100 veces mejor!",
          },
        ],
        photo: "/photos/recuerdo3.png",
        photoCaption: "Cualquier instante ordinario a tu lado se vuelve un buen recuerdo.",
      },
    ],
    retryPrompt: "¡Caaasi! Piénsalo con la verdad, Martha...",
    rewardPoemTitle: "✦ Segundo Fragmento Recuperado: Nuestras Risas ✦",
    rewardPoem: [
      "Dicen que una buena amistad es un regalo,",
      "pero cuando hay miradas que se entienden sin palabras",
      "y una complicidad que llena cada silencio...",
      "uno no puede evitar sonreír y agradecer encontrarte.",
    ],
    nextButtonText: "Avanzar a la Estación III →",
  },

  // 7. Minijuego 3: «Conectar la Constelación»
  minigame3: {
    stationNumber: "Estación III",
    title: "Hilos del Destino",
    instructions:
      "Toca las estrellas en orden del 1 al 7 para trazar la constelación que unió nuestros caminos...",
    starCount: 7,
    constellationName: "«La Constelación de la Química»",
    rewardPoemTitle: "✦ Fragmentos III y IV Recuperados: El Destino y la Química ✦",
    rewardPoem: [
      "Hay conexiones que no se planean ni se fuerzan;",
      "simplemente suceden, como dos estrellas",
      "que orbitan el mismo cielo y hacen todo más brillante.",
      "Ahora todos los fragmentos están en tus manos...",
    ],
    nextButtonText: "¡Reunir todos los fragmentos! ✨",
  },

  // 8. Fase 4: El Clímax Espectacular (La Gran Revelación)
  climax: {
    stationNumber: "El Clímax",
    title: "La Revelación",
    fuseButtonText: "✦ Ensamblar los 4 Fragmentos ✦",
    assemblingMessage: "Los fragmentos se atraen en el centro del cosmos...",
    revelationTitle: "Para Martha",

    // La carta emotiva principal
    letter: {
      salutation: "Querida Martha,",
      paragraphs: [
        "Si llegaste hasta aquí, habrás notado que cada pequeño juego guardaba un pedacito de lo que me encanta de ti. No quería decírtelo con un simple mensaje de texto ni de golpe; las cosas bonitas merecen una sorpresa a su altura.",
        "Dicen que las mejores historias siempre empiezan de la forma más natural: con una amistad sincera, conversaciones que se extienden sin darse cuenta y risas que se quedan grabadas en la mente.",
        "Pero la verdad es que, desde hace tiempo, hay algo muy claro: esa química tan nuestra, esa chispa que se enciende cada vez que coincidimos y esa complicidad que no tengo con nadie más. Me encanta tu risa, tu forma de ser y lo bonito que es compartir momentos contigo.",
        "Siempre hemos dicho que 'solo somos amigos'... pero hoy quise prepararte esta constelación para hacerte una pregunta...",
      ],
      closing: "Con mucho cariño y toda la complicidad,",
    },

    // Galería de Recuerdos / Ilustraciones
    memoriesGallery: [
      {
        url: "/photos/recuerdo1.png",
        caption: "Nuestras mejores charlas bajo el cielo",
        tag: "Momentos Inolvidables",
      },
      {
        url: "/photos/recuerdo2.png",
        caption: "Esa vibra y risas que solo tú y yo entendemos",
        tag: "Nuestra Química",
      },
      {
        url: "/photos/recuerdo3.png",
        caption: "Por muchos más momentos compartidos",
        tag: "Cómplices de Vida",
      },
    ],

    // La gran pregunta final adaptada para dar el paso
    finalQuestion: "Martha... ¿y si dejamos de fingir que solo es casualidad y vemos a dónde nos lleva esta química? ✨",
    yesButtonText: "¡Me encanta la idea! Acepto ❤️",
    noButtonText: "Solo si me invitas unos taquitos primero... 😜",

    // Respuestas juguetonas cuando pasa el cursor o toca el botón "No"
    noButtonResponses: [
      "¡Trato hecho! Los taquitos y el postre van por mi cuenta 🌮🍦",
      "Esa química no se puede negar, Martha... 🤭",
      "¡No le des tantas vueltas, mira qué bonito brilla el botón verde! 👉",
      "¿A poco no te encantó la constelación? 🥰",
      "¡Piénsalo bien, mira que no cualquiera te programa un universo entero! ✨",
      "¡Te atrapé! Mejor dale al botón de la izquierda ❤️",
    ],

    // Pantalla de celebración tras decir que SÍ
    celebration: {
      badge: "✦ Promesa Sellada entre las Estrellas ✦",
      title: "¡Dijo que SÍ! 💖🎉",
      message:
        "Martha, prometo sacarte sonrisas todos los días, seguir siendo tu cómplice favorito y cuidar cada momento que construyamos juntos.",
      signature: "Siempre para ti,",
    },
  },
};
