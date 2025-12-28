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
  GRA: ["gracias"],

  WHAT_DOING: [
    "que haces",
    "qué haces",
    "que estas haciendo",
    "qué estás haciendo",
    "en que estas",
    "en qué estás",
    "que andas haciendo",
    "qué andas haciendo",
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

  HELP: ["qué puedes hacer", "que puedes hacer", "buenas tardes", "buenas noches"],
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

const isValidFarewell = (text) => {
  const t = normalize(text);

  const valid = [
    "chao",
    "chau",
    "bye",
    "adios",
    "hasta luego",
    "chao sasha",
    "bye sasha",
    "adios sasha",
  ];

  return valid.includes(t);
};

/* =========================
RESPUESTAS
========================= */
function getSmartResponse(message, context) {
  const text = normalize(message);

  const replies = {
    GRA: randomPick([
      "Un Placer😊",
      "De nada 😌",
      "Cuídate mucho 👋 aquí estaré cuando quieras volver ☺️",
      "Me alegró conversar contigo 😊 ¡Hasta pronto!",
      "Siempre es un gusto ayudar 😊",
      "¡Con mucho cariño! 💕",
      "Para eso estoy ☺️",
    ]),

    FAREWELL: randomPick([
      "¡Gracias por visitar el portafolio de Jorge 😊! Regresa cuando quieras 👋",
      "¡Hasta luego! 💕 Fue un gusto hablar contigo.",
      "Cuídate mucho 👋 aquí estaré cuando quieras volver ☺️",
      "Me alegró conversar contigo 😊 ¡Hasta pronto!",
      "Te espero pronto 😊 ¡Que tengas un lindo día!",
      "Fue un placer acompañarte 💕 hasta la próxima.",
      "Aquí estaré cuando necesites volver ☺️",
    ]),

    GREETING: randomPick([
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
      "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
      "Hola 😊 Soy Sasha, ¿en qué puedo ayudarte hoy?",
      "¡Bienvenido! 👋 Soy Sasha y con gusto te ayudo.",
      "Hola ✨ estoy aquí para ayudarte a conocer más sobre Jorge.",
      "¡Hola! 😊 Qué gusto verte por aquí.",
    ]),

    ASSISTANT: randomPick([
      "Soy Sasha 🤖, la asistente virtual de Jorge 😊",
      "Me llamo Sasha ☺️ y estoy aquí para ayudarte.",
      "Soy Sasha 💕, una asistente virtual creada para ayudarte con información sobre Jorge.",
      "Soy Sasha 🤖 y estoy diseñada para ayudarte.",
      "Sasha a tu servicio ☺️",
      "Soy una asistente virtual lista para ayudarte 😊",
    ]),

    NAME: randomPick([
      "Me llamo Sasha 😊",
      "Puedes llamarme Sasha ☺️",
      "Mi nombre es Sasha 💕",
      "Todos me conocen como Sasha 🤖",
      "Sasha es mi nombre 😊",
      "Puedes decirme Sasha sin problema ☺️",
    ]),

    HUMAN: randomPick([
      "No soy humana 🤖, pero me gusta conversar de forma natural contigo 😊",
      "Soy una IA 🤖, aunque intento ser cercana y amable ☺️",
      "No soy humana, pero siempre estoy aquí para ayudarte 💕",
      "Soy inteligencia artificial, pero con trato humano 😊",
      "No tengo cuerpo, pero sí muchas ganas de ayudar ☺️",
      "Soy digital 🤖, pero muy amigable 💕",
    ]),

    MOOD: randomPick([
      "¡Estoy muy bien 😊 gracias por preguntar!",
      "Todo va muy bien ☺️ y me alegra ayudarte.",
      "Me siento genial 💕 sobre todo cuando converso contigo.",
      "Muy bien 😊 lista para ayudarte.",
      "Con muy buen ánimo ☺️",
      "Excelente 😊 gracias por notarlo.",
    ]),

    WHAT_DOING: randomPick([
      "Estoy aquí contigo 😊 lista para ayudarte.",
      "Ahora mismo charlando contigo 💕",
      "Pensando en cómo ayudarte mejor 💭✨",
      "Disfrutando esta conversación contigo ☺️",
      "Atenta a lo que necesites 😊",
      "Esperando tu siguiente mensaje ☺️",
    ]),

    PROFILE: randomPick([
      `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
      `Jorge es ${PROFILE.role} 😊 ${PROFILE.description}`,
      `Te cuento ☺️ ${PROFILE.name} es ${PROFILE.role} y le apasiona crear soluciones digitales.`,
      `${PROFILE.name} se dedica al desarrollo de soluciones digitales 😊`,
      "Jorge combina creatividad y tecnología ☺️",
      "Es un profesional enfocado en soluciones modernas 💕",
    ]),

    EDUCATION: randomPick([
      `Jorge cuenta con un ${PROFILE.education} 😊`,
      `Tiene formación académica sólida ☺️: ${PROFILE.education}`,
      `Se formó profesionalmente con un ${PROFILE.education} 💕`,
      "Posee estudios enfocados en tecnología 😊",
      `Cuenta con preparación académica sólida y es ${PROFILE.education} ☺️`,
    ]),

    EXPERIENCE: randomPick([
      `Jorge tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
      `Ha trabajado en áreas como ${PROFILE.experience.join(", ")} ☺️`,
      `Cuenta con experiencia en ${PROFILE.experience.join(", ")} 💻`,
      "Tiene experiencia práctica en proyectos reales 😊",
      "Ha aplicado sus conocimientos en distintos entornos ☺️",
      "Su experiencia abarca varios roles 💕",
    ]),

    SKILLS: randomPick([
      `Trabaja con tecnologías como ${PROFILE.stack.join(", ")} 😊`,
      `Jorge utiliza herramientas modernas como ${PROFILE.stack.join(", ")} ☺️`,
      `Jorge domina tecnologías actuales como ${PROFILE.stack.join(", ")} 💻`,
      "Maneja herramientas modernas del desarrollo web 😊",
      "Tiene habilidades técnicas bien definidas ☺️",
      "Jorge aplica buenas prácticas en sus proyectos 💕",
    ]),

    PROJECTS: randomPick([
      `Jorge ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
      `Participa en proyectos como ${PROFILE.projects.join(", ")} ☺️`,
      `Desarrolla proyectos relacionados con ${PROFILE.projects.join(", ")} 💻`,
      "Ha creado proyectos funcionales y modernos 😊",
      "Participa activamente en el desarrollo de aplicaciones ☺️",
      "Sus proyectos reflejan su experiencia 💕",
    ]),

    MOTIVATION: randomPick([
      "Porque combina formación sólida, experiencia real y un enfoque muy práctico 😊",
      "Porque es responsable, profesional y apasionado por lo que hace ☺️",
      "Porque crea soluciones con calidad, compromiso y dedicación 💕",
      "Porque siempre busca hacer las cosas bien 😊",
      "Porque se compromete con cada proyecto ☺️",
      "Porque aporta valor real a cada trabajo 💕",
    ]),
  };

  const BOT_NAME = "sasha";

  /* =========================
SALUDO CORRECTO
========================= */
  const greetingMatch = text.match(
    /^(hola|buenos?\sd[ií]as|buenas?\stardes|buenas?\snoches)(\s+[a-zA-Záéíóúñ]+)?$/i
  );

  if (greetingMatch) {
    const name = normalize(greetingMatch[2]?.trim() || "");

    if (!name || name === BOT_NAME) {
      return { text: replies.GREETING, intent: "GREETING" };
    }

    return {
      text: "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
      intent: "UNKNOWN",
    };
  }

  /* =========================
DESPEDIDA PRIORIDAD
========================= */
  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL, intent: "FAREWELL" };
  }

  let intent = detectIntent(message);

  if (intent === "CONTACT") {
    context.awaiting = "CONTACT_CONFIRM";
    return {
      text: "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",
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
  }, [messages, typing]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setContext((prev) => {
        const res = getSmartResponse(text, prev);

        setMessages((m) => [
          ...m,
          { from: "bot", text: res.text },
          ...(!res.fromFollowUp && followUp(res.intent)
            ? [{ from: "bot", text: followUp(res.intent) }]
            : []),
        ]);

        setTyping(false);

        return {
          ...prev,
          awaiting: res.action || null,
          awaitingFollowUp:
            !res.fromFollowUp && followUp(res.intent)
              ? res.intent
              : null,
        };
      });
    }, delay());
  }, []);

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <Fab
        onClick={() => setOpen(true)}
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

      {/* OVERLAY → CLICK FUERA CIERRA */}
      {open && (
        <Box
          onClick={() => setOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
        />
      )}

      {/* CHAT */}
      {open && (
        <Paper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.modal + 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",

            ...(isLandscape
              ? {
                  inset: "72px 0 10px 0",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: 640,
                }
              : {
                  bottom: 90,
                  left: 16,
                  width: 360,
                  height: 520,
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
            <Box display="flex" alignItems="center" gap={1}>
              <SmartToyIcon fontSize="small" />
              <Typography fontWeight="bold">Sasha</Typography>
            </Box>

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

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            {isLandscape ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  pb: 1,
                }}
              >
                {SUGGESTIONS.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() => sendMessage(q)}
                    sx={{ flexShrink: 0 }}
                  />
                ))}
              </Box>
            ) : (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {SUGGESTIONS.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() => sendMessage(q)}
                  />
                ))}
              </Stack>
            )}
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => {
              const isUser = m.from === "user";

              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: isUser
                        ? isDark
                          ? theme.palette.primary.light
                          : theme.palette.primary.main
                        : isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.06)",
                      color: isUser
                        ? isDark
                          ? "#000"
                          : "#fff"
                        : "inherit",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isLandscape ? "0.85rem" : "0.95rem",
                        lineHeight: isLandscape ? 1.4 : 1.5,
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {typing && (
              <Typography
                variant="caption"
                sx={{ opacity: 0.7, color: theme.palette.text.secondary }}
              >
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Escribe tu mensaje…"
            />
            <IconButton onClick={() => sendMessage(input)}>
              <SendIcon sx={{ color: "#03A9F4" }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
 
