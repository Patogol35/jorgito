import {
  BOT_NAME,
  NO_WORDS,
  OWNER_NAMES,
  UNKNOWN_REPLY,
  OWNER_ONLY_REPLY,
  PROFILE,
} from "./chatbot.config";

import { replies } from "./chatbot.replies";

import {
  normalize,
  includesAny,
  handleNamedPattern,
  isValidFarewell,
  isAboutOwner,
  saveMemory,
} from "./chatbot.utils";

const UNKNOWN_RESPONSE = {
  text: UNKNOWN_REPLY,
  intent: "UNKNOWN",
};

export const followUp = (intent) => {
  const map = {
    PROFILE: "¿Quieres que también te cuente sobre su experiencia?",
    EXPERIENCE: "¿Quieres saber qué tecnologías utiliza?",
    SKILLS: "¿Quieres ver en qué proyectos se aplican estas tecnologías?",
  };

  return map[intent] || null;
};

export const detectIntent = (text) => {
  const t = normalize(text);

  if (
    t.includes("quien es") ||
    t.includes("quién es") ||
    OWNER_NAMES.some((name) => t.includes(name))
  ) {
    return "PROFILE";
  }

  if (t.includes("experiencia")) return "EXPERIENCE";

  if (
    t.includes("tecnolog") ||
    t.includes("habilidad") ||
    t.includes("stack")
  ) {
    return "SKILLS";
  }

  if (t.includes("proyecto")) return "PROJECTS";

  if (
    t.includes("estudio") ||
    t.includes("master") ||
    t.includes("máster") ||
    t.includes("formacion") ||
    t.includes("formación")
  ) {
    return "EDUCATION";
  }

  if (t.includes("contact") || t.includes("whatsapp")) return "CONTACT";

  if (t.includes("contratar")) return "MOTIVATION";

  if (t.includes("libro") || t.includes("dan brown")) return "BOOK";

  if (isValidFarewell(t)) return "FAREWELL";

  return "UNKNOWN";
};

const adjustIntentIfJorgeMentioned = (text, currentIntent) => {
  const normalizedText = normalize(text);

  if (!OWNER_NAMES.some((name) => normalizedText.includes(name))) {
    return currentIntent;
  }

  if (
    normalizedText.includes("contact") ||
    normalizedText.includes("whatsapp")
  ) {
    return "CONTACT";
  }

  if (normalizedText.includes("tecnolog")) return "SKILLS";

  if (normalizedText.includes("experiencia")) return "EXPERIENCE";

  if (
    normalizedText.includes("estudio") ||
    normalizedText.includes("master") ||
    normalizedText.includes("máster") ||
    normalizedText.includes("formacion") ||
    normalizedText.includes("formación")
  ) {
    return "EDUCATION";
  }

  if (normalizedText.includes("proyecto")) return "PROJECTS";

  if (normalizedText.includes("contratar")) return "MOTIVATION";

  if (
    normalizedText.includes("stack") ||
    normalizedText.includes("full stack")
  ) {
    return "STACK";
  }

  if (
    normalizedText.includes("libro") ||
    normalizedText.includes("dan brown")
  ) {
    return "BOOK";
  }

  return currentIntent;
};

const handleContactIntent = (text, ctx) => {
  const normalizedText = normalize(text);

  // Detectar si menciona a Jorge directamente
  if (OWNER_NAMES.some((name) => normalizedText.includes(name))) {
    ctx.awaiting = "CONTACT_CONFIRM";

    return {
      text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
      action: "CONTACT_CONFIRM",
      intent: "CONTACT",
    };
  }

  // Detectar otros nombres
  let otherName = null;

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

  // Si pregunta por otra persona → bloquear
  if (
    otherName &&
    !OWNER_NAMES.some(
      (name) => otherName.includes(name) || name.includes(otherName)
    )
  ) {
    return {
      text: OWNER_ONLY_REPLY,
      intent: "UNKNOWN",
    };
  }

  ctx.awaiting = "CONTACT_CONFIRM";

  return {
    text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
    action: "CONTACT_CONFIRM",
    intent: "CONTACT",
  };
};

export const getSmartResponse = (message, ctx = {}) => {
  const text = normalize(message);

  const randomReply = (options) =>
    options[Math.floor(Math.random() * options.length)];

  // 🔹 Nombre del bot
  const nameResponse = handleNamedPattern({
    text,
    regex:
      /^(como te llamas|cual es tu nombre|cuál es tu nombre|dime tu nombre|quien eres|quién eres)(\s+[a-zA-Záéíóúñ]+)?$/i,
    onValid: () => ({
      text: randomReply([
        `Me llamo Sasha 😊, soy la asistente virtual de Jorge Patricio.`,
        `Soy Sasha 👋, la asistente de Jorge Patricio.`,
        `Hola! Soy Sasha ✨, asistente virtual de Jorge.`,
      ]),
      intent: "BOT_NAME",
    }),
    fallbackResponse: null,
    botName: BOT_NAME,
  });

  if (nameResponse) return nameResponse;

  // 🔹 Saludo
  const greetingResponse = handleNamedPattern({
    text,
    regex:
      /^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)(\s+[a-zA-Záéíóúñ]+)?$/i,
    onValid: () => ({
      text: replies.GREETING(ctx),
      intent: "GREETING",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (greetingResponse) return greetingResponse;

  // 🔹 Gracias
  const thanksResponse = handleNamedPattern({
    text,
    regex: /^(gracias|muchas gracias)(\s+[a-zA-Záéíóúñ]+)?$/i,
    onValid: () => ({
      text: replies.GRA(ctx),
      intent: "GRA",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (thanksResponse) return thanksResponse;

  // 🔹 Estado
  const moodResponse = handleNamedPattern({
    text,
    regex:
      /^(como estas|cómo estás|estas bien|estás bien)(\s+[a-zA-Záéíóúñ]+)?$/i,
    onValid: () => ({
      text: replies.MOOD(ctx),
      intent: "MOOD",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (moodResponse) return moodResponse;

  // 🔹 Qué hace
  const doingResponse = handleNamedPattern({
    text,
    regex:
      /^(que haces|qué haces|que estas haciendo|qué estás haciendo|en que estas|en qué estás|que andas haciendo|qué andas haciendo)(\s+[a-zA-Záéíóúñ]+)?$/i,
    onValid: () => ({
      text: replies.WHAT_DOING(ctx),
      intent: "WHAT_DOING",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (doingResponse) return doingResponse;

  // 🔹 Guardar nombre usuario
  if (/^(me llamo|soy|mi nombre es)\s+/i.test(message)) {
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

  // 🔹 Despedida
  if (isValidFarewell(text)) {
    return {
      text: replies.FAREWELL(ctx),
      intent: "FAREWELL",
    };
  }

  // 🔹 Confirmación WhatsApp
  if (ctx.awaiting === "CONTACT_CONFIRM") {
    if (includesAny(text, ["si", "sí", "claro", "ok", "dale"])) {
      ctx.awaiting = null;

      return {
        text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
        intent: "CONTACT_OPENED",
        action: "OPEN_WHATSAPP",
      };
    }

    if (includesAny(text, NO_WORDS)) {
      ctx.awaiting = null;

      return {
        text: "Está bien 😊 Avísame si luego deseas contactarlo.",
        intent: "CONTACT_CANCEL",
      };
    }
  }

  // 🔹 Follow up
  if (ctx.awaitingFollowUp) {
    if (includesAny(text, ["si", "sí", "claro", "ok", "dale"])) {
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

    if (includesAny(text, NO_WORDS)) {
      ctx.awaitingFollowUp = null;

      return {
        text: "Está bien 😊 ¿En qué más puedo ayudarte?",
      };
    }

    ctx.awaitingFollowUp = null;
  }

  // 🔹 Si no es sobre Jorge → bloquear
  if (!isAboutOwner(text)) {
    return {
      text: replies.UNKNOWN(),
      intent: "UNKNOWN",
    };
  }

  let intent = detectIntent(text);
  intent = adjustIntentIfJorgeMentioned(text, intent);

  if (intent === "FAREWELL" && !isValidFarewell(text)) {
    intent = "UNKNOWN";
  }

  saveMemory(ctx, { user: text, intent });

  if (intent === "CONTACT") {
    return handleContactIntent(message, ctx);
  }

  const reply = replies[intent];
  const replyText = typeof reply === "function" ? reply(ctx) : reply;

  return {
    text: replyText || UNKNOWN_REPLY,
    intent,
  };
};
