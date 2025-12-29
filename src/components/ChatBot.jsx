import { useState, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const YES_WORDS = ["si", "sí", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

const normalize = (t = "") =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* =========================
MEMORIA
========================= */
const saveMemory = (ctx, data) => {
  ctx.memory = ctx.memory ?? [];
  ctx.memory.push(data);
  if (ctx.memory.length > 10) ctx.memory.shift();
};

/* =========================
PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables.",
  education:
    "Máster en Ingeniería de Software – UNIR, España",
  experience: [
    "Aulas virtuales",
    "Aplicaciones Full Stack",
    "APIs REST seguras",
  ],
  stack: [
    "React",
    "JavaScript",
    "Spring Boot",
    "Django REST",
    "Python",
    "MySQL",
    "AWS",
  ],
  projects: [
    "Aulas virtuales",
    "Tiendas online",
    "Aplicaciones React + API",
  ],
};

/* =========================
INTENCIONES
========================= */
const INTENTS = {
  GREETING: ["hola", "buenos dias", "buenas"],
  THANKS: ["gracias"],
  MOOD: ["como estas", "estas bien"],
  WHAT_DOING: ["que haces"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "formacion"],
  EXPERIENCE: ["experiencia"],
  TECH_STACK: ["tecnologias", "stack"],
  FULLSTACK: ["full stack"],
  PROJECTS: ["proyectos"],
  CONTACT: ["contacto", "whatsapp"],
};

/* =========================
DETECTAR INTENCIÓN
========================= */
const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    for (const key of INTENTS[intent]) {
      if (text.includes(normalize(key))) score++;
    }
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return best;
};

/* =========================
RESPUESTAS
========================= */
const replies = {
  GREETING: () => "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
  THANKS: () => "¡Con gusto 😊!",
  MOOD: () => "¡Estoy muy bien 😊!",
  WHAT_DOING: () => "Aquí contigo, lista para ayudarte 💕",
  PROFILE: () =>
    `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
  EDUCATION: () => PROFILE.education,
  EXPERIENCE: () => PROFILE.experience.join(", "),
  TECH_STACK: () => PROFILE.stack.join(", "),
  FULLSTACK: () =>
    "Sí 😊 Jorge es Full Stack y trabaja frontend y backend",
  PROJECTS: () => PROFILE.projects.join(", "),
  CONTACT: () => ({
    text: "📱 ¿Quieres que abra WhatsApp ahora?",
    action: "CONTACT_CONFIRM",
  }),
};

/* =========================
BOT ENGINE
========================= */
function getSmartResponse(message, context) {
  const text = normalize(message);
  const intent = detectIntent(text);

  saveMemory(context, { user: text, intent });

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.some((w) => text.includes(w))) {
      context.awaiting = null;
      return {
        text: "Perfecto 😊 Te llevo a WhatsApp.",
        action: "OPEN_WHATSAPP",
        url: WHATSAPP_URL,
      };
    }
    if (NO_WORDS.some((w) => text.includes(w))) {
      context.awaiting = null;
      return { text: "Está bien 😊" };
    }
  }

  if (intent === "CONTACT") {
    context.awaiting = "CONTACT_CONFIRM";
    return replies.CONTACT();
  }

  if (typeof replies[intent] === "function") {
    return { text: replies[intent]() };
  }

  return {
    text:
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
  };
}

/* =========================
COMPONENTE REACT
========================= */
export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 Soy Sasha, ¿en qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const contextRef = useRef({});

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const res = getSmartResponse(input, contextRef.current);
    const botMsg = { from: "bot", text: res.text };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");

    if (res.action === "OPEN_WHATSAPP") {
      window.open(res.url, "_blank");
    }
  };

  return (
    <Box
      sx={{
        width: 360,
        height: 500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="h6">Sasha 🤖</Typography>
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <Typography
            key={i}
            sx={{
              mb: 1,
              textAlign: m.from === "user" ? "right" : "left",
            }}
          >
            <b>{m.from === "user" ? "Tú" : "Sasha"}:</b> {m.text}
          </Typography>
        ))}
      </Box>

      <Box sx={{ p: 1, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe un mensaje..."
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
    }

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
    }, delay());
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
        }}
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
          </Box>

          {/* SUGERENCIAS */}
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
                  <Chip
                    key={q}
                    label={q}
                    size="small"
                    onClick={() => sendMessage(q)}
                  />
                ))}
              </Stack>
            )}
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
