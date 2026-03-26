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
VALIDACIÓN INTELIGENTE
========================= */
const isAboutOwner = (text) => {
  const t = normalize(text);

  // ❌ detectar nombres externos básicos
  const blacklist = ["messi", "shakira", "ronaldo", "mbappe"];
  if (blacklist.some((name) => t.includes(name))) {
    return false;
  }

  // ✅ si menciona a Jorge
  if (t.includes("jorge")) return true;
  const humanIntents = [
  "quien es",
  "hablame de",
  "habla de",
  "cuentame de",
  "sobre",
  "informacion",
  "perfil",
];

if (humanIntents.some((w) => t.includes(w))) {
  return true;
}

  // ✅ keywords permitidas
  const allowed = [
    "proyecto",
    "experiencia",
    "tecnologia",
    "stack",
    "contacto",
    "whatsapp",
    "contratar",
    "perfil",
  ];

  return allowed.some((w) => t.includes(w));
};

/* =========================
RESPUESTA
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

  const replies = createReplies({ pickNonRepeated, PROFILE });

  /* =========================
CONTEXTO (CONTACTO)
========================= */
  if (ctx.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      return {
        text: `Perfecto 🚀 Aquí tienes el enlace:\n${WHATSAPP_URL}`,
        intent: "CONTACT_OPEN",
      };
    }

    if (NO_WORDS.includes(text)) {
      return {
        text: "Perfecto 😊 Si lo necesitas luego, aquí estaré.",
        intent: "CONTACT_CANCEL",
      };
    }
  }

  /* =========================
SALUDO
========================= */
  if (/^(hola|buenos dias|buenas tardes|buenas noches)/.test(text)) {
    return { text: replies.GREETING(ctx), intent: "GREETING" };
  }

  /* =========================
DESPEDIDA
========================= */
  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL(ctx), intent: "FAREWELL" };
  }

  /* =========================
INTENT
========================= */
  let intent = detectIntent(text);

  // fallback inteligente SOLO si falla
  if (intent === "UNKNOWN") {
    if (text.includes("contact") || text.includes("whatsapp")) {
      intent = "CONTACT";
    } else if (text.includes("tecnolog")) {
      intent = "SKILLS";
    } else if (text.includes("experiencia")) {
      intent = "EXPERIENCE";
    } else if (text.includes("proyecto")) {
      intent = "PROJECTS";
    }
  }

  /* =========================
VALIDACIÓN GLOBAL
========================= */
  if (!isAboutOwner(text)) {
    return {
      text: "Solo puedo hablar sobre Jorge 😊",
      intent: "OUT_OF_SCOPE",
    };
  }

  /* =========================
MEMORIA
========================= */
  saveMemory(ctx, { user: text, intent });

  /* =========================
CONTACTO
========================= */
  if (intent === "CONTACT") {
    ctx.awaiting = "CONTACT_CONFIRM";

    return {
      text: `${replies.CONTACT(ctx)}\n\n¿Quieres que lo abra ahora?`,
      intent,
    };
  }

  /* =========================
RESPUESTA FINAL
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
