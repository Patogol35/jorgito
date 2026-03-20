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

// --------------------
// FOLLOW UP
// --------------------
export const followUp = (intent) => {
  const map = {
    PROFILE: "¿Quieres que también te cuente sobre su experiencia?",
    EXPERIENCE: "¿Quieres saber qué tecnologías utiliza?",
    SKILLS: "¿Quieres ver en qué proyectos se aplican estas tecnologías?",
  };

  return map[intent] || null;
};

// --------------------
// DETECT INTENT (FIX CONTACT)
// --------------------
export const detectIntent = (text) => {
  const t = normalize(text);

  if (
    t.includes("quien es") ||
    OWNER_NAMES.some((name) => t.includes(name))
  ) return "PROFILE";

  if (includesAny(t, ["experiencia"])) return "EXPERIENCE";

  if (t.includes("tecnolog") || t.includes("habilidad") || t.includes("skill"))
    return "SKILLS";

  if (t.includes("stack")) return "STACK";

  if (t.includes("proyecto")) return "PROJECTS";

  if (
    includesAny(t, ["estudio", "master", "formacion"])
  ) return "EDUCATION";

  // 🔥 FIX CLAVE
  if (t.includes("contact") || t.includes("whatsapp"))
    return "CONTACT";

  if (t.includes("contratar")) return "MOTIVATION";

  if (includesAny(t, ["libro", "dan brown"])) return "BOOK";

  if (isValidFarewell(t)) return "FAREWELL";

  return "UNKNOWN";
};

// --------------------
// AJUSTE POR NOMBRE
// --------------------
const adjustIntentIfJorgeMentioned = (text, currentIntent) => {
  const t = normalize(text);

  if (!OWNER_NAMES.some((name) => t.includes(name))) {
    return currentIntent;
  }

  // 🔥 FIX CLAVE
  if (t.includes("contact") || t.includes("whatsapp")) return "CONTACT";

  if (t.includes("tecnolog")) return "SKILLS";
  if (t.includes("experiencia")) return "EXPERIENCE";
  if (includesAny(t, ["estudio", "master", "formacion"])) return "EDUCATION";
  if (t.includes("proyecto")) return "PROJECTS";
  if (t.includes("contratar")) return "MOTIVATION";
  if (t.includes("stack")) return "STACK";
  if (includesAny(t, ["libro", "dan brown"])) return "BOOK";

  return currentIntent;
};

// --------------------
// CONTACT (FIX LOOP)
// --------------------
const handleContactIntent = (text, ctx) => {
  const t = normalize(text);

  // 🔥 EVITA LOOP
  if (ctx.awaiting === "CONTACT_CONFIRM") {
    return {
      text: "😊 Solo necesito que me confirmes si deseas abrir WhatsApp.",
      intent: "CONTACT_PENDING",
    };
  }

  if (OWNER_NAMES.some((name) => t.includes(name))) {
    ctx.awaiting = "CONTACT_CONFIRM";
    return {
      text: replies.CONTACT(),
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
    text: replies.CONTACT(),
    action: "CONTACT_CONFIRM",
    intent: "CONTACT",
  };
};

// --------------------
// MAIN
// --------------------
export const getSmartResponse = (message, ctx = {}) => {
  const text = normalize(message);

  const randomReply = (options) =>
    options[Math.floor(Math.random() * options.length)];

  // ---------------- NAME BOT
  const nameResponse = handleNamedPattern({
    text,
    regex: /^(como te llamas|cual es tu nombre|cuál es tu nombre|quien eres)/i,
    onValid: () => ({
      text: randomReply([
        `Me llamo Sasha 😊, soy la asistente virtual de Jorge Patricio.`,
        `Soy Sasha 👋, la asistente de Jorge Patricio.`,
      ]),
      intent: "BOT_NAME",
    }),
    fallbackResponse: null,
    botName: BOT_NAME,
  });
  if (nameResponse) return nameResponse;

  // ---------------- GREETING
  const greetingResponse = handleNamedPattern({
    text,
    regex: /^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)/i,
    onValid: () => ({
      text: replies.GREETING(ctx),
      intent: "GREETING",
    }),
    fallbackResponse: null,
    botName: BOT_NAME,
  });
  if (greetingResponse) return greetingResponse;

  // ---------------- THANKS
  const thanksResponse = handleNamedPattern({
    text,
    regex: /^(gracias|muchas gracias)/i,
    onValid: () => ({
      text: replies.GRA(ctx),
      intent: "GRA",
    }),
    fallbackResponse: null,
    botName: BOT_NAME,
  });
  if (thanksResponse) return thanksResponse;

  // ---------------- MOOD
  const moodResponse = handleNamedPattern({
    text,
    regex: /^(como estas|cómo estás)/i,
    onValid: () => ({
      text: replies.MOOD(ctx),
      intent: "MOOD",
    }),
    fallbackResponse: null,
    botName: BOT_NAME,
  });
  if (moodResponse) return moodResponse;

  // ---------------- USER NAME
  if (/^(me llamo|soy|mi nombre es)\s+/i.test(text)) {
    const name = message.replace(/^(me llamo|soy|mi nombre es)/i, "").trim();

    ctx.userName = name;
    saveMemory(ctx, { type: "user_name", value: name });

    return {
      text: `¡Mucho gusto, ${name}! 😊 ¿En qué puedo ayudarte hoy?`,
      intent: "USER_NAME",
    };
  }

  // ---------------- CONTACT CONFIRM
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

  // ---------------- FOLLOW UP FLOW
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

  // ---------------- INTENT
  let intent = detectIntent(text);
  intent = adjustIntentIfJorgeMentioned(text, intent);

  saveMemory(ctx, { user: text, intent });

  // ---------------- CONTACT
  if (intent === "CONTACT") {
    return handleContactIntent(message, ctx);
  }

  // ---------------- REPLY
  const reply = replies[intent];
  const replyText = typeof reply === "function" ? reply(ctx) : reply;

  // ---------------- FOLLOW UP (FIX DUPLICADO)
  const follow = followUp(intent);

  if (follow && ctx.awaitingFollowUp !== intent) {
    ctx.awaitingFollowUp = intent;
    return {
      text: `${replyText}\n\n${follow}`,
      intent,
    };
  }

  return {
    text: replyText || replies.UNKNOWN(),
    intent,
  };
};
