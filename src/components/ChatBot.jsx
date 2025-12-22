import { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const YES_WORDS = ["sí", "si", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables.",
  education:
    "Máster en Ingeniería de Software y Sistemas Informáticos – UNIR (España)",
  experience: [
    "Desarrollador de aulas virtuales",
    "Desarrollo de aplicaciones Full Stack",
    "Creación de APIs REST",
  ],
  stack: [
    "React",
    "Vite",
    "JavaScript",
    "Spring Boot",
    "Django REST",
    "Python",
    "MySQL",
    "AWS",
    "Git",
    "Linux",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online",
    "Apps React con APIs",
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
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas"],
  PROFILE: ["quién es", "jorge"],
  EDUCATION: ["estudios", "formación"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "herramientas"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos"],
  MOTIVATION: ["por qué contratar"],
  CONTACT: ["contactar", "whatsapp"],
};

/* =========================
DETECTAR INTENCIÓN
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();
  let best = "UNKNOWN";
  let scoreMax = 0;

  for (const intent in INTENTS) {
    const score = INTENTS[intent].filter((w) =>
      text.includes(w)
    ).length;

    if (score > scoreMax) {
      scoreMax = score;
      best = intent;
    }
  }

  return scoreMax ? best : "UNKNOWN";
}

/* =========================
RESPUESTA
========================= */
function getSmartResponse(message) {
  const intent = detectIntent(message);
  let reply = "";

  switch (intent) {
    case "GREETING":
      reply = "Hola 👋 Soy Sasha, la asistente virtual de Jorge.";
      break;
    case "PROFILE":
      reply = `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`;
      break;
    case "EDUCATION":
      reply = `Cuenta con un ${PROFILE.education}.`;
      break;
    case "EXPERIENCE":
      reply = `Tiene experiencia como ${PROFILE.experience.join(", ")}.`;
      break;
    case "SKILLS":
      reply = `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`;
      break;
    case "STACK":
      reply =
        "Sí, es desarrollador Full Stack (React en frontend y Spring/Django en backend).";
      break;
    case "PROJECTS":
      reply = `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`;
      break;
    case "MOTIVATION":
      reply =
        "Porque combina formación sólida, experiencia real y buenas prácticas.";
      break;
    case "CONTACT":
      window.open(WHATSAPP_URL, "_blank");
      reply = "Te llevo a WhatsApp 😊";
      break;
    default:
      reply = "Puedo ayudarte con el perfil profesional de Jorge 😊";
  }

  return reply;
}

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryBg = isDark ? "#000" : theme.palette.primary.main;
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const bottomRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha. Pregúntame sobre el perfil, experiencia o proyectos de Jorge.",
  };

  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getSmartResponse(text);
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
      setTyping(false);
    }, delay());
  };

  return (
    <>
      {/* BOTÓN */}
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: primaryBg,
          color: "#fff",
          zIndex: 1400,
        }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            zIndex: 1500,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",

            ...(isLandscape
              ? {
                  inset: 8,
                }
              : {
                  bottom: 90,
                  left: 16,
                  width: 360,
                  height: "70vh",
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
            }}
          >
            <Typography>Sasha</Typography>
            <Box>
              <Tooltip title="Borrar">
                <IconButton
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={() => setMessages([initialMessage])}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cerrar">
                <IconButton
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* SUGERENCIAS */}
          {!isLandscape && (
            <Box sx={{ p: 1 }}>
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
            </Box>
          )}

          {/* MENSAJES (🔥 SCROLL REAL) */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              overflowY: "auto",
              minHeight: 0,

              touchAction: "pan-y",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((msg, i) => (
              <Typography
                key={i}
                sx={{
                  mb: 0.5,
                  fontWeight: msg.from === "user" ? 600 : 400,
                  bgcolor:
                    msg.from === "user"
                      ? isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.05)"
                      : "transparent",
                  px: msg.from === "user" ? 1 : 0,
                  py: msg.from === "user" ? 0.5 : 0,
                  borderRadius: 1,
                }}
              >
                {msg.text}
              </Typography>
            ))}

            {typing && (
              <Typography variant="caption">
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
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage(input)
              }
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
