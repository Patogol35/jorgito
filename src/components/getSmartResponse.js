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
  isYes,
  isNo
} from "./chatbot.config";

/* =========================
RESPUESTA INTELIGENTE
========================= */
export function getSmartResponse(message, context) {
  const text = normalize(message);

  // 🔑 Clonar contexto para evitar mutaciones
  const ctx = {
    ...context,
    memory: context.memory ? [...context.memory] : [],
    usedReplies: context.usedReplies
      ? Object.fromEntries(
          Object.entries(context.usedReplies).map(([k, v]) => [k, [...v]])
        )
      : {},
  };

  // 🔑 Constantes al inicio
  const BOT_NAME = "sasha";

  // 🔥 Si hay follow-up pendiente pero el usuario hace una pregunta clara,
  // se cancela el follow-up y se responde normalmente
  if (ctx.awaitingFollowUp) {
    const directIntent = detectIntent(message);
    if (directIntent !== "UNKNOWN") {
      ctx.awaitingFollowUp = null;
    }
  }

  const replies = createReplies({ pickNonRepeated, PROFILE });

  /* =========================
  🟢 SALUDO CORRECTO
  ========================= */
  const greetingMatch = text.match(
    /^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (greetingMatch) {
    const name = normalize(greetingMatch[2]?.trim() || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.GREETING(ctx),
        intent: "GREETING",
      };
    }

    return {
  text: replies.UNKNOWN(ctx),
  intent: "UNKNOWN",
};
  }

  /* =========================
🟣 NAME CONTROLADO
========================= */
const nameMatch = text.match(
  /^(como te llamas|cual es tu nombre|tu nombre|quien eres)(\s+[a-zA-Záéíóúñ]+)?$/i
);

if (nameMatch) {
  const name = normalize(nameMatch[2]?.trim() || "");

  if (!name || name === BOT_NAME) {
    return {
      text: replies.NAME(ctx),
      intent: "NAME",
    };
  }

  return {
    text: replies.UNKNOWN(ctx),
    intent: "UNKNOWN",
  };
}

  /* =========================
🟢 MUCHO GUSTO
========================= */
const niceToMeetMatch = text.match(
  /^(mucho gusto|un gusto|encantado|encantada)(\s+[a-zA-Záéíóúñ]+)?$/i
);

if (niceToMeetMatch) {
  const name = normalize(niceToMeetMatch[2]?.trim() || "");

  if (!name || name === BOT_NAME) {
    return {
      text: replies.NICE_TO_MEET(ctx),
      intent: "NICE_TO_MEET",
    };
  }

  return {
    text: replies.UNKNOWN(ctx),
    intent: "UNKNOWN",
  };
}

  /* =========================
  🟢 GRACIAS CONTROLADO
  ========================= */
  const thanksMatch = text.match(
    /^(gracias|muchas gracias)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (thanksMatch) {
    const name = normalize(thanksMatch[2]?.trim() || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.GRA(ctx),
        intent: "GRA",
      };
    }

    return {
  text: replies.UNKNOWN(ctx),
  intent: "UNKNOWN",
};
  }

  /* =========================
  🟢 ESTADO DE ÁNIMO
  ========================= */
  const moodMatch = text.match(
    /^(como estas|cómo estás|estas bien|estás bien)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (moodMatch) {
    const name = normalize(moodMatch[2] || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.MOOD(ctx),
        intent: "MOOD",
      };
    }

    return {
  text: replies.UNKNOWN(ctx),
  intent: "UNKNOWN",
};
  }

      /* =========================
  🟢 QUÉ ESTÁ HACIENDO
  ========================= */
  const doingMatch = text.match(
    /^(que haces|qué haces|que estas haciendo|qué estás haciendo|en que estas|en qué estás|que andas haciendo|qué andas haciendo)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (doingMatch) {
    const name = normalize(doingMatch[2] || "");

    if (!name || name === BOT_NAME) {
      return {
        text: replies.WHAT_DOING(ctx),
        intent: "WHAT_DOING",
      };
    }

    return {
  text: replies.UNKNOWN(ctx),
  intent: "UNKNOWN",
};
  }

  /* =========================
  🟢 DETECTAR NOMBRE USUARIO
  ========================= */
  if (/^(me llamo|soy|mi nombre es)\s+/i.test(text)) {
    const name = message
      .replace(/^(me llamo|soy|mi nombre es)/i, "")
      .trim();

    ctx.userName = name;
    saveMemory(ctx, { type: "user_name", value: name });

    return {
      text: `¡Mucho gusto, ${name}! 😊 ¿En qué puedo ayudarte hoy?`,
      intent: "USER_NAME",
    };
  }

  /* =========================
  🔴 DESPEDIDA PRIORIDAD ABSOLUTA
  ========================= */
  if (isValidFarewell(text)) {
    return {
      text: replies.FAREWELL(ctx),
      intent: "FAREWELL",
    };
  }

  /* =========================
🔵 CONFIRMACIÓN WHATSAPP
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
FOLLOW UPS
========================= */
if (ctx.awaitingFollowUp) {
  if (isYes(text)) {
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

  if (isNo(text)) {
    ctx.awaitingFollowUp = null;
    return {
      text: "Está bien 😊 ¿En qué más puedo ayudarte?",
    };
  }

  // Si responde otra cosa, se cancela el follow-up
  ctx.awaitingFollowUp = null;
}


/* =========================
🤖 SELF BOT (QUIÉN TE CREÓ / QUIÉN ERES) PRO
========================= */
const botMatch = text.match(
  /^(?:[a-zA-Záéíóúñ]+\s+)*(quien te creo|quien te creó|quien eres|que eres|qué eres)(\s+[a-zA-Záéíóúñ]+)?$/i
);

if (botMatch) {
  const name = normalize(botMatch[2]?.trim() || "");

  // ✅ Solo válido si NO hay nombre o es el bot
  if (!name || name === BOT_NAME) {
    return {
      text: replies.CREATOR(ctx),
      intent: "CREATOR",
    };
  }

  // ❌ Si meten otro nombre → bloquear
  return {
    text: replies.UNKNOWN(ctx),
    intent: "UNKNOWN",
  };
}


/* =========================
🟡 PROTECCIÓN DE DATOS: NIVEL PRO (FINAL)
========================= */

  const isAboutOwner = (text) => {
  const normalizedText = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .trim();

  const validNames = ["jorge", "patricio", "jorge patricio"];

  return validNames.some(name => normalizedText.includes(name));
};
/* =========================
🔒 BLOQUEO GLOBAL
========================= */
if (!isAboutOwner(text)) {
  return {
    text: replies.OUT_OF_SCOPE(ctx),
    intent: "OUT_OF_SCOPE",
  };

}



// 🔴 TEMAS SENSIBLES
const sensitiveTopics = [
  "gay",
  "lesbiana",
  "homosexual",
  "bisexual",
  "sexualidad",
  "orientacion",
  "orientación",
  "vida privada",
  "pareja",
  "novia",
  "novio",
  "esposa",
  "esposo",
];

const isSensitiveAboutOwner = (text) => {
  return sensitiveTopics.some(word => text.includes(word));
};

// 🚫 BLOQUEO DE PREGUNTAS SENSIBLES SOBRE EL OWNER
if (isAboutOwner(text) && isSensitiveAboutOwner(text)) {
  return {
    text: "Prefiero no compartir información personal 😊 Pero puedo contarte sobre su experiencia profesional, habilidades o proyectos.",
    intent: "SENSITIVE_BLOCK",
  };
}

  


/* =========================
🟢 DETECTAR INTENT
========================= */
let intent = detectIntent(text);

const normalizedText = text; // ya viene normalizado arriba

const ownerNames = ["jorge", "patricio", "jorge patricio"];
const hasOwnerName = ownerNames.some(name => normalizedText.includes(name));

// ✅ Solo nombre exacto
const isOnlyOwnerName = [
  "jorge",
  "patricio",
  "jorge patricio"
].includes(normalizedText.trim());

// ✅ Triggers válidos SOLO para PROFILE
const profileTriggers = [
  "quien es",
  "hablame",
  "ablame",
  "habla de",
  "cuentame",
  "cuenta de",
  "dime de",
  "perfil",
  "sobre",
  "informacion",
  "datos",
  "presentame",
  "presenta",
  "quiero saber",
  "conocer",
  "acerca de",
  "biografia",
  "resumen",
  "descripcion"
];

const hasProfileTrigger = profileTriggers.some(trigger =>
  normalizedText.includes(trigger)
);

// ✅ PROFILE estricto
const shouldTriggerProfile =
  isOnlyOwnerName ||
  (hasOwnerName && hasProfileTrigger);

/* =========================
🔥 SI detectIntent devolvió PROFILE, VALIDARLO
========================= */
if (intent === "PROFILE" && !shouldTriggerProfile) {
  intent = "UNKNOWN";
}

/* =========================
🔥 INTENTS MÁS ESPECÍFICOS (siempre prioridad)
========================= */
if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
  intent = "CONTACT";
} else if (
  normalizedText.includes("habilidad") ||
  normalizedText.includes("habilidades") ||
  normalizedText.includes("skill") ||
  normalizedText.includes("skills") ||
  normalizedText.includes("tecnolog") ||
  normalizedText.includes("lenguaje") ||
  normalizedText.includes("lenguajes") ||
  normalizedText.includes("framework") ||
  normalizedText.includes("herramienta")
) {
  intent = "SKILLS";
} else if (normalizedText.includes("experiencia")) {
  intent = "EXPERIENCE";
} else if (
  normalizedText.includes("estudio") ||
  normalizedText.includes("estudios") ||
  normalizedText.includes("master") ||
  normalizedText.includes("formacion") ||
  normalizedText.includes("educacion")
) {
  intent = "EDUCATION";
} else if (normalizedText.includes("proyecto")) {
  intent = "PROJECTS";
} else if (
  normalizedText.includes("contratar") ||
  normalizedText.includes("elegir") ||
  normalizedText.includes("escoger") ||
  normalizedText.includes("confiar")
) {
  intent = "MOTIVATION";
} else if (
  normalizedText.includes("stack") ||
  normalizedText.includes("full stack")
) {
  intent = "STACK";
} else if (normalizedText.includes("libro")) {
  intent = "BOOK";
}

/* =========================
🔥 Si sigue UNKNOWN, recién permitir PROFILE como fallback
========================= */
if (intent === "UNKNOWN" && shouldTriggerProfile) {
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
  const contactMessage = replies.CONTACT(ctx);

  ctx.awaiting = "CONTACT_CONFIRM";
  return {
    text: `${contactMessage}\n\n¿Quieres que lo abra ahora?`,
    action: "CONTACT_CONFIRM",
    intent,
  };
}

/* =========================
🧠 RESPUESTA NORMAL
========================= */
let replyText;

if (typeof replies[intent] === "function") {
  replyText = replies[intent](ctx);
} else {
  replyText = replies[intent];
}

if (!replyText) {
  replyText = replies.OUT_OF_SCOPE(ctx);
  intent = "OUT_OF_SCOPE";
}

return {
  text: replyText,
  intent,
}; }
