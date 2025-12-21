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
  CircularProgress,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { askOpenAI } from "../services/openai";

/* =========================
   SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué perfil profesional tiene?",
  "¿Qué tecnologías domina?",
  "¿Es Full Stack?",
  "Cuéntame sobre sus proyectos",
  "¿Qué lo diferencia de otros perfiles?",
];

/* =========================
   INTENCIÓN LOCAL
========================= */
function detectIntent(message) {
  const text = message.toLowerCase();

  if (text.match(/quién|jorge|perfil/)) return "PROFILE";
  if (text.match(/tecnologías|skills|habilidades/)) return "SKILLS";
  if (text.match(/full\s?stack|frontend|backend/)) return "STACK";
  if (text.match(/proyectos|portfolio/)) return "PROJECTS";
  if (text.match(/contacto|email|whatsapp/)) return "CONTACT";

  return "AI";
}

/* =========================
   RESPUESTAS LOCALES
========================= */
function localResponse(intent) {
  switch (intent) {
    case "PROFILE":
      return "Jorge Patricio Santamaría Cherrez es Máster en Ingeniería de Software y Sistemas Informáticos, con enfoque en soluciones digitales modernas, seguras y escalables.";
    case "SKILLS":
      return "Domina React, JavaScript, Python, Django REST, MySQL, JWT, Git y Linux. También tiene experiencia en IA y ciberseguridad.";
    case "STACK":
      return "Sí, es desarrollador Full Stack, combinando frontend moderno con backend robusto y seguro.";
    case "PROJECTS":
      return "Ha desarrollado tiendas online full stack, aplicaciones React conectadas a APIs Django e integración de IA.";
    case "CONTACT":
      return "Puedes contactarlo mediante el botón de WhatsApp o desde la sección de contacto del portafolio.";
    default:
      return null;
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
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => [
    {
      from: "bot",
      text:
        "Hola 👋 Soy Daniela IA. Puedo ayudarte a conocer el perfil profesional de Jorge. ¿Qué deseas saber?",
    },
  ]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    const intent = detectIntent(text);
    const local = localResponse(intent);

    if (local) {
      setMessages((prev) => [...prev, { from: "bot", text: local }]);
    } else {
      setLoading(true);
      const aiReply = await askOpenAI(text);
      setLoading(false);

      setMessages((prev) => [...prev, { from: "bot", text: aiReply }]);
    }
  };

  return (
    <>
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
            width: 360,
            height: 500,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            bgcolor: isDark ? "#1e1e1e" : "#fff",
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
                <Chip key={q} label={q} size="small" onClick={() => sendMessage(q)} />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <Box key={i} textAlign={msg.from === "user" ? "right" : "left"} mb={1}>
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
            {loading && <CircularProgress size={20} />}
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
            <IconButton onClick={() => sendMessage(input)} color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
