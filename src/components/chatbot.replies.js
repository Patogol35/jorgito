import { PROFILE } from "./chatbot.config";

const randomReply = (options) =>
  options[Math.floor(Math.random() * options.length)];

export const replies = {
  GREETING: () =>
    randomReply([
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
      "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
      "Hola 😊 Soy Sasha, ¿en qué puedo ayudarte hoy?",
      "¡Bienvenido! 👋 Soy Sasha y con gusto te ayudo.",
      "Hola ✨ estoy aquí para ayudarte a conocer más sobre Jorge.",
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
      "Fui creada por Jorge Patricio 😊, con mucho cariño y dedicación 💕",
      "Mi creador es Jorge Patricio 👨‍💻, quien me diseñó para ayudarte 🤖",
      "Jorge Patricio fue quien me desarrolló 😊, soy parte de sus proyectos 💻",
      "Me creó Jorge Patricio ✨ como su asistente virtual inteligente 🤖",
      "Soy una creación de Jorge Patricio 💕, pensada para ayudarte a conocerlo mejor 😊",
      "Jorge Patricio me dio vida 💻✨ para que pueda interactuar contigo 🤖",
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
      `Cuenta con experiencia en ${PROFILE.experience.join(", ")} 😊`,
      `Ha trabajado en áreas como ${PROFILE.experience.join(", ")} ☺️`,
      `Tiene experiencia en ${PROFILE.experience.join(", ")} 💻`,
      "Tiene experiencia práctica en proyectos reales 😊",
      "Ha aplicado sus conocimientos en distintos entornos tecnológicos ☺️",
    ]),

  SKILLS: () =>
    randomReply([
      `Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
      `Utiliza herramientas modernas como ${PROFILE.stack.join(", ")} ☺️`,
      `Domina tecnologías actuales como ${PROFILE.stack.join(", ")} 💻`,
      `Maneja herramientas modernas del desarrollo web como ${PROFILE.stack.join(", ")} 😊`,
      `Aplica buenas prácticas usando ${PROFILE.stack.join(", ")} 💕`,
    ]),

  STACK: () =>
    randomReply([
      `Su stack incluye ${PROFILE.stack.join(", ")}.`,
      `Las tecnologías que utiliza incluyen ${PROFILE.stack.join(", ")}.`,
      `Trabaja habitualmente con ${PROFILE.stack.join(", ")}.`,
    ]),

  EDUCATION: () =>
    randomReply([
      `Académicamente, cuenta con ${PROFILE.education.join(", ")}.`,
      `Tiene formación en ${PROFILE.education.join(", ")} 😊`,
      `Cuenta con una base académica sólida: ${PROFILE.education.join(", ")} ☺️`,
      `Se formó profesionalmente en ${PROFILE.education.join(", ")} 💕`,
      `Su formación respalda su perfil profesional: ${PROFILE.education.join(", ")} 💻`,
    ]),

  PROJECTS: () =>
    randomReply([
      `Ha desarrollado ${PROFILE.projects.join(", ")} 💕`,
      `Ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
      `Participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`,
      `Desarrolla soluciones relacionadas con ${PROFILE.projects.join(", ")} 💻`,
      "Ha creado proyectos funcionales y modernos 😊",
    ]),

  BOOK: () =>
    randomReply([
      "Le encantan los libros de misterio 📚, especialmente los de Dan Brown 😊",
      "Disfruta leer novelas de misterio y suspenso 📖✨",
      "Los libros de Dan Brown son de sus favoritos 📚",
      "Le gusta mucho el suspenso literario 😊",
    ]),

  MOTIVATION: () =>
    randomReply([
      "Porque combina formación sólida, experiencia real y un enfoque práctico 😊",
      "Porque es responsable, profesional y apasionado ☺️",
      "Porque crea soluciones con calidad y compromiso 💕",
      "Porque aporta valor real a cada proyecto 😊",
    ]),

  CONTACT: () =>
    randomReply([
      "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
      "📲 Puedes escribirle por WhatsApp.\n\n¿Deseas que lo abra?",
      "💬 La forma más rápida es por WhatsApp.\n\n¿Quieres abrirlo?",
    ]),

  UNKNOWN: () =>
    randomReply([
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
      "No logré entenderlo del todo 😅",
      "Ups, no capté bien tu mensaje 🤔",
    ]),
};
