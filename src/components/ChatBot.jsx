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
INTENCIONES (CORREGIDAS)
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey"],
  PROFILE: ["jorge", "quién es", "perfil"],
  EDUCATION: ["estudios", "formación", "máster"],
  EXPERIENCE: ["experiencia", "trabajo"],

  // 👉 SOLO tecnologías
  SKILLS: ["tecnologías", "herramientas", "lenguajes"],

  // 👉 SOLO Full Stack
  STACK: ["full stack", "es full stack", "frontend", "backend"],

  PROJECTS: ["proyectos", "portfolio"],
  MOTIVATION: ["por qué contratar", "ventajas"],
  CONTACT: ["contactar", "whatsapp", "correo", "email"],

  ASSISTANT: ["quién eres", "quien eres", "eres sasha"],
  CREATOR: ["quién te creó", "quien te creo", "te programó"],
  STATUS: ["cómo estás", "como estas", "qué tal"],
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

  if (context.awaitingFollowUp) {
    if (YES_WORDS.includes(text)) {
      switch (context.awaitingFollowUp) {
        case "PROFILE":
          return {
            text: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
            intent: "EXPERIENCE",
          };
        case "EXPERIENCE":
          return {
            text: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
            intent: "SKILLS",
          };
        case "SKILLS":
          return {
            text: `Aplica estas tecnologías en proyectos como ${PROFILE.projects.join(", ")}.`,
            intent: "PROJECTS",
          };
        default:
          break;
      }
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
      reply =
        "Soy Sasha 🤖, la asistente virtual de Jorge. Estoy aquí para ayudarte.";
      break;
    case "CREATOR":
      reply =
        "Fui creada por Jorge 😊 para responder preguntas sobre su perfil profesional.";
      break;
    case "STATUS":
      reply = "¡Estoy muy bien! 😊 Lista para ayudarte.";
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
        "Sí, es desarrollador Full Stack. En frontend trabaja con React y Vite, y en backend con Spring Boot y Django REST Framework.";
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
          "📱 WhatsApp: desde el portafolio.\n\n" +
          "¿Quieres que abra WhatsApp ahora?",
        action: "CONTACT_CONFIRM",
      };
    default:
      reply = "Puedo ayudarte a conocer el perfil profesional de Jorge 😊";
  }

  return { text: reply, intent };
}

/* =========================
FOLLOW UP
========================= */
function followUp(intent) {
  return {
    PROFILE: "¿Quieres conocer su experiencia profesional?",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
  }[intent];
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
  useEffect(() => {
  window.openSashaChat = () => setOpen(true);
  window.closeSashaChat = () => setOpen(false);
}, []);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({
    awaiting: null,
    awaitingFollowUp: null,
  });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
      "Puedes preguntarme sobre su perfil, experiencia, tecnologías o proyectos.",
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
        awaitingFollowUp: followUp(res.intent) ? res.intent : null,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.text },
        ...(followUp(res.intent)
          ? [{ from: "bot", text: followUp(res.intent) }]
          : []),
      ]);

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

      // 📱 VERTICAL
      ...(!isLandscape && {
        bottom: 90,
        left: 16,
        width: 360,
        height: "70vh",
        maxHeight: 520,
      }),

  // 📱 HORIZONTAL
...(isLandscape && {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92vw",
  height: "92vh",
  maxWidth: 600,
  maxHeight: 420,
}),

      display: "flex",
      flexDirection: "column",
    }}
  >
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
  <Typography>Sasha </Typography>

  <Box sx={{ display: "flex", gap: 0.5 }}>
    {/* Borrar conversación */}
    <Tooltip title="Borrar conversación">
      <IconButton
        size="small"
        sx={{ color: "#fff" }}
        onClick={() => setMessages([initialMessage])}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    {/* Cerrar chat */}
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

          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Typography
                key={i}
                sx={{
                  fontWeight: msg.from === "user" ? 600 : 400,
                  opacity: msg.from === "user" ? 0.95 : 1,
                  mb: 0.5,
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

          <Box sx={{ display: "flex", p: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <IconButton onClick={() => sendMessage(input)}>
  <SendIcon sx={{ color: "#03A9F4" }} /> {/* celeste */}
</IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
  }
