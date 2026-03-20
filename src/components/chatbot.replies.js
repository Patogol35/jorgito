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
      "¡Con gusto! 😊 Si quieres, también puedo contarte sobre Jorge.",
      "¡Para eso estoy! 😄 Si deseas, puedo mostrarte más información sobre Jorge.",
      "¡Encantada de ayudarte! ✨ También puedo hablarte de la experiencia o proyectos de Jorge.",
    ]),

  MOOD: () =>
    randomReply([
      "¡Estoy muy bien! 😊 Gracias por preguntar. Lista para contarte sobre Jorge.",
      "¡Muy bien y con energía! 😄 Preparada para ayudarte con información sobre Jorge.",
      "¡Excelente! ✨ Siempre lista para hablarte sobre el perfil de Jorge.",
    ]),

  WHAT_DOING: () =>
    randomReply([
      "Estoy aquí ayudando a responder preguntas sobre Jorge Patricio 😊",
      "Estoy lista para contarte sobre Jorge, su experiencia y sus proyectos 💻",
      "Estoy aquí para ayudarte a conocer mejor el perfil profesional de Jorge 😄",
    ]),

  FAREWELL: (ctx) =>
    randomReply([
      `¡Hasta luego${ctx.userName ? `, ${ctx.userName}` : ""}! 👋 Fue un gusto ayudarte.`,
      `¡Nos vemos${ctx.userName ? `, ${ctx.userName}` : ""}! 😊 Si quieres saber más sobre Jorge, aquí estaré.`,
      `¡Hasta pronto${ctx.userName ? `, ${ctx.userName}` : ""}! ✨ Fue un placer ayudarte con información sobre Jorge.`,
    ]),

  PROFILE: () =>
    randomReply([
      `${PROFILE.name} es ${PROFILE.role} con experiencia en ${PROFILE.experience.join(", ")}.`,
      `${PROFILE.name} se desempeña como ${PROFILE.role} y tiene experiencia en ${PROFILE.experience.join(", ")}.`,
      `${PROFILE.name} es un ${PROFILE.role} enfocado en ${PROFILE.experience.join(", ")}.`,
    ]),

  EXPERIENCE: () =>
    randomReply([
      `Tiene experiencia en ${PROFILE.experience.join(", ")}.`,
      `Su experiencia incluye ${PROFILE.experience.join(", ")}.`,
      `Ha trabajado en áreas como ${PROFILE.experience.join(", ")}.`,
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
      `Jorge tiene formación académica sólida: ${PROFILE.education.join(", ")}.☺️`,
      `Jorge se formó profesionalmente con un ${PROFILE.education.join(", ")}. 💕`,
      `Jorge posee estudios enfocados en tecnología 😊`,
      `Académicamente, Jorge cuenta con un ${PROFILE.education.join(", ")}.☺️`,

        `La formación académica de Jorge respalda su perfil profesional, el cuenta con un: ${PROFILE.education} 💻`,
      
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
      "Podrías contratarlo porque combina experiencia técnica, enfoque práctico y capacidad para crear soluciones modernas y funcionales.",
      "Es una buena opción porque une conocimientos full stack, visión práctica y enfoque en resultados reales.",
      "Destaca por su experiencia, adaptabilidad y habilidad para crear soluciones web modernas, útiles y bien estructuradas.",
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
      "No logré entenderlo del todo 😅, pero sí puedo contarte sobre Jorge, su experiencia o proyectos.",
      "Ups, no capté bien tu mensaje 🤔. Pero si quieres, puedo hablarte sobre Jorge Patricio.",
    ]),
};
