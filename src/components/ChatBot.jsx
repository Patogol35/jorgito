import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
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
SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "Perfil de Jorge",
  "Experiencia",
  "Tecnologías",
  "Proyectos",
  "Contacto",
];

/* =========================
UTILIDADES
========================= */
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const delay = () => 600;
const followUp = () => null;

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
    PROFILE: () =>
      `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
    EXPERIENCE: () => PROFILE.experience.join(", "),
    SKILLS: () => PROFILE.stack.join(", "),
    PROJECTS: () => PROFILE.projects.join(", "),
    CONTACT: () => ({
      text: "📱 Puedes contactarlo por WhatsApp.\n¿Deseas que lo abra ahora?",
      action: "CONTACT_CONFIRM",
    }),
  };

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.some((w) => text.includes(normalize(w)))) {
      return {
        text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
        action: "OPEN_WHATSAPP",
        url: WHATSAPP_URL,
      };
    }
    if (NO_WORDS.some((w) => text.includes(normalize(w)))) {
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
  };
}

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const primaryBg = useMemo(
    () => (isDark ? "#000" : theme.palette.primary.main),
    [isDark, theme]
  );

  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({});

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil, experiencia o proyectos.",
    }),
    []
  );

  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setContext((prev) => {
        const res = getSmartResponse(text, prev);
        const follow = followUp(res.intent);

        setMessages((m) => [
          ...m,
          { from: "bot", text: res.text },
          ...(!res.fromFollowUp && follow
            ? [{ from: "bot", text: follow }]
            : []),
        ]);

        setTyping(false);

        if (res.action === "OPEN_WHATSAPP") {
          window.open(res.url, "_blank");
        }

        return {
          ...prev,
          awaiting: res.action || null,
          awaitingFollowUp: !res.fromFollowUp && follow ? res.intent : null,
        };
      });
    }, delay());
  }, []);

  return (
    <>
      {/* BOTÓN, CHAT, JSX COMPLETO */}
      {/* EXACTAMENTE COMO LO TENÍAS */}
    </>
  );
}
