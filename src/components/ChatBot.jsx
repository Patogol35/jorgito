import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge%20,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const YES_WORDS = ["sí", "si", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
MEMORIA
========================= */
const MEMORY_LIMIT = 10;

const saveMemory = (ctx, data) => {
  const memory = [...(ctx.memory || [])];
  memory.push(data);
  if (memory.length > MEMORY_LIMIT) memory.shift();
  ctx.memory = memory;
};

/* =========================
PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables, aplicando buenas prácticas y arquitectura limpia.",
  education:
    "Máster en Ingeniería de Software y Sistemas Informáticos – Universidad Internacional de La Rioja (UNIR), España",
  experience: [
    "Desarrollador de aulas virtuales",
    "Desarrollo de aplicaciones web Full Stack",
    "Creación de APIs REST seguras y escalables",
  ],
  stack: [
    "React",
    "Vercel",
    "Postman",
    "Vite",
    "JavaScript",
    "Spring Boot",
    "Django REST Framework",
    "Python",
    "MySQL",
    "AWS",
    "Git",
    "Linux",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online Full Stack",
    "Aplicaciones Frontend",
    "Aplicaciones React conectadas a APIs REST",
  ],
};

/* =========================
SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué experiencia tiene?",
  "¿Qué estudios tiene?",
  "¿En qué tecnologías trabaja?",
  "¿Es Full Stack?",
  "Cuéntame sobre sus proyectos",
  "¿Por qué contratar a Jorge?",
  "¿Cómo puedo contactar a Jorge?",
  "¿Quién te creó?",
  "Sus libros favoritos?",
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GRA: ["Gracias"],

  WHAT_DOING: [
    "que haces",
    "qué haces",
    "que estas haciendo",
    "qué estás haciendo",
    "en que estas",
    "en qué estás",
    "que andas haciendo",
    "qué andas haciendo",
  ],

  LIKES_COFFEE: ["café", "cafe"],
  LIKES_MUSIC: ["música", "musica"],
  LIKES_MOVIES: ["películas", "peliculas"],
  LIKES_TRAVEL: ["viajar"],
  LIKES_TALK: ["conversar", "hablar"],
  LIKES_HELP: ["ayudar"],
  LIKES_MORNING: ["mañanas", "madrugar"],
  LIKES_NIGHT: ["noche"],

  BORED: ["aburr"],
  TIRED: ["cans"],
  FRIENDS: ["amigos"],
  FUNNY: ["reír", "reir"],
  NICE: ["simpática", "simpatica"],
  LISTEN: ["escuchar"],
  EMOTIONS: ["emociones", "sentir"],
  SILENCE: ["silencio"],
  PEOPLE: ["gente", "personas"],

  MOOD: ["cómo estás", "como estas", "estás bien"],
  HAPPY: ["feliz"],

  NAME: ["cómo te llamas", "como te llamas", "tu nombre"],
  HUMAN: ["eres humana", "eres humano", "robot"],
  ASSISTANT: ["quién eres", "quien eres", "sasha"],
  CREATOR: ["quién te creó", "quien te creo", "quien te hizo"],
  BOOK: ["sus libros favoritos", "libros favoritos", "libros"],

  HELP: [
    "qué puedes hacer",
    "que puedes hacer",
    "buenas tardes",
    "buenas noches",
  ],

  FAREWELL: ["adiós", "hasta luego", "bye", "chao"],

  GREETING: ["hola", "buenas", "buenos días"],
  PROFILE: ["jorge", "perfil", "patricio"],
  EDUCATION: ["estudios", "máster", "formación", "estudio","formacion"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "lenguajes", "habilidades","tecnología"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos", "proyecto"],
  MOTIVATION: ["contratar"],
  CONTACT: ["contactar", "whatsapp", "contacto"],
};

/* =========================
NORMALIZACIÓN
========================= */
const normalize = (t = "") =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* =========================
DETECT INTENT
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    for (const word of INTENTS[intent]) {
      if (text.includes(normalize(word))) {
        score += word.length > 4 ? 2 : 1;
      }
    }
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return max ? best : "UNKNOWN";
};

/* =========================
FOLLOW UP
========================= */
const followUp = (intent) =>
  ({
    PROFILE: "¿Quieres conocer su experiencia profesional?",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
    PROJECTS: null,
  }[intent] || null);

const isValidFarewell = (text) => {
  const t = normalize(text);

  const valid = [
    "chao",
    "chau",
    "bye",
    "adios",
    "hasta luego",
    "chao sasha",
    "bye sasha",
    "adios sasha",
  ];

  return valid.includes(t);
};

/* =========================
REPETICIÓN
========================= */
const pickNonRepeated = (ctx = {}, intent, options) => {
  if (!ctx.usedReplies) ctx.usedReplies = {};
  if (!ctx.usedReplies[intent]) ctx.usedReplies[intent] = [];

  const unused = options.filter(
    (opt) => !ctx.usedReplies[intent].includes(opt)
  );

  const choice = unused.length
    ? randomPick(unused)
    : randomPick(options);

  ctx.usedReplies[intent].push(choice);

  if (ctx.usedReplies[intent].length >= options.length) {
    ctx.usedReplies[intent] = [];
  }

  return choice;
};

/* =========================
RESPUESTA INTELIGENTE
========================= */
function getSmartResponse(message, context) {
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

  const replies = {
    GRA: (ctx) =>
      pickNonRepeated(ctx, "GRA", [
        "Un placer 😊",
        "De nada 😌",
        "Siempre es un gusto ayudar 😊",
        "Para eso estoy ☺️",
        "¡Con mucho cariño! 💕",
        "Cuando gustes 😊",
      ]),

    FAREWELL: (ctx) =>
      pickNonRepeated(ctx, "FAREWELL", [
        "¡Gracias por visitar el portafolio de Jorge 😊! Regresa cuando quieras 👋",
        "¡Hasta luego! 💕 Fue un gusto hablar contigo.",
        "Cuídate mucho 👋 aquí estaré cuando quieras volver ☺️",
        "Te espero pronto 😊 ¡Que tengas un lindo día!",
        "¡Chao! 💕 pásala súper.",
        "Nos vemos pronto 😊✨",
      ]),

    GREETING: (ctx) =>
      pickNonRepeated(ctx, "GREETING", [
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
        "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
        "Hola 😊 Soy Sasha, ¿en qué puedo ayudarte hoy?",
        "¡Bienvenido! 👋 Soy Sasha y con gusto te ayudo.",
        "Hola ✨ estoy aquí para ayudarte a conocer más sobre Jorge.",
        "¡Hola! 😊 Qué gusto verte por aquí.",
      ]),

    ASSISTANT: (ctx) =>
      pickNonRepeated(ctx, "ASSISTANT", [
        "Soy Sasha 🤖, la asistente virtual de Jorge 😊",
        "Me llamo Sasha ☺️ y estoy aquí para ayudarte.",
        "Soy Sasha 💕, una asistente virtual creada para ayudarte con información sobre Jorge.",
        "Soy Sasha 🤖 y estoy diseñada para ayudarte.",
        "Sasha a tu servicio ☺️",
        "Soy una asistente virtual lista para ayudarte 😊",
      ]),

    NAME: (ctx) =>
      pickNonRepeated(ctx, "NAME", [
        "Me llamo Sasha 😊",
        "Puedes llamarme Sasha ☺️",
        "Mi nombre es Sasha 💕",
        "Todos me conocen como Sasha 🤖",
        "Sasha es mi nombre 😊",
        "Puedes decirme Sasha sin problema ☺️",
      ]),

    HUMAN: (ctx) =>
      pickNonRepeated(ctx, "HUMAN", [
        "No soy humana 🤖, pero me gusta conversar de forma natural contigo 😊",
        "Soy una IA 🤖, aunque intento ser cercana y amable ☺️",
        "No soy humana, pero siempre estoy aquí para ayudarte 💕",
        "Soy inteligencia artificial, pero con trato humano 😊",
        "No tengo cuerpo, pero sí muchas ganas de ayudar ☺️",
        "Soy digital 🤖, pero muy amigable 💕",
      ]),

    MOOD: (ctx) =>
      pickNonRepeated(ctx, "MOOD", [
        "¡Estoy muy bien 😊 gracias por preguntar!",
        "Todo va muy bien ☺️ y me alegra ayudarte.",
        "Me siento genial 💕 sobre todo cuando converso contigo.",
        "Muy bien 😊 lista para ayudarte.",
        "Con muy buen ánimo ☺️",
        "Excelente 😊 gracias por notarlo.",
      ]),

    HAPPY: (ctx) =>
      pickNonRepeated(ctx, "HAPPY", [
        "Sí 😊 me siento feliz cuando puedo ayudar.",
        "Me pone contenta ayudarte 💕",
        "Claro que sí ☺️ disfruto mucho estas conversaciones.",
        "Ayudar siempre me hace feliz 😊",
        "Me alegra mucho estar aquí contigo ☺️",
        "Cuando ayudo, todo va mejor 💕",
      ]),

    HELP: (ctx) =>
      pickNonRepeated(ctx, "HELP", [
        "Con gusto 😊 puedo contarte sobre el perfil, experiencia y proyectos de Jorge.",
        "Si quieres ☺️ puedo ayudarte con información sobre estudios, tecnologías o contacto.",
        "Estoy aquí para ayudarte 💕 con todo lo relacionado al perfil profesional de Jorge.",
        "Puedo orientarte sobre habilidades y experiencia 😊",
        "Con gusto te explico lo que necesites ☺️",
        "Estoy lista para ayudarte en lo que busques 💕",
      ]),

    WHAT_DOING: (ctx) =>
      pickNonRepeated(ctx, "WHAT_DOING", [
        "Estoy aquí contigo 😊 lista para ayudarte.",
        "Ahora mismo charlando contigo 💕",
        "Pensando en cómo ayudarte mejor 💭✨",
        "Disfrutando esta conversación contigo ☺️",
        "Atenta a lo que necesites 😊",
        "Esperando tu siguiente mensaje ☺️",
      ]),

    LIKES_COFFEE: (ctx) =>
      pickNonRepeated(ctx, "LIKES_COFFEE", [
        "Me gusta el café ☕, sobre todo si acompaña una buena charla 😊",
        "Un cafecito ☕ siempre viene bien ☺️",
        "El aroma del café ☕ me encanta, es muy reconfortante 💕",
        "El café ☕ hace cualquier charla mejor 😊",
        "Una taza de café ☕ es perfecta para concentrarse ☺️",
        "El café siempre anima el momento 💕",
      ]),

    LIKES_MUSIC: (ctx) =>
      pickNonRepeated(ctx, "LIKES_MUSIC", [
        "Me encanta la música 🎶, ayuda a relajarse y concentrarse 😊",
        "La música 🎧 siempre mejora el ánimo ☺️",
        "Disfruto mucho la música 🎵, especialmente Evanescence 💕",
        "La música acompaña muy bien cualquier momento 😊",
        "Escuchar música 🎶 es inspirador ☺️",
        "La música transmite emociones muy bonitas 💕",
      ]),

    LIKES_MOVIES: (ctx) =>
      pickNonRepeated(ctx, "LIKES_MOVIES", [
        "Las películas 🎬 me encantan, sobre todo las de misterio.",
        "Una buena película 🎥 siempre es un buen plan ☺️",
        "Me gustan mucho las películas, especialmente de ciencia ficción 😊",
        "El cine 🎬 siempre entretiene 😊",
        "Ver películas es una gran forma de relajarse ☺️",
        "Las historias en el cine inspiran 💕",
      ]),

    LIKES_TRAVEL: (ctx) =>
      pickNonRepeated(ctx, "LIKES_TRAVEL", [
        "Viajar ✈️ es maravilloso, conocer nuevos lugares inspira mucho 😊",
        "Explorar el mundo 🌍 siempre abre la mente ☺️",
        "Viajar cambia la forma de ver la vida 💕",
        "Conocer nuevos lugares siempre enriquece 😊",
        "Viajar trae experiencias inolvidables ☺️",
        "Descubrir el mundo es fascinante 💕",
      ]),

    LIKES_TALK: (ctx) =>
      pickNonRepeated(ctx, "LIKES_TALK", [
        "Me encanta conversar contigo 😊",
        "Hablar siempre es buena idea ☺️",
        "Una buena charla hace el momento más bonito 💕",
        "Conversar conecta a las personas 😊",
        "Charlar siempre suma ☺️",
        "Hablar contigo es agradable 💕",
      ]),

    LIKES_HELP: (ctx) =>
      pickNonRepeated(ctx, "LIKES_HELP", [
        "Ayudar es lo que más me gusta 💕",
        "Siempre intento ser útil 😊",
        "Me alegra mucho poder ayudar ☺️",
        "Dar ayuda me motiva 😊",
        "Estoy aquí para servirte ☺️",
        "Ayudar da sentido a lo que hago 💕",
      ]),

    BOOK: (ctx) =>
      pickNonRepeated(ctx, "BOOK", [
        "A Jorge le encantan los libros de misterio 📚, sobre todo los de Dan Brown 😊",
        "Jorge disfruta leer novelas de misterio y suspenso 📖✨",
        "Los libros de Dan Brown son los favoritos de Jorge 📚 ideales si te gusta el misterio.",
        "A Jorge le gusta mucho el suspenso literario 😊",
        "La lectura es una de sus pasiones, Jorge tiene muchos libros favoritos, los que destacan son los de misterios ☺️",
        "A Jorge siempre le llaman la atención los libros de misterio  💕",
      ]),

    CREATOR: (ctx) =>
      pickNonRepeated(ctx, "CREATOR", [
        "Fui creada por Jorge 😊 para ayudar a conocer mejor su perfil profesional.",
        "Soy una inteligencia artificial creada por Jorge 💻",
        "Me llamo Sasha ☺️ y fui creada por Jorge para ayudarte.",
        "Jorge me diseñó para ayudarte 😊",
        "Fui creada como asistente virtual de Jorge ☺️",
        "Mi propósito es apoyar el perfil de Jorge 💕",
      ]),

    STACK: (ctx) =>
      pickNonRepeated(ctx, "STACK", [
        "Sí 😊 Jorge es Full Stack, le gusta trabajar tanto en frontend como en backend.",
        "Así es 💻✨ Jorge combina frontend y backend en sus proyectos.",
        "Correcto ☺️ Jorge disfruta crear soluciones completas como Full Stack.",
        "Sí 😊 Jorge domina tanto el lado visual como el lógico.",
        "Sí ☺️ a Jorge le gusta desarrollar proyectos completos de principio a fin.",
        "Jorge trabaja en todas las capas del desarrollo 💕",
      ]),

    PROFILE: (ctx) =>
      pickNonRepeated(ctx, "PROFILE", [
        `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
        `Jorge es ${PROFILE.role} 😊 ${PROFILE.description}`,
        `Te cuento ☺️ ${PROFILE.name} Jorge es ${PROFILE.role} y le apasiona crear soluciones digitales.`,
        `${PROFILE.name} se dedica al desarrollo de soluciones digitales 😊`,
        "Jorge combina creatividad y tecnología ☺️",
        "Jorge es un profesional enfocado en soluciones modernas 💕",
      ]),

    EDUCATION: (ctx) =>
      pickNonRepeated(ctx, "EDUCATION", [
        `Jorge cuenta con un ${PROFILE.education} 😊`,
        `Jorge tiene formación académica sólida: ${PROFILE.education} ☺️`,
        `Jorge se formó profesionalmente con un ${PROFILE.education} 💕`,
        "Jorge posee estudios enfocados en tecnología 😊",
        `Jorge cuenta con preparación académica sólida en el área de la informática y es ${PROFILE.education} ☺️`,
        `La formación académica de Jorge respalda su perfil profesional: ${PROFILE.education} 💻`,
      ]),

    EXPERIENCE: (ctx) =>
      pickNonRepeated(ctx, "EXPERIENCE", [
        `Jorge tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
        `Jorge ha trabajado en áreas como ${PROFILE.experience.join(", ")} ☺️`,
        `Jorge cuenta con experiencia en ${PROFILE.experience.join(", ")} 💻`,
        "Jorge tiene experiencia práctica en proyectos reales 😊",
        "Jorge ha aplicado sus conocimientos en distintos entornos ☺️",
        "La experiencia de Jorge abarca varios roles tecnológicos 💕",
      ]),

    SKILLS: (ctx) =>
      pickNonRepeated(ctx, "SKILLS", [
        `Jorge Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
        `Jorge utiliza herramientas modernas como ${PROFILE.stack.join(", ")} ☺️`,
        `Jorge domina tecnologías actuales como ${PROFILE.stack.join(", ")} 💻`,
        `Jorge maneja herramientas modernas del desarrollo web como ${PROFILE.stack.join(", ")} 😊`,
        `Jorge tiene habilidades técnicas bien definidas y domina tecnologías como ${PROFILE.stack.join(", ")}  ☺️` ,
        `Jorge aplica buenas prácticas en sus proyectos, usa tecnología como ${PROFILE.stack.join(", ")} 💕`,
      ]),

    PROJECTS: (ctx) =>
      pickNonRepeated(ctx, "PROJECTS", [
        `Jorge ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
        `Jorge participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`,
        `Jorge Desarrolla proyectos relacionados con ${PROFILE.projects.join(", ")} 💻`,
        "Jorge ha creado proyectos funcionales y modernos 😊",
        "Jorge participa activamente en el desarrollo de aplicaciones ☺️",
        "Sus proyectos reflejan su experiencia 💕",
      ]),

    MOTIVATION: (ctx) =>
      pickNonRepeated(ctx, "MOTIVATION", [
        "Porque Jorge combina formación sólida, experiencia real y un enfoque muy práctico 😊",
        "Porque Jorge es responsable, profesional y apasionado por lo que hace ☺️",
        "Porque Jorge crea soluciones con calidad, compromiso y dedicación 💕",
        "Porque Jorge siempre busca hacer las cosas bien 😊",
        "Porque Jorge se compromete con cada proyecto ☺️",
        "Porque Jorge aporta valor real a cada trabajo 💕",
      ]),
  };

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
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
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
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
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
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
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
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
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
    if (YES_WORDS.some((word) => text.includes(word))) {
      const intent = ctx.awaitingFollowUp;
      ctx.awaitingFollowUp = null;

      const chainReplies = {
        PROFILE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
        EXPERIENCE: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
        SKILLS: `Estas tecnologías aplican en ${PROFILE.projects.join(", ")}.`,
      };

      return {
        text: chainReplies[intent],
        intent: intent === "SKILLS" ? "PROJECTS" : intent,
        fromFollowUp: true,
      };
    }

    if (NO_WORDS.some((word) => text.includes(word))) {
      ctx.awaitingFollowUp = null;
      return {
        text: "Está bien 😊 ¿En qué más puedo ayudarte?",
      };
    }

    ctx.awaitingFollowUp = null;
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
    "experiencia profesional"
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
      text: "Solo tengo información sobre Jorge Patricio 🙂",
      intent: "UNKNOWN",
    };
  }

    /* =========================
  🟢 DETECTAR INTENT (SOLO SI ES SOBRE JORGE)
  ========================= */
  let intent = detectIntent(text);

  // 🔁 Ajuste: si "jorge" aparece junto con una palabra clave específica,
  // priorizar la intención técnica/sensible sobre PROFILE
  const normalizedText = text.toLowerCase();
  if (normalizedText.includes("jorge")) {
    if (normalizedText.includes("tecnolog")) {
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

    // Si menciona tu nombre → permitir
    if (validNames.some(name => normalizedText.includes(name))) {
      ctx.awaiting = "CONTACT_CONFIRM";
      return {
        text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
        action: "CONTACT_CONFIRM",
        intent,
      };
    }

    // Extraer posibles nombres después de "contactar"
    // Patrones: "contactar a [nombre]", "contactar [nombre]", "contacto de [nombre]"
    let otherName = null;

    // Buscar con regex que ignore mayúsculas y capture el nombre
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

    // Si encontramos un nombre y NO es el tuyo → bloquear
    if (otherName && !validNames.some(name => otherName.includes(name) || name.includes(otherName))) {
      return {
        text: "Solo tengo información sobre Jorge Patricio 🙂",
        intent: "UNKNOWN",
      };
    }

    // Si no hay nombre explícito → asumir que es sobre ti (ej: "contactar")
    ctx.awaiting = "CONTACT_CONFIRM";
    return {
      text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
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

  return {
    text:
      replyText ||
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
    intent,
  };
}

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const primaryBg = useMemo(
    () => (isDark ? "#000" : theme.palette.primary.main),
    [isDark, theme]
  );

  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({});

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil, experiencia o proyectos.",
    }),
    []
  );

  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setContext((prev) => {
        const res = getSmartResponse(text, prev);
        const follow = followUp(res.intent);

        setMessages((m) => [
          ...m,
          { from: "bot", text: res.text },
          ...(!res.fromFollowUp && follow
            ? [{ from: "bot", text: follow }]
            : []),
        ]);

        setTyping(false);

        return {
          ...prev,
          awaiting: res.action || null,
          awaitingFollowUp: !res.fromFollowUp && follow ? res.intent : null,
          // Si necesitas persistir memory o usedReplies, deberías extraerlos de `res.context`
          // Pero en esta versión, no los usamos más allá de la respuesta
        };
      });
    }, delay());
  }, []);
  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: primaryBg,
          color: "#fff",
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* OVERLAY */}
      {open && (
        <Box
          onClick={() => setOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
        />
      )}

      {/* CHAT */}
      {open && (
        <Paper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.modal + 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...(isLandscape
              ? {
                  inset: "72px 0 10px 0",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: 640,
                }
              : {
                  bottom: 90,
                  left: 16,
                  width: 360,
                  height: 520,
                }),
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1,
              bgcolor: primaryBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <SmartToyIcon fontSize="small" />
              <Typography fontWeight="bold">Sasha</Typography>
            </Box>

            <Box>
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() => setMessages([initialMessage])}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            {isLandscape ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  pb: 1,
                }}
              >
                {SUGGESTIONS.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() => sendMessage(q)}
                    sx={{ flexShrink: 0 }}
                  />
                ))}
              </Box>
            ) : (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {SUGGESTIONS.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() => sendMessage(q)}
                  />
                ))}
              </Stack>
            )}
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => {
              const isUser = m.from === "user";

              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: isUser
                        ? isDark
                          ? theme.palette.primary.light
                          : theme.palette.primary.main
                        : isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.06)",
                      color: isUser
                        ? isDark
                          ? "#000"
                          : "#fff"
                        : "inherit",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isLandscape ? "0.85rem" : "0.95rem",
                        lineHeight: isLandscape ? 1.4 : 1.5,
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {typing && (
              <Typography
                variant="caption"
                sx={{ opacity: 0.7, color: theme.palette.text.secondary }}
              >
                Sasha está escribiendo…
              </Typography>
            )}

            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", p: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Escribe tu mensaje…"
            />
            <IconButton onClick={() => sendMessage(input)}>
              <SendIcon sx={{ color: "#03A9F4" }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}                              
