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
  Portal,
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
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables, aplicando buenas prácticas y arquitectura limpia.",
  education:
    "Máster en Ingeniería de Software y Sistemas Informáticos – UNIR, España",
  experience: [
    "Desarrollador de aulas virtuales",
    "Desarrollo Full Stack",
    "APIs REST seguras",
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
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online",
    "Apps React con APIs",
  ],
};

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas"],
  PROFILE: ["jorge", "perfil"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías"],
  PROJECTS: ["proyectos"],
  CONTACT: ["contactar", "whatsapp"],
};

function detectIntent(msg) {
  const t = msg.toLowerCase();
  let best = "UNKNOWN";
  let max = 0;
  for (const i in INTENTS) {
    const s = INTENTS[i].filter((w) => t.includes(w)).length;
    if (s > max) {
      max = s;
      best = i;
    }
  }
  return max ? best : "UNKNOWN";
}

function getSmartResponse(msg, ctx) {
  const text = msg.toLowerCase().trim();

  if (ctx.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Perfecto 😊 Te llevo a WhatsApp.", clear: true };
    }
    if (NO_WORDS.includes(text)) {
      return { text: "De acuerdo 😊" };
    }
  }

  const intent = detectIntent(msg);
  let reply = "";

  switch (intent) {
    case "GREETING":
      reply = "Hola 👋 Soy Sasha.";
      break;
    case "PROFILE":
      reply = `${PROFILE.name}, ${PROFILE.role}.`;
      break;
    case "EXPERIENCE":
      reply = PROFILE.experience.join(", ");
      break;
    case "SKILLS":
      reply = PROFILE.stack.join(", ");
      break;
    case "PROJECTS":
      reply = PROFILE.projects.join(", ");
      break;
    case "CONTACT":
      return {
        text: "¿Quieres que abra WhatsApp ahora?",
        action: "CONTACT_CONFIRM",
      };
    default:
      reply = "Puedes preguntarme sobre Jorge 😊";
  }

  return { text: reply };
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
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({ awaiting: null });
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 Soy Sasha, ¿en qué puedo ayudarte?" },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
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
          bgcolor: isDark ? "#000" : theme.palette.primary.main,
          color: "#fff",
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* CHAT FLOTANTE REAL */}
      {open && (
        <Portal>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: isLandscape ? "stretch" : "flex-end",
              pointerEvents: "none",
            }}
          >
            <Paper
              sx={{
                pointerEvents: "auto",
                display: "flex",
                flexDirection: "column",
                width: isLandscape ? "100%" : 360,
                height: isLandscape ? "100%" : 520,
                maxHeight: "100%",
                mb: isLandscape ? 0 : 10,
              }}
            >
              {/* HEADER */}
              <Box
                sx={{
                  p: 1,
                  bgcolor: theme.palette.primary.main,
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

              {/* MENSAJES */}
              <Box sx={{ flex: 1, p: 1, overflowY: "auto", minHeight: 0 }}>
                {messages.map((m, i) => (
                  <Typography key={i} sx={{ mb: 0.5 }}>
                    {m.text}
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
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                />
                <IconButton onClick={() => sendMessage(input)}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Portal>
      )}
    </>
  );
}
