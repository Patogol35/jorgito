import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Chip,
  Fab,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { SUGGESTIONS, WHATSAPP_URL } from "./chatbot.config";
import { delay } from "./chatbot.utils";
import { followUp, getSmartResponse } from "./chatbot.logic";

export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const bottomRef = useRef(null);

  const primaryBg = useMemo(
    () => (isDark ? "#000" : theme.palette.primary.main),
    [isDark, theme.palette.primary.main]
  );

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil, experiencia o proyectos.",
    }),
    []
  );

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [context, setContext] = useState({});
  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);

    return () => {
      delete window.openSashaChat;
      delete window.closeSashaChat;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const resetChat = useCallback(() => {
    setMessages([initialMessage]);
    setContext({});
    setInput("");
    setTyping(false);
  }, [initialMessage]);

  const appendBotMessages = useCallback((res, follow) => {
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: res.text },
      ...(!res.fromFollowUp && follow ? [{ from: "bot", text: follow }] : []),
    ]);
  }, []);

  const sendMessage = useCallback(
    (rawText) => {
      const text = rawText.trim();
      if (!text) return;

      setMessages((prev) => [...prev, { from: "user", text }]);
      setInput("");
      setTyping(true);

      setTimeout(() => {
        setContext((prevCtx) => {
          const nextCtx = { ...prevCtx };
          const res = getSmartResponse(text, nextCtx);
          const follow = followUp(res.intent);

          appendBotMessages(res, follow);

          if (res.action === "OPEN_WHATSAPP") {
            window.open(WHATSAPP_URL, "_blank");
          }

          setTyping(false);

          return {
            ...nextCtx,
            awaiting: res.action === "CONTACT_CONFIRM" ? "CONTACT_CONFIRM" : nextCtx.awaiting || null,
            awaitingFollowUp:
              !res.fromFollowUp && follow ? res.intent : null,
          };
        });
      }, delay());
    },
    [appendBotMessages]
  );

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: primaryBg,
          color: "#fff",
          "&:hover": { bgcolor: primaryBg },
          "&:active": { bgcolor: primaryBg, color: "#fff" },
          "&:focus": { color: "#fff" },
        }}
      >
        <SmartToyIcon />
      </Fab>

      {open && (
        <Box
          onClick={() => setOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (t) => t.zIndex.modal + 1,
          }}
        />
      )}

      {open && (
        <Paper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "fixed",
            zIndex: (t) => t.zIndex.modal + 2,
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
            <Box display="flex" alignItems="center" gap={1}>
              <SmartToyIcon fontSize="small" />
              <Typography fontWeight="bold">Sasha</Typography>
            </Box>

            <Box>
              <IconButton size="small" sx={{ color: "#fff" }} onClick={resetChat}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#fff" }} onClick={() => setOpen(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ p: 1 }}>
            {isLandscape ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  pb: 1,
                }}
              >
                {SUGGESTIONS.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() => sendMessage(q)}
                    sx={{ flexShrink: 0 }}
                  />
                ))}
              </Box>
            ) : (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {SUGGESTIONS.map((q) => (
                  <Chip key={q} label={q} size="small" onClick={() => sendMessage(q)} />
                ))}
              </Stack>
            )}
          </Box>

          <Box sx={{ flex: 1, p: 1, overflowY: "auto" }}>
            {messages.map((m, i) => {
              const isUser = m.from === "user";

              return (
                <Box
                  key={`${m.from}-${i}`}
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
                        ? isDark
                          ? theme.palette.primary.light
                          : theme.palette.primary.main
                        : isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.06)",
                      color: isUser
                        ? isDark
                          ? "#000"
                          : "#fff"
                        : "inherit",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isLandscape ? "0.85rem" : "0.95rem",
                        lineHeight: isLandscape ? 1.4 : 1.5,
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {typing && (
              <Typography
                variant="caption"
                sx={{ opacity: 0.7, color: theme.palette.text.secondary }}
              >
                Sasha está escribiendo…
              </Typography>
            )}

            <div ref={bottomRef} />
          </Box>

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
