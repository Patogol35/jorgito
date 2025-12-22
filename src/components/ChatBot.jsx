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
   LINKS
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

const SOCIAL_LINKS = {
  github: "https://github.com/Patogol35",
  linkedin:
    "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
  facebook: "https://www.facebook.com/share/1C9RgHAPvL/",
  instagram: "https://www.instagram.com/jorge_patricio_26",
  email: "mailto:patogol3535@gmail.com",
};

/* =========================
   UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const YES_WORDS = ["sí", "si", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
   PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables, aplicando buenas prácticas y arquitectura limpia.",
  education: "Máster en Ingeniería de Software y Sistemas Informáticos",
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
  softSkills: [
    "Pensamiento analítico",
    "Resolución de problemas",
    "Aprendizaje continuo",
    "Trabajo en equipo",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online Full Stack",
    "Aplicacines Frontend",
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
];

/* =========================
   INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey", "qué tal"],
  PROFILE: ["jorge", "quién es", "perfil"],
  EDUCATION: ["estudios", "formación", "máster"],
  EXPERIENCE: ["experiencia", "trabajo"],
  SKILLS: ["tecnologías", "stack"],
  SOFT_SKILLS: ["habilidades blandas"],
  STACK: ["full stack", "frontend", "backend"],
  PROJECTS: ["proyectos", "portfolio"],
  MOTIVATION: ["por qué contratar", "ventajas"],
  CONTACT: ["contactar", "whatsapp", "correo", "email", "redes"],
  SOCIAL: ["github", "linkedin", "facebook", "instagram", "correo", "email"],
};

/* =========================
   DETECTAR INTENCIÓN
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();
  let best = "UNKNOWN";
  let scoreMax = 0;

  for (const intent in INTENTS) {
    const score = INTENTS[intent].filter((w) =>
      text.includes(w)
    ).length;
    if (score > scoreMax) {
      scoreMax = score;
      best = intent;
    }
  }
  return scoreMax ? best : "UNKNOWN";
}

/* =========================
   RESPUESTA
========================= */
function getSmartResponse(message, context) {
  const text = message.toLowerCase().trim();

  /* FOLLOW-UP */
  if (context.awaitingFollowUp) {
    if (YES_WORDS.includes(text)) {
      switch (context.awaitingFollowUp) {
        case "PROFILE":
          return { text: PROFILE.experience.join(", "), intent: "EXPERIENCE" };
        case "EXPERIENCE":
          return { text: PROFILE.stack.join(", "), intent: "SKILLS" };
        case "SKILLS":
          return { text: PROFILE.projects.join(", "), intent: "PROJECTS" };
        case "PROJECTS":
          return {
            text:
              "Porque combina formación sólida, experiencia real y enfoque en soluciones prácticas.",
            intent: "MOTIVATION",
          };
      }
    }
    if (NO_WORDS.includes(text)) {
      return { text: "Perfecto 😊 ¿En qué más puedo ayudarte?" };
    }
  }

  /* WHATSAPP */
  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Abriendo WhatsApp 😊" };
    }
    if (NO_WORDS.includes(text)) {
      return { text: "Está bien 😊" };
    }
  }

  /* REDES */
  if (context.awaiting === "SOCIAL_CHOICE") {
    for (const key in SOCIAL_LINKS) {
      if (text.includes(key)) {
        window.open(SOCIAL_LINKS[key], "_blank");
        return { text: `Abriendo ${key} 🚀` };
      }
    }
    return {
      text:
        "¿Qué red deseas abrir?\nGitHub, LinkedIn, Facebook, Instagram o Correo",
    };
  }

  const intent = detectIntent(message);

  switch (intent) {
    case "CONTACT":
      return {
        text:
          "Puedes contactar a Jorge por:\n\n" +
          "📱 WhatsApp\n💻 Redes sociales\n✉️ Correo\n\n" +
          "¿Qué deseas abrir?",
        intent,
        action: "SOCIAL_CHOICE",
      };
    case "SOCIAL":
      return {
        text:
          "¿Qué red social deseas abrir?\nGitHub, LinkedIn, Facebook, Instagram o Correo",
        intent,
        action: "SOCIAL_CHOICE",
      };
    case "PROFILE":
      return {
        text: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
        intent,
      };
    case "EDUCATION":
      return { text: PROFILE.education, intent };
    case "EXPERIENCE":
      return { text: PROFILE.experience.join(", "), intent };
    case "SKILLS":
      return { text: PROFILE.stack.join(", "), intent };
    case "PROJECTS":
      return { text: PROFILE.projects.join(", "), intent };
    case "MOTIVATION":
      return {
        text:
          "Porque combina formación sólida, experiencia real y enfoque práctico.",
        intent,
      };
    default:
      return {
        text:
          "Puedo ayudarte a conocer el perfil profesional de Jorge 😊",
      };
  }
}

/* =========================
   FOLLOW UP
========================= */
function followUp(intent) {
  return {
    PROFILE: "¿Quieres conocer su experiencia profesional?",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
    PROJECTS: "¿Deseas saber por qué contratarlo?",
  }[intent];
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
  const [context, setContext] = useState({
    awaiting: null,
    awaitingFollowUp: null,
  });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
      "Puedes preguntarme sobre su perfil, experiencia, tecnologías o contacto.",
  };

  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    if (window.confirm("¿Borrar conversación?")) {
      setMessages([initialMessage]);
      setContext({});
    }
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((p) => [...p, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const res = getSmartResponse(text, context);
      setContext({
        awaiting: res.action ?? null,
        awaitingFollowUp: followUp(res.intent) ? res.intent : null,
      });
      setMessages((p) => [
        ...p,
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
      <Fab
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16, bgcolor: primaryBg }}
      >
        <SmartToyIcon sx={{ color: "#fff" }} />
      </Fab>

      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 90,
            left: 16,
            width: 360,
            height: 520,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: primaryBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight="bold">Sasha 🤖</Typography>
            <Box>
              <Tooltip title="Borrar conversación">
                <IconButton size="small" onClick={clearChat}>
                  <DeleteIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={() => setOpen(false)}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Box>

          {/* CHIPS */}
          <Box sx={{ p: 1 }}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {SUGGESTIONS.map((q) => (
                <Chip key={q} label={q} clickable onClick={() => sendMessage(q)} />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <Box key={i} sx={{ textAlign: m.from === "user" ? "right" : "left" }}>
                <Typography
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 1,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor:
                      m.from === "user"
                        ? primaryBg
                        : isDark
                        ? "#2c2c2c"
                        : "#f1f1f1",
                    color:
                      m.from === "user"
                        ? "#fff"
                        : isDark
                        ? "#eaeaea"
                        : "#000",
                  }}
                >
                  {m.text}
                </Typography>
              </Box>
            ))}
            {typing && (
              <Typography variant="caption">Sasha está escribiendo…</Typography>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Escribe tu pregunta…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <IconButton
              onClick={() => sendMessage(input)}
              sx={{
                bgcolor: isDark ? "#333" : "#1976d2",
                color: "#fff",
                "&:hover": {
                  bgcolor: isDark ? "#444" : "#115293",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
