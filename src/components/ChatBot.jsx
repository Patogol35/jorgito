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

const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué tecnologías domina?",
  "¿Es Full Stack?",
  "Muéstrame sus proyectos",
  "¿Cómo puedo contactarlo?",
];

const knowledgeBase = [
  {
    keywords: ["quién", "jorge", "eres"],
    answer:
      "Soy Jorge Patricio Santamaría Cherrez, Máster en Ingeniería de Software y Sistemas Informáticos. Me especializo en crear soluciones digitales modernas, seguras y escalables.",
  },
  {
    keywords: ["full stack", "backend", "frontend"],
    answer:
      "Sí, soy desarrollador Full Stack. Trabajo con React y Vite en frontend, y Django REST con MySQL y JWT en backend.",
  },
  {
    keywords: ["tecnologías", "skills", "habilidades"],
    answer:
      "Domino React, JavaScript, Python, Django, MySQL, Git, Linux y JWT. También tengo experiencia en IA y ciberseguridad.",
  },
  {
    keywords: ["proyectos", "portfolio"],
    answer:
      "He desarrollado tiendas online full stack, aplicaciones en React, APIs con Django REST e integración de inteligencia artificial.",
  },
  {
    keywords: ["contacto", "whatsapp", "email"],
    answer:
      "Puedes contactarlo fácilmente desde el botón de WhatsApp o en la sección de contacto de este portafolio.",
  },
];

function getBotResponse(message) {
  const text = message.toLowerCase();
  const match = knowledgeBase.find((item) =>
    item.keywords.some((k) => text.includes(k))
  );

  return (
    match?.answer ||
    "Buena pregunta 🙂 Puedes preguntarme sobre su perfil, habilidades, proyectos o cómo contactarlo."
  );
}

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
            text: "Hola 👋 Soy Daniela IA, la asistente virtual de Jorge. ¿Qué deseas saber?",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("daniela-chat", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { from: "user", text };
    const botMsg = { from: "bot", text: getBotResponse(text) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <Fab
        color="primary"
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 1200,
        }}
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
            width: 340,
            height: 460,
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
                        : "#f0f0f0",
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
