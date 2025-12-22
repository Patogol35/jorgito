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
   CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
   UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 400) + 300;
const YES_WORDS = ["sí", "si", "claro", "ok", "dale", "muéstrame", "perfecto"];
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
  softSkills: [
    "Pensamiento analítico",
    "Resolución de problemas",
    "Aprendizaje continuo",
    "Trabajo en equipo",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online Full Stack",
    "Aplicaciones Frontend",
    "Apps React conectadas a APIs REST",
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
];

/* =========================
   INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey"],
  PROFILE: ["jorge", "quién es", "perfil"],
  EDUCATION: ["estudios", "formación", "máster"],
  EXPERIENCE: ["experiencia", "trabajo"],
  SKILLS: ["tecnologías", "stack"],
  PROJECTS: [
    "proyectos",
    "portfolio",
    "en qué proyectos",
    "aplica estas tecnologías",
  ],
  MOTIVATION: ["por qué contratar", "ventajas"],
  CONTACT: ["contactar", "whatsapp", "correo"],
};

/* =========================
   INTENT DETECTOR
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();
  let best = null;
  let max = 0;

  for (const intent in INTENTS) {
    const score = INTENTS[intent].filter((w) => text.includes(w)).length;
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return best;
}

/* =========================
   FOLLOW UPS
========================= */
const FOLLOW_UPS = {
  PROFILE: "¿Quieres conocer su experiencia profesional?",
  EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
  SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
  PROJECTS: "¿Deseas saber por qué contratarlo?",
};

/* =========================
   RESPUESTA INTELIGENTE
========================= */
function getSmartResponse(message, context) {
  const text = message.toLowerCase();

  // 👉 Follow-up flow
  if (context.awaitingFollowUp) {
    if (YES_WORDS.some((w) => text.includes(w))) {
      const intent = context.awaitingFollowUp;
      return handleIntent(intent);
    }
    if (NO_WORDS.some((w) => text.includes(w))) {
      return { text: "Perfecto 😊 ¿En qué más puedo ayudarte?" };
    }
  }

  const intent = detectIntent(message);
  return handleIntent(intent);
}

function handleIntent(intent) {
  switch (intent) {
    case "GREETING":
      return { text: "Hola 👋 Soy Sasha, la asistente virtual de Jorge." };
    case "PROFILE":
      return {
        text: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
        intent,
      };
    case "EDUCATION":
      return { text: `Cuenta con un ${PROFILE.education}.`, intent };
    case "EXPERIENCE":
      return {
        text: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
        intent,
      };
    case "SKILLS":
      return {
        text: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
        intent,
      };
    case "PROJECTS":
      return {
        text: `Aplica estas tecnologías en proyectos como ${PROFILE.projects.join(
          ", "
        )}.`,
        intent,
      };
    case "MOTIVATION":
      return {
        text:
          "Porque combina formación sólida, experiencia real y enfoque en soluciones prácticas.",
        intent,
      };
    case "CONTACT":
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Te llevo a WhatsApp 😊" };
    default:
      return {
        text: "Puedo ayudarte a conocer el perfil profesional de Jorge 😊",
      };
  }
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
  const [context, setContext] = useState({ awaitingFollowUp: null });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha. Puedes preguntarme sobre experiencia, tecnologías o proyectos.",
  };

  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((p) => [...p, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const res = getSmartResponse(text, context);
      setMessages((p) => [...p, { from: "bot", text: res.text }]);

      if (res.intent && FOLLOW_UPS[res.intent]) {
        setMessages((p) => [...p, { from: "bot", text: FOLLOW_UPS[res.intent] }]);
        setContext({ awaitingFollowUp: res.intent });
      } else {
        setContext({ awaitingFollowUp: null });
      }

      setTyping(false);
    }, delay());
  };

  return (
    <>
      <Fab
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16, bgcolor: primaryBg }}
      >
        <SmartToyIcon sx={{ color: "#fff" }} />
      </Fab>

      {open && (
        <Paper sx={{ position: "fixed", bottom: 90, left: 16, width: 360, height: 520, display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: 1.5, bgcolor: primaryBg, color: "#fff" }}>
            <Typography fontWeight="bold">Sasha 🤖</Typography>
          </Box>

          <Box sx={{ p: 1 }}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {SUGGESTIONS.map((q) => (
                <Chip key={q} label={q} onClick={() => sendMessage(q)} />
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <Typography key={i} align={m.from === "user" ? "right" : "left"}>
                {m.text}
              </Typography>
            ))}
            {typing && <Typography variant="caption">Sasha está escribiendo…</Typography>}
            <div ref={bottomRef} />
          </Box>

          <Box sx={{ display: "flex", p: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <IconButton disabled={!input.trim()} onClick={() => sendMessage(input)}>
              <SendIcon sx={{ color: isDark ? "#fff" : "#03a9f4" }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
