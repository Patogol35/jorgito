import { useState } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const knowledgeBase = [
  {
    keywords: ["quién", "eres", "jorge"],
    answer:
      "Soy Jorge Patricio Santamaría Cherrez, Máster en Ingeniería de Software y Sistemas Informáticos, apasionado por crear soluciones digitales seguras e innovadoras.",
  },
  {
    keywords: ["estudios", "formación", "título"],
    answer:
      "Tengo un Máster en Ingeniería de Software y Sistemas Informáticos y formación continua en desarrollo web, IA y ciberseguridad.",
  },
  {
    keywords: ["tecnologías", "skills", "habilidades"],
    answer:
      "Trabajo con React, Vite, JavaScript, Python, Django, MySQL, JWT, Git y Linux. También tengo conocimientos en IA y ciberseguridad.",
  },
  {
    keywords: ["proyectos", "portfolio"],
    answer:
      "He desarrollado tiendas online full stack, apps en React, proyectos con Django REST y aplicaciones con integración de IA.",
  },
  {
    keywords: ["contacto", "email", "whatsapp"],
    answer:
      "Puedes contactarme directamente por WhatsApp usando el botón flotante o desde la sección de contacto del portafolio.",
  },
];

function getBotResponse(message) {
  const text = message.toLowerCase();
  const match = knowledgeBase.find((item) =>
    item.keywords.some((k) => text.includes(k))
  );
  return (
    match?.answer ||
    "Buena pregunta 🙂 Puedes preguntarme sobre mi perfil, estudios, habilidades, proyectos o cómo contactarme."
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 Soy el asistente virtual de Jorge. ¿Qué deseas saber?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const botMessage = {
      from: "bot",
      text: getBotResponse(input),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <>
      {/* Botón flotante */}
      <Fab
        color="primary"
        onClick={() => setOpen(!open)}
        sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1000 }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 90,
            left: 16,
            width: 320,
            height: 420,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: "primary.main",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">JorgeBot 🤖</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          {/* Mensajes */}
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
                    bgcolor: msg.from === "user" ? "primary.main" : "grey.300",
                    color: msg.from === "user" ? "#fff" : "#000",
                    maxWidth: "85%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <IconButton color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
      }
