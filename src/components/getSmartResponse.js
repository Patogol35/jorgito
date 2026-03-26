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
  const blacklist = ["messi", "shakira", "ronaldo", "mbappe", "luis"];

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
