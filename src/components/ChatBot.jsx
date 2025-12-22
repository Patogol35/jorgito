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
import { useMediaQuery } from "@mui/material";

/* =========================
CONFIG
========================= */
const delay = () => Math.floor(Math.random() * 400) + 300;

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil o experiencia.",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "Perfecto 😊" },
      ]);
      setTyping(false);
    }, delay());
  };

  return (
    <>
      {/* BOTÓN */}
      {!open && (
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 16,
            left: 16,
            zIndex: 1200,
          }}
        >
          <SmartToyIcon />
        </Fab>
      )}

      {/* CHAT */}
      {open && (
        <Box
          sx={{
            position: isMobile ? "fixed" : "fixed",
            inset: 0,
            zIndex: 1300,
            display: "flex",
            justifyContent: isMobile ? "stretch" : "flex-start",
            alignItems: isMobile ? "stretch" : "flex-end",
            pointerEvents: "auto",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "100%" : 380,
              height: isMobile ? "100%" : 520,
              borderRadius: isMobile ? 0 : 2,
              ml: isMobile ? 0 : 2,
              mb: isMobile ? 0 : 2,
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                p: 1,
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Typography>Sasha</Typography>
              <IconButton
                sx={{ color: "#fff" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* SUGERENCIAS */}
            <Box sx={{ p: 1 }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {["¿Quién es Jorge?", "¿Experiencia?", "¿Tecnologías?"].map(
                  (q) => (
                    <Chip
                      key={q}
                      label={q}
                      size="small"
                      onClick={() => sendMessage(q)}
                    />
                  )
                )}
              </Stack>
            </Box>

            {/* MENSAJES */}
            <Box
              sx={{
                flex: 1,
                p: 1,
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              {messages.map((m, i) => (
                <Typography key={i} sx={{ mb: 0.5 }}>
                  {m.text}
                </Typography>
              ))}
              {typing && (
                <Typography variant="caption">
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
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage(input)
                }
              />
              <IconButton onClick={() => sendMessage(input)}>
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}
