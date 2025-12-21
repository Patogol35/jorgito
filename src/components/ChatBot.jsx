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
   PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  education: "Máster en Ingeniería de Software y Sistemas Informáticos",
  experience: ["Desarrollador de aulas virtuales", "Desarrollo Full Stack"],
  stack: [
    "React",
    "Vercel",
    "Postman",
    "JavaScript",
    "Spring Boot",
    "Django REST",
    "Python",
    "MySQL",
    "AWS",
    "Git",
  ],
  projects: ["Aulas virtuales", "Tiendas online", "Dashboards"],
};

/* =========================
   SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué experiencia tiene?",
  "¿Qué tecnologías usa?",
  "¿Es Full Stack?",
  "¿Por qué contratarlo?",
];

/* =========================
   RESPUESTAS
========================= */
function getResponse(text) {
  const msg = text.toLowerCase();

  if (msg.includes("jorge"))
    return `${PROFILE.name} es ${PROFILE.role}.`;

  if (msg.includes("experiencia"))
    return `Tiene experiencia como ${PROFILE.experience.join(", ")}.`;

  if (msg.includes("tecnolog"))
    return `Trabaja con ${PROFILE.stack.join(", ")}.`;

  if (msg.includes("full"))
    return "Sí, es desarrollador Full Stack (frontend y backend).";

  if (msg.includes("contratar"))
    return "Porque combina experiencia real, buenas prácticas y formación sólida.";

  return "Puedo contarte sobre su perfil, experiencia o tecnologías 🙂";
}

/* =========================
   COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const bottomRef = useRef(null);

  /* 🎨 COLORES CENTRALIZADOS */
  const colors = {
    headerBg: isDark ? "#000" : theme.palette.primary.main,
    userMsgBg: isDark ? "#000" : theme.palette.primary.main,
    userMsgText: "#fff",
    botMsgBg: isDark ? "#1e1e1e" : "#f1f1f1",
    botMsgText: isDark ? "#eaeaea" : "#000",
    panelBg: isDark ? "#121212" : "#fff",
    chipBg: isDark ? "#1f1f1f" : "#f1f1f1",
    chipHover: isDark ? "#2a2a2a" : "#e0e0e0",
  };

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, asistente virtual. Pregúntame sobre Jorge.",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text) => {
    if (!text.trim()) return;

    setMessages((m) => [
      ...m,
      { from: "user", text },
      { from: "bot", text: getResponse(text) },
    ]);
    setInput("");
  };

  const clearChat = () => {
    if (window.confirm("¿Borrar conversación?")) {
      setMessages(messages.slice(0, 1));
    }
  };

  return (
    <>
      {/* BOTÓN */}
      <Fab
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: colors.headerBg,
          color: "#fff",
          "&:hover": { bgcolor: colors.headerBg },
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
            bgcolor: colors.panelBg,
            borderRadius: 3,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: colors.headerBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight="bold">Sasha 🤖</Typography>
            <Box>
              <Tooltip title="Borrar">
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
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {SUGGESTIONS.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  onClick={() => send(q)}
                  sx={{
                    bgcolor: colors.chipBg,
                    color: colors.botMsgText,
                    "&:hover": { bgcolor: colors.chipHover },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: m.from === "user" ? "right" : "left",
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
                      m.from === "user"
                        ? colors.userMsgBg
                        : colors.botMsgBg,
                    color:
                      m.from === "user"
                        ? colors.userMsgText
                        : colors.botMsgText,
                    maxWidth: "85%",
                  }}
                >
                  {m.text}
                </Typography>
              </Box>
            ))}
            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}
          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Escribe..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
            />
            <IconButton onClick={() => send(input)}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
            }
