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

/* =========================
   FOLLOW UP
========================= */
export const followUp = (intent) => {
  const map = {
    PROFILE: "¿Quieres que también te cuente sobre su experiencia?",
    EXPERIENCE: "¿Quieres saber qué tecnologías utiliza?",
    SKILLS: "¿Quieres ver en qué proyectos se aplican estas tecnologías?",
  };

  return map[intent] || null;
};

/* =========================
   INTENT MAP (NUEVO)
========================= */
const INTENT_KEYWORDS = [
  { intent: "EXPERIENCE", keywords: ["experiencia"] },
  { intent: "SKILLS", keywords: ["tecnolog", "habilidad", "stack"] },
  { intent: "PROJECTS", keywords: ["proyecto"] },
  {
    intent: "EDUCATION",
    keywords: ["estudio", "master", "máster", "formacion", "formación"],
  },
  { intent: "CONTACT", keywords: ["contact", "whatsapp"] },
  { intent: "MOTIVATION", keywords: ["contratar"] },
  { intent: "BOOK", keywords: ["libro", "dan brown"] },
];

/* =========================
   DETECT INTENT
========================= */
export const detectIntent = (text) => {
  const t = normalize(text);

  // PROFILE (mantengo lógica original)
  if (
    t.includes("quien es") ||
    t.includes("quién es") ||
    OWNER_NAMES.some((name) => t.includes(name))
  ) {
    return "PROFILE";
  }

  // CREATOR (mejorado pero equivalente)
  if (
    includesAny(t, [
      "quien te creo",
      "quién te creó",
      "quien te hizo",
      "quién te hizo",
      "quien te programo",
      "quién te programó",
      "quien te desarrollo",
      "quién te desarrolló",
    ])
  ) {
    return "CREATOR";
  }

  // MAP dinámico
  for (const item of INTENT_KEYWORDS) {
    if (includesAny(t, item.keywords)) {
      return item.intent;
    }
  }

  if (isValidFarewell(t)) return "FAREWELL";

  return "UNKNOWN";
};

/* =========================
   AJUSTE POR CONTEXTO
========================= */
const adjustIntentIfJorgeMentioned = (text, currentIntent) => {
  const t = normalize(text);

  if (!OWNER_NAMES.some((name) => t.includes(name))) {
    return currentIntent;
  }

  // reutilizamos el mismo sistema
  const detected = detectIntent(text);

  if (detected !== "UNKNOWN") {
    return detected;
  }

  return currentIntent;
};

/* =========================
   CONTACT
========================= */
const handleContactIntent = (text, ctx) => {
  const t = normalize(text);

  if (OWNER_NAMES.some((name) => t.includes(name))) {
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

/* =========================
   MAIN
========================= */
export const getSmartResponse = (message, ctx = {}) => {
  const text = normalize(message);

  const randomReply = (options) =>
    options[Math.floor(Math.random() * options.length)];

  /* ===== BOT NAME ===== */
  const nameResponse = handleNamedPattern({
    text,
    regex:
      /(como te llamas|cual es tu nombre|cuál es tu nombre|dime tu nombre|quien eres|quién eres)/i,
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

  /* ===== GREETING ===== */
  const greetingResponse = handleNamedPattern({
    text,
    regex: /(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)/i,
    onValid: () => ({
      text: replies.GREETING(ctx),
      intent: "GREETING",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (greetingResponse) return greetingResponse;

  /* ===== GRACIAS ===== */
  const thanksResponse = handleNamedPattern({
    text,
    regex: /(gracias|muchas gracias)/i,
    onValid: () => ({
      text: replies.GRA(ctx),
      intent: "GRA",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (thanksResponse) return thanksResponse;

  /* ===== MOOD ===== */
  const moodResponse = handleNamedPattern({
    text,
    regex: /(como estas|cómo estás|estas bien|estás bien)/i,
    onValid: () => ({
      text: replies.MOOD(ctx),
      intent: "MOOD",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (moodResponse) return moodResponse;

  /* ===== WHAT DOING ===== */
  const doingResponse = handleNamedPattern({
    text,
    regex: /(que haces|qué haces|que estas haciendo)/i,
    onValid: () => ({
      text: replies.WHAT_DOING(ctx),
      intent: "WHAT_DOING",
    }),
    fallbackResponse: UNKNOWN_RESPONSE,
    botName: BOT_NAME,
  });

  if (doingResponse) return doingResponse;

  /* ===== USER NAME ===== */
  if (/^(me llamo|soy|mi nombre es)\s+/i.test(text)) {
    const name = message.replace(/^(me llamo|soy|mi nombre es)/i, "").trim();

    ctx.userName = name;
    saveMemory(ctx, { type: "user_name", value: name });

    return {
      text: `¡Mucho gusto, ${name}! 😊 ¿En qué puedo ayudarte hoy?`,
      intent: "USER_NAME",
    };
  }

  /* ===== FAREWELL ===== */
  if (isValidFarewell(text)) {
    return {
      text: replies.FAREWELL(ctx),
      intent: "FAREWELL",
    };
  }

  /* =========================
     FOLLOW UP
  ========================= */
  if (ctx.awaitingFollowUp) {
    if (includesAny(text, ["si", "sí", "claro", "ok", "dale"])) {
      const intentFollow = ctx.awaitingFollowUp;

      ctx.awaitingFollowUp = null;
      ctx.awaiting = null;

      const chainReplies = {
        PROFILE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
        EXPERIENCE: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
        SKILLS: `Estas tecnologías aplican en ${PROFILE.projects.join(", ")}.`,
      };

      return {
        text: chainReplies[intentFollow],
        intent: intentFollow === "SKILLS" ? "PROJECTS" : intentFollow,
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

  /* =========================
     CONTACT FLOW
  ========================= */
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

  /* =========================
     INTENT
  ========================= */
  let intent = detectIntent(text);
  intent = adjustIntentIfJorgeMentioned(text, intent);

  if (!isAboutOwner(text) && intent !== "CREATOR") {
    return {
      text: replies.UNKNOWN(),
      intent: "UNKNOWN",
    };
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
