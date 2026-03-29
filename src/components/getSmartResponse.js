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
🟡 PROTECCIÓN DE DATOS: NIVEL PRO (FIX REAL)
========================= */

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .trim();

const isAboutOwner = (text) => {
  const normalizedText = normalizeText(text);

  const validNames = ["jorge", "patricio", "jorge patricio"];

  const blockedWords = [
    "gay","sexo","sexual","porn","xxx",
    "carpintero","carpintera","albañil","plomero","plomera",
    "electricista","mecanico","mecanica","chofer","taxista",
    "cocinero","cocinera","chef","panadero","panadera",
    "carnicero","carnicera","agricultor","agricultora",
    "ganadero","ganadera","pescador","pescadora",
    "soldador","soldadora","pintor","pintora",
    "obrero","obrera","jardinero","jardinera",
    "conserje","mesero","mesera","camarero","camarera",
    "bartender","barbero","barbera","peluquero","peluquera",
    "zapatero","zapatera","sastre","costurera",
    "repartidor","repartidora","mensajero","mensajera",
    "vendedor","vendedora","comerciante",
    "policia","militar","guardia","seguridad",
    "burro","burra","asno","asna","idiota",
    "tonto","tonta","estupido","estupida","imbecil",
    "perro","perra","cerdo","cerda","marrano","marrana",
    "bestia","rata","sapo",
    "pendejo","pendeja","huevon","huevona","weon","weona",
    "gil","boludo","boluda","tarado","tarada",
    "baboso","babosa","bruto","bruta","inutil","mediocre",
    "malparido","malparida","gonorrea","careverga","careculo",
    "pedorro","pedorra","loco","loca","indio","india",
    "longo","longa","puñal","prostituta","prostituto",
    "puto","puta","carcoso","carcosa","hediondo","hedionda",
    "apestoso","apestosa","pedante","asesino","asesina",
    "maldito","maldita","retrasado","retrasada",
    "ignorante","analfabeto","analfabeta",
    "patetico","patetica","ridiculo","ridicula",
    "basura","porqueria","asco","mierda",
    "inepto","inepta","incompetente",
    "fracasado","fracasada","perdedor","perdedora",
    "feo","fea","horrible","asqueroso","asquerosa",
    "gordo","gorda","flaco","flaca",
    "pobre"
  ];

  // 🔴 BLOQUEO REAL (palabra completa)
  const hasBlockedWord = blockedWords.some(word =>
    new RegExp(`\\b${word}\\b`).test(normalizedText)
  );

  if (hasBlockedWord) return false;

  // 🟢 Validar que menciona a Jorge (palabra completa)
  const hasOwnerName = validNames.some(name =>
    new RegExp(`\\b${name}\\b`).test(normalizedText)
  );

  if (hasOwnerName) return true;

  return false;
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

/* =========================
🟢 DETECTAR INTENT
========================= */

const normalizedText = normalizeText(text);

let intent = detectIntent(normalizedText);

const ownerNames = ["jorge", "patricio", "jorge patricio"];

const hasOwnerName = ownerNames.some(name =>
  new RegExp(`\\b${name}\\b`).test(normalizedText)
);

const isOnlyOwnerName = ["jorge","patricio","jorge patricio"]
  .includes(normalizedText);

const profileTriggers = [
  "quien es","hablame de","habla de","cuentame de",
  "cuenta de","dime de","dime el perfil","perfil de","sobre"
];

const hasProfileTrigger = profileTriggers.some(trigger =>
  normalizedText.includes(trigger)
);

const shouldTriggerProfile =
  isOnlyOwnerName ||
  (hasOwnerName && hasProfileTrigger);

/* =========================
🔥 VALIDACIÓN PROFILE
========================= */
if (intent === "PROFILE" && !shouldTriggerProfile) {
  intent = "UNKNOWN";
}

/* =========================
🔥 INTENTS PRIORITARIOS
========================= */
if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
  intent = "CONTACT";
} else if (
  normalizedText.includes("habilidad") ||
  normalizedText.includes("skills") ||
  normalizedText.includes("tecnolog") ||
  normalizedText.includes("framework")
) {
  intent = "SKILLS";
} else if (normalizedText.includes("experiencia")) {
  intent = "EXPERIENCE";
} else if (
  normalizedText.includes("estudio") ||
  normalizedText.includes("educacion")
) {
  intent = "EDUCATION";
} else if (normalizedText.includes("proyecto")) {
  intent = "PROJECTS";
} else if (normalizedText.includes("stack")) {
  intent = "STACK";
}

/* =========================
🔥 FALLBACK PROFILE
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
🧠 RESPUESTA NORMAL
========================= */
let replyText =
  typeof replies[intent] === "function"
    ? replies[intent](ctx)
    : replies[intent];

return {
  text: replyText || replies.OUT_OF_SCOPE(ctx),
  intent,
};
}
