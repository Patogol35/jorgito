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

import { SUGGESTIONS } from "./chatbot.config";

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN
|--------------------------------------------------------------------------
*/

// URL del backend de Sasha.
//
// En desarrollo:
// VITE_SASHA_API_URL=http://localhost:3000/api/chat
//
// En producción:
// VITE_SASHA_API_URL=https://tu-backend.onrender.com/api/chat
//
const API_URL = import.meta.env.VITE_SASHA_API_URL;

const MAX_MESSAGE_LENGTH = 1500;
const MAX_HISTORY_MESSAGES = 12;

/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

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

  /*
  |--------------------------------------------------------------------------
  | ESTADOS
  |--------------------------------------------------------------------------
  */

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);

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

  /*
  |--------------------------------------------------------------------------
  | FUNCIONES GLOBALES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    window.openSashaChat = () => setOpen(true);

    window.closeSashaChat = () => setOpen(false);

    return () => {
      delete window.openSashaChat;
      delete window.closeSashaChat;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | SCROLL AUTOMÁTICO
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | BLOQUEAR SCROLL DEL BODY
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | CONVERTIR HISTORIAL DEL FRONTEND AL FORMATO DEL BACKEND
  |--------------------------------------------------------------------------
  */

  const buildHistory = useCallback(
    (currentMessages) => {
      return currentMessages
        .filter(
          (message) =>
            message.from === "user" ||
            message.from === "bot"
        )
        .filter(
          (message) =>
            typeof message.text === "string" &&
            message.text.trim()
        )
        .slice(-MAX_HISTORY_MESSAGES)
        .map((message) => ({
          role:
            message.from === "user"
              ? "user"
              : "assistant",

          content: message.text.trim(),
        }));
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | ENVIAR MENSAJE
  |--------------------------------------------------------------------------
  */

  const sendMessage = useCallback(
    async (text) => {
      const userMessage = text.trim();

      /*
      |--------------------------------------------------------------------------
      | VALIDACIONES FRONTEND
      |--------------------------------------------------------------------------
      */

      if (!userMessage) {
        return;
      }

      if (typing) {
        return;
      }

      if (userMessage.length > MAX_MESSAGE_LENGTH) {
        setMessages((prev) => [
          ...prev,
          {
            from: "user",
            text: userMessage,
          },
          {
            from: "bot",
            text: `Tu mensaje es demasiado largo. El máximo permitido es de ${MAX_MESSAGE_LENGTH} caracteres.`,
          },
        ]);

        setInput("");

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | MENSAJE DEL USUARIO
      |--------------------------------------------------------------------------
      */

      const userMessageObject = {
        from: "user",
        text: userMessage,
      };

      /*
      |--------------------------------------------------------------------------
      | HISTORIAL ANTES DE AGREGAR EL NUEVO MENSAJE
      |--------------------------------------------------------------------------
      |
      | El backend recibe el mensaje actual por separado.
      | Por eso el historial contiene únicamente los mensajes
      | anteriores.
      |
      */

      const history = buildHistory(messages);

      /*
      |--------------------------------------------------------------------------
      | ACTUALIZAR UI
      |--------------------------------------------------------------------------
      */

      setMessages((prev) => [
        ...prev,
        userMessageObject,
      ]);

      setInput("");

      setTyping(true);

      /*
      |--------------------------------------------------------------------------
      | PETICIÓN AL BACKEND
      |--------------------------------------------------------------------------
      */

      try {
        if (!API_URL) {
          throw new Error(
            "No está configurada VITE_SASHA_API_URL."
          );
        }

        const response = await fetch(API_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: userMessage,
            history,
          }),
        });

        /*
        |--------------------------------------------------------------------------
        | RATE LIMIT
        |--------------------------------------------------------------------------
        */

        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              from: "bot",
              text:
                "Estoy recibiendo muchas solicitudes en este momento 😅. " +
                "Inténtalo nuevamente en unos segundos.",
            },
          ]);

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | ERROR DE AUTENTICACIÓN / CONFIGURACIÓN
        |--------------------------------------------------------------------------
        */

        if (response.status === 401) {
          setMessages((prev) => [
            ...prev,
            {
              from: "bot",
              text:
                "No puedo conectarme con el servicio de inteligencia artificial en este momento.",
            },
          ]);

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | OTROS ERRORES HTTP
        |--------------------------------------------------------------------------
        */

        if (!response.ok) {
          let errorMessage =
            "No fue posible obtener una respuesta de Sasha.";

          try {
            const errorData =
              await response.json();

            if (errorData?.error) {
              errorMessage = errorData.error;
            }
          } catch {
            // Si el backend no devuelve JSON,
            // utilizamos el mensaje genérico.
          }

          throw new Error(errorMessage);
        }

        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        const data = await response.json();

        const botResponse =
          data?.response?.trim();

        if (!botResponse) {
          throw new Error(
            "Sasha no devolvió una respuesta válida."
          );
        }

        /*
        |--------------------------------------------------------------------------
        | AGREGAR RESPUESTA DE SASHA
        |--------------------------------------------------------------------------
        */

        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: botResponse,
          },
        ]);
      } catch (error) {
        console.error(
          "❌ Error comunicando con Sasha:",
          error
        );

        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text:
              error?.message ||
              "No pude conectarme con Sasha. Inténtalo nuevamente.",
          },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [
      messages,
      typing,
      buildHistory,
    ]
  );

  /*
  |--------------------------------------------------------------------------
  | LIMPIAR CHAT
  |--------------------------------------------------------------------------
  */

  const clearChat = useCallback(() => {
    setMessages([initialMessage]);

    setInput("");

    setTyping(false);
  }, [initialMessage]);

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* =========================================================
          BOTÓN FLOTANTE
      ========================================================= */}

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

      {/* =========================================================
          OVERLAY
      ========================================================= */}

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

      {/* =========================================================
          CHAT
      ========================================================= */}

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
          {/* =====================================================
              HEADER
          ===================================================== */}

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
              {/* LIMPIAR */}

              <IconButton
                size="small"
                sx={{
                  color: "#fff",
                }}
                onClick={clearChat}
                disabled={typing}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              {/* CERRAR */}

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

          {/* =====================================================
              SUGERENCIAS
          ===================================================== */}

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
                    onClick={() =>
                      sendMessage(q)
                    }
                    disabled={typing}
                    sx={{
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
              >
                {SUGGESTIONS.map((q) => (
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() =>
                      sendMessage(q)
                    }
                    disabled={typing}
                  />
                ))}
              </Stack>
            )}
          </Box>

          {/* =====================================================
              MENSAJES
          ===================================================== */}

          <Box
            sx={{
              flex: 1,

              p: 1,

              overflowY: "auto",
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
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",

                      px: 1.5,

                      py: 1,

                      borderRadius: 2,

                      bgcolor: isUser
                        ? theme.palette.primary
                            .main
                        : isDark
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(0,0,0,0.06)",

                      color: isUser
                        ? "#fff"
                        : "inherit",

                      whiteSpace:
                        "pre-line",

                      overflowWrap:
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
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {/* ===================================================
                INDICADOR DE ESCRITURA
            =================================================== */}

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

          {/* =====================================================
              INPUT
          ===================================================== */}

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
              onClick={() =>
                sendMessage(input)
              }
              disabled={
                typing ||
                !input.trim()
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
