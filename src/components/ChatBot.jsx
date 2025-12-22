import { useState, useEffect, useRef } from "react";
import {
  Box,
  Fab,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Slide,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme, useMediaQuery } from "@mui/material";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 400) + 300;

/* =========================
PERFIL
========================= */
const PROFILE = {
  name: "Jorge Patricio Santamaría Cherrez",
  role: "Ingeniero de Software y Desarrollador Full Stack",
  description:
    "Especializado en aplicaciones web modernas, seguras y escalables.",
  experience: [
    "Desarrollo Full Stack",
    "APIs REST",
    "Aulas virtuales",
  ],
  stack: ["React", "Spring Boot", "Django", "MySQL", "AWS"],
};

/* =========================
SUGERENCIAS
========================= */
const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué experiencia tiene?",
  "¿En qué tecnologías trabaja?",
  "¿Es Full Stack?",
  "¿Cómo contactarlo?",
];

/* =========================
RESPUESTAS
========================= */
function getResponse(msg) {
  const t = msg.toLowerCase();

  if (t.includes("quién") || t.includes("jorge"))
    return `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`;

  if (t.includes("experiencia"))
    return `Tiene experiencia en ${PROFILE.experience.join(", ")}.`;

  if (t.includes("tecnologías"))
    return `Trabaja con ${PROFILE.stack.join(", ")}.`;

  if (t.includes("contact"))
    return "Puedes contactarlo vía WhatsApp desde el portafolio 😊";

  return "Puedo contarte sobre Jorge, su experiencia o tecnologías 😊";
}

/* =========================
TRANSICIÓN
========================= */
const Transition = (props) => (
  <Slide direction="up" {...props} />
);

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
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hola 👋 Soy Sasha, la asistente virtual de Jorge.",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "bot", text: getResponse(text) },
      ]);
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
          zIndex: 1200,
        }}
      >
        <SmartToyIcon />
      </Fab>

      {/* DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={isLandscape}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            height: isLandscape ? "100%" : 520,
            width: isLandscape ? "100%" : 360,
            position: "absolute",
            bottom: isLandscape ? 0 : 80,
            left: isLandscape ? 0 : 16,
            borderRadius: isLandscape ? 0 : 3,
            display: "flex",
            flexDirection: "column",
          },
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
            <Tooltip title="Borrar">
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                onClick={() =>
                  setMessages([
                    { from: "bot", text: "Conversación reiniciada 😊" },
                  ])
                }
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              sx={{ color: "#fff" }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* SUGERENCIAS */}
        {!isLandscape && (
          <Box sx={{ p: 1 }}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {SUGGESTIONS.map((s) => (
                <Chip key={s} label={s} onClick={() => send(s)} />
              ))}
            </Stack>
          </Box>
        )}

        {/* MENSAJES */}
        <DialogContent
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 1,
          }}
        >
          {messages.map((m, i) => (
            <Typography
              key={i}
              sx={{
                mb: 0.5,
                fontWeight: m.from === "user" ? 600 : 400,
              }}
            >
              {m.text}
            </Typography>
          ))}
          <div ref={bottomRef} />
        </DialogContent>

        {/* INPUT */}
        <Box sx={{ display: "flex", p: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <IconButton onClick={() => send(input)}>
            <SendIcon />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
        }
