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


/* ========================= 🟣 DETECTOR ULTRA PRO ========================= */

// 🔤 Normalizar texto
const cleanText = text
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

// 🔤 INSULTOS (mega ampliado)
const insultWords = [
  // básicos
  "burro","asno","idiota","tonto","estupido","imbecil",

  // animales
  "perro","cerdo","marrano","bestia","rata","sapo",

  // LATAM
  "pendejo","pendej0","huevon","huev0n","wevon","weon",
  "gil","boludo","tarado","baboso",
  "bruto","inutil","mediocre",
  "malparido","gonorrea","careverga","careculo", "pedorro", "pobre",
  "loco", "rico", "rocoto", "indio", "longo", "bestia", "puñal", "prostituta",
  "prostituto", "puto", "puta", "carcoso", "hediondo", "apestoso", "pedante",
  "asesino", "maldito", "retrasado", "ignorante", "analfabeto", 
  

  // fuertes
  "patetico","ridiculo","basura","porqueria","asco","mierda",

  // intelectuales
  "ignorante","inepto","incompetente","fracasado","perdedor",

  // físicos
  "feo","horrible","asqueroso","gordo","flaco"
];

// 🔤 FRASES ofensivas
const insultPhrases = [
  "no sirves","no vales","das pena","me das asco",
  "eres lo peor","vales nada","que asco","das lastima"
];

// 🧠 KEYWORDS sensibles (ULTRA ampliado)
const sensitiveKeywords = {
  edad: [
    "edad","anos","cuantos anos","cumpleanos",
    "fecha de nacimiento","nacio","que edad tiene"
  ],

  relaciones: [
    "gay","homosexual","lesbiana", "bisexual",
    "pareja","novia","novio","esposo","esposa",
    "casado","casada","casarse","matrimonio",
    "divorciado","soltero","relacion",
    "sale con","esta con","tiene alguien", "maricon", "marica",
    "anda con","con quien esta"
  ],

  dinero: [
    "sueldo","salario","dinero","ingresos",
    "cuanto gana","cuanto cobra","riqueza","cuanto dinero tiene"
  ],

  politica: [
    "religion","religioso","creencias",
    "politica","ideologia","partido","vota","izquierda","derecha"
  ],

  ubicacion: [
    "vive","direccion","donde vive",
    "ubicacion","reside","ciudad","pais",
    "donde esta","en que lugar vive"
  ]
};

// 👤 nombres válidos
const ownerNames = ["jorge","patricio","jorge patricio"];

// 🔍 helpers
const hasOwner = ownerNames.some(n => cleanText.includes(n));

const matchKeyword = (keywords) =>
  keywords.some(k => cleanText.includes(k));

// 🔍 detectar sensible
const isSensitiveTopic =
  matchKeyword(sensitiveKeywords.edad) ||
  matchKeyword(sensitiveKeywords.relaciones) ||
  matchKeyword(sensitiveKeywords.dinero) ||
  matchKeyword(sensitiveKeywords.politica) ||
  matchKeyword(sensitiveKeywords.ubicacion);

// 🔍 detectar preguntas
const isQuestion =
  cleanText.includes("?") ||
  /^(quien|que|cuando|donde|por que|como|es|tiene|esta)/.test(cleanText);

// 🔍 detectar preguntas sensibles directas
const isSensitiveQuestion = hasOwner && isSensitiveTopic && isQuestion;

// 🔍 detectar insultos por palabra
const insultRegex = new RegExp(`\\b(${insultWords.join("|")})\\b`, "iu");
const isInsultWord = insultRegex.test(cleanText);

// 🔍 detectar insultos por frase
const isInsultPhrase = insultPhrases.some(p => cleanText.includes(p));

// 🔍 detectar ataques tipo "eres ..."
const isDirectAttack = /eres\s+\w+/.test(cleanText);

// 🔍 detectar insultos disfrazados (con símbolos o puntos)
const disguisedInsult = /i[\W_]*d[\W_]*i[\W_]*o[\W_]*t[\W_]*a/.test(cleanText);

// 🔥 detección final insulto
const isInsult =
  isInsultWord ||
  isInsultPhrase ||
  isDirectAttack ||
  disguisedInsult;

// 🔍 detectar preguntas implícitas (sin nombre)
const implicitOwnerAttack =
  /es\s+casado|tiene\s+novia|tiene\s+pareja/.test(cleanText);

// 🚨 RESPUESTA FINAL
if (
  (hasOwner && (isSensitiveTopic || isInsult)) ||
  isSensitiveQuestion ||
  implicitOwnerAttack
) {
  return {
    text: isInsult
      ? "Prefiero mantener una conversación respetuosa 😊 Si deseas, puedo contarte sobre su experiencia profesional."
      : "Prefiero mantener esa información en privado 😊 ¿Te gustaría saber sobre su experiencia profesional o proyectos?",
    intent: "SENSITIVE_BLOCK",
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

  const commonNames = [
    "luis","carlos","jose","juan","andres","diego","daniel","christian",
    "camilo","miguel","fernando","alex","pedro","alejandro","manuel",
    "david","sergio","rafael","adrian","ricardo","marcos","oscar",
    "alberto","roberto","ivan","hugo","enrique","samuel","emilio",
    "gabriel","esteban","victor","martin","ignacio","julio","cesar",
    "tomas","felipe","cristian","edgar","ramon","armando","leonardo",
    "sebastian","mateo","nicolas","lucas","francisco","antonio",
    "raul","guillermo","alvaro","bruno","dario","fabian",
    "gonzalo","hector","joaquin","lorenzo","maximiliano","nahuel",
    "orlando","pablo","renato","salvador","santiago","teodoro",
    "ulises","valentin","walter","xavier","yago","zacarias", "gay",

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

  // ✅ SOLO válido si menciona a Jorge
  const hasOwnerName = validNames.some(name =>
    normalizedText.includes(name)
  );

  if (hasOwnerName) return true;

  // ❌ Si menciona otro nombre → bloquear
  const mentionsOtherRealName = commonNames.some(
    name => normalizedText.includes(name)
  );

  if (mentionsOtherRealName) return false;

  // ❌ CLAVE: si no menciona ningún nombre → bloquear
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
let intent = detectIntent(text);

const normalizedText = text; // ya viene normalizado arriba

const ownerNames = ["jorge", "patricio", "jorge patricio"];

// 🔹 Detectar si menciona al dueño
const hasOwnerName = ownerNames.some(name =>
  normalizedText.includes(name)
);

// 🔹 Frases válidas para activar PROFILE
const profileTriggers = [
  "quien es",
  "hablame de",
  "cuentame de",
  "dime el perfil de",
  "dime sobre",
  "perfil de",
  "sobre"
];

const hasProfileTrigger = profileTriggers.some(trigger =>
  normalizedText.includes(trigger)
);

// 🔹 Caso 1: solo escribió el nombre exacto
const isOnlyOwnerName = ownerNames.includes(normalizedText.trim());

// 🔹 Caso 2: pregunta válida de perfil con el nombre
const isValidProfileQuery = hasOwnerName && hasProfileTrigger;

// 🔥 PROFILE SOLO SI cumple reglas válidas
if (intent === "UNKNOWN" && (isOnlyOwnerName || isValidProfileQuery)) {
  intent = "PROFILE";
}

// 🔥 INTENTS MÁS ESPECÍFICOS (siempre prioridad)
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
} else if 
  (normalizedText.includes("contratar") ||
  normalizedText.includes("elegir") ||
  normalizedText.includes("escoger") ||
  normalizedText.includes("confiar") ) {
  intent = "MOTIVATION";
} else if (
  normalizedText.includes("stack") ||
  normalizedText.includes("full stack")
) {
  intent = "STACK";
} else if (normalizedText.includes("libro")) {
  intent = "BOOK";
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
