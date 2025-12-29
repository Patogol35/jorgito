import { useState, useRef } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const YES_WORDS = ["sí", "si", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
MEMORIA
========================= */
const MEMORY_LIMIT = 10;

const saveMemory = (ctx, data) => {
  const memory = ctx.memory ?? [];
  memory.push(data);
  if (memory.length > MEMORY_LIMIT) memory.shift();
  ctx.memory = memory;
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
INTENCIONES
========================= */
const INTENTS = {
  GRA: ["gracias"],
  GREETING: ["hola", "buenas", "buenos dias"],
  FAREWELL: ["adios", "bye", "chao", "hasta luego"],
  MOOD: ["como estas", "estas bien"],
  WHAT_DOING: ["que haces", "que estas haciendo"],
  NAME: ["como te llamas", "tu nombre"],
  HUMAN: ["eres humano", "eres humana", "robot"],
  ASSISTANT: ["quien eres", "sasha"],
  CREATOR: ["quien te creo", "quien te hizo"],
  BOOK: ["libros"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "master", "formacion"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologias", "habilidades"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos"],
  MOTIVATION: ["contratar"],
  CONTACT: ["contacto", "whatsapp"],
};

/* =========================
NORMALIZACIÓN
========================= */
const normalize = (t = "") =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* =========================
DETECTAR INTENCIÓN
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    for (const word of INTENTS[intent]) {
      if (text.includes(normalize(word))) score++;
    }
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return max ? best : "UNKNOWN";
};

/* =========================
CONTROL DE REPETICIÓN
========================= */
const pickNonRepeated = (ctx = {}, intent, options) => {
  if (!ctx.usedReplies) ctx.usedReplies = {};
  if (!ctx.usedReplies[intent]) ctx.usedReplies[intent] = [];

  const unused = options.filter(
    (opt) => !ctx.usedReplies[intent].includes(opt)
  );

  const choice = unused.length ? randomPick(unused) : randomPick(options);

  ctx.usedReplies[intent].push(choice);
  if (ctx.usedReplies[intent].length >= options.length) {
    ctx.usedReplies[intent] = [];
  }

  return choice;
};

/* =========================
LÓGICA DEL BOT
========================= */
function getSmartResponse(message, context = {}) {
  const text = normalize(message);
  const intent = detectIntent(text);

  saveMemory(context, { user: text, intent });

  const replies = {
    GRA: (ctx) =>
      pickNonRepeated(ctx, "GRA", [
        "Un placer 😊",
        "De nada 😌",
        "Siempre es un gusto ayudar 😊",
      ]),

    GREETING: (ctx) =>
      pickNonRepeated(ctx, "GREETING", [
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
        "¡Hola! Me llamo Sasha y estoy aquí para ayudarte ☺️",
      ]),

    FAREWELL: (ctx) =>
      pickNonRepeated(ctx, "FAREWELL", [
        "¡Gracias por visitar el portafolio de Jorge 😊!",
        "¡Hasta luego! Aquí estaré cuando regreses 💕",
      ]),

    MOOD: () => "¡Estoy muy bien 😊 gracias por preguntar!",
    WHAT_DOING: () => "Aquí contigo 😊 lista para ayudarte",
    NAME: () => "Me llamo Sasha 😊",
    HUMAN: () => "No soy humana 🤖, soy una asistente virtual",
    ASSISTANT: () =>
      "Soy Sasha 🤖, la asistente virtual del portafolio de Jorge",
    CREATOR: () =>
      "Fui creada por Jorge para ayudarte a conocer su perfil profesional 😊",
    BOOK: () =>
      "A Jorge le gustan los libros de misterio 📚, especialmente los de Dan Brown",
    PROFILE: () =>
      `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
    EDUCATION: () => PROFILE.education,
    EXPERIENCE: () => PROFILE.experience.join(", "),
    SKILLS: () => PROFILE.stack.join(", "),
    STACK: () =>
      "Sí 😊 Jorge es Full Stack y disfruta trabajar tanto en frontend como backend",
    PROJECTS: () => PROFILE.projects.join(", "),
    MOTIVATION: () =>
      "Porque Jorge combina experiencia real, formación sólida y compromiso profesional 😊",
    CONTACT: () => ({
      text: "📱 Puedes contactarlo por WhatsApp.\n¿Deseas que lo abra ahora?",
      action: "CONTACT_CONFIRM",
    }),
  };

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.some((w) => text.includes(normalize(w)))) {
      context.awaiting = null;
      return {
        text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
        action: "OPEN_WHATSAPP",
        url: WHATSAPP_URL,
      };
    }
    if (NO_WORDS.some((w) => text.includes(normalize(w)))) {
      context.awaiting = null;
      return { text: "Está bien 😊 cuando quieras avísame." };
    }
  }

  if (intent === "CONTACT") {
    context.awaiting = "CONTACT_CONFIRM";
    return replies.CONTACT();
  }

  if (typeof replies[intent] === "function") {
    return { text: replies[intent](context), intent };
  }

  return {
    text:
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
    intent: "UNKNOWN",
  };
}

/* 👉 export nombrado (NO default) */
export { getSmartResponse };

/* =========================
COMPONENTE CHATBOT
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const contextRef = useRef({});

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const response = getSmartResponse(input, contextRef.current);

    const botMsg = { from: "bot", text: response.text };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");

    if (response.action === "OPEN_WHATSAPP") {
      window.open(response.url, "_blank");
    }
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen((o) => !o)}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 320,
            height: 420,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 1, bgcolor: "primary.main", color: "#fff" }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Sasha</Typography>
              <IconButton size="small" onClick={() => setOpen(false)}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <Typography
                key={i}
                align={m.from === "user" ? "right" : "left"}
              >
                {m.text}
              </Typography>
            ))}
          </Box>

          <Box sx={{ p: 1, display: "flex", gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <IconButton onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
