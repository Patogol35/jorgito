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
const YES_WORDS = ["sí", "si", "claro", "ok", "dale"];
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

const alreadyTalked = (ctx, intent) =>
  ctx.memory?.some((m) => m.intent === intent);

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
  LIKES_COFFEE: ["café", "cafe"],
  LIKES_MUSIC: ["música", "musica"],
  LIKES_MOVIES: ["películas", "peliculas"],
  LIKES_TRAVEL: ["viajar"],
  LIKES_TALK: ["conversar", "hablar"],
  LIKES_HELP: ["ayudar"],
  LIKES_MORNING: ["mañanas", "madrugar"],
  LIKES_NIGHT: ["noche"],
  BORED: ["aburr"],
  TIRED: ["cans"],
  FRIENDS: ["amigos"],
  FUNNY: ["reír", "reir"],
  NICE: ["simpática", "simpatica"],
  LISTEN: ["escuchar"],
  EMOTIONS: ["emociones", "sentir"],
  SILENCE: ["silencio"],
  PEOPLE: ["gente", "personas"],

  MOOD: ["cómo estás", "como estas", "estás bien"],
  HAPPY: ["feliz"],

  NAME: ["cómo te llamas", "como te llamas", "tu nombre"],
  HUMAN: ["eres humana", "eres humano", "robot"],
  ASSISTANT: ["quién eres", "quien eres", "sasha"],
  CREATOR: ["quién te creó", "quien te creo", "quien te hizo"],
  BOOK: ["sus libros favoritos", "libros favoritos", "libros"],

  HELP: ["qué puedes hacer", "que puedes hacer"],
  FAREWELL: ["adiós", "hasta luego", "bye", "chao"],

  GREETING: ["hola", "buenas", "buenos días"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "máster", "formación", "estudio"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "lenguajes", "habilidades"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos", "proyecto"],
  MOTIVATION: ["contratar"],
  CONTACT: ["contactar", "whatsapp", "contacto"],
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
DETECT INTENT (INTELIGENTE)
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);

  const priority = ["CONTACT", "FAREWELL", "HELP"];
  for (const p of priority) {
    if (INTENTS[p]?.some((w) => text.includes(normalize(w)))) {
      return p;
    }
  }

  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    for (const w of INTENTS[intent]) {
      if (text.includes(normalize(w))) {
        score += w.length > 4 ? 2 : 1;
      }
    }
    if (score > max) {
      max = score;
      best = intent;
    }
  }

  return max ? best : "UNKNOWN";
};

/* =========================
FOLLOW UP INTELIGENTE
========================= */
const followUp = (intent, ctx) => {
  if (intent === "PROFILE" && !alreadyTalked(ctx, "EXPERIENCE"))
    return "¿Quieres conocer su experiencia profesional?";
  if (intent === "EXPERIENCE" && !alreadyTalked(ctx, "SKILLS"))
    return "¿Te muestro las tecnologías que utiliza?";
  if (intent === "SKILLS" && !alreadyTalked(ctx, "PROJECTS"))
    return "¿Quieres saber en qué proyectos aplica estas tecnologías?";
  return null;
};

/* =========================
RESPUESTAS
========================= */
function getSmartResponse(message, context) {
  const text = normalize(message);

  if (/^(me llamo|soy|mi nombre es)/i.test(text)) {
    const name = message.replace(/me llamo|soy|mi nombre es/i, "").trim();
    context.userName = name;
    saveMemory(context, { type: "user_name", value: name });
    return { text: `Encantada, ${name} 😊 ¿En qué puedo ayudarte?` };
  }

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      window.open(WHATSAPP_URL, "_blank");
      return {
        text: `Perfecto${context.userName ? " " + context.userName : ""} 😊 Te llevo a WhatsApp ahora.`,
      };
    }
    if (NO_WORDS.includes(text)) {
      return { text: "Está bien 😊 ¿En qué más puedo ayudarte?" };
    }
  }

  const intent = detectIntent(message);
  context.lastIntent = intent;
  saveMemory(context, { user: message, intent, time: Date.now() });

  const replies = {
    GREETING: "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
    ASSISTANT:
      "Soy Sasha 🤖, la asistente virtual de Jorge. Estoy aquí para ayudarte.",
    CREATOR:
      "Fui creada por Jorge 😊 para responder preguntas sobre su perfil profesional.",
    BOOK:
      "Jorge tiene muchos libros favoritos, pero en especial disfruta los de Dan Brown.",
    NAME: "Me llamo Sasha 😊 Soy la asistente virtual de Jorge.",
    HUMAN:
      "No soy humana 🤖, pero estoy diseñada para conversar de forma natural y ayudarte.",
    HELP:
      "Puedo contarte sobre el perfil profesional de Jorge, su experiencia, estudios, proyectos y cómo contactarlo.",
    FAREWELL:
      "¡Gracias por visitar el portafolio! 👋 Si necesitas algo más, aquí estaré 😊",

    EXPERIENCE: alreadyTalked(context, "EXPERIENCE")
      ? "Además de lo que te conté antes, Jorge ha trabajado en proyectos reales con sistemas en producción."
      : `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,

    SKILLS: alreadyTalked(context, "SKILLS")
      ? "También aplica estas tecnologías usando buenas prácticas y arquitectura limpia."
      : `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,

    PROJECTS: alreadyTalked(context, "PROJECTS")
      ? "Muchos de estos proyectos están enfocados en soluciones prácticas y escalables."
      : `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`,

    PROFILE: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
    EDUCATION: `Cuenta con un ${PROFILE.education}.`,
    STACK:
      "Sí, es desarrollador Full Stack. En frontend trabaja con React y Vite, y en backend con Spring Boot y Django REST Framework.",
    MOTIVATION:
      "Porque combina formación sólida, experiencia real y enfoque en soluciones prácticas.",
  };

  if (intent === "CONTACT") {
    return {
      text:
        "Puedes contactar a Jorge fácilmente 😊\n\n📱 WhatsApp: desde el portafolio.\n\n¿Quieres que abra WhatsApp ahora?",
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  return {
    text:
      replies[intent] ||
      (context.lastIntent !== "UNKNOWN"
        ? `¿Quieres saber más sobre ${context.lastIntent
            .toLowerCase()
            .replace("_", " ")}? 😊`
        : "No estoy segura de haber entendido 🤔, pero puedo ayudarte a conocer el perfil profesional de Jorge 😊"),
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
      "Puedes preguntarme sobre su perfil, experiencia, tecnologías o proyectos.",
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
        });

        const follow = followUp(res.intent, context);

        setMessages((m) => [
          ...m,
          { from: "bot", text: res.text },
          ...(follow ? [{ from: "bot", text: follow }] : []),
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
            overflow: "hidden",
            ...(isLandscape
              ? { left: 0, right: 0, bottom: 0, height: "70vh", borderRadius: "16px 16px 0 0" }
              : { bottom: 90, left: 16, width: 360, height: 520, borderRadius: 2 }),
          }}
        >
          <Box sx={{ p: 1, bgcolor: primaryBg, color: "#fff", display: "flex", justifyContent: "space-between" }}>
            <Typography>Sasha</Typography>
            <Box>
              <IconButton sx={{ color: "#fff" }} onClick={() => setMessages([initialMessage])}>
                <DeleteIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }} onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
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
              <SendIcon sx={{ color: "#03A9F4" }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
      }
