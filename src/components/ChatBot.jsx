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
import { useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

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
RESPUESTA INTELIGENTE
========================= */
function getSmartResponse(message, context) {
  const text = message.toLowerCase().trim();

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Perfecto 😊 Te llevo a WhatsApp ahora." };
    }
    if (NO_WORDS.includes(text)) {
      return { text: "Está bien 😊 ¿En qué más puedo ayudarte?" };
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
      reply = "Fui creada por Jorge 😊.";
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
        "Sí, es Full Stack. Frontend con React/Vite y Backend con Spring Boot y Django REST.";
      break;
    case "PROJECTS":
      reply = `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`;
      break;
    case "MOTIVATION":
      reply =
        "Porque combina formación sólida, experiencia real y enfoque práctico.";
      break;
    case "CONTACT":
      return {
        text:
          "Puedes contactar a Jorge 😊\n\n📱 WhatsApp desde el portafolio.\n\n¿Quieres que lo abra ahora?",
        action: "CONTACT_CONFIRM",
      };
    default:
      reply = "Puedo ayudarte a conocer el perfil profesional de Jorge 😊";
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
      "Hola 👋 Soy Sasha. Pregúntame sobre perfil, experiencia, tecnologías o proyectos.",
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
      setContext({ awaiting: res.action || null });
      setMessages((prev) => [...prev, { from: "bot", text: res.text }]);
      setTyping(false);
    }, delay());
  };

  return (
    <>
      <Fab
        onClick={() => setOpen(!open)}
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

      {open && (
        <Paper
          sx={{
            position: "fixed",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 2,

            ...(isLandscape
              ? {
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "60vh",
                  maxHeight: 360,
                  borderRadius: "16px 16px 0 0",
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
            }}
          >
            <Typography>Sasha</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* SUGERENCIAS */}
          {!isLandscape && (
            <Box sx={{ p: 1 }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {SUGGESTIONS.map((q) => (
                  <Chip key={q} label={q} size="small" onClick={() => sendMessage(q)} />
                ))}
              </Stack>
            </Box>
          )}

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Typography key={i} sx={{ mb: 0.5 }}>
                {msg.text}
              </Typography>
            ))}
            {typing && <Typography variant="caption">Sasha está escribiendo…</Typography>}
            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", p: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <IconButton onClick={() => sendMessage(input)}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
  }
