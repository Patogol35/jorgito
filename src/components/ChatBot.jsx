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

/* =========================
   CONFIGURACIÓN
========================= */
const WHATSAPP_URL =
  "https://wa.me/593XXXXXXXXX?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
   UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const YES_WORDS = ["sí", "si", "claro", "ok", "dale", "de acuerdo"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
   PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables.",
  education: "Máster en Ingeniería de Software y Sistemas Informáticos",
  experience: [
    "Desarrollo de aulas virtuales",
    "Aplicaciones web Full Stack",
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
  ],
  softSkills: [
    "Pensamiento analítico",
    "Resolución de problemas",
    "Trabajo en equipo",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online",
    "Aplicaciones React con APIs",
  ],
};

/* =========================
   SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué experiencia tiene?",
  "¿En qué tecnologías trabaja?",
  "Cuéntame sobre sus proyectos",
  "¿Por qué contratarlo?",
  "¿Cómo puedo contactarlo?",
];

/* =========================
   INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "máster"],
  EXPERIENCE: ["experiencia", "trabajo"],
  SKILLS: ["tecnologías", "stack"],
  PROJECTS: ["proyectos", "apps"],
  MOTIVATION: ["por qué contratar", "ventajas"],
  CONTACT: ["contactar", "whatsapp", "correo", "email", "mensaje"],
};

/* =========================
   DETECTAR INTENCIÓN
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();
  let bestIntent = "UNKNOWN";
  let maxScore = 0;

  for (const intent in INTENTS) {
    const score = INTENTS[intent].filter((w) =>
      text.includes(w)
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
  const textLower = message.toLowerCase().trim();

  // ✅ Confirmación WhatsApp
  if (
    context.awaiting === "WHATSAPP_CONFIRM" &&
    YES_WORDS.some((w) => textLower === w || textLower.includes(w))
  ) {
    window.open(WHATSAPP_URL, "_blank");
    return {
      text: "Perfecto 😊 Te redirijo a WhatsApp.",
      intent: "CONTACT",
    };
  }

  if (
    context.awaiting === "WHATSAPP_CONFIRM" &&
    NO_WORDS.some((w) => textLower.includes(w))
  ) {
    return {
      text: "De acuerdo 😊 Si necesitas algo más, aquí estaré.",
      intent: "CONTACT",
    };
  }

  // ✅ Respuesta a follow-up (sí genérico)
  if (
    context.lastIntent &&
    YES_WORDS.some((w) => textLower === w)
  ) {
    if (context.lastIntent === "PROFILE")
      return {
        text: `Tiene experiencia en ${PROFILE.experience.join(", ")}.`,
        intent: "EXPERIENCE",
      };

    if (context.lastIntent === "EXPERIENCE")
      return {
        text: `Utiliza tecnologías como ${PROFILE.stack.join(", ")}.`,
        intent: "SKILLS",
      };
  }

  const intent = detectIntent(message);
  let text = "";

  switch (intent) {
    case "GREETING":
      text = "Hola 👋 Soy Sasha, la asistente virtual de Jorge.";
      break;

    case "PROFILE":
      text = `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`;
      break;

    case "EDUCATION":
      text = `Cuenta con un ${PROFILE.education}.`;
      break;

    case "EXPERIENCE":
      text = `Tiene experiencia en ${PROFILE.experience.join(", ")}.`;
      break;

    case "SKILLS":
      text = `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`;
      break;

    case "PROJECTS":
      text = `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`;
      break;

    case "MOTIVATION":
      text =
        "Porque combina formación sólida, experiencia real y enfoque práctico.";
      break;

    case "CONTACT":
      return {
        text: "📱 ¿Quieres que abra WhatsApp ahora para contactar a Jorge?",
        intent: "CONTACT",
        action: "ASK_WHATSAPP",
      };

    default:
      text =
        "Puedo ayudarte con información sobre Jorge o cómo contactarlo 😊";
  }

  return { text, intent };
}

/* =========================
   COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryBg = isDark ? "#000" : theme.palette.primary.main;

  const bottomRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({
    lastIntent: null,
    awaiting: null,
  });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha. Pregúntame sobre el perfil de Jorge o cómo contactarlo.",
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
        lastIntent: res.intent,
        awaiting:
          res.action === "ASK_WHATSAPP" ? "WHATSAPP_CONFIRM" : null,
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
            bottom: 90,
            left: 16,
            width: 360,
            height: 520,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              bgcolor: primaryBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight="bold">Sasha 🤖</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

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

          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{ textAlign: msg.from === "user" ? "right" : "left", mb: 1 }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    bgcolor:
                      msg.from === "user" ? primaryBg : "#f1f1f1",
                    color: msg.from === "user" ? "#fff" : "#000",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {typing && (
              <Typography variant="caption">
                Sasha está escribiendo…
              </Typography>
            )}
            <div ref={bottomRef} />
          </Box>

          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Escribe tu mensaje…"
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
