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

/* ========================= CONFIG ========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* ========================= UTILIDADES ========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const YES_WORDS = ["sí", "si", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* ========================= PERFIL ========================= */
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

/* ========================= SUGERENCIAS ========================= */
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

/* ========================= INTENCIONES ========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey"],
  PROFILE: ["jorge", "quién es", "perfil"],
  EDUCATION: ["estudios", "formación", "máster"],
  EXPERIENCE: ["experiencia", "trabajo"],
  SKILLS: ["tecnologías", "stack"],
  STACK: ["full stack", "frontend", "backend"],
  PROJECTS: ["proyectos", "portfolio"],
  MOTIVATION: ["por qué contratar", "ventajas"],
  CONTACT: ["contactar", "whatsapp", "correo"],

  ASSISTANT: ["quién eres", "eres sasha", "qué eres"],
  CREATOR: ["quién te creó", "quien te creo", "te programó"],
  STATUS: ["cómo estás", "como estas", "qué tal"],
};

/* ========================= DETECTAR INTENCIÓN ========================= */
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

/* ========================= RESPUESTA ========================= */
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
        "Sí, es Full Stack. Frontend con React y backend con Spring Boot y Django REST Framework.";
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
          "Puedes contactar a Jorge fácilmente 😊\n\n📱 WhatsApp desde el portafolio.\n📩 Correo y redes en Contacto.\n\n¿Quieres que abra WhatsApp ahora?",
        action: "CONTACT_CONFIRM",
      };

    case "ASSISTANT":
      reply =
        "Soy Sasha 🤖, la asistente virtual de Jorge. Estoy aquí para ayudarte.";
      break;

    case "CREATOR":
      reply =
        "Fui creada para el portafolio de Jorge, con el objetivo de mostrar su perfil profesional.";
      break;

    case "STATUS":
      reply = "¡Estoy muy bien! 😊 Lista para ayudarte.";
      break;

    default:
      reply = "Puedo ayudarte a conocer el perfil profesional de Jorge 😊";
  }

  return { text: reply, intent };
}

/* ========================= COMPONENTE ========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryBg = isDark ? "#000" : theme.palette.primary.main;

  const bottomRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({ awaiting: null });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
      "Puedes preguntarme sobre su perfil, experiencia o tecnologías.",
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
      setMessages((prev) => [...prev, { from: "bot", text: res.text }]);
      setTyping(false);
    }, delay());
  };

  return (
    <>
      <Fab
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16 }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 80,
            left: 16,
            width: 320,
            height: 420,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
            <Typography>Sasha 🤖</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={1} sx={{ p: 1, flexWrap: "wrap" }}>
            {SUGGESTIONS.map((q) => (
              <Chip key={q} label={q} onClick={() => sendMessage(q)} />
            ))}
          </Stack>

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
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor:
                      msg.from === "user"
                        ? primaryBg
                        : isDark
                        ? "#1f1f1f"
                        : "#f4f4f4",
                    color:
                      msg.from === "user"
                        ? "#fff"
                        : isDark
                        ? "#eaeaea"
                        : "#000",
                    fontWeight: msg.from === "user" ? 500 : 400,
                    boxShadow:
                      msg.from === "user"
                        ? "0 2px 6px rgba(0,0,0,0.25)"
                        : "none",
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
              placeholder="Escribe tu pregunta…"
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
