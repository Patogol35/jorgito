import { useState, useEffect } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

/* =========================
   UTILIDADES
========================= */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* =========================
   SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué perfil profesional tiene?",
  "¿Qué tecnologías domina?",
  "¿Es desarrollador Full Stack?",
  "Cuéntame sobre sus proyectos",
  "¿Cómo puedo contactarlo?",
];

/* =========================
   INTENCIÓN (MEJORADA)
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();

  if (/hola|buenas|hey/.test(text)) return "GREETING";
  if (/jorge|quién|perfil|eres/.test(text)) return "PROFILE";
  if (/estudios|formación|máster|titulo/.test(text)) return "EDUCATION";
  if (/tecnologías|skills|habilidades|stack/.test(text)) return "SKILLS";
  if (/full\s?stack|frontend|backend/.test(text)) return "STACK";
  if (/proyectos|portfolio|apps|trabajos/.test(text)) return "PROJECTS";
  if (/contacto|email|whatsapp|hablar/.test(text)) return "CONTACT";

  return "UNKNOWN";
}

/* =========================
   RESPUESTAS INTELIGENTES
========================= */
function getSmartResponse(message, context) {
  if (message.trim().length < 4) {
    return "¿Podrías darme un poco más de detalle? 😊";
  }

  const intent = detectIntent(message);

  switch (intent) {
    case "GREETING":
      return pick([
        "Hola 👋 Soy Daniela IA. ¿Te gustaría conocer el perfil profesional de Jorge?",
        "¡Hola! Estoy aquí para contarte sobre Jorge, sus proyectos y tecnologías.",
      ]);

    case "PROFILE":
      return pick([
        "Jorge Patricio Santamaría Cherrez es Máster en Ingeniería de Software y Sistemas Informáticos, enfocado en crear soluciones modernas y escalables.",
        "Jorge es un desarrollador con formación de Máster en Ingeniería de Software, apasionado por construir productos digitales bien diseñados y seguros.",
      ]);

    case "EDUCATION":
      return (
        "Cuenta con un Máster en Ingeniería de Software y Sistemas Informáticos. " +
        "Además, se mantiene en constante aprendizaje en desarrollo web, IA y ciberseguridad."
      );

    case "SKILLS":
      if (context.askedProfile) {
        return (
          "Además de su perfil profesional, Jorge domina React, Vite y JavaScript en frontend; " +
          "y Python, Django REST, MySQL y JWT en backend. ¿Quieres saber cómo aplica estas tecnologías?"
        );
      }

      return (
        "Su stack incluye React, Vite y JavaScript para frontend; " +
        "Python y Django REST Framework para backend, junto a MySQL, JWT, Git y Linux."
      );

    case "STACK":
      return (
        "Sí, Jorge es desarrollador Full Stack. Diseña interfaces modernas y accesibles " +
        "y desarrolla APIs seguras siguiendo buenas prácticas de arquitectura."
      );

    case "PROJECTS":
      return (
        "Ha desarrollado tiendas online Full Stack, aplicaciones en React conectadas a Django REST " +
        "y proyectos que integran inteligencia artificial para mejorar la experiencia del usuario."
      );

    case "CONTACT":
      return (
        "Puedes contactar a Jorge desde el botón de WhatsApp del portafolio o en la sección de contacto. " +
        "Siempre está abierto a nuevas oportunidades y colaboraciones."
      );

    default:
      return (
        "Puedo ayudarte a conocer mejor a Jorge 😊 " +
        "Pregúntame sobre su perfil, estudios, tecnologías, proyectos o contacto."
      );
  }
}

/* =========================
   COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [context, setContext] = useState({
    askedProfile: false,
    askedSkills: false,
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("daniela-chat");
    return saved
      ? JSON.parse(saved)
      : [
          {
            from: "bot",
            text:
              "Hola 👋 Soy Daniela IA, la asistente virtual de Jorge. " +
              "Puedo contarte sobre su perfil profesional, tecnologías, proyectos o cómo contactarlo.",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("daniela-chat", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const intent = detectIntent(text);

    setContext((prev) => ({
      ...prev,
      askedProfile: intent === "PROFILE" || prev.askedProfile,
      askedSkills: intent === "SKILLS" || prev.askedSkills,
    }));

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: getSmartResponse(text, context) },
      ]);
      setTyping(false);
    }, 600);
  };

  return (
    <>
      {/* BOTÓN */}
      <Fab
        color="primary"
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1200 }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            bottom: 90,
            left: 16,
            width: 350,
            height: 480,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            bgcolor: isDark ? "#1e1e1e" : "#fff",
            zIndex: 1200,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Daniela IA 🤖</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {SUGGESTIONS.map((q) => (
                <Chip key={q} label={q} size="small" clickable onClick={() => sendMessage(q)} />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Box key={i} sx={{ textAlign: msg.from === "user" ? "right" : "left", mb: 1 }}>
                <Typography
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    bgcolor:
                      msg.from === "user"
                        ? theme.palette.primary.main
                        : isDark
                        ? "#2c2c2c"
                        : "#f1f1f1",
                    color: msg.from === "user" ? "#fff" : theme.palette.text.primary,
                    maxWidth: "85%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {typing && (
              <Typography variant="caption" sx={{ ml: 1 }}>
                Daniela está escribiendo…
              </Typography>
            )}
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Escribe tu pregunta…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <IconButton color="primary" onClick={() => sendMessage(input)}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
