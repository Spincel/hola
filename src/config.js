/**
 * ====================================================================
 * CONFIGURACIÓN PERSONALIZADA: MARTHA, EL MAR Y LAS ESTRELLAS ✦
 * ====================================================================
 */

export const config = {
  // 1. Nombres
  partnerName: "Martha",
  yourName: "Tu amigo cómplice",

  // 2. Música y Sonido
  audioUrl: null,
  synthAmbientEnabled: true,

  // 3. Fase 0: Introducción
  intro: {
    badge: "✦ Entre el Mar y las Estrellas ✦",
    title: "El Mensaje de la Marea",
    subtitle:
      "Martha, hay un mensaje que llegó flotando desde el horizonte. Para descubrir el secreto que guarda, debes recorrer la costa y reunir 4 fragmentos estelares...",
    startButtonText: "Comenzar el viaje ✨",
    headphonesNotice: "Ponte audífonos para escuchar las olas y la melodía 🎧",
  },

  // 4. Los 4 Fragmentos que irá desbloqueando
  fragments: [
    {
      id: 1,
      name: "La Brisa & La Chispa",
      icon: "✦",
      color: "#38bdf8",
      shortDesc: "La energía fresca y única que transmites",
    },
    {
      id: 2,
      name: "Nuestras Risas",
      icon: "✧",
      color: "#ff8fa3",
      shortDesc: "Donde el tiempo se pasa volando",
    },
    {
      id: 3,
      name: "Hilos sobre el Mar",
      icon: "⋆",
      color: "#a78bfa",
      shortDesc: "Las constelaciones sobre el océano",
    },
    {
      id: 4,
      name: "La Química",
      icon: "❤",
      color: "#f43f5e",
      shortDesc: "Profunda e innegable como la marea",
    },
  ],

  // 5. Minijuego 1: «Encuentra las Luces»
  minigame1: {
    stationNumber: "Estación I",
    title: "Destellos en la Marea",
    instructions:
      "El mar nocturno brilla con bioluminiscencia. Mueve la linterna sobre las olas y descubre los 4 destellos escondidos en la orilla.",
    foundCountLabel: "Luces encontradas:",
    lights: [
      {
        id: "light-1",
        label: "Brisa Marina",
        phrase:
          "«Tu risa, Martha: es como la brisa del mar, fresca, libre y capaz de arreglar cualquier día nublado.»",
      },
      {
        id: "light-2",
        label: "Complicidad de Olas",
        phrase:
          "«Esa mirada con la que nos entendemos al instante sin decir una sola palabra, al ritmo del mar.»",
      },
      {
        id: "light-3",
        label: "Calma Infinita",
        phrase:
          "«La paz tan bonita que da estar cerca de ti, como sentarse en la arena a ver caer el atardecer.»",
      },
      {
        id: "light-4",
        label: "Química Profunda",
        phrase:
          "«Esa chispa inexplicable que se siente cada vez que coincidimos... profunda y viva como el océano.»",
      },
    ],
    rewardPoemTitle: "✦ Primer Fragmento: La Brisa y la Chispa ✦",
    rewardPoem: [
      "Entre el murmullo tranquilo de las olas",
      "y el cielo abierto sobre la marea,",
      "bastó conocerte, Martha,",
      "para saber que tu luz no se compara con ninguna.",
    ],
    nextButtonText: "Avanzar a la Estación II →",
  },

  // 6. Minijuego 2: «El Cuestionario de Cómplices»
  minigame2: {
    stationNumber: "Estación II",
    title: "Cuestionario de la Costa",
    instructions:
      "Solo quien guarda estos momentos en el corazón conoce las respuestas con sinceridad:",
    questions: [
      {
        question: "¿Cuál es nuestro superpoder secreto cuando nos ponemos a platicar?",
        options: [
          {
            text: "Hacer que las horas parezcan segundos, como ver la tarde caer en el mar",
            correct: true,
            feedback: "¡Totalmente! Cuando estamos hablando, el reloj pierde el control.",
          },
          {
            text: "Fingir que somos personas extremadamente serias y aburridas",
            correct: false,
            feedback: "¡Jajaja por favor! Si contigo la seriedad dura 3 segundos 🤭",
          },
          {
            text: "Hablar del clima con cara de aburrimiento",
            correct: false,
            feedback: "Jamás en la vida. Inténtalo con sinceridad, Martha...",
          },
        ],
        photo: "/photos/playa1.png",
        photoCaption: "Nuestras mejores charlas bajo el cielo frente al mar.",
      },
      {
        question: "Si tuviéramos una tarde libre frente a la playa, ¿cuál sería el plan ideal?",
        options: [
          {
            text: "Caminar descalzos por la orilla, reírnos de tonterías y ver las olas caer",
            correct: true,
            feedback: "El plan perfecto siempre es compartir la brisa y el atardecer contigo.",
          },
          {
            text: "Hacer una fila de banco durante 8 horas en el calor",
            correct: false,
            feedback: "¡Qué pesadilla! Elige el plan con amor por favor 😅",
          },
          {
            text: "Aprender a doblar toallas en forma de cisne",
            correct: false,
            feedback: "Mmm... ¡creo que podemos pasarla mil veces mejor frente al mar!",
          },
        ],
        photo: "/photos/playa2.png",
        photoCaption: "Cualquier atardecer frente al mar contigo se vuelve mágico.",
      },
      {
        question: "Seamos 100% sinceros... ¿qué es lo más evidente cuando estamos juntos?",
        options: [
          {
            text: "Esa química que se nota a kilómetros, por más que digamos 'solo somos amigos' 😉",
            correct: true,
            feedback: "¡Exacto! Hay cosas tan evidentes que hasta el mar entero las nota ✨",
          },
          {
            text: "Que los dos tenemos sueño todo el día",
            correct: false,
            feedback: "Bueno... tal vez a veces, ¡pero esa no es la respuesta correcta! 😂",
          },
          {
            text: "Que deberíamos dedicarnos a la pesca submarina",
            correct: false,
            feedback: "Pescadores no... pero de que hay química... la hay ❤️",
          },
        ],
        photo: "/photos/playa3.png",
        photoCaption: "Esa chispa que nunca se apaga entre nosotros.",
      },
    ],
    retryPrompt: "¡Caaasi! Piénsalo con la verdad, Martha...",
    rewardPoemTitle: "✦ Segundo Fragmento: Nuestras Risas ✦",
    rewardPoem: [
      "Dicen que el mar guarda los secretos más bellos,",
      "pero nuestra complicidad no la esconde nadie:",
      "está en cada risa, en cada mirada,",
      "y en esta química que siempre estuvo ahí.",
    ],
    nextButtonText: "Avanzar a la Estación III →",
  },

  // 7. Minijuego 3: «Conectar la Constelación»
  minigame3: {
    stationNumber: "Estación III",
    title: "Hilos sobre el Océano",
    instructions:
      "Toca las estrellas del 1 al 7 para trazar la constelación sobre el horizonte marino...",
    starCount: 7,
    constellationName: "«Constelación del Corazón Marino»",
    rewardPoemTitle: "✦ Fragmentos III y IV: El Destino y la Química ✦",
    rewardPoem: [
      "Hay personas que son como el mar:",
      "profundas, libres y llenas de magia.",
      "Tú eres todo eso y mucho más, Martha.",
      "Ahora todos los fragmentos están reunidos...",
    ],
    nextButtonText: "¡Reunir todos los fragmentos! ✨",
  },

  // 8. Fase 4: El Clímax Espectacular (La Revelación)
  climax: {
    stationNumber: "El Clímax",
    title: "La Revelación",
    fuseButtonText: "✦ Unir los 4 Fragmentos ✦",
    assemblingMessage: "Los fragmentos se unen al compás de la marea...",
    revelationTitle: "Para Martha",

    letter: {
      salutation: "Querida Martha,",
      paragraphs: [
        "Si llegaste hasta aquí, habrás notado que cada pequeño juego guardaba un pedacito de lo que me encanta de ti. No quería decírtelo con un mensaje común; una persona tan especial como tú merecía una sorpresa diferente.",
        "Dicen que el mar tiene la magia de dar paz y libertad a quien sabe apreciarlo. Para mí, compartir momentos contigo se siente exactamente así: las horas pasan volando, las risas fluyen sin esfuerzo y cualquier día común se vuelve inolvidable.",
        "Siempre hemos dicho que 'solo somos amigos'... pero la verdad es que esa química que tenemos, esa complicidad tan nuestra y esa forma en que nos entendemos, es algo que no tengo con nadie más en este mundo.",
        "Por eso hoy quise traerte hasta esta orilla de estrellas, para hacerte una pregunta con todo mi corazón...",
      ],
      closing: "Con mucho cariño y toda mi complicidad,",
    },

    memoriesGallery: [
      {
        url: "/photos/playa1.png",
        caption: "Nuestras mejores charlas bajo la noche marina",
        tag: "Bioluminiscencia",
      },
      {
        url: "/photos/playa2.png",
        caption: "Caminar por la orilla y reírnos de todo",
        tag: "Atardeceres Únicos",
      },
      {
        url: "/photos/playa3.png",
        caption: "Esa fogata de risas y complicidad que nunca se apaga",
        tag: "Nuestra Química",
      },
    ],

    finalQuestion: "Martha... ¿y si dejamos de fingir que solo es casualidad y vemos a dónde nos lleva esta química? ✨",
    yesButtonText: "¡Me encanta la idea! Acepto ❤️",
    noButtonText: "Solo si me invitas un coco en la playa... 😜",

    noButtonResponses: [
      "¡Trato hecho! El coco y los taquitos en la playa van por mi cuenta 🥥🌮",
      "Esa química es más grande que el océano entero, Martha... 🤭",
      "¡No lo pienses tanto, mira qué bonito brilla el botón verde! 👉",
      "¿A poco no te encantó tu sorpresa en la playa? 🥰",
      "¡Piénsalo bien, mira que no cualquiera te programa un mar de estrellas! ✨",
      "¡Te atrapé! Mejor dale al botón de la izquierda ❤️",
    ],

    celebration: {
      badge: "✦ Promesa Sellada Frente al Mar ✦",
      title: "¡Dijo que SÍ! 💖🌊",
      message:
        "Martha, prometo sacarte sonrisas todos los días, llevarte a ver el mar, ser tu cómplice favorito y cuidar cada momento que construyamos juntos.",
      signature: "Siempre para ti,",
    },
  },
};
