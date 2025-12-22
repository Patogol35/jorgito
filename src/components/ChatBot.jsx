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
    "Máster en Ingeniería de Software – UNIR, España",
  experience: [
    "Desarrollador de aulas virtuales",
    "Aplicaciones web Full Stack",
    "APIs REST",
  ],
  stack: [
    "React",
    "Vite",
    "Spring Boot",
    "Django REST",
    "MySQL",
    "AWS",
    "Git",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online",
    "Apps React",
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
  "¿Cómo puedo contactarlo?",
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas"],
  PROFILE: ["jorge", "quién es"],
  EDUCATION: ["estudios", "máster"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos"],
  CONTACT: ["contactar", "whatsapp"],
};

/* =========================
INTENT DETECTOR
========================= */
function detectIntent(msg) {
  const text = msg.toLowerCase();
  return (
    Object.keys(INTENTS).find((k) =>
      INTENTS[k].some((w) => text.includes(w))
    ) || "UNKNOWN"
  );
}

/* =========================
RESPUESTA
========================= */
function getSmartResponse(message) {
  const intent = detectIntent(message);

  switch (intent) {
    case "GREETING":
      return "Hola 👋 Soy Sasha, asistente virtual de Jorge.";
    case "PROFILE":
      return `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`;
    case "EDUCATION":
      return `Cuenta con un ${PROFILE.education}.`;
    case "EXPERIENCE":
      return `Tiene experiencia como ${PROFILE.experience.join(", ")}.`;
    case "SKILLS":
      return `Trabaja con ${PROFILE.stack.join(", ")}.`;
    case "STACK":
      return "Sí, es desarrollador Full Stack.";
    case "PROJECTS":
      return `Ha trabajado en ${PROFILE.projects.join(", ")}.`;
    case "CONTACT":
      window.open(WHATSAPP_URL, "_blank");
      return "Te llevo a WhatsApp 😊";
    default:
      return "Puedes preguntarme sobre su perfil profesional 😊";
  }
}

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 Soy Sasha. Pregúntame lo que desees." },
  ]);

  /* 🔑 BLOQUEA SCROLL DEL BODY (CLAVE) */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((p) => [...p, { from: "user", text }]);
    setInput("");

    setTimeout(() => {
      setMessages((p) => [
        ...p,
        { from: "bot", text: getSmartResponse(text) },
      ]);
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
          bgcolor: "#000",
          color: "#fff",
          zIndex: 1400,
        }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            height: "100dvh", // 🔑 CLAVE REAL
            display: "flex",
            justifyContent: isLandscape ? "stretch" : "flex-end",
            alignItems: isLandscape ? "stretch" : "flex-end",
          }}
        >
          <Paper
            sx={{
              width: isLandscape ? "100%" : 360,
              height: isLandscape ? "100%" : "70%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                p: 1,
                bgcolor: "#000",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Sasha</Typography>
              <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* SUGERENCIAS */}
            {!isLandscape && (
              <Box p={1}>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {SUGGESTIONS.map((q) => (
                    <Chip key={q} label={q} onClick={() => sendMessage(q)} />
                  ))}
                </Stack>
              </Box>
            )}

            {/* MENSAJES → AQUÍ SÍ SCROLLEA */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 1,
                WebkitOverflowScrolling: "touch", // 🔑 ANDROID
              }}
            >
              {messages.map((m, i) => (
                <Typography key={i} mb={0.5}>
                  {m.text}
                </Typography>
              ))}
              <div ref={bottomRef} />
            </Box>

            {/* INPUT */}
            <Box sx={{ p: 1, display: "flex" }}>
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
        </Box>
      )}
    </>
  );
}
