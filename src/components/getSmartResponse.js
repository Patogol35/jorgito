import { createReplies } from "./replies";
import {
  WHATSAPP_URL,
  YES_WORDS,
  NO_WORDS,
  saveMemory,
  PROFILE,
  normalize,
  detectIntent,
  isValidFarewell,
  pickNonRepeated,
} from "./chatbot.config";

/* =========================
🟡 DETECTOR DE ENTIDADES EXTERNAS
========================= */
const hasExternalEntity = (text) => {
  const words = text.toLowerCase().split(" ");

  // Lista base (puedes ampliarla)
  const blacklist = ["messi", "shakira", "ronaldo", "mbappe"];

  return words.some((w) => blacklist.includes(w));
};

/* =========================
🟡 PROTECCIÓN INTELIGENTE
========================= */
const isAboutOwner = (text) => {
  const normalizedText = text.toLowerCase();

  // ❌ Si menciona otra persona → bloquear
  if (hasExternalEntity(normalizedText)) return false;

  // ✅ Si menciona a Jorge → permitir
  if (normalizedText.includes("jorge")) return true;

  const humanIntents = [
  "quien es",
  "hablame de",
  "habla de",
  "cuentame de",
  "sobre",
  "informacion",
  "perfil",
];

if (humanIntents.some((w) => normalizedText.includes(w))) {
  return true;
}

  // ✅ Keywords permitidas
  const allowedKeywords = [
    "proyecto",
    "experiencia",
    "tecnologia",
    "stack",
    "contacto",
    "whatsapp",
    "contratar",
    "perfil",
    "sobre",
  ];

  return allowedKeywords.some((word) =>
    normalizedText.includes(word)
  );
};

/* =========================
RESPUESTA INTELIGENTE
========================= */
export function getSmartResponse(message, context) {
  const text = normalize(message);

  const ctx = {
    ...context,
    memory: context.memory ? [...context.memory] : [],
    usedReplies: context.usedReplies
      ? Object.fromEntries(
          Object.entries(context.usedReplies).map(([k, v]) => [k, [...v]])
        )
      : {},
  };

  const BOT_NAME = "sasha";

  const replies = createReplies({ pickNonRepeated, PROFILE });

  /* =========================
  🧠 REDIRECCIÓN INTELIGENTE A JORGE
  ========================= */
  if (
    text.includes("proyecto") &&
    !text.includes("jorge")
  ) {
    return {
      text: "Claro 😊 Te cuento sobre los proyectos de Jorge:",
      intent: "PROJECTS_REDIRECT",
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
  if (YES_WORDS.includes(text)) {
    const intent = ctx.awaitingFollowUp;
    ctx.awaitingFollowUp = null;

    // 🔥 Usar el MISMO sistema de replies (no texto fijo)
    const chainReplies = {
      PROFILE: () => replies.EXPERIENCE(ctx),
      EXPERIENCE: () => replies.SKILLS(ctx),
      SKILLS: () => replies.PROJECTS(ctx),
    };

    if (chainReplies[intent]) {
      return {
        text: chainReplies[intent](),
        intent: intent === "SKILLS" ? "PROJECTS" : intent,
        fromFollowUp: true,
      };
    }
  }

  if (NO_WORDS.includes(text)) {
    ctx.awaitingFollowUp = null;
    return {
      text: "Está bien 😊 ¿En qué más puedo ayudarte?",
    };
  }

  // Si responde otra cosa, se cancela el follow-up
  ctx.awaitingFollowUp = null;
}



  
  /* =========================
  🟢 SALUDO
  ========================= */
  const greetingMatch = text.match(
    /^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)/i
  );

  if (greetingMatch) {
    return { text: replies.GREETING(ctx), intent: "GREETING" };
  }

  /* =========================
  🔴 DESPEDIDA
  ========================= */
  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL(ctx), intent: "FAREWELL" };
  }

  /* =========================
  🟢 INTENT
  ========================= */
  let intent = detectIntent(text);

  if (text.includes("contact") || text.includes("whatsapp")) {
    intent = "CONTACT";
  } else if (text.includes("tecnolog")) {
    intent = "SKILLS";
  } else if (text.includes("experiencia")) {
    intent = "EXPERIENCE";
  } else if (text.includes("proyecto")) {
    intent = "PROJECTS";
  } else if (text.includes("contratar")) {
    intent = "MOTIVATION";
  } else if (text.includes("stack")) {
    intent = "STACK";
  } else if (text.includes("sobre")) {
    intent = "PROFILE";
  }

  /* =========================
  🔒 VALIDACIÓN GLOBAL
  ========================= */
  if (!isAboutOwner(text)) {
    return {
      text: "Solo puedo hablar sobre Jorge 😊",
      intent: "OUT_OF_SCOPE",
    };
  }

  /* =========================
  💾 MEMORIA
  ========================= */
  saveMemory(ctx, { user: text, intent });

  /* =========================
  🟢 CONTACTO
  ========================= */
  if (intent === "CONTACT") {
    ctx.awaiting = "CONTACT_CONFIRM";

    return {
      text: `${replies.CONTACT(ctx)}\n\n¿Quieres que lo abra ahora?`,
      intent,
    };
  }

  /* =========================
  🧠 RESPUESTA FINAL
  ========================= */
  let replyText =
    typeof replies[intent] === "function"
      ? replies[intent](ctx)
      : replies[intent];

  if (!replyText) {
    replyText = replies.UNKNOWN(ctx);
    intent = "UNKNOWN";
  }

  return { text: replyText, intent };
}
