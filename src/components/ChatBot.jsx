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
   PERFIL DE JORGE
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables, " +
    "aplicando buenas prácticas y arquitectura limpia.",
  education: "Máster en Ingeniería de Software y Sistemas Informáticos",
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
    "JWT",
    "Git",
    "Linux",
  ],
  softSkills: [
    "Pensamiento analítico",
    "Resolución de problemas",
    "Aprendizaje continuo",
    "Trabajo en equipo",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online Full Stack",
    "Dashboards administrativos",
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
];

/* =========================
   INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey", "qué tal"],
  PROFILE: ["jorge", "quién es jorge", "perfil", "háblame"],
  EDUCATION: ["estudios", "formación", "máster", "título"],
  EXPERIENCE: ["experiencia", "ha trabajado", "trabajo"],
  SKILLS: ["skills", "habilidades", "tecnologías", "stack"],
  SOFT_SKILLS: ["habilidades blandas", "soft", "equipo"],
  STACK: ["full stack", "frontend", "backend", "rol"],
  PROJECTS: ["proyectos", "portfolio", "apps"],
  MOTIVATION: ["por qué contratar", "por qué elegir", "ventajas"],
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
  if (message.trim().length < 4) {
    return { text: "¿Podrías darme un poco más de detalle? 😊" };
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
      text = `Cuenta con ${PROFILE.education}.`;
      break;

    case "EXPERIENCE":
      text = `Tiene experiencia como ${PROFILE.experience.join(", ")}.`;
      break;

    case "SKILLS":
      text =
        "Trabaja con tecnologías como " +
        PROFILE.stack.join(", ") +
        ", aplicando buenas prácticas de desarrollo.";
      break;

    case "SOFT_SKILLS":
      text = `Sus habilidades blandas incluyen: ${PROFILE.softSkills.join(
        ", "
      )}.`;
      break;

    case "STACK":
      text =
        "Sí, es desarrollador Full Stack, trabajando tanto en frontend como backend.";
      break;

    case "PROJECTS":
      text = `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`;
      break;

    case "MOTIVATION":
      text =
        "Porque combina sólida formación, experiencia práctica y enfoque en soluciones reales.";
      break;

    default:
      text =
        context.lastIntent !== null
          ? "¿Quieres que te cuente más sobre su experiencia o tecnologías?"
          : "Puedo ayudarte a conocer el perfil profesional de Jorge 😊";
  }

  return { text, intent };
}

/* =========================
   FOLLOW UP
========================= */
function followUp(intent) {
  const map = {
    PROFILE: "¿Quieres conocer su experiencia profesional?",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
    PROJECTS: "¿Deseas saber por qué contratarlo?",
  };
  return map[intent];
}

/* =========================
   COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryBg = isDark
    ? theme.palette.primary.light
    : theme.palette.primary.main;

  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({ lastIntent: null });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
      "Puedes preguntarme sobre su perfil, experiencia, tecnologías o proyectos.",
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
            width: 360,
            height: 520,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            bgcolor: isDark ? "#121212" : "#fff",
            color: isDark ? "#eaeaea" : "#000",
            zIndex: 1200,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: primaryBg,
              color: isDark ? "#000" : "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Sasha 🤖</Typography>
            <Box>
              <Tooltip title="Borrar conversación">
                <IconButton size="small" onClick={clearChat}>
                  <DeleteIcon sx={{ color: isDark ? "#000" : "#fff" }} />
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={() => setOpen(false)}>
                <CloseIcon sx={{ color: isDark ? "#000" : "#fff" }} />
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
                  sx={{
                    bgcolor: isDark ? "#2a2a2a" : "#f1f1f1",
                    color: isDark ? "#eaeaea" : "#000",
                    border: isDark ? "1px solid #3a3a3a" : "none",
                    "&:hover": {
                      bgcolor: isDark ? "#333" : "#e0e0e0",
                    },
                  }}
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
                      msg.from === "user" ? primaryBg : isDark ? "#2c2c2c" : "#f1f1f1",
                    color:
                      msg.from === "user"
                        ? isDark
                          ? "#000"
                          : "#fff"
                        : isDark
                        ? "#eaeaea"
                        : "#000",
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
              sx={{
                input: { color: isDark ? "#fff" : "#000" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: isDark ? "#1f1f1f" : "#fff",
                },
              }}
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
