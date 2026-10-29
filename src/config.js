/**
 * ====================================================================
 * CONFIGURACIÓN PERSONALIZADA: PARA MI AMADA ESPOSA
 * XÓCHITL SINAY BARBA CUEVAS ✦ EL VIAJE MÁGICO DE NUESTRO AMOR
 * ====================================================================
 * Una expedición mágica a través del Andén 9 ¾, el Sauce Boxeador,
 * el Castillo de Hogwarts y nuestra cabaña soñada con lluvia y chimenea.
 * 
 * Propósito: Recordarle que pienso en ella en cada segundo, que la amo
 * con toda mi alma, que es lo mejor que me ha pasado en la vida, y sellar
 * una hermosa promesa / plan a futuro para escaparnos juntos.
 */

export const config = {
  // 1. Nombres y Destinataria
  partnerName: "Xóchitl Sinay Barba Cuevas",
  partnerShortName: "Xóchitl Sinay",
  yourName: "Tu esposo que piensa en ti en cada segundo y te ama con toda su alma",

  // 2. Sonido y Ambiente (Lluvia mágica, chimenea y melodía encantada)
  audioUrl: null,
  synthAmbientEnabled: true,

  // 3. Fase 0: La Plataforma 9 ¾ (King's Cross & Billete Dorado de Hogwarts)
  intro: {
    badge: "✦ Expreso de Hogwarts ✦ Andén 9 ¾ ✦",
    bottleTag: "Para la mujer de mi vida, mi único y gran amor 💌🚂⚡",
    bottleTeaser:
      "Entre el vapor del Expreso de Hogwarts y el muro del Andén 9 ¾, hay un billete dorado y un mensaje secreto reservado solo para ti...",
    openBottleText: "Cruzar al Andén 9 ¾ y abrir el mensaje 🚂✨",
    unfoldedTitle: "¡Hola mi amor! Bienvenida a nuestro viaje mágico... 😉⚡",
    unfoldedSubtitle:
      "Hice todo esto para recordarte algo que late en mi pecho a cada instante: que pienso en ti en cada momento del día, que te amo con toda mi alma y que eres, sin duda alguna, lo mejor y más hermoso de toda mi vida. Este viaje recorre 4 rincones mágicos de nuestro amor. Reúne cada fragmento para descubrir el gran plan a futuro que tengo reservado para los dos...",
    startButtonText: "Subir al tren de nuestro amor ✨",
    headphonesNotice: "Ponte audífonos para escuchar la lluvia y la magia 🎧🌧️🪄",
  },

  // 4. Los 4 Fragmentos que irá desbloqueando en los lugares mágicos
  fragments: [
    {
      id: 1,
      name: "Andén 9 ¾ & Destino",
      icon: "🚂",
      color: "#eab308",
      shortDesc: "El destino que unió nuestras vidas para siempre",
    },
    {
      id: 2,
      name: "El Castillo & Mis Pensamientos",
      icon: "🏰",
      color: "#38bdf8",
      shortDesc: "Pienso en ti en cada segundo de mis días",
    },
    {
      id: 3,
      name: "El Sauce & Nuestra Fuerza",
      icon: "🌲",
      color: "#22c55e",
      shortDesc: "Raíces inquebrantables y lluvia serena",
    },
    {
      id: 4,
      name: "Nuestro Patronus (Always)",
      icon: "⚡",
      color: "#f43f5e",
      shortDesc: "Lo mejor de mi vida entera — Always",
    },
  ],

  // 5. Minijuego 1: «Memoria Mágica: El Andén 9 ¾ y el Sauce Boxeador» (3 pares de cartas 3x2)
  minigame1: {
    stationNumber: "Estación I",
    title: "El Andén 9 ¾ & El Sauce Boxeador",
    instructions:
      "Encuentra los 3 pares que representan cómo estás en mi mente en todo momento y la magia de nuestro amor:",
    pairs: [
      {
        id: "anden",
        icon: "🚂",
        name: "Plataforma 9 ¾ & Nuestro Destino",
        phrase:
          "«Subirme al tren de la vida contigo fue la mejor decisión que he tomado; pienso en ti en cada estación, en cada hora y en cada suspiro.»",
      },
      {
        id: "castillo",
        icon: "🏰",
        name: "El Castillo & Nuestra Cabaña",
        phrase:
          "«Admiro a la mujer extraordinaria que eres: tu mente brillante, tu sonrisa deslumbrante y ese corazón noble que es mi único hogar.»",
      },
      {
        id: "patronus",
        icon: "⚡",
        name: "El Patronus & La Promesa Always",
        phrase:
          "«Eres mi pensamiento más feliz, la luz que ahuyenta cualquier tormenta. Eres lo mejor de toda mi existencia. —¿After all this time? —Always.»",
      },
    ],
    rewardPoemTitle: "✦ Primer Fragmento: Andén 9 ¾ & Destino ✦",
    rewardPoem: [
      "No existe tren, reloj ni distancia en este mundo",
      "que pueda apartar tu recuerdo de mi mente.",
      "Pienso en ti en cada instante de mi día,",
      "porque eres el principio, el presente y mi futuro.",
    ],
    nextButtonText: "Viajar al Castillo de Hogwarts (Estación II) →",
  },

  // 6. Minijuego 2: «Cuestionario del Gran Comedor & El Castillo de Hogwarts»
  minigame2: {
    stationNumber: "Estación II",
    title: "El Gran Comedor de Hogwarts",
    instructions:
      "Bajo las velas flotantes y el techo encantado, responde con la sinceridad más pura de nuestro amor:",
    questions: [
      {
        question: "¿Qué tan presente estás en mis pensamientos todos los días de mi vida?",
        options: [
          {
            title: "Expreso de Hogwarts",
            icon: "🚂",
            text: "En cada segundo, desde que abro los ojos hasta que me duermo; eres mi pensamiento favorito a todas horas ❤️",
            correct: true,
            feedback: "¡Totalmente mi amor! No hay un solo momento en el que no estés viva en mi mente y en mi corazón ✨",
          },
          {
            title: "Tetera Mágica",
            icon: "🫖",
            text: "Solo cuando me acuerdo de encender la tetera mágica",
            correct: false,
            feedback: "¡Jajaja por favor! Si vivo pensando en ti 24/7 🤭",
          },
          {
            title: "Lechuza Mensajera",
            icon: "🦉",
            text: "Únicamente cuando veo una lechuza volar por la ventana",
            correct: false,
            feedback: "¡Para nada! Estás en mis pensamientos en cada respiro 🥰",
          },
        ],
        photo: "/photos/modulo1.png",
        photoCaption: "En el Andén 9 ¾ con el Expreso de Hogwarts, el comienzo de nuestra travesía.",
      },
      {
        question: "Si tuvieras que definir qué significas tú para mí en este universo...",
        options: [
          {
            title: "Expecto Patronum",
            icon: "⚡",
            text: "Eres el amor de mi vida, mi mayor orgullo, mi refugio y definitivamente lo mejor que me ha pasado en la existencia ✨",
            correct: true,
            feedback: "¡Exactamente mi reina! Haberte encontrado y ser tu esposo es el mayor regalo de mi vida entera 😍",
          },
          {
            title: "Clases de Pociones",
            icon: "🧪",
            text: "Una compañera de clases de Pociones Avanzadas",
            correct: false,
            feedback: "¡Oye, somos esposos y cómplices para toda la eternidad! 😂🪄",
          },
          {
            title: "Pergaminos Viejos",
            icon: "📜",
            text: "Alguien que me ayuda a ordenar pergaminos viejos",
            correct: false,
            feedback: "¡Nooo! Eres la dueña absoluta de mi alma y mi felicidad ❤️",
          },
        ],
        photo: "/photos/modulo2.png",
        photoCaption: "Expecto Patronum: Eres mi luz eterna, mi paz y mi pensamiento más feliz.",
      },
      {
        question: "Hablemos de nuestro futuro juntos... ¿cuál es ese plan soñado que construiremos paso a paso?",
        options: [
          {
            title: "Cabaña en el Bosque",
            icon: "🌲",
            text: "Escaparnos a una cabaña mágica en el bosque, con chimenea de piedra, lluvia afuera, buen vino y toda la vida para amarnos 💍🌲",
            correct: true,
            feedback: "¡Sí, mi cielo hermoso! Un plan perfecto que haremos realidad juntos para detener el tiempo a solas ✨",
          },
          {
            title: "Bosque Prohibido",
            icon: "🕷️",
            text: "Dormir en carpas en medio del Bosque Prohibido pasando frío",
            correct: false,
            feedback: "¡Jajaja con las acromántulas no! Queremos una cabaña cálida y hermosa con chimenea 🔥🤭",
          },
          {
            title: "Armario de la Escalera",
            icon: "🚪",
            text: "Mudarnos al armario debajo de la escalera",
            correct: false,
            feedback: "¡Jamás! Tú mereces un castillo entero y la cabaña más acogedora del bosque 🏰❤️",
          },
        ],
        photo: "/photos/modulo4.png",
        photoCaption: "Nuestra cabaña mágica soñada con chimenea, lluvia suave y faroles.",
      },
    ],
    retryPrompt: "¡Caaasi mi amor! Elige la verdad de nuestro corazón...",
    rewardPoemTitle: "✦ Segundo Fragmento: El Castillo & Mis Pensamientos ✦",
    rewardPoem: [
      "Ni en las mil salas del castillo más grande,",
      "ni en las páginas de los libros más sabios,",
      "existe una magia tan inmensa y verdadera",
      "como la suerte que tengo de tenerte en mi vida.",
    ],
    nextButtonText: "Conjurar el Encantamiento Lumos (Estación III) →",
  },

  // 7. Minijuego 3: «Encantamiento Lumos & La Constelación del Patronus»
  minigame3: {
    stationNumber: "Estación III",
    title: "Encantamiento Lumos & El Patronus",
    instructions:
      "Toca las luces mágicas del 1 al 7 para encender con tu varita el corazón resplandeciente entre los pinos y la niebla...",
    starCount: 7,
    constellationName: "«Constelación del Patronus Eterno»",
    rewardPoemTitle: "✦ Fragmentos III y IV: La Fuerza del Sauce y Always ✦",
    rewardPoem: [
      "Eres mi Patronus en la tormenta, mi calma y mi mayor alegría.",
      "La mujer que habita en mis pensamientos cada instante de mi día.",
      "Ahora los 4 fragmentos giran en el tiempo para sellar una promesa eterna...",
    ],
    nextButtonText: "¡Unir los 4 Fragmentos Mágicos! ✨",
  },

  // 8. Fase 4: El Clímax Espectacular (La Carta Mágica a Xóchitl Sinay)
  climax: {
    stationNumber: "El Clímax",
    title: "La Revelación",
    fuseButtonText: "✦ Unir los 4 Fragmentos con Magia ✦",
    assemblingMessage: "El giratiempo gira y las luces se funden en el corazón del fuego...",
    revelationTitle: "Para Xóchitl Sinay Barba Cuevas",

    letter: {
      salutation: "Para mi amada esposa, Xóchitl Sinay Barba Cuevas:",
      paragraphs: [
        "Mi amor, quise construir este rincón mágico para hacer una pausa en el tiempo y decirte algo que mi corazón siente con una fuerza inmensa en cada latido: te amo con toda mi alma, y no hay un solo día ni un solo instante en que no piense en ti.",
        "Pienso en ti en cada momento de mi rutina: en tu sonrisa que me llena de paz, en tu mirada tierna, en tu inteligencia brillante que tanto admiro, y en esa calidez única que convierte cualquier lugar en nuestro hogar. Tenerte como mi esposa es, sin dudarlo ni un milisegundo, lo mejor y más valioso que me ha pasado en toda la vida.",
        "Eres mi refugio y mi Patronus: esa luz invencible que disuelve cualquier nube gris. Hemos caminado juntos, soñado juntos y superado cualquier tormenta. Y hoy no quiero hablarte de la prisa del día a día, sino de nuestro futuro... de un plan hermoso que vamos a construir juntos con toda la ilusión.",
        "Sueño con el día en que nos escapemos a esa cabaña mágica en el bosque que tanto nos emociona, para escuchar la lluvia caer contra los cristales, acurrucarnos junto a la chimenea crepitante, disfrutar de una copa de vino y mirarnos a los ojos sabiendo que todo lo que necesitamos en este mundo es estar juntos...",
      ],
      closing: "Por siempre tuyo, con todo mi amor y devoción — Always,",
    },

    memoriesGallery: [
      {
        url: "/photos/modulo1.png",
        caption: "En el Andén 9 ¾ listos para recorrer la vida juntos en el Expreso de Hogwarts",
        tag: "Módulo I: Plataforma 9 ¾",
      },
      {
        url: "/photos/modulo2.png",
        caption: "Eres mi Patronus: la luz que disuelve cualquier tormenta y me llena de paz — Always",
        tag: "Módulo II: Expecto Patronum",
      },
      {
        url: "/photos/modulo3.png",
        caption: "Ni con un giratiempo cambiaría un solo segundo de los que he vivido a tu lado",
        tag: "Módulo III: El Giratiempo",
      },
      {
        url: "/photos/modulo4.png",
        caption: "Nuestra soñada cabaña mágica en el bosque, con chimenea, lluvia y toda la vida para amarnos",
        tag: "Módulo IV: Plan a Futuro",
      },
    ],

    finalQuestion: "Xóchitl Sinay... ¿aceptas que hagamos realidad este hermoso plan a futuro para escaparnos juntos a una cabaña mágica en el bosque, con chimenea, lluvia, buen vino y todo mi amor dedicado solo a ti? 🚂🏰🌲🌧️🍷🪄",
    yesButtonText: "¡Sí, mi amor! Prometido para nuestro futuro — Always ❤️⚡",
    noButtonText: "Solo si viajamos en el Expreso de Hogwarts... 🚂✨",

    noButtonResponses: [
      "¡El Expreso de Hogwarts saldrá puntual solo para los dos, mi reina! 🚂✨❤️",
      "¡Pienso en ti en cada segundo del día, Xóchitl Sinay! —Always 💖🪄",
      "¡Eres lo mejor que me ha pasado en toda la vida, jamás lo olvides! 🥰🏰",
      "¡El botón de arriba resplandece como un Patronus plateado! 👆✨",
      "¡Trato hecho! Ese plan a futuro en nuestra cabaña mágica será inolvidable 🌲🏡🌧️💍❤️",
    ],

    celebration: {
      badge: "✦ Promesa Sellada en el Andén 9 ¾ ✦",
      title: "¡Promesa Aceptada por mi Amada Esposa! 💖🚂🏰🪄",
      message:
        "Xóchitl Sinay, prometo amarte cada día con más fuerza, pensar en ti en cada paso, cuidarte, hacerte sonreír y hacer realidad muy pronto nuestro plan soñado en la cabaña en el bosque. Eres lo mejor de toda mi vida.",
      dateLabel: "Nuestro plan prometido a futuro:",
      dateValue: "Nuestra escapada mágica a una cabaña en el bosque 🌲🏡🌧️🍷🪄",
      signature: "Always tuyo,",
    },
  },
};
