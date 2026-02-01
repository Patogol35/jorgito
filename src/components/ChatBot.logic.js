import { 
  YES_WORDS, 
  NO_WORDS, 
  MEMORY_LIMIT, 
  PROFILE, 
  INTENTS, 
  WHATSAPP_URL 
} from './ChatBot.constants';
import { normalize, randomPick, saveMemory } from './ChatBot.utils';

/* =========================
FOLLOW UP
========================= */
export const followUp = (intent) =>
  ({
    PROFILE: "¿Quieres conocer su experiencia profesional?",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
    PROJECTS: null,
  }[intent] || null);

export const isValidFarewell = (text) => {
  const t = normalize(text);

  const valid = [
    "chao",
    "chau",
    "bye",
    "adios",
    "hasta luego",
    "chao sasha",
    "bye sasha",
    "adios sasha",
  ];

  return valid.includes(t);
};

/* =========================
REPETICIÓN
========================= */
export const pickNonRepeated = (ctx = {}, intent, options) => {
  if (!ctx.usedReplies) ctx.usedReplies = {};
  if (!ctx.usedReplies[intent]) ctx.usedReplies[intent] = [];

  const unused = options.filter(
    (opt) => !ctx.usedReplies[intent].includes(opt)
  );

  const choice = unused.length
    ? randomPick(unused)
    : randomPick(options);

  ctx.usedReplies[intent].push(choice);

  if (ctx.usedReplies[intent].length >= options.length) {
    ctx.usedReplies[intent] = [];
  }

  return choice;
};

/* =========================
DETECT INTENT
========================= */
export const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    for (const word of INTENTS[intent]) {
      if (text.includes(normalize(word))) {
        score += word.length > 4 ? 2 : 1;
      }
    }
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return max ? best : "UNKNOWN";
};

/* =========================
RESPUESTA INTELIGENTE
========================= */
export function getSmartResponse(message, context) {
  const text = normalize(message);

  // 🔑 Clonar contexto para evitar mutaciones
  const ctx = {
    ...context,
    memory: context.memory ? [...context.memory] : [],
    usedReplies: context.usedReplies
      ? Object.fromEntries(
          Object.entries(context.usedReplies).map(([k, v]) => [k, [...v]])
        )
      : {},
  };

  // 🔑 Constantes al inicio
  const BOT_NAME = "sasha";

  // 🔥 Si hay follow-up pendiente pero el usuario hace una pregunta clara,
  // se cancela el follow-up y se responde normalmente
  if (ctx.awaitingFollowUp) {
    const directIntent = detectIntent(message);
    if (directIntent !== "UNKNOWN") {
      ctx.awaitingFollowUp = null;
    }
  }

  const replies = {
    GRA: (ctx) =>
      pickNonRepeated(ctx, "GRA", [
        "Un placer 😊",
        "De nada 😌",
        "Siempre es un gusto ayudar 😊",
        "Para eso estoy ☺️",
        "¡Con mucho cariño! 💕",
        "Cuando gustes 😊",
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
        `¡Claro! Puedes contactar a Jorge directamente por WhatsApp: ${WHATSAPP_URL} 😊`,
        `Jorge está disponible en WhatsApp para atender tus consultas: ${WHATSAPP_URL} ☺️`,
        `Puedes escribirle a Jorge por WhatsApp aquí: ${WHATSAPP_URL} 💕`,
        `Para contactar a Jorge, solo haz clic aquí: ${WHATSAPP_URL} ✨`,
        `¡Fácil! Comunícate con Jorge por WhatsApp: ${WHATSAPP_URL} 😊`,
        `Jorge te atiende por WhatsApp: ${WHATSAPP_URL} ☺️`,
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

    LIKES_COFFEE: (ctx) =>
      pickNonRepeated(ctx, "LIKES_COFFEE", [
        "Me gusta el café ☕, sobre todo si acompaña una buena charla 😊",
        "Un cafecito ☕ siempre viene bien ☺️",
        "El aroma del café ☕ me encanta, es muy reconfortante 💕",
        "El café ☕ hace cualquier charla mejor 😊",
        "Una taza de café ☕ es perfecta para concentrarse ☺️",
        "El café siempre anima el momento 💕",
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

    LIKES_TRAVEL: (ctx) =>
      pickNonRepeated(ctx, "LIKES_TRAVEL", [
        "Viajar ✈️ es maravilloso, conocer nuevos lugares inspira mucho 😊",
        "Explorar el mundo 🌍 siempre abre la mente ☺️",
        "Viajar cambia la forma de ver la vida 💕",
        "Conocer nuevos lugares siempre enriquece 😊",
        "Viajar trae experiencias inolvidables ☺️",
        "Descubrir el mundo es fascinante 💕",
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
        "Mi propósito es apoyar el perfil de Jorge 💕",
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
        `Jorge Desarrolla proyectos relacionados con ${PROFILE.projects.join(", ")} 💻`,
        "Jorge ha creado proyectos funcionales y modernos 😊",
        "Jorge participa activamente en el desarrollo de aplicaciones ☺️",
        "Sus proyectos reflejan su experiencia 💕",
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
  };

  /* =========================
  🟢 SALUDO CORRECTO
  ========================= */
  const greetingMatch = text.match(
    /^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (greetingMatch) {
    const name = normalize(greetingMatch[2]?.trim() || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.GREETING(ctx),
        intent: "GREETING",
      };
    }

    return {
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
      intent: "UNKNOWN",
    };
  }

  /* =========================
  🟢 GRACIAS CONTROLADO
  ========================= */
  const thanksMatch = text.match(
    /^(gracias|muchas gracias)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (thanksMatch) {
    const name = normalize(thanksMatch[2]?.trim() || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.GRA(ctx),
        intent: "GRA",
      };
    }

    return {
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
      intent: "UNKNOWN",
    };
  }

  /* =========================
  🟢 ESTADO DE ÁNIMO
  ========================= */
  const moodMatch = text.match(
    /^(como estas|cómo estás|estas bien|estás bien)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (moodMatch) {
    const name = normalize(moodMatch[2] || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.MOOD(ctx),
        intent: "MOOD",
      };
    }

    return {
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
      intent: "UNKNOWN",
    };
  }

  /* =========================
  🟢 QUÉ ESTÁ HACIENDO
  ========================= */
  const doingMatch = text.match(
    /^(que haces|qué haces|que estas haciendo|qué estás haciendo|en que estas|en qué estás|que andas haciendo|qué andas haciendo)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (doingMatch) {
    const name = normalize(doingMatch[2] || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.WHAT_DOING(ctx),
        intent: "WHAT_DOING",
      };
    }

    return {
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
      intent: "UNKNOWN",
    };
  }

  /* =========================
  🟢 DETECTAR NOMBRE USUARIO
  ========================= */
  if (/^(me llamo|soy|mi nombre es)\s+/i.test(text)) {
    const name = message
      .replace(/^(me llamo|soy|mi nombre es)/i, "")
      .trim();

    ctx.userName = name;
    saveMemory(ctx, { type: "user_name", value: name });

    return {
      text: `¡Mucho gusto, ${name}! 😊 ¿En qué puedo ayudarte hoy?`,
      intent: "USER_NAME",
    };
  }

  /* =========================
  🔴 DESPEDIDA PRIORIDAD ABSOLUTA
  ========================= */
  if (isValidFarewell(text)) {
    return {
      text: replies.FAREWELL(ctx),
      intent: "FAREWELL",
    };
  }

  /* =========================
  🔵 CONFIRMACIÓN WHATSAPP
  ========================= */
  if (ctx.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      ctx.awaiting = null;
      window.open(WHATSAPP_URL, "_blank");

      return {
        text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
        intent: "CONTACT_OPENED",
      };
    }

    if (NO_WORDS.includes(text)) {
      ctx.awaiting = null;
      return {
        text: "Está bien 😊 Avísame si luego deseas contactarlo.",
        intent: "CONTACT_CANCEL",
      };
    }
  }

  /* =========================
  FOLLOW UPS
  ========================= */
  if (ctx.awaitingFollowUp) {
    if (YES_WORDS.some((word) => text.includes(word))) {
      const intent = ctx.awaitingFollowUp;
      ctx.awaitingFollowUp = null;

      const chainReplies = {
        PROFILE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
        EXPERIENCE: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
        SKILLS: `Estas tecnologías aplican en ${PROFILE.projects.join(", ")}.`,
      };

      return {
        text: chainReplies[intent],
        intent: intent === "SKILLS" ? "PROJECTS" : intent,
        fromFollowUp: true,
      };
    }

    if (NO_WORDS.some((word) => text.includes(word))) {
      ctx.awaitingFollowUp = null;
      return {
        text: "Está bien 😊 ¿En qué más puedo ayudarte?",
      };
    }

    ctx.awaitingFollowUp = null;
  }

  /* =========================
  🟡 PROTECCIÓN DE DATOS: ¿ES SOBRE JORGE?
  ========================= */
  const isAboutOwner = (text) => {
    const validNames = ["jorge", "patricio", "jorge patricio"];
    const normalizedText = text.toLowerCase().trim();

    if (validNames.some(name => normalizedText.includes(name))) {
      return true;
    }

    const sensitiveKeywords = [
      "tecnologia", "tecnologias", "tecnologías",
      "experiencia", "estudios", "perfil", "contratar",
      "proyectos", "stack", "habilidades", "lenguajes",
      "quien es", "quién es", "formacion", "formación",
      "educacion", "educación", "máster", "master",
      "libros", "libro", "full stack", "desarrollador",
      "ingeniero", "stack","full","contactar", "contacto","whatsapp"
    ];

    const hasSensitive = sensitiveKeywords.some(kw => normalizedText.includes(kw));
    const words = normalizedText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    if (!hasSensitive) {
      return true;
    }

        // Frases multi-palabra válidas sin nombre
    const validMultiWord = [
      "full stack",
      "libros favoritos",
      "máster en",
      "proyectos realizados",
      "experiencia profesional",
      "qué estudios",
      "que estudios",
      "qué experiencia",
      "que experiencia",
      "qué tecnologías",
      "que tecnologias",
      "tecnologías trabaja",
      "es full stack",
      "por qué contratar",
      "como contactar",
      "cómo contactar",
      "quién te creó",
      "quien te creo",
      "sus libros",
      "estudios tiene",
      "experiencia tiene",
      "tecnologías trabaja",
      "proyectos ha hecho",
      "cuéntame sobre",
      "cuentame sobre"
    ];

    if (validMultiWord.some(phrase => normalizedText.includes(phrase))) {
      return true;
    }

    // Permitir si es 1 palabra
    if (wordCount === 1) {
      return true;
    }

    // Bloquear todo lo demás sensible con 2+ palabras que no sea sobre ti
    return false;
  };

  // 🔒 Bloquear si NO es sobre ti
  if (!isAboutOwner(text)) {
    return {
      text: "Solo tengo información sobre Jorge Patricio 🙂",
      intent: "UNKNOWN",
    };
  }

  /* =========================
  🟢 DETECTAR INTENT (SOBRE JORGE)
  ========================= */
  let intent = detectIntent(text);

  // 🔁 Ajuste: si "jorge" aparece junto con una palabra clave específica,
  // priorizar la intención técnica/sensible sobre PROFILE
  const normalizedText = text.toLowerCase();
  if (normalizedText.includes("jorge")) {
    if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
      intent = "CONTACT";
    } else if (normalizedText.includes("tecnolog")) {
      intent = "SKILLS";
    } else if (normalizedText.includes("experiencia")) {
      intent = "EXPERIENCE";
    } else if (normalizedText.includes("estudio") || normalizedText.includes("máster") || normalizedText.includes("formación")) {
      intent = "EDUCATION";
    } else if (normalizedText.includes("proyecto")) {
      intent = "PROJECTS";
    } else if (normalizedText.includes("contratar")) {
      intent = "MOTIVATION";
    } else if (normalizedText.includes("stack") || normalizedText.includes("full stack")) {
      intent = "STACK";
    } else if (normalizedText.includes("libro") || normalizedText.includes("dan brown")) {
      intent = "BOOK";
    }
    // Si ninguna condición se cumple, se respeta la intención detectada originalmente
  }

  if (intent === "FAREWELL" && !isValidFarewell(text)) {
    intent = "UNKNOWN";
  }

  saveMemory(ctx, { user: text, intent });

  /* =========================
  🟢 CONTACTO (SOLO SI ES SOBRE JORGE)
  ========================= */
  if (intent === "CONTACT") {
    const normalizedText = text.toLowerCase();
    const validNames = ["jorge", "patricio", "jorge patricio"];

    // Si menciona tu nombre → permitir
    if (validNames.some(name => normalizedText.includes(name))) {
      ctx.awaiting = "CONTACT_CONFIRM";
      return {
        text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
        action: "CONTACT_CONFIRM",
        intent,
      };
    }

    // Extraer posibles nombres después de "contactar"
    // Patrones: "contactar a [nombre]", "contactar [nombre]", "contacto de [nombre]"
    let otherName = null;

    // Buscar con regex que ignore mayúsculas y capture el nombre
    const patterns = [
      /contactar\s+a\s+(\w+)/i,
      /contactar\s+(\w+)/i,
      /contacto\s+de\s+(\w+)/i,
      /contacto\s+(\w+)/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        otherName = normalize(match[1]);
        break;
      }
    }

    // Si encontramos un nombre y NO es el tuyo → bloquear
    if (otherName && !validNames.some(name => otherName.includes(name) || name.includes(otherName))) {
      return {
        text: "Solo tengo información sobre Jorge Patricio 🙂",
        intent: "UNKNOWN",
      };
    }

    // Si no hay nombre explícito → asumir que es sobre ti (ej: "contactar")
    ctx.awaiting = "CONTACT_CONFIRM";
    return {
      text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  // =========================
  // 🧠 RESPUESTA NORMAL
  // =========================
  let replyText;

  if (typeof replies[intent] === "function") {
    replyText = replies[intent](ctx);
  } else {
    replyText = replies[intent];
  }

  return {
    text:
      replyText ||
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
    intent,
  };
}
    
