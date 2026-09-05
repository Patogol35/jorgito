import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

/* =========================
   CONFIGURACIÓN
========================= */

const API_URL = "https://groqbot-08r8.onrender.com/api/chat";
const MAX_MESSAGE_LENGTH = 1500;

/* =========================
   COMPONENTE
========================= */

export default function ChatBot({ t }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isLandscape = useMediaQuery(
    "(orientation: landscape)"
  );

  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [history, setHistory] = useState([]);

  const primaryBg = isDark
    ? theme.palette.grey[900]
    : theme.palette.primary.main;

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text: t.chatbot.greeting,
    }),
    [t]
  );

  const [messages, setMessages] = useState([
    initialMessage,
  ]);

  /* =========================
     ACTUALIZAR SALUDO
  ========================== */

  useEffect(() => {
    setMessages((current) =>
      current.length === 1 && current[0].from === "bot"
        ? [initialMessage]
        : current
    );
  }, [initialMessage]);

  /* =========================
     CONTROL EXTERNO
  ========================== */

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);
    window.closeSashaChat = () => setOpen(false);

    return () => {
      delete window.openSashaChat;
      delete window.closeSashaChat;
    };
  }, []);

  /* =========================
     SCROLL AUTOMÁTICO
  ========================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }, 0);
  }, [open]);

  /* =========================
     BLOQUEAR SCROLL
  ========================== */

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* =========================
     ENVIAR MENSAJE
  ========================== */

  const sendMessage = useCallback(
    async (text) => {
      const userMessage = text.trim();

      if (!userMessage || typing) return;

      if (userMessage.length > MAX_MESSAGE_LENGTH) {
        setMessages((current) => [
          ...current,
          {
            from: "bot",
            text: `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
          },
        ]);

        return;
      }

      const currentHistory = [...history];

      setMessages((current) => [
        ...current,
        {
          from: "user",
          text: userMessage,
        },
      ]);

      setInput("");
      setTyping(true);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            history: currentHistory,
          }),
        });

        const data = await response.json();

        if (response.status === 429) {
          throw new Error(
            data?.error ||
              "Sasha está recibiendo muchas solicitudes. Inténtalo nuevamente en unos segundos."
          );
        }

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "No fue posible obtener una respuesta de Sasha."
          );
        }

        const botResponse = data?.response?.trim();

        if (!botResponse) {
          throw new Error(
            "Sasha no devolvió una respuesta."
          );
        }

        setMessages((current) => [
          ...current,
          {
            from: "bot",
            text: botResponse,
          },
        ]);

        setHistory((current) => [
          ...current,
          {
            role: "user",
            content: userMessage,
          },
          {
            role: "assistant",
            content: botResponse,
          },
        ]);
      } catch (error) {
        console.error(
          "❌ Error al comunicarse con Sasha:",
          error
        );

        setMessages((current) => [
          ...current,
          {
            from: "bot",
            text:
              error?.message ||
              "No fue posible conectar con Sasha. Inténtalo nuevamente.",
          },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [history, typing]
  );

  /* =========================
     NUEVA CONVERSACIÓN
  ========================== */

  const clearChat = useCallback(() => {
    setMessages([initialMessage]);
    setHistory([]);
    setInput("");
    setTyping(false);
  }, [initialMessage]);

  /* =========================
     RENDER
  ========================== */

  return (
    <>
      {/* BOTÓN FLOTANTE */}

      <Tooltip title="Abrir Sasha" placement="right">
        <Fab
          aria-label="Abrir Sasha"
          disableRipple
          disableFocusRipple
          disableTouchRipple
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 16,
            left: 16,
            zIndex: 1200,

            width: 52,
            height: 52,

            bgcolor: isDark
              ? theme.palette.grey[900]
              : theme.palette.primary.main,

            color: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",

            transition: "transform 0.2s ease",

            "&:hover": {
              bgcolor: isDark
                ? theme.palette.grey[800]
                : theme.palette.primary.dark,
            },

            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          <SmartToyIcon />
        </Fab>
      </Tooltip>

      {/* OVERLAY */}

      {open && (
        <Box
          onClick={() => setOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: theme.zIndex.modal + 1,
            bgcolor: "rgba(0,0,0,0.18)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* CHAT */}

      {open && (
        <Paper
          onClick={(e) => e.stopPropagation()}
          elevation={0}
          sx={{
            position: "fixed",
            zIndex: theme.zIndex.modal + 2,

            display: "flex",
            flexDirection: "column",

            minHeight: 0,
            overflow: "hidden",

            borderRadius: 3,

            border: `1px solid ${
              isDark
                ? "rgba(255,255,255,0.10)"
                : "rgba(0,0,0,0.08)"
            }`,

            boxShadow: isDark
              ? "0 18px 50px rgba(0,0,0,0.55)"
              : "0 18px 50px rgba(0,0,0,0.18)",

            ...(isLandscape
              ? {
                  inset: "72px 0 10px",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: 640,
                }
              : {
                  bottom: 90,
                  left: 16,
                  width: {
                    xs: "calc(100% - 32px)",
                    sm: 360,
                  },
                  height: {
                    xs: 520,
                    sm: 540,
                  },
                }),
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              px: 1.5,
              py: 1.15,

              bgcolor: primaryBg,
              color: "#fff",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <SmartToyIcon fontSize="small" />

              <Typography
                fontWeight={700}
                sx={{ letterSpacing: "0.01em" }}
              >
                Sasha
              </Typography>
            </Box>

            <Box>
              <IconButton
                size="small"
                aria-label="Nueva conversación"
                onClick={clearChat}
                sx={{
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.10)",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                aria-label="Cerrar Sasha"
                onClick={() => setOpen(false)}
                sx={{
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.10)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* MENSAJES */}

          <Box
            sx={{
              flex: "1 1 0",
              minHeight: 0,
              height: 0,

              p: 1.25,

              overflowY: "auto",
              overflowX: "hidden",

              WebkitOverflowScrolling: "touch",

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
                    mb: 1.1,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      minWidth: 0,

                      px: 1.6,
                      py: 1.1,

                      borderRadius: isUser
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",

                      bgcolor: isUser
                        ? theme.palette.primary.main
                        : isDark
                        ? "rgba(255,255,255,0.09)"
                        : "rgba(0,0,0,0.055)",

                      color: isUser
                        ? "#fff"
                        : theme.palette.text.primary,

                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",

                      border: isUser
                        ? "none"
                        : `1px solid ${
                            isDark
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.04)"
                          }`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.92rem",
                          sm: "0.95rem",
                        },

                        lineHeight: 1.55,
                        fontWeight: 400,
                        letterSpacing: "0.005em",

                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {/* ESCRIBIENDO */}

            {typing && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  px: 0.5,
                  opacity: 0.65,
                  color: theme.palette.text.secondary,
                }}
              >
                {t.chatbot.typing}
              </Typography>
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

              borderTop: `1px solid ${
                isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.07)"
              }`,
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
              inputProps={{
                maxLength: MAX_MESSAGE_LENGTH,
              }}
              placeholder={t.chatbot.placeholder}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                },
              }}
            />

            <IconButton
              aria-label="Enviar mensaje"
              disabled={typing || !input.trim()}
              onClick={() => sendMessage(input)}
              sx={{
                width: 42,
                height: 42,

                color: "#03A9F4",

                "&:hover": {
                  bgcolor: "rgba(3,169,244,0.08)",
                },
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
