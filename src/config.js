/**
 * ====================================================================
 * CONFIGURACIÓN PERSONALIZADA: EL MAR, EL VINO Y LA ATRACCIÓN ✦
 * ====================================================================
 * El nombre de ella NO se menciona al inicio. Se mantiene el misterio
 * hasta el clímax final, donde se revela la carta para Martha.
 */

export const config = {
  // 1. Nombres (El nombre se revela únicamente en la carta final y clímax)
  partnerName: "Martha",
  yourName: "Tu amigo cómplice",

  // 2. Música y Sonido
  audioUrl: null,
  synthAmbientEnabled: true,

  // 3. Fase 0: Introducción con Botella Misteriosa (Sin nombre explícito para máxima intriga)
  intro: {
    badge: "✦ Un Misterio en la Orilla ✦",
    bottleTag: "Para alguien que me quita el aliento 💌",
    bottleTeaser:
      "Las olas del mar trajeron una botella misteriosa hasta la orilla con un mensaje guardado en secreto...",
    openBottleText: "Descorchar y abrir el secreto 🐚✨",
    unfoldedTitle: "¡Hola! Sé que la curiosidad te ganaría... 😉",
    unfoldedSubtitle:
      "Me dijeron que te gusta el mar, el buen vino y los misterios... Este mensaje se fragmentó en 4 piezas a lo largo de la costa. Si logras reunirlos, descubrirás exactamente quién eres para mí y lo que he guardado en silencio...",
    startButtonText: "Comenzar la expedición marina ✨",
    headphonesNotice: "Ponte audífonos para escuchar las olas y la melodía 🎧",
  },

  // 4. Los 4 Fragmentos que irá desbloqueando
  fragments: [
    {
      id: 1,
      name: "La Atracción & La Brisa",
      icon: "🍷",
      color: "#f43f5e",
      shortDesc: "Esa copa de vino y esa vibra magnética",
    },
    {
      id: 2,
      name: "Nuestras Risas",
      icon: "✧",
      color: "#ff8fa3",
      shortDesc: "Donde las horas vuelan sin darnos cuenta",
    },
    {
      id: 3,
      name: "Hilos sobre el Mar",
      icon: "⋆",
      color: "#38bdf8",
      shortDesc: "Las constelaciones sobre el océano",
    },
    {
      id: 4,
      name: "La Química",
      icon: "❤",
      color: "#f5d061",
      shortDesc: "Profunda e innegable como la marea",
    },
  ],

  // 5. Minijuego 1: «Memoria del Mar & Vino» (Juego de pares de 6 cartas)
  minigame1: {
    stationNumber: "Estación I",
    title: "Memoria del Mar & Vino",
    instructions:
      "Encuentra los 3 pares ocultos entre las copas de vino tinto, la marea y el arte que nos conecta...",
    pairs: [
      {
        id: "vino",
        icon: "🍷",
        name: "Copa de Vino Tinto",
        phrase:
          "«Me fascina esa copa de vino compartida contigo, donde una plática casual se vuelve la más envolvente del mundo.»",
      },
      {
        id: "olas",
        icon: "🌊",
        name: "Marea & Libertad",
        phrase:
          "«Tu mente libre, tu manera decidida de pensar y esa autenticidad tan tuya me atrapan más de lo que imaginas.»",
      },
      {
        id: "tinta",
        icon: "🖋️",
        name: "Arte en la Piel",
        phrase:
          "«Tu porte, tu sonrisa, cada tatuaje en tu piel... me atraes completa y de una forma que ya no puedo fingir que no noto.»",
      },
    ],
    rewardPoemTitle: "✦ Primer Fragmento: La Atracción y la Brisa ✦",
    rewardPoem: [
      "Entre el murmullo de las olas y el aroma a buen vino,",
      "hay personas que simplemente te desarman al mirarlas.",
      "Tu mente, tu estilo y esa belleza tan tuya",
      "hacen imposible mirar hacia otro lado.",
    ],
    nextButtonText: "Avanzar a la Estación II →",
  },

  // 6. Minijuego 2: «El Cuestionario de Cómplices»
  minigame2: {
    stationNumber: "Estación II",
    title: "Cuestionario de la Costa",
    instructions:
      "Solo quien guarda estos momentos en el corazón conoce las respuestas con total sinceridad:",
    questions: [
      {
        question: "¿Qué pasa cuando nos sentamos a tomar una copa de vino o café frente al mar?",
        options: [
          {
            text: "Las horas vuelan, las risas fluyen y esa atracción entre nosotros se vuelve imposible de disimular",
            correct: true,
            feedback: "¡Totalmente! Cuando estamos hablando, el reloj pierde el control y la química se siente en el aire.",
          },
          {
            text: "Fingir que somos dos personas extremadamente aburridas",
            correct: false,
            feedback: "¡Jajaja por favor! Si contigo la seriedad dura 3 segundos 🤭",
          },
          {
            text: "Ponernos a discutir sobre el precio internacional del carbón",
            correct: false,
            feedback: "Jamás en la vida. Elige con el corazón...",
          },
        ],
        photo: "/photos/playa_vino1.png",
        photoCaption: "Nuestra química innegable entre copas de vino y risas.",
      },
      {
        question: "¿Qué es lo primero que llama la atención de ti cuando entras a cualquier lugar?",
        options: [
          {
            text: "Esa combinación letal: tu seguridad, tu inteligencia, tu belleza y esos tatuajes que te dan un estilo único",
            correct: true,
            feedback: "¡Tal cual! Tienes una presencia y un porte que no se olvidan jamás.",
          },
          {
            text: "Que pareces un muñeco de cera de museo",
            correct: false,
            feedback: "¡Oye no! Si eres pura energía y carisma 😂",
          },
          {
            text: "Que seguro caminas con un manual de instrucciones en la mano",
            correct: false,
            feedback: "¡Para nada! Tu espontaneidad es de las cosas que más me gustan.",
          },
        ],
        photo: "/photos/playa_vino2.png",
        photoCaption: "Esa presencia, tu sonrisa y el arte en tu piel que te hacen única.",
      },
      {
        question: "Seamos 100% sinceros... ¿por qué siempre ha habido tanta química entre nosotros?",
        options: [
          {
            text: "Porque me atraes completa: tu manera de pensar, tu risa, tu cuerpo y esa vibra que no tiene nadie más 😉",
            correct: true,
            feedback: "¡Exacto! Hay cosas tan evidentes que sería una tontería seguir negándolas ✨",
          },
          {
            text: "Porque nos confunden con actores de comedia",
            correct: false,
            feedback: "Comediantes tal vez, ¡pero esa no es la verdadera respuesta! 😂",
          },
          {
            text: "Porque nos aburrimos de ver series",
            correct: false,
            feedback: "Mmm... ¡sabes bien que es algo mucho más fuerte que eso!",
          },
        ],
        photo: "/photos/playa_vino3.png",
        photoCaption: "Esa chispa que siempre ha estado encendida entre los dos.",
      },
    ],
    retryPrompt: "¡Caaasi! Respóndelo con la verdad...",
    rewardPoemTitle: "✦ Segundo Fragmento: Nuestras Risas ✦",
    rewardPoem: [
      "Dicen que el mar guarda los secretos más bellos,",
      "pero nuestra complicidad no la esconde nadie:",
      "está en cada risa compartida, en cada mirada,",
      "y en esta química que siempre estuvo ahí.",
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
    constellationName: "«Constelación del Corazón Marino»",
    rewardPoemTitle: "✦ Fragmentos III y IV: El Destino y la Química ✦",
    rewardPoem: [
      "Hay mujeres que son como el mar:",
      "profundas, libres, magnéticas y llenas de arte.",
      "Tú eres todo eso y mucho más.",
      "Ahora los 4 fragmentos están listos para unirse...",
    ],
    nextButtonText: "¡Reunir todos los fragmentos! ✨",
  },

  // 8. Fase 4: El Clímax Espectacular (Aquí se revela el nombre de Martha por primera vez)
  climax: {
    stationNumber: "El Clímax",
    title: "La Revelación",
    fuseButtonText: "✦ Unir los 4 Fragmentos ✦",
    assemblingMessage: "Los fragmentos giran en espiral hacia el centro cósmico...",
    revelationTitle: "Para Martha",

    letter: {
      salutation: "Querida Martha,",
      paragraphs: [
        "Si llegaste hasta aquí, habrás notado que cada pequeño juego guardaba una verdad que ya no tenía sentido seguir callando. No quería decírtelo con un mensaje común; una mujer tan especial como tú merecía una sorpresa diferente.",
        "Dicen que el mar y el buen vino son para quienes saben disfrutar lo auténtico. Y para mí, no hay nadie más auténtica que tú. Me encanta tu mente, tu forma libre y decidida de pensar, y no voy a mentirte: me fascinas completa, de pies a cabeza. Tu mirada, tu sonrisa, tu porte y el arte de cada tatuaje en tu piel te hacen una mujer única, de esas que marcan para siempre.",
        "Siempre hemos bromeado con que 'solo somos amigos'... pero hay miradas, silencios y una atracción tan viva que sería una tontería ignorarla.",
        "Por eso hoy quise traerte hasta esta orilla de estrellas, para hacerte una pregunta con todo mi corazón...",
      ],
      closing: "Con mucho cariño y toda mi complicidad,",
    },

    memoriesGallery: [
      {
        url: "/photos/playa_vino1.png",
        caption: "Nuestras mejores charlas con una copa de vino",
        tag: "Química & Vino",
      },
      {
        url: "/photos/playa_vino2.png",
        caption: "La magia de tu risa y tu porte bajo la luna",
        tag: "Noches frente al mar",
      },
      {
        url: "/photos/playa_vino3.png",
        caption: "Por muchos atardeceres más a tu lado",
        tag: "Inolvidables",
      },
    ],

    finalQuestion: "Martha... ¿y si dejamos de fingir que solo somos amigos y vemos a dónde nos lleva todo esto este fin de semana? ✨",
    yesButtonText: "¡Me encanta la idea! Acepto ❤️",
    noButtonText: "Solo si hay vino tinto y el mar enfrente... 🍷🌊",

    noButtonResponses: [
      "¡El vino tinto y la mejor vista van por mi cuenta! 🍷🌴",
      "Esa química ya no se puede ocultar, Martha... 🤭",
      "¡Piénsalo bien, mira que no cualquiera te programa un mar entero! ✨",
      "¡El botón de arriba brilla mucho más bonito! 👆❤️",
      "¿A poco no te encantó tu sorpresa? 🥰",
      "¡Trato hecho! El vino y la playa nos esperan 🏖️❤️",
    ],

    celebration: {
      badge: "✦ Promesa Sellada Frente al Mar ✦",
      title: "¡Dijo que SÍ! 💖🍷",
      message:
        "Martha, prometo sacarte sonrisas todos los días, disfrutar de un buen vino contigo frente al mar, ser tu cómplice favorito y no dejar de recordarte lo increíble que eres.",
      dateLabel: "Cita oficial:",
      dateValue: "Este fin de semana frente al mar 🌊🌴",
      signature: "Siempre para ti,",
    },
  },
};
