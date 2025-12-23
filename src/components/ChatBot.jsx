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
const YES_WORDS = ["sí", "si", "claro", "ok", "dale", "aja"];
const NO_WORDS = ["no", "ahora no", "luego"];

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
  "Sus libros favoritos?",
];

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "buenos dias"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "máster", "formación"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "habilidades"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos"],
  MOTIVATION: ["contratar"],
  CONTACT: ["contactar", "whatsapp"],
  ASSISTANT: ["quien eres", "sasha"],
  CREATOR: ["quien te creo"],
  BOOK: ["libros"],
  HELP: ["que puedes hacer"],
  FAREWELL: ["adios", "bye"],
};

/* =========================
NORMALIZACIÓN
========================= */
const normalize = (t) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* =========================
DETECT INTENT
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const i in INTENTS) {
    let score = 0;
    for (const w of INTENTS[i]) {
      if (text.includes(normalize(w))) score++;
    }
    if (score > max) {
      max = score;
      best = i;
    }
  }
  return max ? best : "UNKNOWN";
};

/* =========================
FOLLOW UP
========================= */
const followUp = (intent) =>
  ({
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres ver algunos de sus proyectos?",
    PROJECTS: "¿Quieres saber cómo puedes contactarlo?",
  }[intent]);

/* =========================
RESPUESTAS (FIX OK)
========================= */
function getSmartResponse(message, context) {
  const text = normalize(message);

  /* FOLLOW-UP OK */
  if (context.awaitingFollowUp && YES_WORDS.includes(text)) {
    const intent = context.awaitingFollowUp;

    const autoReplies = {
      SKILLS: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
      PROJECTS: `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`,
      CONTACT:
        "Puedes contactarlo fácilmente por WhatsApp desde el portafolio 😊",
    };

    return { text: autoReplies[intent], intent };
  }

  /* CONTACT CONFIRM */
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

  const replies = {
    GREETING: "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
    PROFILE: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
    EDUCATION: `Cuenta con un ${PROFILE.education}.`,
    EXPERIENCE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
    SKILLS: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
    STACK:
      "Sí, es desarrollador Full Stack con React en frontend y Django/Spring en backend.",
    PROJECTS: `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`,
    MOTIVATION:
      "Porque combina formación sólida, experiencia real y enfoque profesional.",
    CONTACT:
      "¿Quieres que abra WhatsApp ahora para que puedas contactarlo?",
    ASSISTANT: "Soy Sasha 🤖, la asistente virtual de Jorge.",
    CREATOR: "Fui creada por Jorge 😊",
    BOOK: "Disfruta especialmente libros de Dan Brown.",
    HELP:
      "Puedo contarte sobre el perfil, experiencia, tecnologías y proyectos de Jorge.",
    FAREWELL: "¡Gracias por visitar el portafolio! 👋",
  };

  if (intent === "CONTACT") {
    return {
      text: replies.CONTACT,
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  return {
    text:
      replies[intent] ||
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil profesional de Jorge 😊",
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
  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
      "Puedes preguntarme sobre su perfil, experiencia o proyectos.",
  };
  const [messages, setMessages] = useState([initialMessage]);

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

        setContext({
          awaiting: res.action || null,
          awaitingFollowUp: followUp(res.intent) ? res.intent : null,
        });

        setMessages((m) => [
          ...m,
          { from: "bot", text: res.text },
          ...(followUp(res.intent)
            ? [{ from: "bot", text: followUp(res.intent) }]
            : []),
        ]);

        setTyping(false);
      }, delay());
    },
    [context]
  );

  return (
    <>
      <Fab
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16, bgcolor: primaryBg, color: "#fff" }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            ...(isLandscape
              ? { left: 0, right: 0, bottom: 0, height: "70vh" }
              : { bottom: 90, left: 16, width: 360, height: 520 }),
          }}
        >
          <Box sx={{ p: 1, bgcolor: primaryBg, color: "#fff", display: "flex", justifyContent: "space-between" }}>
            <Typography>Sasha</Typography>
            <IconButton size="small" sx={{ color: "#fff" }} onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 1 }}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {SUGGESTIONS.map((q) => (
                <Chip key={q} label={q} size="small" onClick={() => sendMessage(q)} />
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <Typography key={i} sx={{ mb: 0.5 }}>
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
