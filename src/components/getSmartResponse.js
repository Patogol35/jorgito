import { createReplies } from "./replies";
import {
  WHATSAPP_URL,
  saveMemory,
  PROFILE,
  normalize,
  detectIntent,
  isValidFarewell,
  pickNonRepeated,
  isYes,
  isNo
} from "./chatbot.config";

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
🟢 SALUDOS / FRASES DIRECTAS
========================= */
  const greetingMatch = text.match(/^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)(\s+\w+)?$/i);

  if (greetingMatch) {
    const name = normalize(greetingMatch[2]?.trim() || "");
    if (!name || name === BOT_NAME) {
      return { text: replies.GREETING(ctx), intent: "GREETING" };
    }
    return { text: replies.UNKNOWN(ctx), intent: "UNKNOWN" };
  }

  const thanksMatch = text.match(/^(gracias|muchas gracias)(\s+\w+)?$/i);
  if (thanksMatch) {
    return { text: replies.GRA(ctx), intent: "GRA" };
  }

  /* =========================
🔴 DESPEDIDA
========================= */
  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL(ctx), intent: "FAREWELL" };
  }

  /* =========================
🔵 CONFIRMAR WHATSAPP
========================= */
  if (ctx.awaiting === "CONTACT_CONFIRM") {
    if (isYes(text)) {
      ctx.awaiting = null;
      window.open(WHATSAPP_URL, "_blank");

      return {
        text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
        intent: "CONTACT_OPENED",
      };
    }

    if (isNo(text)) {
      ctx.awaiting = null;
      return {
        text: "Está bien 😊 Avísame si luego deseas contactarlo.",
        intent: "CONTACT_CANCEL",
      };
    }
  }

  /* =========================
🔒 PROTECCIÓN: SOLO SOBRE JORGE
========================= */
  const isAboutOwner = (text) => {
    const t = text.toLowerCase();
    return (
      t.includes("jorge") ||
      t.includes("patricio") ||
      t.includes("portafolio") ||
      t.includes("desarrollador")
    );
  };

  if (!isAboutOwner(text)) {
    return {
      text: replies.OUT_OF_SCOPE(ctx),
      intent: "OUT_OF_SCOPE",
    };
  }

  /* =========================
🧠 DETECTAR INTENT (BIEN HECHO)
========================= */
  let intent = detectIntent(text);
  const normalizedText = text.toLowerCase();

  // 🔥 PRIORIDAD: específicos primero
  if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
    intent = "CONTACT";
  } else if (normalizedText.includes("experiencia")) {
    intent = "EXPERIENCE";
  } else if (normalizedText.includes("tecnolog")) {
    intent = "SKILLS";
  } else if (
    normalizedText.includes("estudio") ||
    normalizedText.includes("master") ||
    normalizedText.includes("formacion")
  ) {
    intent = "EDUCATION";
  } else if (normalizedText.includes("proyecto")) {
    intent = "PROJECTS";
  } else if (normalizedText.includes("contratar")) {
    intent = "MOTIVATION";
  } else if (
    normalizedText.includes("stack") ||
    normalizedText.includes("full stack")
  ) {
    intent = "STACK";
  }

  // 🔥 SOLO si no hay algo específico → PROFILE
  const isGeneralProfileQuery = [
    "quien es",
    "hablame",
    "cuentame",
    "dime",
    "sobre"
  ].some(word => normalizedText.includes(word));

  if (intent === "UNKNOWN" && isGeneralProfileQuery) {
    intent = "PROFILE";
  }

  if (intent === "UNKNOWN") {
    return {
      text: replies.OUT_OF_SCOPE(ctx),
      intent: "OUT_OF_SCOPE",
    };
  }

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
    return {
      text: replies.OUT_OF_SCOPE(ctx),
      intent: "OUT_OF_SCOPE",
    };
  }

  return {
    text: replyText,
    intent,
  };
}
