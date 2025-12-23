import { useState, useEffect, useRef, useCallback } from "react";
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
  ctx.memory ??= [];
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
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables.",
  education:
    "Máster en Ingeniería de Software y Sistemas Informáticos – UNIR (España)",
  experience: [
    "Desarrollador de aulas virtuales",
    "Desarrollo de aplicaciones web Full Stack",
    "Creación de APIs REST seguras",
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
    "Aplicaciones React con APIs REST",
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
  "Sus libros favoritos?",
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "master", "formacion"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologias", "habilidades"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos"],
  CONTACT: ["contactar", "whatsapp"],
  ASSISTANT: ["sasha"],
  CREATOR: ["quien te creo"],
  BOOK: ["libros"],
  HELP: ["que puedes hacer"],
  FAREWELL: ["adios", "bye"],
};

/* =========================
INTENT DETECTOR
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    INTENTS[intent].forEach((w) => {
      if (text.includes(normalize(w))) score++;
    });
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return best;
};

/* =========================
RESPUESTAS
========================= */
const replies = {
  GREETING: "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
  ASSISTANT: "Soy Sasha 🤖, la asistente virtual de Jorge.",
  CREATOR: "Fui creada por Jorge 😊",
  BOOK: "A Jorge le gusta especialmente Dan Brown 📚",
  HELP:
    "Puedo contarte sobre su perfil, experiencia, estudios, proyectos y contacto.",
  FAREWELL: "¡Gracias por visitar el portafolio! 👋",
  PROFILE: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
  EDUCATION: PROFILE.education,
  EXPERIENCE: PROFILE.experience.join(", "),
  SKILLS: PROFILE.stack.join(", "),
  STACK:
    "Sí, es Full Stack. React en frontend y Django / Spring Boot en backend.",
  PROJECTS: PROFILE.projects.join(", "),
};

/* =========================
IA
========================= */
function getSmartResponse(message, context) {
  const intent = detectIntent(message);
  saveMemory(context, { message, intent });

  if (intent === "CONTACT") {
    return {
      text: "¿Quieres que abra WhatsApp ahora? 😊",
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (["si", "sí", "ok", "dale"].includes(normalize(message))) {
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Perfecto 😊 Te llevo a WhatsApp ahora." };
    }
    return { text: "Está bien 😊 ¿En qué más te ayudo?" };
  }

  return {
    text:
      replies[intent] ||
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte.",
    intent,
  };
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
  const [context, setContext] = useState({});
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Pregúntame lo que quieras 😊",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim()) return;

      setMessages((m) => [...m, { from: "user", text }]);
      setInput("");
      setTyping(true);

      setTimeout(() => {
        const res = getSmartResponse(text, context);
        setContext({ awaiting: res.action || null });
        setMessages((m) => [...m, { from: "bot", text: res.text }]);
        setTyping(false);
      }, delay());
    },
    [context]
  );

  return (
    <>
      <Fab
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16, bgcolor: primaryBg }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: isLandscape ? 0 : 90,
            left: isLandscape ? 0 : 16,
            width: isLandscape ? "100%" : 360,
            height: isLandscape ? "70vh" : 520,
            display: "flex",
            flexDirection: "column",
            zIndex: 1300,
          }}
        >
          {/* HEADER */}
          <Box sx={{ p: 1, bgcolor: primaryBg, color: "#fff" }}>
            <Typography>Sasha</Typography>
          </Box>

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {SUGGESTIONS.map((q) => (
                <Chip key={q} label={q} onClick={() => sendMessage(q)} />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <Typography key={i}>{m.text}</Typography>
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
