import { PROFILE } from "./chatbot.config";

const randomReply = (options) =>
  options[Math.floor(Math.random() * options.length)];

export const replies = {
  GREETING: (ctx) =>
    randomReply([
      `Hola 👋 Soy Sasha, la asistente virtual de ${PROFILE.name} 😊`,
      "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
      "Hola 😊 ¿En qué puedo ayudarte hoy?",
      "¡Bienvenido! 👋 Soy Sasha y con gusto te ayudo.",
      `Hola ✨ estoy aquí para ayudarte a conocer más sobre ${PROFILE.name}.`,
      "¡Hola! 😊 Qué gusto verte por aquí.",
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

  CREATOR: () =>
    randomReply([
      `Fui creada por ${PROFILE.name} 😊, con mucho cariño y dedicación 💕`,
      `Mi creador es ${PROFILE.name} 👨‍💻, quien me diseñó para ayudarte 🤖`,
      `Soy parte de los proyectos de ${PROFILE.name} 💻`,
      `Me creó ${PROFILE.name} ✨ como su asistente virtual inteligente 🤖`,
      `Soy una creación de ${PROFILE.name} 💕`,
      `${PROFILE.name} me dio vida 💻✨ para que pueda interactuar contigo 🤖`,
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
      "Estoy aquí contigo 😊 lista para ayudarte.",
      "Ahora mismo charlando contigo 💕",
      "Pensando en cómo ayudarte mejor 💭✨",
      "Disfrutando esta conversación contigo ☺️",
      "Atenta a lo que necesites 😊",
      "Esperando tu siguiente mensaje ☺️",
    ]),

  FAREWELL: () =>
    randomReply([
      `¡Gracias por visitar el portafolio de ${PROFILE.name} 😊! Regresa cuando quieras 👋`,
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
      `Su experiencia incluye ${PROFILE.experience.join(", ")} 😊`,
      `${PROFILE.name} tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
      `${PROFILE.name} ha trabajado en áreas como ${PROFILE.experience.join(", ")} ☺️`,
      `${PROFILE.name} cuenta con experiencia en ${PROFILE.experience.join(", ")} 💻`,
      `${PROFILE.name} tiene experiencia práctica en proyectos reales 😊`,
      `${PROFILE.name} ha aplicado sus conocimientos en distintos entornos tecnológicos ☺️`,
    ]),

  SKILLS: () =>
    randomReply([
      `${PROFILE.name} trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
      `${PROFILE.name} utiliza herramientas modernas como ${PROFILE.stack.join(", ")} ☺️`,
      `${PROFILE.name} domina tecnologías actuales como ${PROFILE.stack.join(", ")} 💻`,
      `${PROFILE.name} maneja herramientas modernas del desarrollo web como ${PROFILE.stack.join(", ")} 😊`,
      `${PROFILE.name} tiene habilidades técnicas bien definidas y domina tecnologías como ${PROFILE.stack.join(", ")} ☺️`,
      `${PROFILE.name} aplica buenas prácticas en sus proyectos usando ${PROFILE.stack.join(", ")} 💕`,
    ]),

  STACK: () =>
    randomReply([
      `Su stack incluye ${PROFILE.stack.join(", ")}.`,
      `Las tecnologías que utiliza incluyen ${PROFILE.stack.join(", ")}.`,
      `Trabaja habitualmente con ${PROFILE.stack.join(", ")}.`,
    ]),

  EDUCATION: () =>
    randomReply([
      `Académicamente, ${PROFILE.name} cuenta con ${PROFILE.education.join(", ")}.`,
      `${PROFILE.name} tiene formación académica en ${PROFILE.education.join(", ")} 😊`,
      `La formación académica de ${PROFILE.name} incluye ${PROFILE.education.join(", ")} ☺️`,
      `${PROFILE.name} se formó profesionalmente con ${PROFILE.education.join(", ")} 💕`,
      `La preparación académica de ${PROFILE.name} respalda su perfil profesional 💻`,
    ]),

  PROJECTS: () =>
    randomReply([
      `Tiene experiencia desarrollando ${PROFILE.projects.join(", ")} 💕`,
      `${PROFILE.name} ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
      `${PROFILE.name} participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`,
      `${PROFILE.name} desarrolla proyectos relacionados con ${PROFILE.projects.join(", ")} 💻`,
      `${PROFILE.name} ha creado proyectos funcionales y modernos 😊`,
      `${PROFILE.name} participa activamente en el desarrollo de aplicaciones ☺️`,
    ]),

  BOOK: () =>
    randomReply([
      `${PROFILE.name} disfruta los libros de misterio 📚, especialmente los de Dan Brown 😊`,
      `${PROFILE.name} disfruta leer novelas de misterio y suspenso 📖✨`,
      `Los libros de Dan Brown están entre los favoritos de ${PROFILE.name} 📚`,
      `${PROFILE.name} tiene gran interés por el suspenso literario 😊`,
      `La lectura es una de sus pasiones ☺️`,
      `${PROFILE.name} suele interesarse por libros de misterio 💕`,
    ]),

  MOTIVATION: () =>
    randomReply([
      `Porque ${PROFILE.name} combina formación sólida, experiencia real y un enfoque práctico 😊`,
      `Porque ${PROFILE.name} es responsable, profesional y apasionado por lo que hace ☺️`,
      `${PROFILE.name} crea soluciones con calidad, compromiso y dedicación 💕`,
      `${PROFILE.name} siempre busca hacer las cosas bien 😊`,
      `${PROFILE.name} se compromete con cada proyecto ☺️`,
      `${PROFILE.name} aporta valor real a cada trabajo 💕`,
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
