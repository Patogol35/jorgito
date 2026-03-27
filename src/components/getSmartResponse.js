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

  // 🔑 Constantes
  const BOT_NAME = "sasha";
  const OWNER_NAMES = ["jorge", "patricio", "jorge patricio"];

  const replies = createReplies({ pickNonRepeated, PROFILE });

  /* =========================
  🛠️ HELPERS
  ========================= */

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

  const hasOwnerName = (input) =>
    OWNER_NAMES.some((name) => input.includes(name));

  const mentionsOtherRealName = (input) =>
    commonNames.some(
      (name) => input.includes(name) && !OWNER_NAMES.includes(name)
    );

  const looksLikeGenericKnowledge = (input) => {
    const genericPatterns = [
      /dinosaurio/,
      /dinosaurios/,
      /animales?/,
      /historia/,
      /planeta/,
      /universo/,
      /ovni/,
      /ovnis/,
      /libro(s)? de/,
      /pelicula(s)? de/,
      /que es/,
      /que son/,
      /definicion/,
      /significado/
    ];

    return genericPatterns.some((pattern) => pattern.test(input));
  };

  const isProfileQuestion = (input) => {
    const profileKeywords = [
      "experiencia",
      "tecnologia",
      "tecnologias",
      "habilidades",
      "skills",
      "proyecto",
      "proyectos",
      "estudio",
      "estudios",
      "formacion",
      "educacion",
      "master",
      "maestria",
      "whatsapp",
      "contacto",
      "contactarlo",
      "contratarlo",
      "perfil"
    ];

    const profileTriggers = [
      "su",
      "sus",
      "dime",
      "cuentame",
      "hablame",
      "quiero saber",
      "quiero ver",
      "mostrar",
      "muestrame"
    ];

    const directPatterns = [
      /^jorge$/,
      /^patricio$/,
      /^jorge patricio$/,
      /hablame de el/,
      /cuentame de el/,
      /dime sobre el/,
      /dime de el/,
      /quiero saber sobre el/
    ];

    const hasKeyword = profileKeywords.some((word) => input.includes(word));
    const hasTrigger = profileTriggers.some((word) => input.includes(word));
    const matchesDirectPattern = directPatterns.some((pattern) => pattern.test(input));

    // Casos directos
    if (matchesDirectPattern) return true;

    // Ej: "su experiencia", "dime su experiencia", "cuéntame sus estudios"
    if (hasKeyword && hasTrigger) return true;

    // Casos cortos tipo: "experiencia", "tecnologías", "proyectos"
    if (
      /^(experiencia|tecnologias|tecnologia|habilidades|skills|proyectos|proyecto|estudios|estudio|formacion|educacion|perfil)$/.test(
        input
      )
    ) {
      return true;
    }

    return false;
  };

  const isThanksWithExtra = (input) => {
    return /^(si|sí|ok|okay|claro|dale|perfecto|listo|va|de una)\s+gracias$/.test(input);
  };

  /* =========================
  🔥 Si hay follow-up pendiente pero el usuario hace una pregunta clara,
  se cancela el follow-up y se responde normalmente
  ========================= */
  if (ctx.awaitingFollowUp) {
    const directIntent = detectIntent(message);
    if (directIntent !== "UNKNOWN") {
      ctx.awaitingFollowUp = null;
    }
  }

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
    // ❌ Bloquear "si gracias" para que NO dispare follow-up
    if (isThanksWithExtra(text)) {
      ctx.awaitingFollowUp = null;
      return {
        text: "Cuando gustes 😊",
        intent: "FOLLOWUP_THANKS",
      };
    }

    if (isYes(text)) {
      const followIntent = ctx.awaitingFollowUp;
      ctx.awaitingFollowUp = null;

      const chainReplies = {
        PROFILE: () => replies.EXPERIENCE(ctx),
        EXPERIENCE: () => replies.SKILLS(ctx),
        SKILLS: () => replies.PROJECTS(ctx),
      };

      const nextIntentMap = {
        PROFILE: "EXPERIENCE",
        EXPERIENCE: "SKILLS",
        SKILLS: "PROJECTS",
      };

      if (chainReplies[followIntent]) {
        return {
          text: chainReplies[followIntent](),
          intent: nextIntentMap[followIntent],
          fromFollowUp: true,
        };
      }
    }

    if (isNo(text)) {
      ctx.awaitingFollowUp = null;
      return {
        text: "Está bien 😊 ¿En qué más puedo ayudarte?",
        intent: "FOLLOWUP_CANCEL",
      };
    }

    // Si responde otra cosa, se cancela el follow-up
    ctx.awaitingFollowUp = null;
  }

  /* =========================
  🟡 PROTECCIÓN DE DATOS / ALCANCE
  ========================= */
  const ownerMentioned = hasOwnerName(text);
  const otherPersonMentioned = mentionsOtherRealName(text);
  const profileQuestion = isProfileQuestion(text);
  const genericKnowledge = looksLikeGenericKnowledge(text);

  // ❌ Si menciona otro nombre real que no sea Jorge, bloquear
  if (otherPersonMentioned && !ownerMentioned) {
    return {
      text: replies.OUT_OF_SCOPE(ctx),
      intent: "OUT_OF_SCOPE",
    };
  }

  // ❌ Si parece conocimiento general y no menciona a Jorge, bloquear
  if (genericKnowledge && !ownerMentioned) {
    return {
      text: replies.OUT_OF_SCOPE(ctx),
      intent: "OUT_OF_SCOPE",
    };
  }

  // ❌ Si no menciona a Jorge y tampoco parece pregunta de perfil, bloquear
  if (!ownerMentioned && !profileQuestion) {
    return {
      text: replies.OUT_OF_SCOPE(ctx),
      intent: "OUT_OF_SCOPE",
    };
  }

  /* =========================
  🟢 DETECTAR INTENT
  ========================= */
  let intent = detectIntent(text);

  const normalizedText = text; // ya viene normalizado

  const isGeneralProfileQuery = [
    "quien es",
    "hablame",
    "cuentame",
    "dime",
    "sobre",
    "perfil"
  ].some((word) => normalizedText.includes(word));

  // 🔥 PERFIL SOLO SI NO HAY INTENCIÓN ESPECÍFICA
  if (intent === "UNKNOWN" && (ownerMentioned || isGeneralProfileQuery || profileQuestion)) {
    intent = "PROFILE";
  }

  // 🔥 INTENTS MÁS ESPECÍFICOS (siempre prioridad)
  if (
    normalizedText.includes("contact") ||
    normalizedText.includes("contacto") ||
    normalizedText.includes("whatsapp")
  ) {
    intent = "CONTACT";
  } else if (
    normalizedText.includes("tecnolog") ||
    normalizedText.includes("skills") ||
    normalizedText.includes("habilidades")
  ) {
    intent = "SKILLS";
  } else if (normalizedText.includes("experiencia")) {
    intent = "EXPERIENCE";
  } else if (
    normalizedText.includes("estudio") ||
    normalizedText.includes("estudios") ||
    normalizedText.includes("master") ||
    normalizedText.includes("maestria") ||
    normalizedText.includes("formacion") ||
    normalizedText.includes("educacion")
  ) {
    intent = "EDUCATION";
  } else if (normalizedText.includes("proyecto")) {
    intent = "PROJECTS";
  } else if (normalizedText.includes("contratar")) {
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
  };
                           }
