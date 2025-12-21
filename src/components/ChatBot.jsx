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
   SUGERENCIAS INTELIGENTES
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

  if (text.match(/quién|eres|jorge|perfil/)) return "PROFILE";
  if (text.match(/estudios|formación|título|máster/)) return "EDUCATION";
  if (text.match(/tecnologías|skills|habilidades|stack/)) return "SKILLS";
  if (text.match(/full\s?stack|frontend|backend/)) return "STACK";
  if (text.match(/proyectos|portfolio|trabajos|apps/)) return "PROJECTS";
  if (text.match(/contacto|email|whatsapp|hablar/)) return "CONTACT";

  return "UNKNOWN";
}

/* =========================
   RESPUESTAS AVANZADAS
========================= */
function getSmartResponse(message) {
  const intent = detectIntent(message);

  switch (intent) {
    case "PROFILE":
      return (
        "Jorge Patricio Santamaría Cherrez es Máster en Ingeniería de Software y Sistemas Informáticos. " +
        "Se especializa en el desarrollo de soluciones digitales modernas, seguras y escalables, " +
        "con un enfoque claro en aportar valor real a usuarios y organizaciones."
      );

    case "EDUCATION":
      return (
        "Jorge cuenta con un Máster en Ingeniería de Software y Sistemas Informáticos. " +
        "Complementa su formación con aprendizaje continuo en desarrollo web, inteligencia artificial y ciberseguridad, " +
        "manteniéndose actualizado con las mejores prácticas del sector."
      );

    case "SKILLS":
      return (
        "Su stack tecnológico incluye React, Vite y JavaScript para frontend; " +
        "Python, Django REST Framework, MySQL y autenticación JWT para backend. " +
        "Además, trabaja con Git, Linux y tiene conocimientos en inteligencia artificial y ciberseguridad."
      );

    case "STACK":
      return (
        "Sí, Jorge es desarrollador Full Stack. Diseña interfaces modernas y accesibles en frontend, " +
        "y construye APIs robustas y seguras en backend, aplicando buenas prácticas de arquitectura y seguridad."
      );

    case "PROJECTS":
      return (
        "Ha desarrollado proyectos Full Stack como tiendas online completas, " +
        "aplicaciones en React conectadas a APIs con Django REST, " +
        "y soluciones que integran inteligencia artificial para mejorar la experiencia del usuario."
      );

    case "CONTACT":
      return (
        "Puedes contactar a Jorge fácilmente mediante el botón de WhatsApp disponible en este portafolio " +
        "o desde la sección de contacto. Estará encantado de conversar sobre oportunidades o proyectos."
      );

    default:
      return (
        "Puedo ayudarte a conocer mejor el perfil profesional de Jorge 😊 " +
        "Pregúntame sobre su experiencia, estudios, tecnologías, proyectos o cómo contactarlo."
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

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("daniela-chat");
    return saved
      ? JSON.parse(saved)
      : [
          {
            from: "bot",
            text:
              "Hola 👋 Soy Daniela IA, la asistente virtual de Jorge. " +
              "Puedo contarte sobre su perfil profesional, habilidades, proyectos o cómo contactarlo.",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("daniela-chat", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "bot", text: getSmartResponse(text) },
    ]);

    setInput("");
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
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
                <Chip
                  key={q}
                  label={q}
                  size="small"
                  clickable
                  onClick={() => sendMessage(q)}
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
                        ? theme.palette.primary.main
                        : isDark
                        ? "#2c2c2c"
                        : "#f1f1f1",
                    color:
                      msg.from === "user"
                        ? "#fff"
                        : theme.palette.text.primary,
                    maxWidth: "85%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
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
