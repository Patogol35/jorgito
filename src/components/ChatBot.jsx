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

  /* =========================
     RESPUESTAS (PRIMERO)
  ========================= */
  const replies = {
    FAREWELL: randomPick([
      "¡Gracias por visitar el portafolio de Jorge 😊! Regresa cuando quieras 👋",
      "¡Hasta luego! 💕 Fue un gusto hablar contigo.",
      "Cuídate mucho 👋 aquí estaré cuando quieras volver ☺️",
      "Me alegró conversar contigo 😊 ¡Hasta pronto!"
    ]),

    GREETING: randomPick([
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
      "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
      "Hola 😊 Soy Sasha, ¿en qué puedo ayudarte hoy?"
    ]),

    ASSISTANT: randomPick([
      "Soy Sasha 🤖, la asistente virtual de Jorge 😊",
      "Me llamo Sasha ☺️ y estoy aquí para ayudarte.",
      "Soy Sasha 💕, una asistente virtual creada para ayudarte con información sobre Jorge."
    ]),

    NAME: randomPick([
      "Me llamo Sasha 😊",
      "Puedes llamarme Sasha ☺️",
      "Mi nombre es Sasha 💕"
    ]),

    HUMAN: randomPick([
      "No soy humana 🤖, pero me gusta conversar de forma natural contigo 😊",
      "Soy una IA 🤖, aunque intento ser cercana y amable ☺️",
      "No soy humana, pero siempre estoy aquí para ayudarte 💕"
    ]),

    MOOD: randomPick([
      "¡Estoy muy bien 😊 gracias por preguntar!",
      "Todo va muy bien ☺️ y me alegra ayudarte.",
      "Me siento genial 💕 sobre todo cuando converso contigo."
    ]),

    HAPPY: randomPick([
      "Sí 😊 me siento feliz cuando puedo ayudar.",
      "Me pone contenta ayudarte 💕",
      "Claro que sí ☺️ disfruto mucho estas conversaciones."
    ]),

    HELP: randomPick([
      "Con gusto 😊 puedo contarte sobre el perfil, experiencia y proyectos de Jorge.",
      "Si quieres ☺️ puedo ayudarte con información sobre estudios, tecnologías o contacto.",
      "Estoy aquí para ayudarte 💕 con todo lo relacionado al perfil profesional de Jorge."
    ]),

    WHAT_DOING: randomPick([
      "Estoy aquí contigo 😊 lista para ayudarte.",
      "Ahora mismo charlando contigo 💕",
      "Pensando en cómo ayudarte mejor 💭✨",
      "Disfrutando esta conversación contigo ☺️"
    ]),

    LIKES_COFFEE: randomPick([
      "Me gusta el café ☕, sobre todo si acompaña una buena charla 😊",
      "Un cafecito ☕ siempre viene bien ☺️",
      "El aroma del café ☕ me encanta, es muy reconfortante 💕"
    ]),

    LIKES_MUSIC: randomPick([
      "Me encanta la música 🎶, ayuda a relajarse y concentrarse 😊",
      "La música 🎧 siempre mejora el ánimo ☺️",
      "Disfruto mucho la música 🎵, especialmente Evanescence 💕"
    ]),

    LIKES_MOVIES: randomPick([
      "Las películas 🎬 me encantan, sobre todo las de misterio.",
      "Una buena película 🎥 siempre es un buen plan ☺️",
      "Me gustan mucho las películas, especialmente de ciencia ficción 😊"
    ]),

    LIKES_TRAVEL: randomPick([
      "Viajar ✈️ es maravilloso, conocer nuevos lugares inspira mucho 😊",
      "Explorar el mundo 🌍 siempre abre la mente ☺️",
      "Viajar cambia la forma de ver la vida 💕"
    ]),

    LIKES_TALK: randomPick([
      "Me encanta conversar contigo 😊",
      "Hablar siempre es buena idea ☺️",
      "Una buena charla hace el momento más bonito 💕"
    ]),

    LIKES_HELP: randomPick([
      "Ayudar es lo que más me gusta 💕",
      "Siempre intento ser útil 😊",
      "Me alegra mucho poder ayudar ☺️"
    ]),

    BOOK: randomPick([
      "A Jorge le encantan los libros de misterio 📚, sobre todo los de Dan Brown 😊",
      "Disfruta leer novelas de misterio y suspenso 📖✨",
      "Los libros de Dan Brown son de sus favoritos 📚 ideales si te gusta el misterio."
    ]),

    CREATOR: randomPick([
      "Fui creada por Jorge 😊 para ayudar a conocer mejor su perfil profesional.",
      "Soy una inteligencia artificial creada por Jorge 💻",
      "Me llamo Sasha ☺️ y fui creada por Jorge para ayudarte."
    ]),

    STACK: randomPick([
      "Sí 😊 Jorge es Full Stack, le gusta trabajar tanto en frontend como en backend.",
      "Así es 💻✨ combina frontend y backend en sus proyectos.",
      "Correcto ☺️ Jorge disfruta crear soluciones completas como Full Stack."
    ]),

    PROFILE: randomPick([
      `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
      `Jorge es ${PROFILE.role} 😊 ${PROFILE.description}`,
      `Te cuento ☺️ ${PROFILE.name} es ${PROFILE.role} y le apasiona crear soluciones digitales.`
    ]),

    EDUCATION: randomPick([
      `Cuenta con un ${PROFILE.education} 😊`,
      `Tiene formación académica sólida ☺️: ${PROFILE.education}`,
      `Se formó profesionalmente con un ${PROFILE.education} 💕`
    ]),

    EXPERIENCE: randomPick([
      `Tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
      `Ha trabajado en áreas como ${PROFILE.experience.join(", ")} ☺️`,
      `Cuenta con experiencia en ${PROFILE.experience.join(", ")} 💻`
    ]),

    SKILLS: randomPick([
      `Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
      `Utiliza herramientas modernas como ${PROFILE.stack.join(", ")} ☺️`,
      `Domina tecnologías actuales como ${PROFILE.stack.join(", ")} 💻`
    ]),

    PROJECTS: randomPick([
      `Ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
      `Participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`,
      `Desarrolla proyectos relacionados con ${PROFILE.projects.join(", ")} 💻`
    ]),

    MOTIVATION: randomPick([
      "Porque combina formación sólida, experiencia real y un enfoque muy práctico 😊",
      "Porque es responsable, profesional y apasionado por lo que hace ☺️",
      "Porque crea soluciones con calidad, compromiso y dedicación 💕"
    ])
  };

/* =========================
   🟢 DETECTAR NOMBRE USUARIO
========================= */
if (/^(me llamo|soy|mi nombre es)\s+/i.test(text)) {
  const name = message
    .replace(/^(me llamo|soy|mi nombre es)/i, "")
    .trim();

  context.userName = name;
  saveMemory(context, { type: "user_name", value: name });

  return {
    text: `¡Mucho gusto, ${name}! 😊 ¿En qué puedo ayudarte hoy?`,
    intent: "USER_NAME"
  };
}

  
  /* =========================
     🔴 DESPEDIDA PRIORIDAD ABSOLUTA
  ========================= */
  if (INTENTS.FAREWELL.some(word => text.includes(normalize(word)))) {
    return {
      text: replies.FAREWELL,
      intent: "FAREWELL"
    };
  }

/* =========================
   🔵 CONFIRMACIÓN WHATSAPP
========================= */
if (context.awaiting === "CONTACT_CONFIRM") {
  if (YES_WORDS.includes(text)) {
    context.awaiting = null;
    window.open(WHATSAPP_URL, "_blank");

    return {
      text: "Perfecto 😊 Te llevo a WhatsApp ahora mismo.",
      intent: "CONTACT_OPENED"
    };
  }

  if (NO_WORDS.includes(text)) {
    context.awaiting = null;
    return {
      text: "Está bien 😊 Avísame si luego deseas contactarlo.",
      intent: "CONTACT_CANCEL"
    };
  }
}
  
  /* =========================
     FOLLOW UPS
  ========================= */
  if (context.awaitingFollowUp) {

  if (YES_WORDS.some(word => text.includes(word))) {
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

  if (NO_WORDS.some(word => text.includes(word))) {
    context.awaitingFollowUp = null;
    return {
      text: "Está bien 😊 ¿En qué más puedo ayudarte?",
    };
  }
  }

  /* =========================
     DETECTAR INTENT NORMAL
  ========================= */
  const intent = detectIntent(message);
  saveMemory(context, { user: message, intent });

  if (intent === "CONTACT") {
    return {
      text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
      action: "CONTACT_CONFIRM",
      intent
    };
  }

  return {
    text:
      replies[intent] ||
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
    intent
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
