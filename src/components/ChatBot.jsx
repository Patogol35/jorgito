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
import { useMediaQuery } from "@mui/material";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge";

/* =========================
UTIL
========================= */
const delay = () => Math.floor(Math.random() * 400) + 300;

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const initialMessage = {
    from: "bot",
    text:
      "Hola 👋 Soy Sasha. Pregúntame sobre el perfil profesional de Jorge.",
  };

  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((p) => [...p, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((p) => [
        ...p,
        { from: "bot", text: "Gracias por tu mensaje 😊" },
      ]);
      setTyping(false);
    }, delay());
  };

  return (
    <>
      {/* BOTÓN */}
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 9999,
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* OVERLAY TÁCTIL (CLAVE) */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,

            // 🔑 AISLA EL TOUCH DEL BODY
            touchAction: "none",
            background: "transparent",
          }}
        >
          {/* CHAT */}
          <Paper
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",

              ...(isLandscape
                ? {
                    inset: 8,
                  }
                : {
                    bottom: 80,
                    left: 16,
                    width: 360,
                    height: "70vh",
                  }),
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
              }}
            >
              <Typography>Sasha</Typography>
              <Box>
                <IconButton
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={() => setMessages([initialMessage])}
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

            {/* MENSAJES (SCROLL REAL) */}
            <Box
              sx={{
                flex: 1,
                p: 1,
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",

                // 🔥 ESTO ES LO QUE ANDROID RESPETA
                touchAction: "pan-y",
              }}
            >
              {messages.map((m, i) => (
                <Typography
                  key={i}
                  sx={{
                    mb: 0.5,
                    fontWeight: m.from === "user" ? 600 : 400,
                    bgcolor:
                      m.from === "user"
                        ? isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.05)"
                        : "transparent",
                    px: m.from === "user" ? 1 : 0,
                    py: m.from === "user" ? 0.5 : 0,
                    borderRadius: 1,
                  }}
                >
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
