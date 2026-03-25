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

  const isAboutOwner = (text) => {
  const validNames = ["jorge patricio", "jorge", "patricio"];
  const normalizedText = normalize(text);

  // 1) Si contiene nombre válido → permitir
  if (validNames.some((name) => normalizedText.includes(name))) {
    return true;
  }

  // 2) Detectar si menciona OTRO nombre después de patrones comunes
  const otherNamePatterns = [
  /\b(?:de|a|sobre|acerca de|contactar a|contacto de|contratar a)\s+([a-záéíóúñ]+(?:\s+[a-záéíóúñ]+)?)/i,
  /\b(?:quien es|quién es|dime si|quiero saber si|sabes si)\s+([a-záéíóúñ]+(?:\s+[a-záéíóúñ]+)?)/i,
  /^([a-záéíóúñ]+(?:\s+[a-záéíóúñ]+)?)\s+(?:es|tiene|trabaja|usa|estudio|estudió|hace|desarrolla|programa|sabe|conoce)/i,
];

    

  for (const pattern of otherNamePatterns) {
    const match = text.match(pattern);
    if (match) {
      const possibleName = normalize(match[1]);

      const invalidNameWords = [
  "su", "sus", "experiencia", "proyectos", "estudios",
  "tecnologias", "tecnología", "perfil", "stack",
  "habilidades", "contacto", "whatsapp"
];

// 🚀 Ignorar falsos "nombres"
if (invalidNameWords.some(word => possibleName.includes(word))) {
  continue;
}

      // Si el nombre detectado NO es uno válido → bloquear
      if (!validNames.some((name) => possibleName.includes(name) || name.includes(possibleName))) {
        return false;
      }
    }
  }

  // 3) Si no hay nombre explícito, permitir si parece claramente sobre Jorge
  const ownerKeywords = [
  "su experiencia", "sus proyectos", "sus estudios", "sus tecnologias", "sus tecnologías",
  "su perfil", "su stack", "sus habilidades", "sus libros",
  "su contacto", "su whatsapp", "contactarlo",
  "quien te creo", "quién te creó",
  "cuentame sobre", "cuéntame sobre", "dime acerca de",
  "como contactar", "cómo contactar",
  "que experiencia tiene", "qué experiencia tiene",
  "que estudios tiene", "qué estudios tiene",
  "que tecnologias usa", "qué tecnologías usa",
  "que proyectos tiene", "qué proyectos tiene",
  "es full stack"
];

  const hasOwnerContext = ownerKeywords.some((kw) => normalizedText.includes(kw));

  if (hasOwnerContext) {
    return true;
  }

  // 4) Si no parece sobre Jorge → permitir solo mensajes generales
  return true;
};

  // 🔒 Bloquear si NO es sobre Jorge
if (!isAboutOwner(text)) {
  return {
    text: replies.OUT_OF_SCOPE(ctx),
    intent: "OUT_OF_SCOPE",
  };
}

 /* =========================
  🟢 DETECTAR INTENT (SOBRE JORGE)
  ========================= */

  if (["jorge", "jorge patricio", "patricio"].includes(text)) {
  return {
    text: replies.PROFILE(ctx),
    intent: "PROFILE",
  };
  }
let intent = detectIntent(text);

  const normalizedText = text.toLowerCase();

const isImplicitOwnerQuery =
  normalizedText.includes("jorge") ||
  normalizedText.includes("su ") ||
  normalizedText.includes("sus ") ||
  normalizedText.includes(" es ") ||
  normalizedText.startsWith("es ") ||
  normalizedText.includes("tiene") ||
  normalizedText.includes("trabaja") ||
  normalizedText.includes("usa");

if (isImplicitOwnerQuery) {
  if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
    intent = "CONTACT";
  } else if (normalizedText.includes("tecnolog") || normalizedText.includes("usa")) {
    intent = "SKILLS";
  } else if (normalizedText.includes("experiencia") || normalizedText.includes("tiene experiencia")) {
    intent = "EXPERIENCE";
  } else if (normalizedText.includes("estudio") || normalizedText.includes("máster") || normalizedText.includes("formación")) {
    intent = "EDUCATION";
  } else if (normalizedText.includes("proyecto")) {
    intent = "PROJECTS";
  } else if (normalizedText.includes("contratar")) {
    intent = "MOTIVATION";
  } else if (normalizedText.includes("stack") || normalizedText.includes("full stack")) {
    intent = "STACK";
  } else if (normalizedText.includes("libro") || normalizedText.includes("dan brown")) {
    intent = "BOOK";
  }
}

if (intent === "FAREWELL" && !isValidFarewell(text)) {
  intent = "UNKNOWN";
}

saveMemory(ctx, { user: text, intent });
      /* =========================
🟢 CONTACTO (SOLO SI ES SOBRE JORGE)
========================= */
if (intent === "CONTACT") {
  const normalizedText = text.toLowerCase();
  const validNames = ["jorge", "patricio", "jorge patricio"];

  // 🔹 Generar mensaje dinámico
  const contactMessage = replies.CONTACT(ctx);

  // Si menciona tu nombre → permitir
  if (validNames.some(name => normalizedText.includes(name))) {
    ctx.awaiting = "CONTACT_CONFIRM";
    return {
      text: `${contactMessage}\n\n¿Quieres que lo abra ahora?`,
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  // Extraer posibles nombres después de "contactar"
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

  // Bloquear si no es Jorge
  if (
    otherName &&
    !validNames.some(
      name => otherName.includes(name) || name.includes(otherName)
    )
  ) {
    return {
      text: "Solo tengo información sobre Jorge Patricio 🙂",
      intent: "UNKNOWN",
    };
  }

  // Si no hay nombre → asumir que es sobre Jorge
  ctx.awaiting = "CONTACT_CONFIRM";
  return {
    text: `${contactMessage}\n\n¿Quieres que lo abra ahora?`,
    action: "CONTACT_CONFIRM",
    intent,
  };
                                     }

  // =========================
  // 🧠 RESPUESTA NORMAL
  // =========================
  let replyText;

if (typeof replies[intent] === "function") {
  replyText = replies[intent](ctx);
} else {
  replyText = replies[intent];
}

if (!replyText) {
  replyText = replies.UNKNOWN(ctx);
  intent = "UNKNOWN";
}

return {
  text: replyText,
  intent,
}; }
