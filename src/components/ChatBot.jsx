import { useState, useEffect, useRef, useMemo } from "react";

import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil, experiencia, proyectos, " +
        "habilidades o cualquier otra cosa.",
    }),
    []
  );

  const [messages, setMessages] = useState([initialMessage]);

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "auto",
        });
      }, 0);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const sendMessage = async (text) => {
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
      console.error("Error Sasha:", error);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Lo siento 😕 No pude conectarme con el servidor. " +
            "Inténtalo nuevamente.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const resetChat = () => {
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
          }}
        />
      )}

      {/* CHAT */}

      {open && (
        <Paper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "fixed",

            zIndex: (theme) =>
              theme.zIndex.modal + 2,

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
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <SmartToyIcon fontSize="small" />

              <Typography fontWeight="bold">
                Sasha
              </Typography>
            </Box>

            <Box>
              <IconButton
                size="small"
                sx={{
                  color: "#fff",
                }}
                onClick={resetChat}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  color: "#fff",
                }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* MENSAJES */}

          <Box
            sx={{
              flex: 1,
              p: 1,
              overflowY: "auto",
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

                      color: isUser
                        ? "#fff"
                        : "inherit",

                      whiteSpace: "pre-line",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isLandscape
                          ? "0.85rem"
                          : "0.95rem",

                        lineHeight: isLandscape
                          ? 1.4
                          : 1.5,
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
                sx={{
                  opacity: 0.7,
                  color:
                    theme.palette.text.secondary,
                }}
              >
                Sasha está escribiendo…
              </Typography>
            )}

            <div ref={bottomRef} />
          </Box>

          {/* INPUT */}

          <Box
            sx={{
              display: "flex",
              p: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
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
              disabled={
                !input.trim() || typing
              }
            >
              <SendIcon
                sx={{
                  color: "#03A9F4",
                }}
              />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
      }
