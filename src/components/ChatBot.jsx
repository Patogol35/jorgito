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
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const YES_WORDS = ["si", "sí", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
MEMORIA
========================= */
const MEMORY_LIMIT = 10;

const saveMemory = (ctx, data) => {
  ctx.memory = ctx.memory ?? [];
  ctx.memory.push(data);
  if (ctx.memory.length > MEMORY_LIMIT) ctx.memory.shift();
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
  "¿Por qué contratarlo?",
  "¿Cómo puedo contactarlo?",
  "¿Quién te creó?",
  "¿Sus libros favoritos?",
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GRA: ["gracias", "muchas gracias"],

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

  MOOD: ["cómo estás", "como estas", "estás bien"],

  NAME: ["cómo te llamas", "como te llamas", "tu nombre"],
  HUMAN: ["eres humana", "robot"],
  ASSISTANT: ["quién eres", "quien eres", "sasha"],
  CREATOR: ["quién te creó", "quien te creo"],
  BOOK: ["libros"],

  HELP: ["qué puedes hacer", "que puedes hacer"],

  FAREWELL: ["adiós", "hasta luego", "bye", "chao"],

  GREETING: ["hola", "buenas", "buenos días"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "máster", "formación"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "lenguajes", "habilidades"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos"],
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
UTILIDADES LÓGICAS
========================= */
const containsAny = (text, words) =>
  words.some((w) => text.includes(w));

const isValidFarewell = (text) => {
  const t = normalize(text);
  return [
    "chao",
    "chau",
    "bye",
    "adios",
    "hasta luego",
    "chao sasha",
    "bye sasha",
    "adios sasha",
  ].includes(t);
};

/* =========================
🧠 CONTROL DE REPETICIÓN
========================= */
const pickNonRepeated = (ctx, intent, options) => {
  ctx.usedReplies = ctx.usedReplies || {};
  ctx.usedReplies[intent] = ctx.usedReplies[intent] || [];

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
RESPUESTAS DESCONOCIDAS
========================= */
const unknownReplies = (ctx) =>
  pickNonRepeated(ctx, "UNKNOWN", [
    "No estoy segura de haber entendido 🤔, ¿quizás te interesa conocer la experiencia de Jorge?",
    "Disculpa 😅, ¿quieres saber algo del perfil o los proyectos de Jorge?",
    randomPick(SUGGESTIONS),
    "Puedo ayudarte a conocer el perfil profesional de Jorge 😊",
  ]);

/* =========================
RESPUESTAS
========================= */
const replies = {
  GREETING: (ctx) =>
    pickNonRepeated(ctx, "GREETING", [
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
      "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
      "Hola 😊 ¿en qué puedo ayudarte hoy?",
    ]),

  GRA: (ctx) =>
    pickNonRepeated(ctx, "GRA", [
      "Un placer 😊",
      "De nada ☺️",
      "Siempre es un gusto ayudar 💕",
    ]),

  FAREWELL: (ctx) =>
    pickNonRepeated(ctx, "FAREWELL", [
      "¡Gracias por visitar el portafolio de Jorge 😊!",
      "¡Hasta luego! 💕",
      "Cuídate mucho 👋",
    ]),

  WHAT_DOING: (ctx) =>
    pickNonRepeated(ctx, "WHAT_DOING", [
      "Estoy aquí contigo 😊 lista para ayudarte.",
      "Pensando en cómo ayudarte mejor 💭",
      "Atenta a lo que necesites ☺️",
    ]),

  PROFILE: (ctx) =>
    pickNonRepeated(ctx, "PROFILE", [
      `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
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
      `Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 💻`,
    ]),

  PROJECTS: (ctx) =>
    pickNonRepeated(ctx, "PROJECTS", [
      `Ha trabajado en proyectos como ${PROFILE.projects.join(", ")} 😊`,
    ]),

  CONTACT: () =>
    "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",

  UNKNOWN: (ctx) => unknownReplies(ctx),
};

/* =========================
FUNCIÓN PRINCIPAL
========================= */
function getSmartResponse(message, context) {
  const text = normalize(message);

  /* 🔴 DESPEDIDA PRIORIDAD */
  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL(context), intent: "FAREWELL" };
  }

  /* 🔵 CONFIRMACIÓN WHATSAPP */
  if (context.awaiting === "CONTACT_CONFIRM") {
    if (containsAny(text, YES_WORDS)) {
      context.awaiting = null;
      window.open(WHATSAPP_URL, "_blank");
      return {
        text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
        intent: "CONTACT_OPENED",
      };
    }

    if (containsAny(text, NO_WORDS)) {
      context.awaiting = null;
      return {
        text: "Está bien 😊 Avísame si luego deseas contactarlo.",
        intent: "CONTACT_CANCEL",
      };
    }
  }

  /* 🔍 DETECTAR INTENT */
  let intent = detectIntent(message);
  saveMemory(context, { user: message, intent });

  /* 📱 CONTACTO */
  if (intent === "CONTACT") {
    context.awaiting = "CONTACT_CONFIRM";
    return {
      text: replies.CONTACT(),
      intent,
    };
  }

  /* 🧠 RESPUESTA NORMAL */
  return {
    text:
      typeof replies[intent] === "function"
        ? replies[intent](context)
        : replies.UNKNOWN(context),
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
