/**
 * ====================================================================
 * CONFIGURACIÓN PERSONALIZADA: PARA MI AMADA ESPOSA
 * XÓCHITL SINAY BARBA CUEVAS ✦ ENTRE EL MAR, EL VINO Y NUESTRO AMOR
 * ====================================================================
 * El misterio se mantiene en las primeras fases y se revela con todo
 * su esplendor en el clímax con la carta y la propuesta romántica.
 */

export const config = {
  // 1. Nombres y Destinataria
  partnerName: "Xóchitl Sinay Barba Cuevas",
  partnerShortName: "Xóchitl Sinay",
  yourName: "Tu esposo que te ama con toda su alma",

  // 2. Música y Sonido
  audioUrl: null,
  synthAmbientEnabled: true,

  // 3. Fase 0: Introducción con Botella Misteriosa en la orilla
  intro: {
    badge: "✦ Un Mensaje de Amor en la Orilla ✦",
    bottleTag: "Para la mujer de mi vida, mi hermosa esposa 💌",
    bottleTeaser:
      "Las olas del mar trajeron una botella misteriosa con un mensaje guardado en secreto solo para ti...",
    openBottleText: "Descorchar y abrir el secreto 🐚✨",
    unfoldedTitle: "¡Hola mi amor! Sé que la curiosidad te ganaría... 😉",
    unfoldedSubtitle:
      "Quería prepararte algo diferente, especial y que rompiera la rutina. Este mensaje de amor se fragmentó en 4 recuerdos a lo largo de la costa. Si logras reunirlos, descubrirás la propuesta que guardo en el corazón para nosotros dos...",
    startButtonText: "Comenzar nuestro viaje juntos ✨",
    headphonesNotice: "Ponte audífonos para escuchar las olas y la melodía 🎧",
  },

  // 4. Los 4 Fragmentos que irá desbloqueando
  fragments: [
    {
      id: 1,
      name: "Nuestra Pasión & El Mar",
      icon: "🍷",
      color: "#f43f5e",
      shortDesc: "Ese vino compartido y nuestra complicidad intacta",
    },
    {
      id: 2,
      name: "Nuestra Historia & Risas",
      icon: "✧",
      color: "#ff8fa3",
      shortDesc: "Cada momento a tu lado que atesoro en el alma",
    },
    {
      id: 3,
      name: "Hilos sobre el Mar",
      icon: "⋆",
      color: "#38bdf8",
      shortDesc: "El destino que unió nuestras vidas",
    },
    {
      id: 4,
      name: "Amor Eterno",
      icon: "❤",
      color: "#f5d061",
      shortDesc: "Infinito y profundo como el océano",
    },
  ],

  // 5. Minijuego 1: «Memoria del Mar & Nuestro Vino» (Juego de pares de 6 cartas)
  minigame1: {
    stationNumber: "Estación I",
    title: "Memoria del Mar & Nuestro Vino",
    instructions:
      "Encuentra los 3 pares que representan el amor, la complicidad y lo mucho que me encantas:",
    pairs: [
      {
        id: "vino",
        icon: "🍷",
        name: "Copa de Vino Tinto",
        phrase:
          "«Cada copa de vino contigo me confirma que haberte elegido como mi esposa es y será siempre la mejor decisión de mi vida.»",
      },
      {
        id: "olas",
        icon: "🌊",
        name: "Marea & Tu Mente Libre",
        phrase:
          "«Admiro a la mujer extraordinaria que eres: tu inteligencia, tu determinación, tu fuerza y esa autenticidad que me enamora a diario.»",
      },
      {
        id: "tinta",
        icon: "🖋️",
        name: "Arte, Belleza y Pasión",
        phrase:
          "«Me encantas completa, Xóchitl: tu mirada, tu sonrisa, tu cuerpo y el arte en tu piel... sigo tan loco por ti como el primer día.»",
      },
    ],
    rewardPoemTitle: "✦ Primer Fragmento: Nuestra Pasión & El Mar ✦",
    rewardPoem: [
      "Entre el vaivén del mar y una copa de buen vino,",
      "le doy gracias a la vida por tenerte como mi esposa.",
      "Tu mente brillante, tu risa y tu belleza infinita",
      "hacen que mi mundo entero sea perfecto a tu lado.",
    ],
    nextButtonText: "Avanzar a la Estación II →",
  },

  // 6. Minijuego 2: «El Cuestionario de Nuestra Historia»
  minigame2: {
    stationNumber: "Estación II",
    title: "Cuestionario de Nuestra Historia",
    instructions:
      "Preguntas de complicidad que solo nosotros dos conocemos en el corazón:",
    questions: [
      {
        question: "¿Qué pasa cada vez que nos escapamos juntos a tomar una copa de vino frente al mar?",
        options: [
          {
            text: "El tiempo se detiene, nos volvemos a enamorar y recordamos lo increíble que es compartir la vida juntos ❤️",
            correct: true,
            feedback: "¡Exactamente mi amor! Cuando estamos los dos a solas, el mundo exterior desaparece por completo ✨",
          },
          {
            text: "Nos ponemos a discutir sobre cómo se fabrican las latas de refresco",
            correct: false,
            feedback: "¡Jajaja para nada! Con nosotros siempre hay magia y risas 🤭",
          },
          {
            text: "Fingir que somos dos personas extrañas y solemnes",
            correct: false,
            feedback: "¡Jamás! Nuestra química y complicidad son únicas 🥰",
          },
        ],
        photo: "/photos/playa_vino1.png",
        photoCaption: "Nuestras risas y esa complicidad que jamás cambia.",
      },
      {
        question: "¿Qué es lo que más me atrae y me vuelve loco de ti, mi hermosa esposa?",
        options: [
          {
            text: "Absolutamente todo: tu inteligencia, tu carácter, tu cuerpo, tu sonrisa y el arte en tu piel que te hace única ✨",
            correct: true,
            feedback: "¡Tal cual! Me fascinas entera, por dentro y por fuera, cada día más 😍",
          },
          {
            text: "Que puedes memorizar el directorio telefónico en 2 minutos",
            correct: false,
            feedback: "Eres brillante, ¡pero la respuesta va directo a lo que me enamora de ti! 😂",
          },
          {
            text: "Que caminas como si fueras un robot de hojalata",
            correct: false,
            feedback: "¡Oye no! Si tienes una presencia y una belleza deslumbrante ❤️",
          },
        ],
        photo: "/photos/playa_vino2.png",
        photoCaption: "La reina de mi vida y de mi corazón bajo la luna.",
      },
      {
        question: "Con la mano en el corazón... ¿qué es lo que siento por ti después de todo nuestro camino juntos?",
        options: [
          {
            text: "Que eres el gran amor de mi vida y te volvería a elegir como mi esposa en esta y en mil vidas más 💍❤️",
            correct: true,
            feedback: "¡Sí, mi vida entera! Eres mi hogar, mi paz y mi mayor tesoro ✨",
          },
          {
            text: "Que somos buenos compañeros de fila en el banco",
            correct: false,
            feedback: "¡Jajaja no! Eres todo mi universo entero 🤭",
          },
          {
            text: "Que nos acostumbramos a la rutina",
            correct: false,
            feedback: "¡Para nada! Lo que siento por ti sigue ardiendo con la misma pasión que al principio 🔥",
          },
        ],
        photo: "/photos/playa_vino3.png",
        photoCaption: "Caminando juntos siempre, tomados de la mano.",
      },
    ],
    retryPrompt: "¡Caaasi mi amor! Respóndelo con el corazón...",
    rewardPoemTitle: "✦ Segundo Fragmento: Nuestra Historia & Risas ✦",
    rewardPoem: [
      "Dicen que el amor verdadero madura como el mejor vino,",
      "y nuestra historia es la prueba más hermosa de ello:",
      "más cómplices, más apasionados y más unidos",
      "con cada día que construimos juntos.",
    ],
    nextButtonText: "Avanzar a la Estación III →",
  },

  // 7. Minijuego 3: «Conectar la Constelación»
  minigame3: {
    stationNumber: "Estación III",
    title: "Hilos sobre el Océano",
    instructions:
      "Toca las estrellas del 1 al 7 para trazar el corazón estelar sobre las olas del mar...",
    starCount: 7,
    constellationName: "«Constelación del Amor Eterno»",
    rewardPoemTitle: "✦ Fragmentos III y IV: Hilos del Destino y Amor Eterno ✦",
    rewardPoem: [
      "Eres el faro de mi vida, mi calma y mi mayor aventura.",
      "La mujer con la que sueño, construyo y celebro cada día.",
      "Ahora los 4 fragmentos se funden en una sola promesa de amor...",
    ],
    nextButtonText: "¡Reunir todos los fragmentos! ✨",
  },

  // 8. Fase 4: El Clímax Espectacular (La Carta a Xóchitl Sinay)
  climax: {
    stationNumber: "El Clímax",
    title: "La Revelación",
    fuseButtonText: "✦ Unir los 4 Fragmentos ✦",
    assemblingMessage: "Los fragmentos giran en espiral hacia el centro cósmico...",
    revelationTitle: "Para Xóchitl Sinay Barba Cuevas",

    letter: {
      salutation: "Para mi amada esposa, Xóchitl Sinay Barba Cuevas:",
      paragraphs: [
        "Mi amor, quise construir este rincón frente al mar para hacer una pausa en el tiempo y recordarte algo que a veces la prisa de los días oculta, pero que mi corazón siente en cada respiro: sigo profundamente enamorado de ti, como el primer día o incluso más.",
        "Admiro enormemente a la mujer extraordinaria que eres: tu inteligencia, tu determinación, tu forma de pensar y la fuerza con la que iluminas nuestro hogar. Pero también quiero que nunca olvides lo mucho que me fascinas como mujer: tu sonrisa que desarma cualquier mal día, tu cuerpo, el arte de los tatuajes en tu piel, tu porte y esa belleza tan tuya que me sigue quitando el aliento.",
        "Ser tu esposo es el mayor honor y la bendición más grande de mi vida. Hemos reído, caminado juntos, vencido retos y construido un amor real, fuerte y leal. Y cada día que despierto a tu lado confirmo que no hay otro lugar en todo el universo donde prefiera estar que a tu lado.",
        "Por eso hoy quiero invitarte a detener el reloj, a disfrutar de una copa de vino frente a las olas y a recordarnos por qué nos elegimos para siempre...",
      ],
      closing: "Con todo mi amor, mi respeto y mi devoción eterna,",
    },

    memoriesGallery: [
      {
        url: "/photos/playa_vino1.png",
        caption: "Nuestras pláticas interminables con una copa de vino",
        tag: "Cómplices de Vida",
      },
      {
        url: "/photos/playa_vino2.png",
        caption: "Tu belleza y tu luz que iluminan mis noches",
        tag: "Bajo la Luna",
      },
      {
        url: "/photos/playa_vino3.png",
        caption: "Caminando juntos toda la vida, paso a paso",
        tag: "Amor Eterno",
      },
    ],

    finalQuestion: "Xóchitl Sinay... ¿aceptas escaparte conmigo este fin de semana a una cita romántica frente al mar, con buen vino y todo mi amor dedicado solo a ti? 🍷🌊💍",
    yesButtonText: "¡Sí, mi amor! Me encantaría ❤️",
    noButtonText: "Solo si hay vino tinto, mar y muchos besos... 🍷🌴",

    noButtonResponses: [
      "¡Habrá todo el vino, los mejores atardeceres y todos los besos del mundo, mi reina! 🍷❤️",
      "¡Te amo con toda mi alma, Xóchitl Sinay! 💖",
      "¡No puedes decirle que no a tu esposo enamorado! 😉🌊",
      "¡El botón de arriba brilla tanto como tu hermosa sonrisa! 👆✨",
      "¡Trato hecho! Una escapada inolvidable solo para nosotros dos 🏖️💍❤️",
    ],

    celebration: {
      badge: "✦ Promesa Sellada de Esposos Frente al Mar ✦",
      title: "¡Dijo que SÍ mi amada esposa! 💖💍🍷",
      message:
        "Xóchitl Sinay, prometo amarte cada día con más fuerza, cuidarte, hacerte sonreír, consentirte frente al mar y recordarte siempre lo afortunado que soy de ser tu esposo.",
      dateLabel: "Nuestra escapada romántica:",
      dateValue: "Este fin de semana frente al mar 🌊🌴",
      signature: "Siempre tuyo,",
    },
  },
};
