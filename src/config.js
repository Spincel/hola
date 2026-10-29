/**
 * ====================================================================
 * CONFIGURACIÓN PERSONALIZADA: PARA MI AMADA ESPOSA
 * XÓCHITL SINAY BARBA CUEVAS ✦ CABAÑA, BOSQUE, LLUVIA, VINO & MAGIA
 * ====================================================================
 * Una experiencia inmersiva inspirada en lo que ella más ama:
 * cabañas acogedoras, el aroma a bosque de pinos, la lluvia suave,
 * el fuego de la chimenea, el buen vino tinto y la magia de Harry Potter.
 */

export const config = {
  // 1. Nombres y Destinataria
  partnerName: "Xóchitl Sinay Barba Cuevas",
  partnerShortName: "Xóchitl Sinay",
  yourName: "Tu esposo que te ama con toda su alma",

  // 2. Sonido y Ambiente (Lluvia suave en el bosque y música acústica)
  audioUrl: null,
  synthAmbientEnabled: true,

  // 3. Fase 0: Introducción con el Farol del Bosque / Cofre Mágico
  intro: {
    badge: "✦ Un Refugio Mágico Entre los Pinos y la Lluvia ✦",
    bottleTag: "Para la dueña de mi corazón, mi amada esposa 💌🌲⚡",
    bottleTeaser:
      "La lluvia suave y el murmullo del bosque trajeron un cofre encantado resguardado bajo los pinos con un mensaje para ti...",
    openBottleText: "Abrir el cofre con Alohomora 🪄✨",
    unfoldedTitle: "¡Hola mi amor! Sé que la curiosidad te ganaría... 😉",
    unfoldedSubtitle:
      "Quería prepararte algo diferente, especial y que rompiera la rutina: una expedición a nuestro propio refugio mágico en el bosque. Este mensaje se fragmentó en 4 recuerdos entre los pinos, la lluvia y la chimenea. Si logras reunirlos, descubrirás la propuesta que guardo en el corazón para nosotros dos...",
    startButtonText: "Adentrarnos juntos en el bosque ✨",
    headphonesNotice: "Ponte audífonos para escuchar la lluvia y el bosque 🎧🌧️",
  },

  // 4. Los 4 Fragmentos que irá desbloqueando en el bosque
  fragments: [
    {
      id: 1,
      name: "Pinos & Lluvia",
      icon: "🌲",
      color: "#22c55e",
      shortDesc: "El aroma a tierra mojada y nuestro abrazo",
    },
    {
      id: 2,
      name: "Vino & Chimenea",
      icon: "🍷",
      color: "#f43f5e",
      shortDesc: "Frente al fuego donde el tiempo se detiene",
    },
    {
      id: 3,
      name: "Nuestro Patronus",
      icon: "⚡",
      color: "#f5d061",
      shortDesc: "Tu luz que ilumina cualquier oscuridad",
    },
    {
      id: 4,
      name: "Amor Eterno (Always)",
      icon: "❤",
      color: "#fb7185",
      shortDesc: "Profundo, leal e indestructible",
    },
  ],

  // 5. Minijuego 1: «Memoria del Bosque & la Magia» (3 pares de cartas 3x2)
  minigame1: {
    stationNumber: "Estación I",
    title: "Memoria del Bosque & la Magia",
    instructions:
      "Encuentra los 3 pares que representan nuestro refugio de amor, la lluvia y nuestra complicidad mágica:",
    pairs: [
      {
        id: "bosque",
        icon: "🌲",
        name: "Pinos & Lluvia Suave",
        phrase:
          "«El sonido de las gotas de lluvia sobre el tejado de madera y tú entre mis brazos... no existe un lugar de más paz en todo el universo.»",
      },
      {
        id: "vino",
        icon: "🍷",
        name: "Vino Frente a la Chimenea",
        phrase:
          "«Una copa de buen vino tinto compartida contigo junto al fuego crepitante me confirma que haberte elegido como mi esposa es lo mejor de mi vida.»",
      },
      {
        id: "patronus",
        icon: "⚡",
        name: "Nuestro Patronus & Magia",
        phrase:
          "«Eres mi Patronus en cada día difícil: tu luz, tu inteligencia y tu sonrisa ahuyentan cualquier oscuridad. Y si me preguntan cuánto tiempo te amaré... —Always.»",
      },
    ],
    rewardPoemTitle: "✦ Primer Fragmento: Pinos & Lluvia ✦",
    rewardPoem: [
      "Entre el murmullo de la lluvia y el aroma a pino,",
      "el calor de tu cuerpo es mi único y verdadero refugio.",
      "Tu mente brillante, tu risa y tu belleza infinita",
      "hacen de cualquier rincón del mundo nuestro hogar.",
    ],
    nextButtonText: "Avanzar a la Cabaña (Estación II) →",
  },

  // 6. Minijuego 2: «Cuestionario de Nuestra Cabaña Mágica»
  minigame2: {
    stationNumber: "Estación II",
    title: "Cuestionario de Nuestra Cabaña",
    instructions:
      "Momentos de complicidad que solo nosotros dos conocemos en el corazón:",
    questions: [
      {
        question: "¿Qué es lo mejor de escaparnos juntos a una cabaña en medio del bosque mientras llueve afuera?",
        options: [
          {
            text: "El sonido de las gotas en la ventana, el calor de la chimenea, una copa de vino y nosotros dos abrazados sin prisa ❤️",
            correct: true,
            feedback: "¡Exactamente mi amor! Ver llover afuera mientras estamos abrigados junto al fuego es la gloria entera ✨",
          },
          {
            text: "Ponernos a contar cuántas agujas tiene cada pino del bosque",
            correct: false,
            feedback: "¡Jajaja terminaríamos en el año 2090! Elige con el corazón... 🤭",
          },
          {
            text: "Fingir que nos da frío y no querer abrazarnos",
            correct: false,
            feedback: "¡Imposible! Si el mejor pretexto del frío es estar pegaditos 🥰",
          },
        ],
        photo: "/photos/cabana_chimenea_vino.png",
        photoCaption: "Nuestras mejores charlas con vino frente al fuego de la chimenea.",
      },
      {
        question: "¿Qué es lo que más me fascina y me vuelve loco de ti, mi hermosa esposa?",
        options: [
          {
            text: "Absolutamente todo: tu inteligencia brillante, tu sonrisa que ilumina cualquier lugar, tu porte, tu cuerpo y esa magia tan tuya ✨",
            correct: true,
            feedback: "¡Tal cual! Me fascinas entera, por dentro y por fuera, cada día más 😍",
          },
          {
            text: "Que sabes de memoria la receta exacta de la Poción Multijugos",
            correct: false,
            feedback: "Sé que eres una bruja brillante, ¡pero la respuesta va directo a lo que me enamora de ti! 😂🪄",
          },
          {
            text: "Que caminas como si fueras un fantasma de las mazmorras",
            correct: false,
            feedback: "¡Para nada! Tienes una belleza, una calidez y una presencia deslumbrante ❤️",
          },
        ],
        photo: "/photos/bosque_lluvia_pareja.png",
        photoCaption: "Caminando juntos bajo la lluvia fresca entre los árboles.",
      },
      {
        question: "Si tuviéramos que describir lo que siento por ti con una palabra mágica...",
        options: [
          {
            text: "«Always»... porque eres el gran amor de mi vida y te volvería a elegir como mi esposa en esta y en mil vidas más 💍🪄",
            correct: true,
            feedback: "¡Sí, mi vida entera! —After all this time? —Always. Eres mi hogar y mi mayor tesoro ✨",
          },
          {
            text: "Expelliarmus",
            correct: false,
            feedback: "¡Desarmado me tienes tú a mí, pero esa no es la palabra! 🤭🪄",
          },
          {
            text: "Alohomora",
            correct: false,
            feedback: "Ya abriste mi corazón hace mucho tiempo, ¡pero la respuesta es mucho más profunda! ❤️",
          },
        ],
        photo: "/photos/cabana_atardecer_bosque.png",
        photoCaption: "Nuestro refugio soñado entre los pinos al atardecer.",
      },
    ],
    retryPrompt: "¡Caaasi mi amor! Respóndelo con el corazón...",
    rewardPoemTitle: "✦ Segundo Fragmento: Vino & Chimenea ✦",
    rewardPoem: [
      "El fuego de la chimenea templa el frío del bosque,",
      "pero es tu abrazo el que enciende mi alma entera.",
      "Cada risa, cada mirada y cada momento a tu lado",
      "hacen que amar sea lo más hermoso que me ha pasado.",
    ],
    nextButtonText: "Avanzar a las Luciérnagas (Estación III) →",
  },

  // 7. Minijuego 3: «Constelación Lumos»
  minigame3: {
    stationNumber: "Estación III",
    title: "Luciérnagas & Encantamiento Lumos",
    instructions:
      "Toca las luces doradas del 1 al 7 para encender el corazón resplandeciente entre los pinos y la niebla...",
    starCount: 7,
    constellationName: "«Constelación del Corazón Mágico»",
    rewardPoemTitle: "✦ Fragmentos III y IV: Patronus y Amor Eterno ✦",
    rewardPoem: [
      "Eres mi refugio en la tormenta, mi calma y mi mayor aventura.",
      "La mujer con la que sueño, construyo y celebro cada día.",
      "Ahora los 4 fragmentos se funden en el calor de una sola promesa...",
    ],
    nextButtonText: "¡Reunir todos los fragmentos! ✨",
  },

  // 8. Fase 4: El Clímax Espectacular (La Carta a Xóchitl Sinay en la Cabaña)
  climax: {
    stationNumber: "El Clímax",
    title: "La Revelación",
    fuseButtonText: "✦ Unir los 4 Fragmentos Mágicos ✦",
    assemblingMessage: "Las luciérnagas y los fragmentos giran en espiral hacia el fuego...",
    revelationTitle: "Para Xóchitl Sinay Barba Cuevas",

    letter: {
      salutation: "Para mi amada esposa, Xóchitl Sinay Barba Cuevas:",
      paragraphs: [
        "Mi amor, quise construir este rincón entre el aroma a pinos, la lluvia y la madera para hacer una pausa en el tiempo y recordarte algo que a veces la rutina diaria oculta, pero que mi corazón siente en cada respiro: sigo profundamente enamorado de ti, como el primer día o incluso más.",
        "Admiro con todo mi ser a la mujer extraordinaria que eres: tu inteligencia brillante, tu determinación, tu forma de pensar y la fuerza con la que iluminas nuestro hogar. Pero también quiero que nunca olvides lo mucho que me fascinas como mujer: tu sonrisa que desarma cualquier tormenta, tu mirada hermosa, tu cuerpo, tu porte elegante y esa magia natural tan tuya que me sigue quitando el aliento.",
        "Ser tu esposo es el mayor honor y la bendición más grande de mi vida. Eres mi refugio y mi Patronus: esa luz invencible que ahuyenta cualquier día difícil. Hemos caminado juntos, vencido retos y construido un amor real, cálido y leal. Y si alguien me preguntara hasta cuándo te voy a amar, mi respuesta siempre será la misma: Always.",
        "Por eso hoy quiero invitarte a detener el reloj, a escapar juntos al bosque, a escuchar la lluvia caer mientras disfrutamos de una copa de vino frente al fuego de una chimenea y recordar por qué nos elegimos para siempre...",
      ],
      closing: "Con todo mi amor, mi respeto y mi devoción eterna,",
    },

    memoriesGallery: [
      {
        url: "/photos/cabana_chimenea_vino.png",
        caption: "Nuestras pláticas interminables con vino frente al fuego",
        tag: "Nuestra Cabaña",
      },
      {
        url: "/photos/bosque_lluvia_pareja.png",
        caption: "Caminando juntos bajo la lluvia entre los pinos",
        tag: "Lluvia & Amor",
      },
      {
        url: "/photos/cabana_atardecer_bosque.png",
        caption: "Nuestro rincón soñado en medio de la naturaleza",
        tag: "Refugio Eterno",
      },
    ],

    finalQuestion: "Xóchitl Sinay... ¿aceptas escaparte conmigo este fin de semana a una cabaña mágica en el bosque, con chimenea, lluvia, buen vino y todo mi amor dedicado solo a ti? 🌲🏡🌧️🍷🪄",
    yesButtonText: "¡Sí, mi amor! Always ❤️⚡",
    noButtonText: "Solo si hay chimenea, vino tinto y cerveza de mantequilla... 🍺🔥",

    noButtonResponses: [
      "¡Habrá chimenea encendida, el mejor vino y toda la magia del mundo, mi reina! 🍷🔥❤️",
      "¡Te amo con toda mi alma, Xóchitl Sinay! —Always 💖🪄",
      "¡No puedes decirle que no a tu esposo enamorado! 😉🌧️",
      "¡El botón de arriba brilla como la luz de un Patronus! 👆✨",
      "¡Trato hecho! Una escapada inolvidable a nuestra cabaña en el bosque 🌲🏡🌧️💍❤️",
    ],

    celebration: {
      badge: "✦ Promesa Sellada en la Cabaña del Bosque ✦",
      title: "¡Dijo que SÍ mi amada esposa! 💖🌲🏡🪄",
      message:
        "Xóchitl Sinay, prometo amarte cada día con más fuerza, cuidarte, hacerte sonreír, cobijarte mientras llueve afuera y recordarte siempre lo inmensamente afortunado que soy de ser tu esposo.",
      dateLabel: "Nuestra escapada romántica:",
      dateValue: "Este fin de semana en una cabaña mágica en el bosque 🌲🏡🌧️🍷🪄",
      signature: "Always tuyo,",
    },
  },
};
