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

const YES_WORDS = ["sí", "si", "claro", "ok", "dale", "okey"];
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
  ],
  stack: [
    "React",
    "Vercel",
    ],
  
  tools: [
    "Git",
    "NextDNS",
  ],
  
  projects: [
    "Aulas virtuales",
    "Tiendas online Full Stack",
  ],
};

/* =========================
SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué experiencia tiene?",
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  TOOLS : [ "herramientas", "tools","herramientas técnicas","qué herramientas usas","qué herramientas dominas",],
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

  ASSISTANT: ["quién eres", "quien eres", "sasha"],
  FAREWELL: ["adiós", "hasta luego", "bye", "chao"],
  PROFILE: ["jorge", "perfil", "patricio"],
  EDUCATION: ["estudios", "máster", "formación", "estudio","formacion", "educación", "educacion"],
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
    FAREWELL: (ctx) =>
      pickNonRepeated(ctx, "FAREWELL", [
        "¡Gracias por visitar el portafolio de Jorge 😊! Regresa cuando quieras 👋",
      ]),

    CONTACT: (ctx) =>
  pickNonRepeated(ctx, "CONTACT", [
    "¡Claro! 😊 Puedes escribirle por WhatsApp.",
    "Jorge está disponible en WhatsApp ☺️",
  ]),

    TOOLS: (ctx) =>
  pickNonRepeated(ctx, "TOOLS", [
    `Jorge domina herramientas técnicas como ${PROFILE.tools.join(", ")} 😊`, 
  ]),

    ASSISTANT: (ctx) =>
      pickNonRepeated(ctx, "ASSISTANT", [
        "Soy Sasha 🤖, la asistente virtual de Jorge 😊",
        "Me llamo Sasha ☺️ y estoy aquí para ayudarte.",
      ]),

    WHAT_DOING: (ctx) =>
      pickNonRepeated(ctx, "WHAT_DOING", [
        "Estoy aquí contigo 😊 lista para ayudarte." 
      ]),

  STACK: (ctx) =>
      pickNonRepeated(ctx, "STACK", [
        "Sí 😊 Jorge es Full Stack, le gusta trabajar tanto en frontend como en backend.",
      ]),

    PROFILE: (ctx) =>
      pickNonRepeated(ctx, "PROFILE", [
        `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
        `Jorge es ${PROFILE.role} 😊 ${PROFILE.description}`,
      ]),

    EDUCATION: (ctx) =>
      pickNonRepeated(ctx, "EDUCATION", [
        `Jorge cuenta con un ${PROFILE.education} 😊`,
      ]),

    EXPERIENCE: (ctx) =>
      pickNonRepeated(ctx, "EXPERIENCE", [
        `Jorge tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
      ]),

    SKILLS: (ctx) =>
      pickNonRepeated(ctx, "SKILLS", [
        `Jorge Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
      ]),

    PROJECTS: (ctx) =>
      pickNonRepeated(ctx, "PROJECTS", [
        `Jorge ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
        `Jorge participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`, 
      ]),

    MOTIVATION: (ctx) =>
      pickNonRepeated(ctx, "MOTIVATION", [
        "Porque Jorge combina formación sólida, experiencia real y un enfoque muy práctico 😊",
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
    "experiencia profesional",
    "qué estudios",
    "que estudios",
    "qué experiencia",
    "que experiencia",
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
  🟢 DETECTAR INTENT (SOBRE JORGE)
  ========================= */
let intent = detectIntent(text);

// 🔁 Ajuste: si "jorge" aparece junto con una palabra clave específica
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

    "&:hover": {
      bgcolor: primaryBg,
    },
    "&:active": {
      bgcolor: primaryBg,
      color: "#fff",
    },
    "&:focus": {
      color: "#fff",
    },
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
