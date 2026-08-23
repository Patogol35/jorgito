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

const API_URL = "https://groqbot-lz9q.onrender.com/api/chat";

const MAX_MESSAGE_LENGTH = 1500;

/* =========================
   COMPONENTE
========================= */

export default function ChatBot() {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  const isLandscape = useMediaQuery(
    "(orientation: landscape)"
  );

  const primaryBg = useMemo(
    () =>
      isDark
        ? "#000"
        : theme.palette.primary.main,
    [isDark, theme]
  );

  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);

  /*
   * Historial que se envía al backend.
   *
   * El backend espera:
   *
   * {
   *   role: "user" | "assistant",
   *   content: "..."
   * }
   */
  const [history, setHistory] = useState([]);

  const initialMessage = useMemo(
    () => ({
      from: "bot",
      text:
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
        "Puedes preguntarme sobre su perfil, experiencia o proyectos.",
    }),
    []
  );

  const [messages, setMessages] = useState([
    initialMessage,
  ]);

  /* =========================
     ABRIR / CERRAR DESDE FUERA
  ========================= */

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
  ========================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }, 0);
    }
  }, [open]);

  /* =========================
     BLOQUEAR SCROLL DEL BODY
  ========================= */

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

  /* =========================
     ENVIAR MENSAJE
  ========================= */

  const sendMessage = useCallback(
    async (text) => {
      const userMessage = text.trim();

      if (!userMessage || typing) {
        return;
      }

      if (userMessage.length > MAX_MESSAGE_LENGTH) {
        setMessages((current) => [
          ...current,
          {
            from: "bot",
            text:
              `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
          },
        ]);

        return;
      }

      /*
       * Guardamos el historial actual antes
       * de agregar el nuevo mensaje.
       */
      const currentHistory = [...history];

      /*
       * Mostrar inmediatamente el mensaje
       * del usuario en la interfaz.
       */
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

        /*
         * Manejo específico del rate limit
         * enviado por tu backend.
         */
        if (response.status === 429) {
          throw new Error(
            data?.error ||
              "Sasha está recibiendo muchas solicitudes. Inténtalo nuevamente en unos segundos."
          );
        }

        /*
         * Otros errores HTTP.
         */
        if (!response.ok) {
          throw new Error(
            data?.error ||
              "No fue posible obtener una respuesta de Sasha."
          );
        }

        /*
         * Respuesta generada por Groq.
         */
        const botResponse =
          data?.response?.trim();

        if (!botResponse) {
          throw new Error(
            "Sasha no devolvió una respuesta."
          );
        }

        /*
         * Mostrar respuesta del bot.
         */
        setMessages((current) => [
          ...current,
          {
            from: "bot",
            text: botResponse,
          },
        ]);

        /*
         * Actualizar historial para la siguiente
         * pregunta.
         *
         * IMPORTANTE:
         * El backend utiliza "user" y "assistant".
         */
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
  ========================= */

  const clearChat = useCallback(() => {
    setMessages([initialMessage]);

    setHistory([]);

    setInput("");

    setTyping(false);
  }, [initialMessage]);

  /* =========================
     RENDER
  ========================= */

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
            zIndex: (theme) =>
              theme.zIndex.modal + 1,
          }}
        />
      )}

      {/* CHAT */}

      {open && (
        <Paper
          onClick={(e) =>
            e.stopPropagation()
          }
          sx={{
            position: "fixed",

            zIndex: (theme) =>
              theme.zIndex.modal + 2,

            display: "flex",

            flexDirection: "column",

            minHeight: 0,

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

              justifyContent:
                "space-between",

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
                onClick={clearChat}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  color: "#fff",
                }}
                onClick={() =>
                  setOpen(false)
                }
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

              p: 1,

              overflowY: "auto",

              overflowX: "hidden",

              WebkitOverflowScrolling:
                "touch",
            }}
          >
            {messages.map((m, i) => {
              const isUser =
                m.from === "user";

              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",

                    justifyContent:
                      isUser
                        ? "flex-end"
                        : "flex-start",

                    mb: 1,

                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",

                      minWidth: 0,

                      px: 1.5,

                      py: 1,

                      borderRadius: 2,

                      bgcolor: isUser
                        ? theme.palette
                            .primary.main
                        : isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.06)",

                      color: isUser
                        ? "#fff"
                        : "inherit",

                      whiteSpace:
                        "pre-wrap",

                      overflowWrap:
                        "anywhere",

                      wordBreak:
                        "break-word",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize:
                          isLandscape
                            ? "0.85rem"
                            : "0.95rem",

                        lineHeight:
                          isLandscape
                            ? 1.4
                            : 1.5,

                        whiteSpace:
                          "pre-wrap",

                        overflowWrap:
                          "anywhere",

                        wordBreak:
                          "break-word",
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {/* INDICADOR DE ESCRITURA */}

            {typing && (
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.7,

                  color:
                    theme.palette.text
                      .secondary,
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
              inputProps={{
                maxLength:
                  MAX_MESSAGE_LENGTH,
              }}
              placeholder="Escribe tu mensaje…"
            />

            <IconButton
              disabled={
                typing ||
                !input.trim()
              }
              onClick={() =>
                sendMessage(input)
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
