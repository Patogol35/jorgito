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
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const blacklist = ["messi", "shakira", "ronaldo", "mbappe", "luis"];

  return words.some((w) => blacklist.includes(w));
};

/* =========================
🟡 PROTECCIÓN INTELIGENTE
========================= */
const isAboutOwner = (text) => {
  const normalizedText = text.toLowerCase();

  // Si menciona otra persona y no menciona a Jorge → bloquear
  if (hasExternalEntity(normalizedText) && !normalizedText.includes("jorge")) {
    return false;
  }

  // Si menciona a Jorge → permitir
  if (normalizedText.includes("jorge")) return true;

  // Preguntas abiertas
  if (
    normalizedText.includes("quien") ||
    normalizedText.includes("quién") ||
    normalizedText.includes("hablame") ||
    normalizedText.includes("háblame") ||
    normalizedText.includes("cuentame") ||
    normalizedText.includes("cuéntame")
  ) {
    return true;
  }

  // Keywords permitidas
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
export function getSmartResponse(message, context = {}) {
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

  const replies = createReplies({ pickNonRepeated, PROFILE });

  /* =========================
🧠 SALUDO
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
  } else if (
    text.includes("quien es") ||
    text.includes("quién es") ||
    text === "quien" ||
    text === "quién" ||
    text.includes("sobre")
  ) {
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
