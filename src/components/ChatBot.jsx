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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTheme } from "@mui/material/styles";

/* =========================
   UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;

/* =========================
   PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Ingeniero de Software especializado en el desarrollo de aplicaciones web modernas, seguras y escalables, aplicando buenas prácticas y arquitectura limpia.",

  education:
    "Cuenta con un máster en Ingeniería de Software y Sistemas Informáticos por la Universidad Internacional de La Rioja (España).",

  experience: [
    "Cuenta con experiencia en el desarrollo de aulas virtuales orientadas a la educación digital.",
    "Ha desarrollado aplicaciones web Full Stack utilizando arquitecturas modernas.",
    "Tiene experiencia en la creación de APIs REST seguras y escalables.",
  ],

  stack:
    "Trabaja con tecnologías como React, Vite y JavaScript en el frontend, y Django REST Framework y Spring Boot en el backend. Maneja MySQL, AWS, Git, Linux, Postman y Vercel.",

  projects:
    "Ha desarrollado aulas virtuales, tiendas online Full Stack, aplicaciones frontend en React y proyectos conectados a APIs REST.",

  motivation:
    "Porque combina una sólida formación académica, experiencia práctica y un enfoque profesional orientado a soluciones reales.",
};

/* =========================
   CONTACTO
========================= */
const CONTACT = {
  whatsapp: "https://wa.me/593997979099",
  github: "https://github.com/Patogol35",
  linkedin:
    "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
  instagram: "https://www.instagram.com/jorge_patricio_26",
  facebook: "https://www.facebook.com/share/1C9RgHAPvL/",
  email: "mailto:patogol3535@gmail.com",
};

/* =========================
   SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué estudios tiene?",
  "¿Qué experiencia tiene?",
  "¿En qué tecnologías trabaja?",
  "Cuéntame sobre sus proyectos",
  "¿Por qué contratarlo?",
  "¿Cómo puedo contactarlo?",
];

/* =========================
   INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenas", "hey"],
  PROFILE: ["quién es", "jorge", "perfil"],
  EDUCATION: ["estudios", "máster", "formación"],
  EXPERIENCE: ["experiencia", "trabajado"],
  SKILLS: ["tecnologías", "stack", "habilidades"],
  PROJECTS: ["proyectos", "portfolio"],
  MOTIVATION: ["por qué contratar", "por qué elegir"],
  CONTACT: ["contactar", "contacto", "whatsapp", "correo", "redes"],
  YES: ["sí", "si", "claro", "ok", "dale"],
  NO: ["no", "gracias"],
};

/* =========================
   DETECTAR INTENCIÓN
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();

  for (const intent in INTENTS) {
    if (INTENTS[intent].some((w) => text.includes(w))) {
      return intent;
    }
  }
  return "UNKNOWN";
}

/* =========================
   RESPUESTAS
========================= */
function getSmartResponse(message, context) {
  const intent = detectIntent(message);

  // Responder SI / NO
  if (intent === "YES" && context.lastQuestion) {
    return {
      text: context.lastQuestion,
      intent: context.lastFollowIntent,
    };
  }

  if (intent === "NO") {
    return {
      text: "Perfecto 😊 Si necesitas algo más, aquí estaré.",
      intent: null,
    };
  }

  switch (intent) {
    case "GREETING":
      return {
        text: "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
        intent,
      };

    case "PROFILE":
      return {
        text: `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
        intent,
        followUp: "¿Quieres conocer su experiencia profesional?",
        followIntent: "EXPERIENCE",
      };

    case "EDUCATION":
      return {
        text: PROFILE.education,
        intent,
        followUp: "¿Te gustaría conocer su experiencia profesional?",
        followIntent: "EXPERIENCE",
      };

    case "EXPERIENCE":
      return {
        text: PROFILE.experience.join(" "),
        intent,
        followUp: "¿Quieres saber en qué tecnologías trabaja?",
        followIntent: "SKILLS",
      };

    case "SKILLS":
      return {
        text: PROFILE.stack,
        intent,
        followUp: "¿Deseas conocer sus proyectos?",
        followIntent: "PROJECTS",
      };

    case "PROJECTS":
      return {
        text: PROFILE.projects,
        intent,
        followUp: "¿Te gustaría saber por qué contratarlo?",
        followIntent: "MOTIVATION",
      };

    case "MOTIVATION":
      return {
        text: PROFILE.motivation,
        intent,
        followUp: "¿Quieres saber cómo contactarlo?",
        followIntent: "CONTACT",
      };

    case "CONTACT":
      return {
        text:
          "Puedes contactarlo por WhatsApp, correo o redes sociales. Abriendo enlaces ahora 👇",
        intent,
        links: true,
      };

    default:
      return {
        text:
          "Puedo ayudarte a conocer el perfil profesional de Jorge. Usa las preguntas sugeridas 😊",
        intent: null,
      };
  }
}

/* =========================
   COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const bottomRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({
    lastQuestion: null,
    lastFollowIntent: null,
  });

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha, la asistente virtual de Jorge. Puedes preguntarme sobre su perfil, estudios, experiencia, tecnologías o contacto.",
  };

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("sasha-chat");
    return saved ? JSON.parse(saved) : [initialMessage];
  });

  useEffect(() => {
    localStorage.setItem("sasha-chat", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    localStorage.removeItem("sasha-chat");
    setMessages([initialMessage]);
    setContext({ lastQuestion: null, lastFollowIntent: null });
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const res = getSmartResponse(text, context);

      setContext({
        lastQuestion: res.followUp || null,
        lastFollowIntent: res.followIntent || null,
      });

      const newMessages = [{ from: "bot", text: res.text }];

      if (res.followUp) {
        newMessages.push({ from: "bot", text: res.followUp });
      }

      if (res.links) {
        window.open(CONTACT.whatsapp, "_blank");
        window.open(CONTACT.linkedin, "_blank");
        window.open(CONTACT.github, "_blank");
      }

      setMessages((prev) => [...prev, ...newMessages]);
      setTyping(false);
    }, delay());
  };

  return (
    <>
      <Fab
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: isDark ? "#000" : "#1976d2",
          color: "#fff",
        }}
      >
        <SmartToyIcon />
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
              bgcolor: isDark ? "#000" : "#1976d2",
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

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={1.2} flexWrap="wrap">
              {SUGGESTIONS.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  clickable
                  onClick={() => sendMessage(q)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    bgcolor:
                      msg.from === "user"
                        ? isDark
                          ? "#000"
                          : "#1976d2"
                        : "#f1f1f1",
                    color: msg.from === "user" ? "#fff" : "#000",
                    maxWidth: "85%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {typing && (
              <Typography variant="caption">Sasha está escribiendo…</Typography>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", p: 1 }}>
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
              sx={{ color: isDark ? "#fff" : "#1976d2" }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
           }
