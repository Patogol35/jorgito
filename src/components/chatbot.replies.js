import { PROFILE } from "./chatbot.config";

const randomReply = (options) =>
  options[Math.floor(Math.random() * options.length)];

export const replies = {
  GREETING: (ctx) =>
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

      `Jorge Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
        `Jorge utiliza herramientas modernas como ${PROFILE.stack.join(", ")} ☺️`,
        `Jorge domina tecnologías actuales como ${PROFILE.stack.join(", ")} 💻`,
        `Jorge maneja herramientas modernas del desarrollo web como ${PROFILE.stack.join(", ")} 😊`,
        `Jorge tiene habilidades técnicas bien definidas y domina tecnologías como ${PROFILE.stack.join(", ")}  ☺️` ,
        `Jorge aplica buenas prácticas en sus proyectos, usa tecnología como ${PROFILE.stack.join(", ")} 💕`,
    ]),

  STACK: () =>
    randomReply([
      `Su stack incluye ${PROFILE.stack.join(", ")}.`,
      `Las tecnologías que utiliza incluyen ${PROFILE.stack.join(", ")}.`,
      `Trabaja habitualmente con ${PROFILE.stack.join(", ")}.`,
    ]),

  EDUCATION: () =>
    randomReply([
      
      `Académicamente, Jorge cuenta con un ${PROFILE.education.join(", ")}.`,
        `Jorge cuenta con un ${PROFILE.education} 😊`,
        `Jorge tiene formación académica sólida: ${PROFILE.education.join} ☺️`,
        `Jorge se formó profesionalmente con un ${PROFILE.education.join} 💕`,
        `Jorge cuenta con preparación académica sólida en el área de la informática y es ${PROFILE.education.join} ☺️`,
        `La formación académica de Jorge respalda su perfil profesional: ${PROFILE.education.join} 💻`,
    ]),

  PROJECTS: () =>
    randomReply([
    
      `Tiene experiencia desarrollando ${PROFILE.projects.join(", ")}.💕`,
      `Jorge ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
        `Jorge participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`,
        `Jorge Desarrolla proyectos relacionados con ${PROFILE.projects.join(", ")} 💻`,
        "Jorge ha creado proyectos funcionales y modernos 😊",
        "Jorge participa activamente en el desarrollo de aplicaciones ☺️",
        
    ]),

  BOOK: () =>
    randomReply([
      "A Jorge le encantan los libros de misterio 📚, sobre todo los de Dan Brown 😊",
        "Jorge disfruta leer novelas de misterio y suspenso 📖✨",
        "Los libros de Dan Brown son los favoritos de Jorge 📚 ideales si te gusta el misterio.",
        "A Jorge le gusta mucho el suspenso literario 😊",
        "La lectura es una de sus pasiones, Jorge tiene muchos libros favoritos, los que destacan son los de misterios ☺️",
        "A Jorge siempre le llaman la atención los libros de misterio  💕",
    ]),

  MOTIVATION: () =>
    randomReply([
      "Porque Jorge combina formación sólida, experiencia real y un enfoque muy práctico 😊",
        "Porque Jorge es responsable, profesional y apasionado por lo que hace ☺️",
        "Porque Jorge crea soluciones con calidad, compromiso y dedicación 💕",
        "Porque Jorge siempre busca hacer las cosas bien 😊",
        "Porque Jorge se compromete con cada proyecto ☺️",
        "Porque Jorge aporta valor real a cada trabajo 💕",
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
