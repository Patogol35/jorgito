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
import { useTheme, useMediaQuery } from "@mui/material";

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
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey"],
  PROFILE: ["jorge", "quién es", "perfil"],
  EDUCATION: ["estudios", "formación", "máster"],
  EXPERIENCE: ["experiencia", "trabajo"],
  SKILLS: ["tecnologías", "herramientas", "lenguajes"],
  STACK: ["full stack", "frontend", "backend"],
  PROJECTS: ["proyectos", "portfolio"],
  MOTIVATION: ["por qué contratar", "ventajas"],
  CONTACT: ["contactar", "whatsapp", "correo", "email"],
  ASSISTANT: ["quién eres", "eres sasha"],
  CREATOR: ["quién te creó", "te programó"],
  STATUS: ["cómo estás", "qué tal"],
};

/* =========================
INTENT DETECTION
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
SMART RESPONSE
========================= */
function getSmartResponse(message, context) {
  const text = message.toLowerCase().trim();

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Perfecto 😊 Te llevo a WhatsApp ahora." };
    }
    if (NO_WORDS.includes(text)) {
      return { text: "De acuerdo 😊 ¿En qué más puedo ayudarte?" };
    }
  }

  const intent = detectIntent(message);
  let reply = "";

  switch (intent) {
    case "GREETING":
      reply = "Hola 👋 Soy Sasha, la asistente virtual de Jorge.";
      break;
    case "ASSISTANT":
      reply = "Soy Sasha 🤖, la asistente virtual de Jorge.";
      break;
    case "CREATOR":
      reply = "Fui creada por Jorge para su portafolio profesional 😊";
      break;
    case "STATUS":
      reply = "¡Muy bien! 😊 Lista para ayudarte.";
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
        "Sí, es desarrollador Full Stack. En frontend usa React y Vite, y en backend Spring Boot y Django REST Framework.";
      break;
    case "PROJECTS":
      reply = `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`;
      break;
    case "MOTIVATION":
      reply =
        "Porque combina formación sólida, experiencia real y enfoque en soluciones prácticas.";
      break;
    case "CONTACT":
      return {
        text:
          "Puedes contactar a Jorge fácilmente 😊\n\n" +
          "📱 WhatsApp disponible desde el portafolio.\n\n" +
          "¿Quieres que abra WhatsApp ahora?",
        action: "CONTACT_CONFIRM",
      };
    default:
      reply =
        "Puedo ayudarte a conocer el perfil, experiencia y proyectos de Jorge 😊";
  }

  return { text: reply, intent };
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
  const [context, setContext] = useState({ awaiting: null });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
      "Puedes preguntarme sobre su perfil, experiencia o proyectos.",
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
      const res = getSmartResponse(text, context);

      setContext({
        awaiting: res.action === "CONTACT_CONFIRM" ? "CONTACT_CONFIRM" : null,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.text },
      ]);

      setTyping(false);
    }, delay());
  };

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: primaryBg,
          color: "#fff",
          zIndex: 1200,
        }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            ...(isLandscape
              ? {
                  inset: 0,
                  height: "100dvh",
                  width: "100vw",
                }
              : {
                  bottom: 90,
                  left: 16,
                  width: 360,
                  height: "70vh",
                  maxHeight: 520,
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
              flexShrink: 0,
            }}
          >
            <Typography>Sasha</Typography>

            <Box>
              <Tooltip title="Borrar conversación">
                <IconButton
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={() => setMessages([initialMessage])}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Cerrar chat">
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
            <Box sx={{ p: 1, flexShrink: 0 }}>
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

          {/* MENSAJES (SCROLL REAL) */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              overflowY: "auto",
              minHeight: 0,
              WebkitOverflowScrolling: "touch",
            }}
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
          <Box
            sx={{
              display: "flex",
              p: 1,
              flexShrink: 0,
              borderTop: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
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
