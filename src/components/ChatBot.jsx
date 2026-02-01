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
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { 
  SUGGESTIONS,
  WHATSAPP_URL 
} from './ChatBot.constants';

import { getSmartResponse, followUp } from './ChatBot.logic';
import {
  FabButton,
  Overlay,
  ChatPaper,
  HeaderBox,
  SuggestionsBox,
  MessagesBox,
  MessageBubble,
  InputBox
} from './ChatBot.styles';

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
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

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
    }, Math.floor(Math.random() * 500) + 400);
  }, []);

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          bgcolor: primaryBg,
          color: "#fff",
          "&:hover": {
            bgcolor: primaryBg,
          },
          "&:active": {
            bgcolor: primaryBg,
            color: "#fff",
          },
          "&:focus": {
            color: "#fff",
          },
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* OVERLAY */}
      {open && <Overlay onClick={() => setOpen(false)} />}

      {/* CHAT */}
      {open && (
        <ChatPaper isLandscape={isLandscape}>
          {/* HEADER */}
          <HeaderBox primaryBg={primaryBg}>
            <Box display="flex" alignItems="center" gap={1}>
              <SmartToyIcon fontSize="small" />
              <Typography fontWeight="bold">Sasha</Typography>
            </Box>

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
          </HeaderBox>

          {/* SUGERENCIAS */}
          <SuggestionsBox isLandscape={isLandscape}>
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
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() => sendMessage(q)}
                  />
                ))}
              </Stack>
            )}
          </SuggestionsBox>

          {/* MENSAJES */}
          <MessagesBox>
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
                  <MessageBubble isUser={isUser} isDark={isDark}>
                    <Typography
                      sx={{
                        fontSize: isLandscape ? "0.85rem" : "0.95rem",
                        lineHeight: isLandscape ? 1.4 : 1.5,
                      }}
                    >
                      {m.text}
                    </Typography>
                  </MessageBubble>
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
          </MessagesBox>

          {/* INPUT */}
          <InputBox>
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
          </InputBox>
        </ChatPaper>
      )}
    </>
  );
}
