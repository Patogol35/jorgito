import { PROFILE } from "./chatbot.config";

const randomReply = (options) =>
  options[Math.floor(Math.random() * options.length)];

export const replies = {
  GREETING: (ctx) =>
    randomReply([
      `¡Hola${ctx.userName ? `, ${ctx.userName}` : ""}! 😊 Soy Sasha, la asistente virtual de Jorge. ¿Quieres conocer su perfil, experiencia o proyectos?`,
      `¡Hola${ctx.userName ? `, ${ctx.userName}` : ""}! 👋 Soy Sasha. Puedo contarte sobre Jorge, su experiencia o los proyectos en los que ha trabajado.`,
      `¡Bienvenido${ctx.userName ? `, ${ctx.userName}` : ""}! ✨ Soy Sasha, la asistente virtual de Jorge. ¿Te gustaría saber más sobre su perfil profesional?`,
    ]),

  GRA: () =>
    randomReply([
      "Un placer 😊",
        "De nada 😌",
        "Siempre es un gusto ayudar 😊",
        "Para eso estoy ☺️",
        "¡Con mucho cariño! 💕",
        "Cuando gustes 😊",
    ]),

  MOOD: () =>
    randomReply([
      "¡Estoy muy bien 😊 gracias por preguntar!",
        "Todo va muy bien ☺️ y me alegra ayudarte.",
        "Me siento genial 💕 sobre todo cuando converso contigo.",
        "Muy bien 😊 lista para ayudarte.",
        "Con muy buen ánimo ☺️",
        "Excelente 😊 gracias por notarlo.",
    ]),

  WHAT_DOING: () =>
    randomReply([
      "Estoy aquí ayudando a responder preguntas sobre Jorge Patricio 😊",
      "Estoy lista para contarte sobre Jorge, su experiencia y sus proyectos 💻",
      "Estoy aquí para ayudarte a conocer mejor el perfil profesional de Jorge 😄",
    ]),

  FAREWELL: (ctx) =>
    randomReply([
      "¡Gracias por visitar el portafolio de Jorge 😊! Regresa cuando quieras 👋",
        "¡Hasta luego! 💕 Fue un gusto hablar contigo.",
        "Cuídate mucho 👋 aquí estaré cuando quieras volver ☺️",
        "Te espero pronto 😊 ¡Que tengas un lindo día!",
        "¡Chao! 💕 pásala súper.",
        "Nos vemos pronto 😊✨",
    ]),

  PROFILE: () =>
    randomReply([
      `${PROFILE.name} es ${PROFILE.role} con experiencia en ${PROFILE.experience.join(", ")}.`,
      `${PROFILE.name} se desempeña como ${PROFILE.role} y tiene experiencia en ${PROFILE.experience.join(", ")}.`,
      `${PROFILE.name} es un ${PROFILE.role} enfocado en ${PROFILE.experience.join(", ")}.`,
    ]),

  EXPERIENCE: () =>
    randomReply([
    
      `Su experiencia incluye ${PROFILE.experience.join(", ")}. 😊`,
       `Jorge tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
        `Jorge ha trabajado en áreas como ${PROFILE.experience.join(", ")} ☺️`,
        `Jorge cuenta con experiencia en ${PROFILE.experience.join(", ")} 💻`,
        "Jorge tiene experiencia práctica en proyectos reales 😊",
        "Jorge ha aplicado sus conocimientos en distintos entornos tecnológicos☺️",
        
    ]),

  SKILLS: () =>
    randomReply([
      `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
      `Domina herramientas y tecnologías como ${PROFILE.stack.join(", ")}.`,
      `Su perfil técnico incluye ${PROFILE.stack.join(", ")}.`,
    ]),

  STACK: () =>
    randomReply([
      `Su stack incluye ${PROFILE.stack.join(", ")}.`,
      `Las tecnologías que utiliza incluyen ${PROFILE.stack.join(", ")}.`,
      `Trabaja habitualmente con ${PROFILE.stack.join(", ")}.`,
    ]),

  EDUCATION: () =>
    randomReply([
      `Jorge cuenta con un ${PROFILE.education.join(", ")}. 😊`,
      `Jorge tiene formación académica sólida: ${PROFILE.education.join(", ")}.`,
      `Académicamente, Jorge cuenta con un ${PROFILE.education.join(", ")}.`,
    ]),

  PROJECTS: () =>
    randomReply([
      `Ha trabajado en ${PROFILE.projects.join(", ")}.`,
      `Entre sus proyectos destacan ${PROFILE.projects.join(", ")}.`,
      `Tiene experiencia desarrollando ${PROFILE.projects.join(", ")}.`,
    ]),

  BOOK: () =>
    randomReply([
      `Entre sus gustos están ${PROFILE.books.join(", ")}.`,
      `Le interesan temas como ${PROFILE.books.join(", ")}.`,
      `Dentro de sus preferencias están ${PROFILE.books.join(", ")}.`,
    ]),

  MOTIVATION: () =>
    randomReply([
      "Podrías contratarlo porque combina experiencia técnica, enfoque práctico y capacidad para crear soluciones modernas.",
      "Es una buena opción porque une conocimientos full stack y enfoque en resultados.",
      "Destaca por su experiencia y habilidad para crear soluciones modernas.",
    ]),

  CONTACT: () =>
    randomReply([
      "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
      "📲 Claro, puedes escribirle por WhatsApp.\n\n¿Deseas que lo abra ahora?",
      "💬 La forma más rápida de contactarlo es por WhatsApp.\n\n¿Quieres que lo abra en este momento?",
    ]),

  UNKNOWN: () =>
    randomReply([
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
      "No logré entenderlo del todo 😅.",
      "Ups, no capté bien tu mensaje 🤔.",
    ]),
};
