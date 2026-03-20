import {
  BOT_NAME,
  NO_WORDS,
  OWNER_NAMES,
  UNKNOWN_REPLY,
  OWNER_ONLY_REPLY,
  PROFILE,
  YES_WORDS,
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
    SKILLS: "¿Quieres que te muestre algunos proyectos?",
    EDUCATION: "¿Quieres que también te cuente sobre su experiencia?",
    PROJECTS: "¿Quieres saber qué tecnologías utiliza?",
  };

  return map[intent] || null;
};

export const detectIntent = (text) => {
  const t = normalize(text);

  // PERFIL
  if (
    t.includes("quien es") ||
    t.includes("quién es") ||
    t.includes("quien eres") ||
    t.includes("quién eres") ||
    OWNER_NAMES.some((name) => t.includes(name))
  ) {
    // Si solo dice "jorge" o "patricio", se toma como perfil
    if (
      t === "jorge" ||
      t === "patricio" ||
      t === "jorge patricio" ||
      t.includes("quien")
    ) {
      return "PROFILE";
    }
  }

  // EXPERIENCIA
  if (t.includes("experiencia")) return "EXPERIENCE";

  // TECNOLOGÍAS / HABILIDADES / STACK
  if (
    t.includes("tecnolog") ||
    t.includes("habilidad") ||
    t.includes("stack") ||
    t.includes("tecnologias maneja") ||
    t.includes("tecnologías maneja") ||
    t.includes("tecnologias utiliza") ||
    t.includes("tecnologías utiliza")
  ) {
    return "SKILLS";
  }

  // PROYECTOS
  if (t.includes("proyecto")) return "PROJECTS";

  // EDUCACIÓN / FORMACIÓN
  if (
    t.includes("estudio") ||
    t.includes("estudios") ||
    t.includes("master") ||
    t.includes("máster") ||
    t.includes("formacion") ||
    t.includes("formación") ||
    t.includes("educacion") ||
    t.includes("educación") ||
    t.includes("academica") ||
    t.includes("académica")
  ) {
    return "EDUCATION";
  }

  // CONTACTO
  if (t.includes("contact") || t.includes("whatsapp")) return "CONTACT";

  // MOTIVACIÓN / CONTRATAR
  if (t.includes("contratar")) return "MOTIVATION";

  // LIBROS
  if (t.includes("libro") || t.includes("dan brown")) return "BOOK";

  // DESPEDIDA
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

  if (
    normalizedText.includes("tecnolog") ||
    normalizedText.includes("habilidad") ||
    normalizedText.includes("stack")
  ) {
    return "SKILLS";
  }

  if (normalizedText.includes("experiencia")) {
    return "EXPERIENCE";
  }

  if (
    normalizedText.includes("estudio") ||
    normalizedText.includes("estudios") ||
    normalizedText.includes("master") ||
    normalizedText.includes("máster") ||
    normalizedText.includes("formacion") ||
    normalizedText.includes("formación") ||
    normalizedText.includes("educacion") ||
    normalizedText.includes("educación") ||
    normalizedText.includes("academica") ||
    normalizedText.includes("académica")
  ) {
    return "EDUCATION";
  }

  if (normalizedText.includes("proyecto")) {
    return "PROJECTS";
  }

  if (normalizedText.includes("contratar")) {
    return "MOTIVATION";
  }

  // 🔥 AQUÍ estaba el bug: antes devolvía "STACK"
  if (
    normalizedText.includes("stack") ||
    normalizedText.includes("full stack")
  ) {
    return "SKILLS";
  }

  if (normalizedText.includes("libro") || normalizedText.includes("dan brown")) {
    return "BOOK";
  }

  return currentIntent;
};

const handleContactIntent = (text, ctx) => {
  const normalizedText = normalize(text);

  if (OWNER_NAMES.some((name) => normalizedText.includes(name))) {
    ctx.awaiting = "CONTACT_CONFIRM";
    return {
      text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
      action: "CONTACT_CONFIRM",
      intent: "CONTACT",
    };
  }

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

  const moodResponse = handleNamedPattern({
    text,
    regex: /^(como estas|cómo estás|estas bien|estás bien)(\s+[a-zA-Záéíóúñ]+)?$/i,
    onValid: () => ({
      text: replies.MOOD(ctx),
      intent: "MOOD",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });
  if (moodResponse) return moodResponse;

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

  // Guardar nombre del usuario
  if (/^(me llamo|soy|mi nombre es)\s+/i.test(text)) {
    const name = message.replace(/^(me llamo|soy|mi nombre es)/i, "").trim();

    ctx.userName = name;
    saveMemory(ctx, { type: "user_name", value: name });

    return {
      text: `¡Mucho gusto, ${name}! 😊 ¿En qué puedo ayudarte hoy?`,
      intent: "USER_NAME",
    };
  }

  // Despedida
  if (isValidFarewell(text)) {
    return {
      text: replies.FAREWELL(ctx),
      intent: "FAREWELL",
    };
  }

  // Confirmación de contacto
  if (ctx.awaiting === "CONTACT_CONFIRM") {
    if (includesAny(text, YES_WORDS)) {
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

    // Si responde otra cosa mientras espera confirmación
    ctx.awaiting = null;
  }

  // Follow-up inteligente
  if (ctx.awaitingFollowUp) {
    if (includesAny(text, YES_WORDS)) {
      const intent = ctx.awaitingFollowUp;
      ctx.awaitingFollowUp = null;

      const chainReplies = {
        PROFILE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
        EXPERIENCE: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
        SKILLS: `Ha desarrollado proyectos como ${PROFILE.projects.join(", ")}.`,
        EDUCATION: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
        PROJECTS: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
      };

      return {
        text: chainReplies[intent] || UNKNOWN_REPLY,
        intent:
          intent === "SKILLS"
            ? "PROJECTS"
            : intent === "PROJECTS"
            ? "SKILLS"
            : intent,
        fromFollowUp: true,
      };
    }

    if (includesAny(text, NO_WORDS)) {
      ctx.awaitingFollowUp = null;
      return {
        text: "Está bien 😊 ¿En qué más puedo ayudarte?",
        intent: "FOLLOWUP_CANCEL",
      };
    }

    // 🔥 IMPORTANTE:
    // Si escribió otra pregunta real, NO cancelamos con "Está bien..."
    ctx.awaitingFollowUp = null;
  }

  // Validar que sea sobre Jorge
  if (!isAboutOwner(text)) {
    return {
      text: OWNER_ONLY_REPLY,
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
