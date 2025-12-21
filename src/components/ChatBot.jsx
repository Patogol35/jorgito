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
  softSkills: [
    "Pensamiento analítico",
    "Aprendizaje continuo",
    "Buenas prácticas",
    "Trabajo en equipo",
  ],
  projects: [
    "Tiendas online Full Stack",
    "Dashboards administrativos",
    "Aplicaciones React conectadas a APIs REST",
    "Backends seguros y escalables",
  ],
  hobbies: ["Tecnología", "Aprender nuevas herramientas", "Resolver problemas"],
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
  "¿Cuáles son sus habilidades blandas?",
  "¿Qué le gusta aprender?",
  "¿Por qué contratarlo?",
];

/* =========================
   INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey", "qué tal"],
  PROFILE: ["jorge", "perfil", "quién", "eres"],
  EDUCATION: ["estudios", "formación", "máster", "título"],
  SKILLS: ["skills", "habilidades", "tecnologías", "stack"],
  SOFT_SKILLS: ["habilidades blandas", "soft", "equipo"],
  STACK: ["full stack", "frontend", "backend"],
  PROJECTS: ["proyectos", "portfolio", "apps", "trabajos"],
  MOTIVATION: ["por qué contratar", "por qué elegir", "ventajas"],
  HOBBIES: ["gusta", "intereses", "aprende"],
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
    return { text: "¿Puedes darme un poco más de detalle? 😊" };
  }

  const intent = detectIntent(message);
  let text = "";

  switch (intent) {
    case "GREETING":
      text = pick([
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
        "¡Hola! 😊 Estoy aquí para ayudarte.",
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

    case "SOFT_SKILLS":
      text = `Sus habilidades blandas incluyen: ${PROFILE.softSkills.join(
        ", "
      )}.`;
      break;

    case "STACK":
      text =
        "Sí, es desarrollador Full Stack, capaz de trabajar tanto en frontend como backend.";
      break;

    case "PROJECTS":
      text = `Ha desarrollado ${PROFILE.projects.join(", ")}.`;
      break;

    case "HOBBIES":
      text = `Le interesa ${PROFILE.hobbies.join(
        ", "
      )}, siempre buscando mejorar como desarrollador.`;
      break;

    case "MOTIVATION":
      text =
        "Porque combina buena formación técnica, código limpio y enfoque en soluciones reales.";
      break;

    default:
      text =
        context.lastIntent !== null
          ? "¿Quieres que te cuente más sobre sus proyectos o tecnologías?"
          : "Puedo hablarte sobre su perfil, habilidades y experiencia 😊";
  }

  return { text, intent };
}

/* =========================
   FOLLOW UP
========================= */
function followUp(intent) {
  const map = {
    PROFILE: "¿Quieres conocer sus tecnologías?",
    SKILLS: "¿Te muestro sus proyectos?",
    PROJECTS: "¿Quieres saber por qué contratarlo?",
  };
  return map[intent];
}

/* =========================
   COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({ lastIntent: null });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
      "Puedes preguntarme sobre su perfil, habilidades, proyectos o motivación.",
  };

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("sasha-chat");
    return saved ? JSON.parse(saved) : [initialMessage];
  });

  useEffect(() => {
    localStorage.setItem("sasha-chat", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    if (window.confirm("¿Deseas borrar toda la conversación?")) {
      localStorage.removeItem("sasha-chat");
      setMessages([initialMessage]);
      setContext({ lastIntent: null });
    }
  };

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
      {/* BOTÓN FLOAT */}
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
            height: 500,
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
            <Box>
              <Tooltip title="Borrar conversación">
                <IconButton size="small" onClick={clearChat}>
                  <DeleteIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={() => setOpen(false)}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
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
