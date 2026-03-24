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


  
/* =========================
🔴 BLOQUEO DE NOMBRES AJENOS (FIX)
========================= */
const validNames = ["jorge", "patricio", "jorge patricio"];

// Buscar específicamente "de + nombre" al FINAL
const nameMatch = text.match(/de\s+([a-zA-Záéíóúñ]+)$/i);

if (nameMatch) {
  const detectedName = normalize(nameMatch[1]);

  if (
    detectedName &&
    !validNames.some(
      name =>
        detectedName.includes(name) ||
        name.includes(detectedName)
    )
  ) {
    return {
      text: "Solo tengo información sobre Jorge Patricio 🙂",
      intent: "UNKNOWN",
    };
  }
}


  

  /* =========================
🟡 PROTECCIÓN DE DATOS: ¿ES SOBRE JORGE?
========================= */
const isAboutOwner = (text) => {
  const validNames = ["jorge", "patricio", "jorge patricio"];
  const normalizedText = text.toLowerCase().trim();

  if (validNames.some(name => normalizedText.includes(name))) {
    return true;
  }

  const sensitiveKeywords = [
    "tecnologia", "tecnologias", "tecnologías",
    "experiencia", "estudios", "perfil", "contratar",
    "proyectos", "stack", "habilidades", "lenguajes",
    "quien es", "quién es", "formacion", "formación",
    "educacion", "educación", "máster", "master",
    "libros", "libro", "full stack", "desarrollador",
    "ingeniero", "stack","full","contactar", "contacto","whatsapp"
  ];

  const hasSensitive = sensitiveKeywords.some(kw => normalizedText.includes(kw));
  const words = normalizedText.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  if (!hasSensitive) {
    return true;
  }

    // Frases multi-palabra válidas sin nombre
  const validMultiWord = [
    "full stack",
    "libros favoritos",
    "máster en",
    "proyectos realizados",
    "experiencia profesional",
    "qué estudios",
    "que estudios",
    "qué experiencia",
    "que experiencia",
    "qué tecnologías",
    "que tecnologias",
    "tecnologías trabaja",
    "es full stack",
    "por qué contratar",
    "como contactar",
    "cómo contactar",
    "quién te creó",
    "quien te creo",
    "sus libros",
    "estudios tiene",
    "experiencia tiene",
    "tecnologías trabaja",
    "proyectos ha hecho",
    "cuéntame sobre",
    "cuentame sobre"
  ];

  if (validMultiWord.some(phrase => normalizedText.includes(phrase))) {
    return true;
  }

  // Permitir si es 1 palabra
  if (wordCount === 1) {
    return true;
  }

  // Bloquear todo lo demás sensible con 2+ palabras que no sea sobre ti
  return false;
};

  // 🔒 Bloquear si NO es sobre ti
  if (!isAboutOwner(text)) {
  return {
    text: replies.OUT_OF_SCOPE(ctx),
    intent: "OUT_OF_SCOPE",
  };
}

 /* =========================
  🟢 DETECTAR INTENT (SOBRE JORGE)
  ========================= */
let intent = detectIntent(text);

// 🔁 Ajuste: si "jorge" aparece junto con una palabra clave específica,
// priorizar la intención técnica/sensible sobre PROFILE
const normalizedText = text.toLowerCase();
if (normalizedText.includes("jorge")) {
  if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
    intent = "CONTACT";
  } else if (normalizedText.includes("tecnolog")) {
    intent = "SKILLS";
  } else if (normalizedText.includes("experiencia")) {
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
  // Si ninguna condición se cumple, se respeta la intención detectada originalmente
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
