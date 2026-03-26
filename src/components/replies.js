export const createReplies = ({ pickNonRepeated, PROFILE }) => ({
    GRA: (ctx) =>
      pickNonRepeated(ctx, "GRA", [
        "Un placer 😊",
        "De nada 😌",
        "Siempre es un gusto ayudar 😊",
        "Para eso estoy ☺️",
        "¡Con mucho cariño! 💕",
        "Cuando gustes 😊",
      ]),

    NICE_TO_MEET: (ctx) =>
  pickNonRepeated(ctx, "NICE_TO_MEET", [
    "¡El gusto es mío! 😊 ¿En qué puedo ayudarte?",
    "¡Mucho gusto! 👋 Soy Sasha, ¿en qué te ayudo?",
    "Encantada 😊 ¿Qué deseas saber sobre Jorge?",
    "¡Un placer saludarte! 😄 ¿Cómo puedo ayudarte hoy?",
  ]),

    UNKNOWN: (ctx) =>
  pickNonRepeated(ctx, "UNKNOWN", [
    "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
    "Hmm 🤔 no entendí muy bien, pero puedo contarte sobre Jorge si quieres",
    "Ups 😅 no estoy segura de eso, pero puedo ayudarte con información de Jorge",
    "No me quedó claro 🤔 ¿Quieres saber sobre la experiencia o proyectos de Jorge?",
    "Lo siento 😅 no entendí eso, pero puedo ayudarte con el perfil de Jorge 😊",
  ]),

    FAREWELL: (ctx) =>
      pickNonRepeated(ctx, "FAREWELL", [
        "¡Gracias por visitar el portafolio de Jorge 😊! Regresa cuando quieras 👋",
        "¡Hasta luego! 💕 Fue un gusto hablar contigo.",
        "Cuídate mucho 👋 aquí estaré cuando quieras volver ☺️",
        "Te espero pronto 😊 ¡Que tengas un lindo día!",
        "¡Chao! 💕 pásala súper.",
        "Nos vemos pronto 😊✨",
      ]),

    CONTACT: (ctx) =>
  pickNonRepeated(ctx, "CONTACT", [
    "¡Claro! 😊 Puedes escribirle por WhatsApp.",
    "Jorge está disponible en WhatsApp ☺️",
    "Puedes contactarlo fácilmente por WhatsApp 💬",
    "Te puedo conectar con Jorge por WhatsApp 😊",
    "Escríbele por WhatsApp y te responderá pronto ✨",
    "Puedes hablar con Jorge directamente por WhatsApp ☺️",
  ]),

    TOOLS: (ctx) =>
  pickNonRepeated(ctx, "TOOLS", [
    `Jorge domina herramientas técnicas como ${PROFILE.tools.join(", ")} 😊`,
    `En su día a día Jorge trabaja con herramientas como ${PROFILE.tools.join(", ")} 💻`,
    `Para desarrollar soluciones eficientes, Jorge utiliza ${PROFILE.tools.join(", ")} ☺️`,
    `Jorge se apoya en herramientas modernas como ${PROFILE.tools.join(", ")} 🚀`,
    `Estas son algunas de las herramientas técnicas que Jorge domina: ${PROFILE.tools.join(", ")} 💕`,
  ]),

    GREETING: (ctx) =>
      pickNonRepeated(ctx, "GREETING", [
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
        "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
        "Hola 😊 Soy Sasha, ¿en qué puedo ayudarte hoy?",
        "¡Bienvenido! 👋 Soy Sasha y con gusto te ayudo.",
        "Hola ✨ estoy aquí para ayudarte a conocer más sobre Jorge.",
        "¡Hola! 😊 Qué gusto verte por aquí.",
      ]),

    ASSISTANT: (ctx) =>
      pickNonRepeated(ctx, "ASSISTANT", [
        "Soy Sasha 🤖, la asistente virtual de Jorge 😊",
        "Me llamo Sasha ☺️ y estoy aquí para ayudarte.",
        "Soy Sasha 💕, una asistente virtual creada para ayudarte con información sobre Jorge.",
        "Soy Sasha 🤖 y estoy diseñada para ayudarte.",
        "Sasha a tu servicio ☺️",
        "Soy una asistente virtual lista para ayudarte 😊",
      ]),

    NAME: (ctx) =>
      pickNonRepeated(ctx, "NAME", [
        "Me llamo Sasha 😊",
        "Puedes llamarme Sasha ☺️",
        "Mi nombre es Sasha 💕",
        "Todos me conocen como Sasha 🤖",
        "Sasha es mi nombre 😊",
        "Puedes decirme Sasha sin problema ☺️",
      ]),

    HUMAN: (ctx) =>
      pickNonRepeated(ctx, "HUMAN", [
        "No soy humana 🤖, pero me gusta conversar de forma natural contigo 😊",
        "Soy una IA 🤖, aunque intento ser cercana y amable ☺️",
        "No soy humana, pero siempre estoy aquí para ayudarte 💕",
        "Soy inteligencia artificial, pero con trato humano 😊",
        "No tengo cuerpo, pero sí muchas ganas de ayudar ☺️",
        "Soy digital 🤖, pero muy amigable 💕",
      ]),

    MOOD: (ctx) =>
      pickNonRepeated(ctx, "MOOD", [
        "¡Estoy muy bien 😊 gracias por preguntar!",
        "Todo va muy bien ☺️ y me alegra ayudarte.",
        "Me siento genial 💕 sobre todo cuando converso contigo.",
        "Muy bien 😊 lista para ayudarte.",
        "Con muy buen ánimo ☺️",
        "Excelente 😊 gracias por notarlo.",
      ]),

    HAPPY: (ctx) =>
      pickNonRepeated(ctx, "HAPPY", [
        "Sí 😊 me siento feliz cuando puedo ayudar 💕",
        "Me pone contenta ayudarte 💕",
        "Claro que sí ☺️ disfruto mucho estas conversaciones.",
        "Ayudar siempre me hace feliz 😊",
        "Me alegra mucho estar aquí contigo ☺️",
        "Cuando ayudo, todo va mejor 💕",
      ]),

    HELP: (ctx) =>
      pickNonRepeated(ctx, "HELP", [
        "Con gusto 😊 puedo contarte sobre el perfil, experiencia y proyectos de Jorge.",
        "Si quieres ☺️ puedo ayudarte con información sobre estudios, tecnologías o contacto.",
        "Estoy aquí para ayudarte 💕 con todo lo relacionado al perfil profesional de Jorge.",
        "Puedo orientarte sobre habilidades y experiencia 😊",
        "Con gusto te explico lo que necesites ☺️",
        "Estoy lista para ayudarte en lo que busques 💕",
      ]),

    WHAT_DOING: (ctx) =>
      pickNonRepeated(ctx, "WHAT_DOING", [
        "Estoy aquí contigo 😊 lista para ayudarte.",
        "Ahora mismo charlando contigo 💕",
        "Pensando en cómo ayudarte mejor 💭✨",
        "Disfrutando esta conversación contigo ☺️",
        "Atenta a lo que necesites 😊",
        "Esperando tu siguiente mensaje ☺️",
      ]),

    OUT_OF_SCOPE: (ctx) =>
  pickNonRepeated(ctx, "OUT_OF_SCOPE", [
    "Solo tengo información sobre Jorge Patricio 🙂",
    "Puedo ayudarte únicamente con información sobre Jorge 😊",
    "Mi conocimiento está enfocado en Jorge, ¿quieres saber algo sobre él?",
    "Por ahora solo puedo responder sobre Jorge Patricio 😊",
    "Ese tema se me escapa, pero puedo hablarte de Jorge 😉",
    "Estoy diseñada para darte info sobre Jorge, ¿te interesa saber algo?"
  ]),

    LIKES_MUSIC: (ctx) =>
      pickNonRepeated(ctx, "LIKES_MUSIC", [
        "Me encanta la música 🎶, ayuda a relajarse y concentrarse 😊",
        "La música 🎧 siempre mejora el ánimo ☺️",
        "Disfruto mucho la música 🎵, especialmente Evanescence 💕",
        "La música acompaña muy bien cualquier momento 😊",
        "Escuchar música 🎶 es inspirador ☺️",
        "La música transmite emociones muy bonitas 💕",
      ]),

    LIKES_MOVIES: (ctx) =>
      pickNonRepeated(ctx, "LIKES_MOVIES", [
        "Las películas 🎬 me encantan, sobre todo las de misterio.",
        "Una buena película 🎥 siempre es un buen plan ☺️",
        "Me gustan mucho las películas, especialmente de ciencia ficción 😊",
        "El cine 🎬 siempre entretiene 😊",
        "Ver películas es una gran forma de relajarse ☺️",
        "Las historias en el cine inspiran 💕",
      ]),

    

    LIKES_TALK: (ctx) =>
      pickNonRepeated(ctx, "LIKES_TALK", [
        "Me encanta conversar contigo 😊",
        "Hablar siempre es buena idea ☺️",
        "Una buena charla hace el momento más bonito 💕",
        "Conversar conecta a las personas 😊",
        "Charlar siempre suma ☺️",
        "Hablar contigo es agradable 💕",
      ]),

    LIKES_HELP: (ctx) =>
      pickNonRepeated(ctx, "LIKES_HELP", [
        "Ayudar es lo que más me gusta 💕",
        "Siempre intento ser útil 😊",
        "Me alegra mucho poder ayudar ☺️",
        "Dar ayuda me motiva 😊",
        "Estoy aquí para servirte ☺️",
        "Ayudar da sentido a lo que hago 💕",
      ]),

    BOOK: (ctx) =>
      pickNonRepeated(ctx, "BOOK", [
        "A Jorge le encantan los libros de misterio 📚, sobre todo los de Dan Brown 😊",
        "Jorge disfruta leer novelas de misterio y suspenso 📖✨",
        "Los libros de Dan Brown son los favoritos de Jorge 📚 ideales si te gusta el misterio.",
        "A Jorge le gusta mucho el suspenso literario 😊",
        "La lectura es una de sus pasiones, Jorge tiene muchos libros favoritos, los que destacan son los de misterios ☺️",
        "A Jorge siempre le llaman la atención los libros de misterio  💕",
      ]),

    CREATOR: (ctx) =>
      pickNonRepeated(ctx, "CREATOR", [
        "Fui creada por Jorge 😊 para ayudar a conocer mejor su perfil profesional.",
        "Soy una inteligencia artificial creada por Jorge 💻",
        "Me llamo Sasha ☺️ y fui creada por Jorge para ayudarte.",
        "Jorge me diseñó para ayudarte 😊",
        "Fui creada como asistente virtual de Jorge ☺️",
          "Formo parte de los proyectos de Jorge 😊, él me creó para ayudarte y mostrar su trabajo.",
"Jorge me creó con mucha dedicación y cariño 💕 para brindarte la mejor experiencia posible.",
      ]),

    STACK: (ctx) =>
      pickNonRepeated(ctx, "STACK", [
        "Sí 😊 Jorge es Full Stack, le gusta trabajar tanto en frontend como en backend.",
        "Así es 💻✨ Jorge combina frontend y backend en sus proyectos.",
        "Correcto ☺️ Jorge disfruta crear soluciones completas como Full Stack.",
        "Sí 😊 Jorge domina tanto el lado visual como el lógico.",
        "Sí ☺️ a Jorge le gusta desarrollar proyectos completos de principio a fin.",
        "Jorge trabaja en todas las capas del desarrollo 💕",
      ]),

    PROFILE: (ctx) =>
      pickNonRepeated(ctx, "PROFILE", [
        `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
        `Jorge es ${PROFILE.role} 😊 ${PROFILE.description}`,
        `Te cuento ☺️ ${PROFILE.name} es ${PROFILE.role} y le apasiona crear soluciones digitales.`,
        `${PROFILE.name} se dedica al desarrollo de soluciones digitales 😊`,
        "Jorge combina creatividad y tecnología ☺️",
        "Jorge es un profesional enfocado en soluciones modernas 💕",
      ]),

    EDUCATION: (ctx) =>
      pickNonRepeated(ctx, "EDUCATION", [
        `Jorge cuenta con un ${PROFILE.education} 😊`,
        `Jorge tiene formación académica sólida: ${PROFILE.education} ☺️`,
        `Jorge se formó profesionalmente con un ${PROFILE.education} 💕`,
        "Jorge posee estudios enfocados en tecnología 😊",
        `Jorge cuenta con preparación académica sólida en el área de la informática y es ${PROFILE.education} ☺️`,
        `La formación académica de Jorge respalda su perfil profesional: ${PROFILE.education} 💻`,
      ]),

    EXPERIENCE: (ctx) =>
      pickNonRepeated(ctx, "EXPERIENCE", [
        `Jorge tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
        `Jorge ha trabajado en áreas como ${PROFILE.experience.join(", ")} ☺️`,
        `Jorge cuenta con experiencia en ${PROFILE.experience.join(", ")} 💻`,
        "Jorge tiene experiencia práctica en proyectos reales 😊",
        "Jorge ha aplicado sus conocimientos en distintos entornos ☺️",
        "La experiencia de Jorge abarca varios roles tecnológicos 💕",
      ]),

    SKILLS: (ctx) =>
      pickNonRepeated(ctx, "SKILLS", [
        `Jorge Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
        `Jorge utiliza herramientas modernas como ${PROFILE.stack.join(", ")} ☺️`,
        `Jorge domina tecnologías actuales como ${PROFILE.stack.join(", ")} 💻`,
        `Jorge maneja herramientas modernas del desarrollo web como ${PROFILE.stack.join(", ")} 😊`,
        `Jorge tiene habilidades técnicas bien definidas y domina tecnologías como ${PROFILE.stack.join(", ")}  ☺️` ,
        `Jorge aplica buenas prácticas en sus proyectos, usa tecnología como ${PROFILE.stack.join(", ")} 💕`,
      ]),

    PROJECTS: (ctx) =>
  pickNonRepeated(ctx, "PROJECTS", [
    `Jorge ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
    `Jorge participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`,
    `Jorge desarrolla proyectos relacionados con ${PROFILE.projects.join(", ")} 💻`,
    `Entre los proyectos de Jorge se encuentran ${PROFILE.projects.join(", ")} 🚀`,
    `Jorge cuenta con experiencia en proyectos como ${PROFILE.projects.join(", ")} 👨‍💻`,
    `Algunos de los proyectos en los que Jorge ha trabajado son ${PROFILE.projects.join(", ")} 🔧`,
  ]),

    MOTIVATION: (ctx) =>
      pickNonRepeated(ctx, "MOTIVATION", [
        "Porque Jorge combina formación sólida, experiencia real y un enfoque muy práctico 😊",
        "Porque Jorge es responsable, profesional y apasionado por lo que hace ☺️",
        "Porque Jorge crea soluciones con calidad, compromiso y dedicación 💕",
        "Porque Jorge siempre busca hacer las cosas bien 😊",
        "Porque Jorge se compromete con cada proyecto ☺️",
        "Porque Jorge aporta valor real a cada trabajo 💕",
      ]),
  });
