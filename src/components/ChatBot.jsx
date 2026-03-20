import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  Chip,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge%20,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const YES_WORDS = ["sí", "si", "claro", "ok", "dale", "okey"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
COMPONENTE
========================= */
export default function ChatBot({ t, lang }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const primaryBg = useMemo(
    () => (isDark ? "#000" : theme.palette.primary.main),
    [isDark, theme]
  );

  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({});
  const [messages, setMessages] = useState([]);

  /* =========================
  INIT MENSAJE
  ========================= */
  useEffect(() => {
    setMessages([
      {
        from: "bot",
        text: t.chatbot.welcome,
      },
    ]);
  }, [t]);

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* =========================
  RESPUESTA SIMPLE (NO TOCO TU IA)
  ========================= */
  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      // 🔥 AQUÍ PUEDES SEGUIR USANDO TU getSmartResponse SIN CAMBIOS
      const response = "Respuesta generada por tu IA aquí 😊";

      setMessages((m) => [...m, { from: "bot", text: response }]);
      setTyping(false);
    }, delay());
  }, []);

  return (
    <>
      {/* BOTÓN */}
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: primaryBg,
          color: "#fff",
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* CHAT */}
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
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1,
              bgcolor: primaryBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight="bold">Sasha</Typography>

            <Box>
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() =>
                  setMessages([
                    {
                      from: "bot",
                      text: t.chatbot.welcome,
                    },
                  ])
                }
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {t.chatbot.suggestions.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  size="small"
                  onClick={() => sendMessage(q)}
                />
              ))}
            </Stack>
          </Box>

          {/* MENSAJES */}
          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => {
              const isUser = m.from === "user";

              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: isUser
                        ? theme.palette.primary.main
                        : "rgba(0,0,0,0.06)",
                      color: isUser ? "#fff" : "inherit",
                    }}
                  >
                    <Typography>{m.text}</Typography>
                  </Box>
                </Box>
              );
            })}

            {typing && (
              <Typography variant="caption">
                {t.chatbot.typing}
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
              placeholder={t.chatbot.placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
            />

            <IconButton onClick={() => sendMessage(input)}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
