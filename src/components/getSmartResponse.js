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
  🟢 MUCHO GUSTO
  ========================= */
  if (/^(mucho gusto|un gusto|encantado|encantada)/i.test(text)) {
    return { text: replies.NICE_TO_MEET(ctx), intent: "NICE_TO_MEET" };
  }

  /* =========================
  🟢 GRACIAS
  ========================= */
  if (/^(gracias|muchas gracias)/i.test(text)) {
    return { text: replies.GRA(ctx), intent: "GRA" };
  }

  /* =========================
  🟢 MOOD
  ========================= */
  if (/^(como estas|cómo estás|estas bien)/i.test(text)) {
    return { text: replies.MOOD(ctx), intent: "MOOD" };
  }

  /* =========================
  🟢 QUÉ HACE
  ========================= */
  if (/^(que haces|qué haces|que estas haciendo)/i.test(text)) {
    return { text: replies.WHAT_DOING(ctx), intent: "WHAT_DOING" };
  }

  /* =========================
  🟢 NOMBRE USUARIO
  ========================= */
  if (/^(me llamo|soy|mi nombre es)\s+/i.test(text)) {
    const name = message.replace(/^(me llamo|soy|mi nombre es)/i, "").trim();
    ctx.userName = name;
    saveMemory(ctx, { type: "user_name", value: name });

    return {
      text: `¡Mucho gusto, ${name}! 😊 ¿En qué puedo ayudarte hoy?`,
      intent: "USER_NAME",
    };
  }

  /* =========================
  🔴 DESPEDIDA
  ========================= */
  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL(ctx), intent: "FAREWELL" };
  }

  /* =========================
  🔵 CONFIRMAR CONTACTO
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
  🔵 FOLLOW UPS
  ========================= */
  if (ctx.awaitingFollowUp) {
    if (isYes(text)) {
      const intent = ctx.awaitingFollowUp;
      ctx.awaitingFollowUp = null;

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

    if (isNo(text)) {
      ctx.awaitingFollowUp = null;
      return { text: "Está bien 😊 ¿En qué más puedo ayudarte?" };
    }

    ctx.awaitingFollowUp = null;
  }

  /* =========================
  🔒 PROTECCIÓN
  ========================= */
  const isAboutOwner = (text) => {
    const t = normalize(text);
    const validNames = ["jorge", "patricio", "jorge patricio"];

    return validNames.some(name => t.includes(name)) || true;
  };

  if (!isAboutOwner(text)) {
    return { text: replies.OUT_OF_SCOPE(ctx), intent: "OUT_OF_SCOPE" };
  }

  /* =========================
  🧠 INTENT PRINCIPAL (ÚNICO)
  ========================= */
  let intent = detectIntent(text);

  if (intent === "UNKNOWN") {
    return { text: replies.OUT_OF_SCOPE(ctx), intent: "OUT_OF_SCOPE" };
  }

  saveMemory(ctx, { user: text, intent });

  /* =========================
  🟢 CONTACTO
  ========================= */
  if (intent === "CONTACT") {
    ctx.awaiting = "CONTACT_CONFIRM";
    return {
      text: `${replies.CONTACT(ctx)}\n\n¿Quieres que lo abra ahora?`,
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  /* =========================
  🧠 RESPUESTA NORMAL
  ========================= */
  const reply = replies[intent];
  const replyText =
    typeof reply === "function" ? reply(ctx) : reply;

  return {
    text: replyText || replies.OUT_OF_SCOPE(ctx),
    intent,
  };
    }
