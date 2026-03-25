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
  .replace(/[\u0300-\u036f]/g, "") // quitar tildes
  .replace(/[¿?¡!.,]/g, "") // 🔥 quitar signos
  .trim();

  const validNames = ["jorge", "patricio", "jorge patricio"];

  const words = normalizedText.split(/\s+/).filter(w => w.length > 0);

  // 🔹 Stop words
  const stopWords = [
    "de","la","el","los","las","un","una","sobre","que","del","a","en","y","con"
  ];

  // 🔹 Palabras de intención (NO son nombres)
  const intentWords = [
  "hablame","háblame","cuentame","cuéntame","dime","decime",
  "quiero","necesito","podrias","podrías","me","puedes",
  "puede","explicame","explícame","informacion","información",

  // 🔥 preguntas
  "que","qué","cual","cuál","como","cómo",
  "donde","dónde","cuando","cuándo",
  "quien","quién","por","para",

  // 🔥 pronombres (CLAVE)
  "su","sus","mi","mis","tu","tus",
  "nuestro","nuestra","nuestros","nuestras"
];

  // 🔹 Nombres comunes
  const commonNames = [
    "luis","carlos","jose","juan","andres","diego","daniel","christian",
    "camilo","miguel","fernando","alex","pedro","alejandro","manuel",
    "david","sergio","rafael","adrian","ricardo","marcos","oscar",
    "alberto","roberto","ivan","hugo","enrique","samuel","emilio",
    "gabriel","esteban","victor","martin","ignacio","julio","cesar",
    "tomas","felipe","cristian","edgar","ramon","armando","leonardo",
    "sebastian","mateo","nicolas","lucas","francisco","antonio",
    "jorge","raul","guillermo","alvaro","bruno","dario","fabian",
    "gonzalo","hector","joaquin","lorenzo","maximiliano","nahuel",
    "orlando","pablo","renato","salvador","santiago","teodoro",
    "ulises","valentin","walter","xavier","yago","zacarias",

    "ana","maria","sofia","valentina","daniela","camila","laura",
    "paula","andrea","elena","lucia","isabella","martina","gabriela",
    "adriana","carolina","patricia","veronica","alejandra","rosa",
    "carmen","silvia","beatriz","raquel","noelia","natalia",
    "claudia","monica","diana","pilar","luisa","renata","emilia",
    "juliana","antonella","valeria","ximena","yesenia","zulema",
    "amanda","bianca","catalina","dolores","esther","fatima",
    "gloria","helena","irene","jimena","karla","liliana","mariana",
    "nerea","olga","priscila","rocio","susana","teresa","ursula",
    "victoria","wanda","ximena","yolanda","zoe","samanta"
  ];

  // 🔹 Keywords sensibles
  const sensitiveKeywords = [
    "tecnologia","tecnologias","tecnologías",
    "experiencia","estudios","perfil","contratar",
    "proyectos","stack","habilidades","lenguajes",
    "quien es","quién es","formacion","formación",
    "educacion","educación","máster","master",
    "libros","libro","full stack","desarrollador",
    "ingeniero","full","contactar","contacto","whatsapp"
  ];

  const hasSensitive = sensitiveKeywords.some(kw =>
    normalizedText.includes(kw)
  );

  // 🟢 Detectar si menciona tu nombre
  const hasOwnerName = validNames.some(name =>
    normalizedText.includes(name)
  );

  // 🔤 Normalizar palabras (quita tildes)
  const normalizeWord = (word) =>
    word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 🔴 Detectar nombres raros (tipo ghgh)
  const possibleNames = words.filter(word => {
    const clean = normalizeWord(word);

    return (
      clean.length > 2 &&
      !stopWords.includes(clean) &&
      !intentWords.includes(clean) &&
      !validNames.includes(clean) &&
      !commonNames.includes(clean) &&
      !sensitiveKeywords.some(kw => clean.includes(kw))
    );
  });

  const hasWeirdName = possibleNames.length > 0;

  // =========================
// 🧠 LÓGICA FINAL (PRO)
// =========================

// 🟢 Si menciona tu nombre → permitir SIEMPRE
if (hasOwnerName) {
  return true;
}

// 🔴 Detectar cualquier otro nombre en la frase
const hasOtherName =
  words.some(word =>
    commonNames.includes(word) && !validNames.includes(word)
  ) || hasWeirdName;

// 🔴 BLOQUEO: si hay intención sensible + otro nombre → bloquear
if (hasSensitive && hasOtherName) {
  return false;
}

// 🟢 Todo lo demás → asumir que habla de Jorge
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
