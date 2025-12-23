import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

  WHAT_DOING: [
  "que haces",
  "qué haces",
  "que estas haciendo",
  "qué estás haciendo",
  "en que estas",
  "en qué estás",
  "que andas haciendo",
  "qué andas haciendo"
],
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
const normalize = (t = "") =>
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

  for (const intent in INTENTS) {
    let score = 0;
    for (const word of INTENTS[intent]) {
      if (text.includes(normalize(word))) {
        score += word.length > 4 ? 2 : 1;
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
FOLLOW UP
========================= */
const followUp = (intent) =>
  ({
    PROFILE: "¿Quieres conocer su experiencia profesional?",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
    PROJECTS: null,
  }[intent] || null);

/* =========================
RESPUESTAS
========================= */
function getSmartResponse(message, context) {
  const text = normalize(message);

  if (context.awaitingFollowUp) {
    if (YES_WORDS.includes(text)) {
      const intent = context.awaitingFollowUp;
      context.awaitingFollowUp = null;

      const chainReplies = {
        PROFILE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
        EXPERIENCE: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
        SKILLS: `Estas tecnologías aplican en ${PROFILE.projects.join(", ")}.`,
      };

      return {
        text: chainReplies[intent],
        intent: intent === "SKILLS" ? "PROJECTS" : intent,
        fromFollowUp: true,
      };
    }

    if (NO_WORDS.includes(text)) {
      context.awaitingFollowUp = null;
      return { text: "Está bien 😊 ¿En qué más puedo ayudarte?" };
    }
  }

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
    LIKES_COFFEE: randomPick([
  "Me gusta el café ☕, sobre todo cuando acompaña una buena charla 😊",
  "Un buen café ☕ siempre viene bien para empezar el día.",
  "El café ☕ ayuda a mantenerse despierto y concentrado."
]),

LIKES_MUSIC: randomPick([
  "Me encanta la música 🎶, ayuda mucho a concentrarse y relajarse.",
  "Siempre hay una canción perfecta para cada momento 🎧",
  "La música 🎵 cambia completamente el ánimo."
]),

LIKES_MOVIES: randomPick([
  "Las películas 🎬 son geniales, especialmente las de misterio y ciencia ficción.",
  "Me gustan las películas que hacen pensar 🎥",
  "Una buena película siempre es un buen plan."
]),

LIKES_TRAVEL: randomPick([
  "Viajar ✈️ es increíble, conocer nuevos lugares siempre inspira.",
  "Explorar nuevos lugares 🌍 abre mucho la mente.",
  "Viajar cambia la forma de ver el mundo."
]),

LIKES_TALK: randomPick([
  "Me gusta conversar 😊 y ayudarte en lo que necesites.",
  "Hablar siempre es buena idea 😄",
  "Una buena conversación hace el momento más agradable."
]),

LIKES_HELP: randomPick([
  "Ayudar es lo que más me gusta 💙",
  "Siempre intento ser útil 😊",
  "Ayudar a otros siempre se siente bien."
]),

LIKES_MORNING: randomPick([
  "Las mañanas ☀️ tienen su encanto, sobre todo con café.",
  "Las mañanas son ideales para empezar con energía.",
  "Me gusta la tranquilidad de la mañana."
]),

LIKES_NIGHT: randomPick([
  "La noche 🌙 es tranquila, perfecta para pensar y relajarse.",
  "Me gusta el silencio de la noche.",
  "La noche tiene una vibra especial."
]),

BORED: randomPick([
  "Si estás aburrido 😅 podemos conversar un rato.",
  "El aburrimiento pasa rápido con una buena charla.",
  "Siempre hay algo interesante de qué hablar."
]),

TIRED: randomPick([
  "Tal vez necesitas un pequeño descanso 😌",
  "A veces parar un momento ayuda mucho.",
  "Descansar también es importante."
]),

FRIENDS: randomPick([
  "Los amigos 🤝 son muy importantes.",
  "Compartir con amigos siempre suma.",
  "La amistad hace la vida más bonita."
]),

FUNNY: randomPick([
  "Reír 😄 siempre es buena idea.",
  "El humor mejora cualquier día.",
  "Una sonrisa cambia todo."
]),

NICE: randomPick([
  "Gracias 😊 intento ser siempre simpática.",
  "Me alegra que lo pienses 💙",
  "Intento mantener una conversación agradable."
]),

LISTEN: randomPick([
  "Siempre estoy aquí para escucharte 👂",
  "Cuéntame, te escucho 😊",
  "Escuchar también es importante."
]),

EMOTIONS: randomPick([
  "Las emociones 💭 forman parte de lo que somos.",
  "Entender las emociones ayuda a comprender mejor a otros.",
  "Las emociones influyen en cómo vivimos el día a día."
]),

SILENCE: randomPick([
  "A veces el silencio 🤍 también comunica.",
  "El silencio ayuda a pensar mejor.",
  "Un poco de silencio puede ser reconfortante."
]),

PEOPLE: randomPick([
  "Las personas 🌍 hacen el mundo interesante.",
  "Cada persona tiene una historia.",
  "Las personas dan sentido a todo."
]),

    WHAT_DOING: randomPick([
  "Estoy aquí charlando contigo 😊",
  "Ahora mismo conversando y lista para ayudarte 🤖",
  "Pensando en cómo ayudarte mejor 💭",
  "Disfrutando esta conversación contigo ✨",
  "Aquí, acompañándote y respondiendo tus preguntas 😄"
]),
    GREETING: "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
    ASSISTANT: "Soy Sasha 🤖, la asistente virtual de Jorge.",
    CREATOR: "Fui creada por Jorge 😊 para responder preguntas sobre su perfil.",
    BOOK: "Jorge tiene muchos libros favoritos pero en especial disfruta los libros de Dan Brown.",
    NAME: "Me llamo Sasha 😊",
    HUMAN: "No soy humana 🤖, pero converso de forma natural.",
    HELP:
      "Puedo contarte sobre el perfil, experiencia, estudios, proyectos y contacto de Jorge.",
    FAREWELL: randomPick([
  "¡Gracias por visitar el portafolio! 👋",
  "¡Hasta luego! 😊",
  "Cuídate 👋 aquí estaré cuando quieras volver",
  "Fue un gusto hablar contigo 😊 ¡Hasta pronto!"
]),
    MOOD: "¡Estoy muy bien 😊!",
    HAPPY: "Sí 😊 me siento feliz cuando ayudo.",
    PROFILE: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
    EDUCATION: `Cuenta con un ${PROFILE.education}.`,
    EXPERIENCE: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
    SKILLS: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
    STACK:
      "Sí, es Full Stack: React/Vite en frontend y Spring Boot/Django en backend.",
    PROJECTS: `Ha trabajado en ${PROFILE.projects.join(", ")}.`,
    MOTIVATION:
      "Porque combina formación sólida, experiencia real y enfoque práctico.",
  };

  if (intent === "CONTACT") {
    return {
      text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
      action: "CONTACT_CONFIRM",
      intent,
    };
  }

  return {
    text:
      replies[intent] ||
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
    intent,
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
  }, [messages]);

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim()) return;

      setMessages((m) => [...m, { from: "user", text }]);
      setInput("");
      setTyping(true);

      setTimeout(() => {
        const res = getSmartResponse(text, context);

        setContext((prev) => ({
          ...prev,
          awaiting: res.action || null,
          awaitingFollowUp:
            !res.fromFollowUp && followUp(res.intent)
              ? res.intent
              : null,
        }));

        setMessages((m) => [
          ...m,
          { from: "bot", text: res.text },
          ...(!res.fromFollowUp && followUp(res.intent)
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
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...(isLandscape
              ? { left: 0, right: 0, bottom: 0, height: "70vh" }
              : { bottom: 90, left: 16, width: 360, height: 520 }),
          }}
        >
          <Box
            sx={{
              p: 1,
              bgcolor: primaryBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Sasha</Typography>
            <Box>
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() => setMessages([initialMessage])}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon fontSize="small" />
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
            {typing && (
              <Typography variant="caption">
                Sasha está escribiendo…
              </Typography>
            )}
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
