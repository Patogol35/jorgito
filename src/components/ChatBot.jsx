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
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const YES_WORDS = ["si", "sí", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

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
MEMORIA
========================= */
const MEMORY_LIMIT = 10;

const saveMemory = (ctx, data) => {
  const memory = ctx.memory ?? [];
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
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenos dias", "buenas tardes", "buenas noches"],
  FAREWELL: ["adios", "bye", "chao", "hasta luego"],
  THANKS: ["gracias", "muchas gracias"],
  MOOD: ["como estas", "estas bien"],
  WHAT_DOING: ["que haces", "que estas haciendo"],
  NAME: ["como te llamas", "tu nombre"],
  HUMAN: ["eres humano", "eres humana", "robot"],
  ASSISTANT: ["quien eres", "sasha"],
  CREATOR: ["quien te creo", "quien te hizo"],
  BOOK: ["libros favoritos", "libros"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "formacion", "master"],
  EXPERIENCE: ["experiencia"],
  TECH_STACK: ["tecnologias", "habilidades", "lenguajes", "stack"],
  FULLSTACK: ["full stack"],
  PROJECTS: ["proyectos"],
  MOTIVATION: ["por que contratar"],
  CONTACT: ["contacto", "whatsapp", "contactar"],
};

/* =========================
DETECTAR INTENCIÓN
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    for (const key of INTENTS[intent]) {
      if (text === normalize(key)) score += 3;
      else if (text.includes(normalize(key))) score += 1;
    }
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return best;
};

/* =========================
CONTROL DE REPETICIÓN
========================= */
const pickNonRepeated = (ctx, intent, options) => {
  if (!ctx.usedReplies) ctx.usedReplies = {};
  if (!ctx.usedReplies[intent]) ctx.usedReplies[intent] = [];

  const unused = options.filter(
    (opt) => !ctx.usedReplies[intent].includes(opt)
  );

  const choice = unused.length ? randomPick(unused) : randomPick(options);

  ctx.usedReplies[intent].push(choice);
  if (ctx.usedReplies[intent].length >= options.length) {
    ctx.usedReplies[intent] = [];
  }

  return choice;
};

/* =========================
RESPUESTAS
========================= */
const replies = {
  GREETING: (ctx) =>
    pickNonRepeated(ctx, "GREETING", [
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
      "¡Hola! 😊 Me llamo Sasha y estoy aquí para ayudarte",
    ]),

  THANKS: (ctx) =>
    pickNonRepeated(ctx, "THANKS", [
      "¡Con gusto 😊!",
      "Siempre es un placer ayudarte 💕",
    ]),

  FAREWELL: (ctx) =>
    pickNonRepeated(ctx, "FAREWELL", [
      "¡Gracias por tu visita! 👋😊",
      "¡Hasta luego! Aquí estaré cuando regreses 💕",
    ]),

  MOOD: () => "¡Estoy muy bien 😊 gracias por preguntar!",

  WHAT_DOING: () => "Aquí contigo 😊 lista para ayudarte",

  NAME: () => "Me llamo Sasha 😊",

  HUMAN: () => "No soy humana 🤖, soy una asistente virtual",

  ASSISTANT: () =>
    "Soy Sasha 🤖, la asistente virtual del portafolio de Jorge",

  CREATOR: () =>
    "Fui creada por Jorge para ayudarte a conocer su perfil profesional 😊",

  BOOK: () =>
    "A Jorge le gustan los libros de misterio 📚, especialmente los de Dan Brown",

  PROFILE: () =>
    `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,

  EDUCATION: () => PROFILE.education,

  EXPERIENCE: () => PROFILE.experience.join(", "),

  TECH_STACK: () => PROFILE.stack.join(", "),

  FULLSTACK: () =>
    "Sí 😊 Jorge es Full Stack y disfruta trabajar tanto en frontend como backend",

  PROJECTS: () => PROFILE.projects.join(", "),

  MOTIVATION: () =>
    "Porque Jorge combina experiencia real, formación sólida y compromiso profesional 😊",

  CONTACT: () => ({
    text: "📱 Puedes contactarlo por WhatsApp.\n¿Deseas que lo abra ahora?",
    action: "CONTACT_CONFIRM",
  }),
};

/* =========================
FUNCIÓN PRINCIPAL
========================= */
function getSmartResponse(message, context = {}) {
  const text = normalize(message);
  const intent = detectIntent(text);

  saveMemory(context, { user: text, intent });

  // Confirmación WhatsApp
  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.some((w) => text.includes(w))) {
      context.awaiting = null;
      return {
        text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
        action: "OPEN_WHATSAPP",
        url: WHATSAPP_URL,
      };
    }
    if (NO_WORDS.some((w) => text.includes(w))) {
      context.awaiting = null;
      return { text: "Está bien 😊 cuando quieras avísame." };
    }
  }

  if (intent === "CONTACT") {
    context.awaiting = "CONTACT_CONFIRM";
    return replies.CONTACT();
  }

  if (typeof replies[intent] === "function") {
    return { text: replies[intent](context), intent };
  }

  if (typeof replies[intent] === "object") {
    return replies[intent];
  }

  return {
    text:
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
    intent: "UNKNOWN",
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
