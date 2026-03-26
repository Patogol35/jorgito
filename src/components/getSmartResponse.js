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

  const intentKeywords = [
    "tecnolog","experien","estudi","formacion","educacion",
    "master","universidad","proyecto","habilidad","stack",
    "contact","libro","desarrollador","ingeniero","trabaja",
    "usa","utiliza","maneja","sabe","conoce"
  ];

  const hasIntent = intentKeywords.some(k =>
    normalizedText.includes(k)
  );

  const hasOwnerName = validNames.some(name =>
    normalizedText.includes(name)
  );

  // 🔥 detectar palabras tipo "nombre"
  const words = normalizedText.split(" ");
// 🔴 SOLO bloquear si mencionan OTRO nombre real
const commonNames = [
  "luis","carlos","jose","juan","andres","diego","daniel","miguel",
  "pedro","alejandro","david","sergio","rafael","adrian","ricardo",
  "ana","maria","sofia","valentina","camila","laura","paula"
];

const hasOtherName = commonNames.some(name =>
  normalizedText.includes(name) && !validNames.includes(name)
);

// 🔴 Si menciona otro nombre → bloquear
if (hasOtherName) return false;

  // 🟢 Si menciona Jorge → permitir
  if (hasOwnerName) return true;

  // 🟢 Si parece pregunta profesional → asumir Jorge
  if (hasIntent) return true;

  return true;
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
let intent = detectIntent(text);

const normalizedText = text.toLowerCase();

// 🟢 Detectar si menciona tu nombre
const hasOwnerName = ["jorge", "patricio", "jorge patricio"]
  .some(name => normalizedText.includes(name));

// 🟢 Detectar intención general de perfil
const isGeneralProfileQuery = [
  "quien es","quién es","hablame","háblame",
  "cuentame","cuéntame","dime","sobre"
].some(word => normalizedText.includes(word));

// 🔥 PERFIL GENERAL
if (hasOwnerName && isGeneralProfileQuery) {
  intent = "PROFILE";
}

  // 🟢 SI SOLO DICE EL NOMBRE → PERFIL
if (hasOwnerName && intent === "UNKNOWN") {
  intent = "PROFILE";
}

// 🔥 DETECTAR INTENT AUNQUE NO DIGA NOMBRE (REEMPLAZA EL IF ANTERIOR)
if (normalizedText.includes("contact") || normalizedText.includes("whatsapp")) {
  intent = "CONTACT";
} else if (normalizedText.includes("tecnolog")) {
  intent = "SKILLS";
} else if (normalizedText.includes("experiencia")) {
  intent = "EXPERIENCE";
} else if (normalizedText.includes("estudio") || normalizedText.includes("master") || normalizedText.includes("formacion")) {
  intent = "EDUCATION";
} else if (normalizedText.includes("proyecto")) {
  intent = "PROJECTS";
} else if (normalizedText.includes("contratar")) {
  intent = "MOTIVATION";
} else if (normalizedText.includes("stack") || normalizedText.includes("full stack")) {
  intent = "STACK";
} else if (normalizedText.includes("libro")) {
  intent = "BOOK";
}

if (intent === "FAREWELL" && !isValidFarewell(text)) {
  intent = "UNKNOWN";
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
  replyText = replies.UNKNOWN(ctx);
  intent = "UNKNOWN";
}

return {
  text: replyText,
  intent,
}; }
