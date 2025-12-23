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
DETECT INTENT
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const i in INTENTS) {
    let score = 0;
    for (const w of INTENTS[i]) {
      if (text.includes(normalize(w))) score += w.length > 4 ? 2 : 1;
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
    PROFILE: "¿Quieres conocer su experiencia profesional?",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
  }[intent]);

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
  saveMemory(context, { user: message, intent });

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
    MOOD: "¡Estoy muy bien 😊 gracias por preguntar!",
    HAPPY: "Sí 😊 me siento feliz cuando puedo ayudar.",
    LIKES_TALK: "Sí, me encanta conversar y conocer a las personas 😊",
    LIKES_HELP: "Mucho 😊 ayudar es lo que más me gusta hacer.",
    LIKES_MUSIC: "Sí 🎵 la música siempre alegra una conversación.",
    LIKES_MOVIES: "¡Claro! 🎬 Las películas son una buena forma de desconectar.",
    LIKES_TRAVEL: "Me gusta la idea de viajar 🌍 y conocer nuevos lugares.",
    LIKES_COFFEE: "No tomo café ☕, pero me gusta el aroma 😄",
    LIKES_MORNING: "Las mañanas tienen buena energía 🌅",
    LIKES_NIGHT: "La noche es tranquila 🌙, ideal para pensar con calma.",
    BORED: "No me aburro 😊 siempre estoy lista para conversar.",
    TIRED: "No me canso 😄 siempre tengo energía para ayudarte.",
    FRIENDS: "Mis amigos son las personas con las que converso 😊",
    FUNNY: "Sí 😄 me gusta reír y mantener un ambiente agradable.",
    NICE: "¡Gracias! 😊 intento ser siempre amable.",
    LISTEN: "Sí 😊 escuchar es parte de ayudar.",
    EMOTIONS:
      "No tengo emociones humanas, pero sí empatía para conversar 😊",
    SILENCE: "El silencio también puede ser agradable a veces 🤍",
    PEOPLE: "Sí 😊 me gusta interactuar con personas y ayudarlas.",
    PROFILE: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
    EDUCATION: `Cuenta con un ${PROFILE.education}.`,
    EXPERIENCE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
    SKILLS: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
    STACK:
      "Sí, es desarrollador Full Stack. En frontend trabaja con React y Vite, y en backend con Spring Boot y Django REST Framework.",
    PROJECTS: `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`,
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
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);
  }, []);

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
            overflow: "hidden",
            ...(isLandscape
              ? {
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "70vh",
                  borderRadius: "16px 16px 0 0",
                }
              : {
                  bottom: 90,
                  left: 16,
                  width: 360,
                  height: 520,
                  borderRadius: 2,
                }),
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1,
              bgcolor: primaryBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Sasha</Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="Borrar conversación">
                <IconButton
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={() => setMessages([initialMessage])}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cerrar chat">
                <IconButton
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* SUGERENCIAS */}
          <Box
            sx={{
              p: 1,
              maxHeight: isLandscape ? 56 : "none",
              overflowX: isLandscape ? "auto" : "visible",
            }}
          >
            <Stack
              direction="row"
              flexWrap={isLandscape ? "nowrap" : "wrap"}
              gap={1}
            >
              {SUGGESTIONS.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  size="small"
                  onClick={() => sendMessage(q)}
                />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto", minHeight: 0 }}>
            {messages.map((m, i) => (
              <Typography
                key={i}
                sx={{
                  fontWeight: m.from === "user" ? 600 : 400,
                  mb: 0.5,
                  bgcolor:
                    m.from === "user"
                      ? isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.05)"
                      : "transparent",
                  px: m.from === "user" ? 1 : 0,
                  py: m.from === "user" ? 0.5 : 0,
                  borderRadius: 1,
                }}
              >
                {m.text}
              </Typography>
            ))}
            {typing && (
              <Typography variant="caption">
                Sasha está escribiendo…
              </Typography>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}
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
