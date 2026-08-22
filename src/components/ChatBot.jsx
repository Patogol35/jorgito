import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const primaryBg = useMemo(
    () => (isDark ? "#000" : theme.palette.primary.main),
    [isDark, theme]
  );

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil, experiencia, proyectos, " +
        "tecnologías o cualquier otro tema.",
    }),
    []
  );

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
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || typing) return;

      const userMessage = text.trim();

      setMessages((prev) => [
        ...prev,
        {
          from: "user",
          text: userMessage,
        },
      ]);

      setInput("");
      setTyping(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: userMessage,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Error del servidor"
          );
        }

        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: data.response,
          },
        ]);
      } catch (error) {
        console.error("Error del chatbot:", error);

        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text:
              "Lo siento, no pude conectarme con el servidor. " +
              "Inténtalo nuevamente en unos segundos.",
          },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [typing]
  );

  const newChat = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}

      <Fab
        onClick={() => setOpen(true)}
        sx={(theme) => ({
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 1200,
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.primary.main,
          color: "#fff",
          width: 52,
          height: 52,
          boxShadow: "none",
          transition:
            "background-color 0.25s ease, transform 0.2s ease",

          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.primary.dark,
          },

          "&:active": {
            transform: "scale(0.95)",
          },
        })}
      >
        <SmartToyIcon />
      </Fab>

      {/* OVERLAY */}

      {open && (
        <Box
          onClick={() => setOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (theme) => theme.zIndex.modal + 1,
            backgroundColor: "rgba(0,0,0,0.15)",
          }}
        />
      )}

      {/* CHAT */}

      {open && (
        <Paper
          onClick={(e) => e.stopPropagation()}
          elevation={10}
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.modal + 2,

            bottom: {
              xs: 78,
              sm: 90,
            },

            left: {
              xs: 10,
              sm: 16,
            },

            width: {
              xs: "calc(100% - 20px)",
              sm: 380,
            },

            height: {
              xs: "calc(100dvh - 95px)",
              sm: 560,
            },

            maxHeight: {
              xs: "calc(100dvh - 95px)",
              sm: "calc(100dvh - 110px)",
            },

            display: "flex",
            flexDirection: "column",
            overflow: "hidden",

            borderRadius: {
              xs: 3,
              sm: 4,
            },

            bgcolor: "background.paper",
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              px: 1.5,
              py: 1.2,
              bgcolor: primaryBg,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <SmartToyIcon fontSize="small" />

              <Box>
                <Typography
                  fontWeight="bold"
                  fontSize={14}
                >
                  Sasha
                </Typography>

                <Typography
                  fontSize={10}
                  sx={{ opacity: 0.8 }}
                >
                  Asistente virtual
                </Typography>
              </Box>
            </Box>

            <Box>
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={newChat}
                title="Nueva conversación"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() => setOpen(false)}
                title="Cerrar"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* MENSAJES */}

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              p: 1.5,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              scrollbarWidth: "thin",
            }}
          >
            {messages.map((m, i) => {
              const isUser = m.from === "user";

              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: isUser
                      ? "flex-end"
                      : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "82%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2.5,

                      bgcolor: isUser
                        ? theme.palette.primary.main
                        : isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.05)",

                      color: isUser
                        ? "#fff"
                        : "text.primary",

                      whiteSpace: "pre-line",
                      overflowWrap: "anywhere",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {typing && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1,
                }}
              >
                <SmartToyIcon
                  sx={{
                    fontSize: 17,
                    color:
                      theme.palette.primary.main,
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.7,
                    color:
                      theme.palette.text.secondary,
                  }}
                >
                  Sasha está escribiendo…
                </Typography>
              </Box>
            )}

            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              p: 1,
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              flexShrink: 0,
            }}
          >
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={4}
              value={input}
              disabled={typing}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Escribe tu mensaje…"
            />

            <IconButton
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
              }
