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
🟡 PROTECCIÓN DE DATOS (STRICT MODE)
========================= */
const isAboutOwner = (text) => {
  const normalizedText = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .trim();

  const hasOwnerName = normalizedText.includes("jorge");

  // 🔥 detectar cualquier palabra tipo nombre
  const words = normalizedText.split(" ");

  const possibleName = words.find(
    (word) =>
      word.length > 3 &&
      /^[a-z]+$/.test(word) &&
      word !== "jorge"
  );

  // ❌ si detecta otro nombre → bloquear
  if (possibleName && !hasOwnerName) return false;

  // ✅ solo jorge permitido
  if (hasOwnerName) return true;

  return false;
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

  if (ctx.awaitingFollowUp) {
    const directIntent = detectIntent(message);
    if (directIntent !== "UNKNOWN") {
      ctx.awaitingFollowUp = null;
    }
  }

  const replies = createReplies({ pickNonRepeated, PROFILE });

  /* =========================
  🟢 SALUDO
  ========================= */
  const greetingMatch = text.match(
    /^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (greetingMatch) {
    const name = normalize(greetingMatch[2]?.trim() || "");

    if (!name || name === BOT_NAME) {
      return { text: replies.GREETING(ctx), intent: "GREETING" };
    }

    return { text: replies.UNKNOWN(ctx), intent: "UNKNOWN" };
  }

  /* =========================
  🟢 NOMBRE BOT
  ========================= */
  const nameMatch = text.match(
    /^(cual es tu nombre|como te llamas|tu nombre|como puedo llamarte)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (nameMatch) {
    const name = normalize(nameMatch[2]?.trim() || "");
    if (!name || name === BOT_NAME) {
      return { text: replies.NAME(ctx), intent: "NAME" };
    }
    return { text: replies.UNKNOWN(ctx), intent: "UNKNOWN" };
  }

  /* =========================
  🟢 CREADOR
  ========================= */
  const creatorMatch = text.match(
    /^(quien te creo|quien te creó|quien es tu creador|quién es tu creador)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (creatorMatch) {
    const name = normalize(creatorMatch[2]?.trim() || "");
    if (!name || name === BOT_NAME) {
      return { text: replies.CREATOR(ctx), intent: "CREATOR" };
    }
    return { text: replies.UNKNOWN(ctx), intent: "UNKNOWN" };
  }

  /* =========================
  🔴 DESPEDIDA
  ========================= */
  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL(ctx), intent: "FAREWELL" };
  }

  /* =========================
  🔵 WHATSAPP CONFIRM
  ========================= */
  if (ctx.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      ctx.awaiting = null;
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Perfecto 😊 Te llevo a WhatsApp.", intent: "CONTACT_OPENED" };
    }

    if (NO_WORDS.includes(text)) {
      ctx.awaiting = null;
      return { text: "Está bien 😊 Avísame si luego deseas contactarlo.", intent: "CONTACT_CANCEL" };
    }
  }

  /* =========================
  🟢 INTENT
  ========================= */
  let intent = detectIntent(text);

  if (/\b(jsjs|asdf|qwerty|xxx)\b/i.test(text)) {
    intent = "UNKNOWN";
  }

  const normalizedText = text;

  if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
    intent = "CONTACT";
  } else if (normalizedText.includes("tecnolog")) {
    intent = "SKILLS";
  } else if (normalizedText.includes("experiencia")) {
    intent = "EXPERIENCE";
  } else if (normalizedText.includes("estudio") || normalizedText.includes("master")) {
    intent = "EDUCATION";
  } else if (normalizedText.includes("proyecto")) {
    intent = "PROJECTS";
  } else if (normalizedText.includes("stack")) {
    intent = "STACK";
  } else if (normalizedText.includes("libro")) {
    intent = "BOOK";
  } else if (
    normalizedText.includes("quien es") ||
    normalizedText.includes("hablame") ||
    normalizedText.includes("cuentame") ||
    normalizedText.includes("sobre")
  ) {
    intent = "PROFILE";
  }

  /* =========================
  🔒 BLOQUEO GLOBAL (SIN BYPASS)
  ========================= */
  const isValidQuery = isAboutOwner(text);

  if (!isValidQuery) {
    return {
      text: "Ups 😅 solo puedo ayudarte con información de Jorge.",
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
    const contactMessage = replies.CONTACT(ctx);

    ctx.awaiting = "CONTACT_CONFIRM";
    return {
      text: `${contactMessage}\n\n¿Quieres que lo abra ahora?`,
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  /* =========================
  🧠 RESPUESTA
  ========================= */
  let replyText =
    typeof replies[intent] === "function"
      ? replies[intent](ctx)
      : replies[intent];

  if (!replyText) {
    replyText = replies.UNKNOWN(ctx);
    intent = "UNKNOWN";
  }

  return {
    text: replyText,
    intent,
  };
}
