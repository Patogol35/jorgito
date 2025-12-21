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
   DETECCIÓN DE INTENCIÓN
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();

  if (/hola|buenas|hey/.test(text)) return "GREETING";
  if (/jorge|quién|perfil|eres/.test(text)) return "PROFILE";
  if (/estudios|formación|máster|titulo/.test(text)) return "EDUCATION";
  if (/tecnologías|skills|habilidades|stack/.test(text)) return "SKILLS";
  if (/full\s?stack|frontend|backend/.test(text)) return "STACK";
  if (/proyectos|portfolio|apps|trabajos/.test(text)) return "PROJECTS";
  if (/contact/.test(text)) return "CONTACT";

  return "UNKNOWN";
}

/* =========================
   RESPUESTAS
========================= */
function getSmartResponse(message, context) {
  if (message.trim().length < 4) {
    return "¿Podrías darme un poco más de detalle? 😊";
  }

  const intent = detectIntent(message);

  switch (intent) {
    case "GREETING":
      return pick([
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. ¿En qué puedo ayudarte?",
        "¡Hola! Soy Sasha. Puedo contarte sobre el perfil profesional de Jorge.",
      ]);

    case "PROFILE":
      return pick([
        "Jorge Patricio Santamaría Cherrez es Máster en Ingeniería de Software y Sistemas Informáticos, enfocado en el desarrollo de soluciones web modernas y escalables.",
        "Jorge es desarrollador Full Stack con formación de Máster en Ingeniería de Software, orientado a crear aplicaciones robustas y bien estructuradas.",
      ]);

    case "EDUCATION":
      return (
        "Cuenta con un Máster en Ingeniería de Software y Sistemas Informáticos. " +
        "Complementa su formación con aprendizaje continuo en desarrollo web y buenas prácticas."
      );

    case "SKILLS":
      return (
        "Su stack tecnológico incluye React, Vite y JavaScript; " +
        "Python con Django REST Framework; MySQL; JWT; Git y Linux."
      );

    case "STACK":
      return (
        "Sí, Jorge es desarrollador Full Stack. Diseña interfaces modernas y accesibles " +
        "y desarrolla APIs seguras siguiendo buenas prácticas de arquitectura."
      );

    case "PROJECTS":
      return (
        "Ha desarrollado tiendas online Full Stack, aplicaciones en React conectadas a APIs REST " +
        "y sistemas backend bien estructurados."
      );

    case "CONTACT":
      return (
        "Puedes contactar a Jorge desde el botón de WhatsApp disponible en este portafolio " +
        "o desde la sección de contacto."
      );

    default:
      return (
        "Puedo ayudarte a conocer mejor el perfil profesional de Jorge 😊 " +
        "Pregúntame sobre su experiencia, tecnologías, proyectos o contacto."
      );
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

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("sasha-chat");
    return saved
      ? JSON.parse(saved)
      : [
          {
            from: "bot",
            text:
              "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
              "Puedo contarte sobre su perfil profesional, tecnologías, proyectos o cómo contactarlo.",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("sasha-chat", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: getSmartResponse(text) },
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
          elevation={10}
          sx={{
            position: "fixed",
            bottom: 90,
            left: 16,
            width: 350,
            height: 480,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            bgcolor: isDark ? "#121212" : "#fff",
            zIndex: 1200,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: isDark ? "#1f1f1f" : theme.palette.primary.main,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Sasha 🤖</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {SUGGESTIONS.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  size="small"
                  clickable
                  onClick={() => sendMessage(q)}
                  sx={{
                    bgcolor: isDark ? "#2a2a2a" : "#f1f1f1",
                    color: isDark ? "#eaeaea" : "#000",
                    border: isDark ? "1px solid #3a3a3a" : "none",
                    "&:hover": {
                      bgcolor: isDark ? "#333" : "#e0e0e0",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    bgcolor:
                      msg.from === "user"
                        ? isDark
                          ? "#3a3a3a"
                          : theme.palette.primary.main
                        : isDark
                        ? "#2c2c2c"
                        : "#f1f1f1",
                    color:
                      msg.from === "user"
                        ? "#fff"
                        : isDark
                        ? "#eaeaea"
                        : theme.palette.text.primary,
                    maxWidth: "85%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {typing && (
              <Typography variant="caption" sx={{ ml: 1, color: "#aaa" }}>
                Sasha está escribiendo…
              </Typography>
            )}
            <div ref={bottomRef} />
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
              sx={{
                input: { color: isDark ? "#fff" : "#000" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: isDark ? "#1f1f1f" : "#fff",
                },
              }}
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
