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
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

/* =========================
   UTILIDADES
========================= */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const delay = () => Math.floor(Math.random() * 500) + 400;

/* =========================
   DATA PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Desarrollador Full Stack",
  education: "Máster en Ingeniería de Software y Sistemas Informáticos",
  stack: [
    "React",
    "Vite",
    "JavaScript",
    "Django REST Framework",
    "Python",
    "MySQL",
    "JWT",
    "Git",
    "Linux",
  ],
  projects: [
    "Tiendas online Full Stack",
    "Aplicaciones React conectadas a APIs REST",
    "Backends seguros y bien estructurados",
  ],
  contact:
    "Puedes contactarlo desde el botón de WhatsApp o desde la sección de contacto del portafolio.",
};

/* =========================
   SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué estudios tiene?",
  "¿Qué tecnologías domina?",
  "¿Es Full Stack?",
  "Cuéntame sobre sus proyectos",
  "¿Cómo puedo contactarlo?",
];

/* =========================
   INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey", "qué tal"],
  PROFILE: ["jorge", "perfil", "quién", "eres"],
  EDUCATION: ["estudios", "formación", "máster", "título"],
  SKILLS: ["skills", "habilidades", "tecnologías", "stack"],
  STACK: ["full stack", "frontend", "backend"],
  PROJECTS: ["proyectos", "portfolio", "apps", "trabajos"],
  CONTACT: ["contacto", "whatsapp", "correo", "email"],
};

/* =========================
   DETECTAR INTENCIÓN
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();
  let bestIntent = "UNKNOWN";
  let maxScore = 0;

  for (const intent in INTENTS) {
    const score = INTENTS[intent].filter((word) =>
      text.includes(word)
    ).length;

    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  return maxScore > 0 ? bestIntent : "UNKNOWN";
}

/* =========================
   RESPUESTA INTELIGENTE
========================= */
function getSmartResponse(message, context) {
  if (message.trim().length < 4) {
    return {
      text: "¿Podrías darme un poco más de detalle? 😊",
    };
  }

  const intent = detectIntent(message);

  let text = "";

  switch (intent) {
    case "GREETING":
      text = pick([
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
        "¡Hola! 😊 Puedo contarte sobre el perfil profesional de Jorge.",
      ]);
      break;

    case "PROFILE":
      text = `${PROFILE.name} es ${PROFILE.role}.`;
      break;

    case "EDUCATION":
      text = `Cuenta con ${PROFILE.education}.`;
      break;

    case "SKILLS":
      text = `Domina tecnologías como ${PROFILE.stack.join(", ")}.`;
      break;

    case "STACK":
      text =
        "Sí, Jorge es desarrollador Full Stack, creando interfaces modernas y APIs seguras.";
      break;

    case "PROJECTS":
      text = `Ha desarrollado ${PROFILE.projects.join(", ")}.`;
      break;

    case "CONTACT":
      text = PROFILE.contact;
      break;

    default:
      if (context.lastIntent) {
        text =
          "¿Deseas saber más sobre su formación, tecnologías o proyectos?";
      } else {
        text =
          "Puedo ayudarte a conocer el perfil profesional de Jorge 😊";
      }
  }

  return { text, intent };
}

/* =========================
   FOLLOW UP
========================= */
function followUp(intent) {
  const map = {
    PROFILE: "¿Quieres conocer sus tecnologías?",
    SKILLS: "¿Te muestro los proyectos donde las utiliza?",
    PROJECTS: "¿Quieres contactarlo?",
  };
  return map[intent];
}

/* =========================
   COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({ lastIntent: null });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("sasha-chat");
    return saved
      ? JSON.parse(saved)
      : [
          {
            from: "bot",
            text:
              "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
              "Pregúntame sobre su perfil, tecnologías, proyectos o contacto.",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("sasha-chat", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const res = getSmartResponse(text, context);
      setContext({ lastIntent: res.intent });

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
      {/* BOTÓN */}
      <Fab
        color="primary"
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1200 }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          elevation={10}
          sx={{
            position: "fixed",
            bottom: 90,
            left: 16,
            width: 350,
            height: 480,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            zIndex: 1200,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Sasha 🤖</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {SUGGESTIONS.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  size="small"
                  clickable
                  onClick={() => sendMessage(q)}
                />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    bgcolor:
                      msg.from === "user"
                        ? theme.palette.primary.main
                        : "#f1f1f1",
                    color: msg.from === "user" ? "#fff" : "#000",
                    maxWidth: "85%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {typing && (
              <Typography variant="caption" sx={{ ml: 1, color: "#aaa" }}>
                Sasha está escribiendo…
              </Typography>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Escribe tu pregunta…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <IconButton color="primary" onClick={() => sendMessage(input)}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
