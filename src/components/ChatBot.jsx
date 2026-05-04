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

import { delay, SUGGESTIONS, followUp } from "./chatbot.config";
import { getSmartResponse } from "./getSmartResponse";

export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const primaryBg = useMemo(
    () => (isDark ? "#000" : theme.palette.primary.main),
    [isDark, theme]
  );

  // 🔥 refs clave
  const bottomRef = useRef(null);
  const messagesRef = useRef(null);
  const scrollPosition = useRef(0);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({});

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil, experiencia o proyectos.",
    }),
    []
  );

  const [messages, setMessages] = useState([initialMessage]);

  // abrir desde window
  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);
  }, []);

  // ✅ restaurar scroll al abrir
  useEffect(() => {
    if (open && messagesRef.current) {
      messagesRef.current.scrollTop = scrollPosition.current;
    }
  }, [open]);

  // ✅ auto-scroll INTELIGENTE (solo si ya estaba abajo)
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setContext((prev) => {
        const res = getSmartResponse(text, prev);
        const follow = followUp(res.intent);

        setMessages((m) => [
          ...m,
          { from: "bot", text: res.text },
          ...(!res.fromFollowUp && follow
            ? [{ from: "bot", text: follow }]
            : []),
        ]);

        setTyping(false);

        return {
          ...prev,
          awaiting: res.action || null,
          awaitingFollowUp: !res.fromFollowUp && follow ? res.intent : null,
        };
      });
    }, delay());
  }, []);

  // 🔥 cerrar guardando scroll
  const handleClose = () => {
    if (messagesRef.current) {
      scrollPosition.current = messagesRef.current.scrollTop;
    }
    setOpen(false);
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
          zIndex: 1200,
          bgcolor: isDark ? "#111" : theme.palette.primary.main,
          color: "#fff",
          width: 52,
          height: 52,
          boxShadow: "none",
          "&:hover": {
            bgcolor: isDark ? "#222" : theme.palette.primary.dark,
          },
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* OVERLAY */}
      {open && (
        <Box
          onClick={handleClose}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
        />
      )}

      {/* CHAT */}
      {open && (
        <Paper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.modal + 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...(isLandscape
              ? {
                  inset: "72px 0 10px 0",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: 640,
                }
              : {
                  bottom: 90,
                  left: 16,
                  width: 360,
                  height: 520,
                }),
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
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Sasha</Typography>

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
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* SUGERENCIAS */}
          <Box sx={{ p: 1 }}>
            {isLandscape ? (
              <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
                {SUGGESTIONS.map((q) => (
                  <Chip key={q} label={q} onClick={() => sendMessage(q)} />
                ))}
              </Box>
            ) : (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {SUGGESTIONS.map((q) => (
                  <Chip key={q} label={q} onClick={() => sendMessage(q)} />
                ))}
              </Stack>
            )}
          </Box>

          {/* MENSAJES */}
          <Box
            ref={messagesRef}
            sx={{ flex: 1, p: 1, overflowY: "auto" }}
          >
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
                        : isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.06)",
                      color: isUser ? "#fff" : "inherit",
                    }}
                  >
                    <Typography fontSize="0.9rem">
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {typing && (
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Escribe tu mensaje…"
            />

            <IconButton onClick={() => sendMessage(input)}>
              <SendIcon sx={{ color: "#03A9F4" }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
              }
