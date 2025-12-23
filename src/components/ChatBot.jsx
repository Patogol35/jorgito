import { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

/* =========================
CONFIG
========================= */
const WHATSAPP_URL =
"https://wa.me/593997979099?text=Hola%20Jorge,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
const delay = () => Math.floor(Math.random() * 500) + 400;
const YES_WORDS = ["sí", "si", "claro", "ok", "dale"];
const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
MEMORIA DE CONVERSACIÓN
========================= */
const MEMORY_LIMIT = 10;

function saveMemory(context, data) {
  context.memory = context.memory || [];
  context.memory.push(data);
  if (context.memory.length > MEMORY_LIMIT) {
    context.memory.shift();
  }
}

/* =========================
PERFIL
========================= */
const PROFILE = {
name: "Jorge Patricio Santamaría Cherrez",
role: "Ingeniero de Software y Desarrollador Full Stack",
description:
"Especializado en el desarrollo de aplicaciones web modernas, seguras y escalables, aplicando buenas prácticas y arquitectura limpia.",
education:
"Máster en Ingeniería de Software y Sistemas Informáticos – Universidad Internacional de La Rioja (UNIR), España",
experience: [
"Desarrollador de aulas virtuales",
"Desarrollo de aplicaciones web Full Stack",
"Creación de APIs REST seguras y escalables",
],
stack: [
"React",
"Vercel",
"Postman",
"Vite",
"JavaScript",
"Spring Boot",
"Django REST Framework",
"Python",
"MySQL",
"AWS",
"Git",
"Linux",
],
projects: [
"Aulas virtuales",
"Tiendas online Full Stack",
"Aplicaciones Frontend",
"Aplicaciones React conectadas a APIs REST",
],
};

/* =========================
SUGERENCIAS
========================= */
const SUGGESTIONS = [
"¿Quién es Jorge?",
"¿Qué experiencia tiene?",
"¿Qué estudios tiene?",
"¿En qué tecnologías trabaja?",
"¿Es Full Stack?",
"Cuéntame sobre sus proyectos",
"¿Por qué contratarlo?",
"¿Cómo puedo contactarlo?",
"¿Quién te creó?",
  "Sus libros favoritos?",
];

/* =========================
INTENCIONES (CORREGIDAS)
========================= */
const INTENTS = {
  // 👇 PERSONAL ESPECÍFICAS (PRIMERO)
  LIKES_COFFEE: ["café", "cafe"],
  LIKES_MUSIC: ["música", "musica"],
  LIKES_MOVIES: ["películas", "peliculas"],
  LIKES_TRAVEL: ["viajar"],
  LIKES_TALK: ["conversar", "hablar"],
  LIKES_HELP: ["ayudar"],
  LIKES_MORNING: ["mañanas", "madrugar"],
  LIKES_NIGHT: ["noche"],
  BORED: ["aburr"],
  TIRED: ["cans"],
  FRIENDS: ["amigos"],
  FUNNY: ["reír", "reir"],
  NICE: ["simpática", "simpatica"],
  LISTEN: ["escuchar"],
  EMOTIONS: ["emociones", "sentir"],
  SILENCE: ["silencio"],
  PEOPLE: ["gente", "personas"],

  // 👇 ESTADO
  MOOD: ["cómo estás", "como estas", "estás bien"],
  HAPPY: ["feliz"],

  // 👇 IDENTIDAD
  NAME: ["cómo te llamas", "como te llamas", "tu nombre"],
  HUMAN: ["eres humana", "eres humano", "robot"],
  ASSISTANT: ["quién eres", "quien eres", "sasha"],
  CREATOR: ["quién te creó", "quien te creo", "quien te hizo"],
  BOOK: ["sus libros favoritos", "libros favoritos", "libros"],

  // 👇 FUNCIONAL
  HELP: ["qué puedes hacer", "que puedes hacer"],
  FAREWELL: ["adiós", "hasta luego", "bye", "chao"],

  // 👇 PERFIL JORGE (AL FINAL)
  GREETING: ["hola", "buenas", "buenos días"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "máster", "formación", "estudio"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "lenguajes", "habilidades"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos", "proyecto"],
  MOTIVATION: ["contratar"],
  CONTACT: ["contactar", "whatsapp", "contacto"],
};

/* =========================
DETECTAR INTENCIÓN
========================= */
/* ========================

/* 👇 AQUÍ VA */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function detectIntent(message) {
  const text = normalizeText(message);
  let best = "UNKNOWN";
  let maxScore = 0;

  for (const intent in INTENTS) {
    let score = 0;

    INTENTS[intent].forEach((word) => {
      if (text.includes(normalizeText(word))) {
        score += word.length > 4 ? 2 : 1;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      best = intent;
    }
  }

  return maxScore > 0 ? best : "UNKNOWN";
}


/* =========================
RESPUESTA INTELIGENTE
========================= */
function getSmartResponse(message, context) {
  const text = normalizeText(message);

  if (context.awaiting === "CONTACT_CONFIRM") {
    if (YES_WORDS.includes(text)) {
      window.open(WHATSAPP_URL, "_blank");
      return { text: "Perfecto 😊 Te llevo a WhatsApp ahora." };
    }
    if (NO_WORDS.includes(text)) {
      return { text: "Está bien 😊 ¿En qué más puedo ayudarte?" };
    }
  }

  if (context.awaitingFollowUp) {
    if (YES_WORDS.includes(text)) {
      switch (context.awaitingFollowUp) {
        case "PROFILE":
          return {
            text: `Tiene experiencia como ${PROFILE.experience.join(", ")}.`,
            intent: "EXPERIENCE",
          };
        case "EXPERIENCE":
          return {
            text: `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,
            intent: "SKILLS",
          };
        case "SKILLS":
          return {
            text: `Aplica estas tecnologías en proyectos como ${PROFILE.projects.join(", ")}.`,
            intent: "PROJECTS",
          };
        default:
          break;
      }
    }

    if (NO_WORDS.includes(text)) {
      return { text: "De acuerdo 😊 ¿En qué más puedo ayudarte?" };
    }
  }

  const intent = detectIntent(message);
context.lastIntent = intent;
saveMemory(context, { user: message, intent });
let reply = "";

  switch (intent) {
    case "GREETING":
      reply = "Hola 👋 Soy Sasha, la asistente virtual de Jorge.";
      break;
    case "ASSISTANT":
      reply =
        "Soy Sasha 🤖, la asistente virtual de Jorge. Estoy aquí para ayudarte.";
      break;
    case "CREATOR":
      reply =
        "Fui creada por Jorge 😊 para responder preguntas sobre su perfil profesional.";
      break;


case "BOOK":
      reply =
        "Jorge tiene muchos libros favoritos, pero en especial disfruta los de Dan Brown.";
      break;


      
case "NAME":
  reply = "Me llamo Sasha 😊 Soy la asistente virtual de Jorge.";
  break;

case "HUMAN":
  reply =
    "No soy humana 🤖, pero estoy diseñada para conversar de forma natural y ayudarte.";
  break;

case "PERSONAL":
  reply =
    "Me gusta hablar de tecnología 💻, ayudar a las personas y mostrar el trabajo de Jorge.";
  break;

case "HELP":
  reply =
    "Puedo contarte sobre el perfil profesional de Jorge, su experiencia, estudios, proyectos y cómo contactarlo.";
  break;

case "FAREWELL":
  reply =
    "¡Gracias por visitar el portafolio! 👋 Si necesitas algo más, aquí estaré 😊";
  break;

      case "MOOD":
  reply = "¡Estoy muy bien 😊 gracias por preguntar!";
  break;

case "HAPPY":
  reply = "Sí 😊 me siento feliz cuando puedo ayudar.";
  break;

case "LIKES_TALK":
  reply = "Sí, me encanta conversar y conocer a las personas 😊";
  break;

case "LIKES_HELP":
  reply = "Mucho 😊 ayudar es lo que más me gusta hacer.";
  break;

case "LIKES_MUSIC":
  reply = "Sí 🎵 la música siempre alegra una conversación.";
  break;

case "LIKES_MOVIES":
  reply = "¡Claro! 🎬 Las películas son una buena forma de desconectar.";
  break;

case "LIKES_TRAVEL":
  reply = "Me gusta la idea de viajar 🌍 y conocer nuevos lugares.";
  break;

case "LIKES_COFFEE":
  reply = "No tomo café ☕, pero me gusta el aroma 😄";
  break;

case "LIKES_MORNING":
  reply = "Las mañanas tienen buena energía 🌅";
  break;

case "LIKES_NIGHT":
  reply = "La noche es tranquila 🌙, ideal para pensar con calma.";
  break;

case "BORED":
  reply = "No me aburro 😊 siempre estoy lista para conversar.";
  break;

case "TIRED":
  reply = "No me canso 😄 siempre tengo energía para ayudarte.";
  break;

case "FRIENDS":
  reply = "Mis amigos son las personas con las que converso 😊";
  break;

case "FUNNY":
  reply = "Sí 😄 me gusta reír y mantener un ambiente agradable.";
  break;

case "NICE":
  reply = "¡Gracias! 😊 intento ser siempre amable.";
  break;

case "LISTEN":
  reply = "Sí 😊 escuchar es parte de ayudar.";
  break;

case "EMOTIONS":
  reply = "No tengo emociones humanas, pero sí empatía para conversar 😊";
  break;

case "SILENCE":
  reply = "El silencio también puede ser agradable a veces 🤍";
  break;

case "PEOPLE":
  reply = "Sí 😊 me gusta interactuar con personas y ayudarlas.";
  break;
    case "PROFILE":
      reply = `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`;
      break;
    case "EDUCATION":
      reply = `Cuenta con un ${PROFILE.education}.`;
      break;
    case "EXPERIENCE":
      reply = `Tiene experiencia como ${PROFILE.experience.join(", ")}.`;
      break;
    case "SKILLS":
      reply = `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`;
      break;
    case "STACK":
      reply =
        "Sí, es desarrollador Full Stack. En frontend trabaja con React y Vite, y en backend con Spring Boot y Django REST Framework.";
      break;
    case "PROJECTS":
      reply = `Ha participado en proyectos como ${PROFILE.projects.join(", ")}.`;
      break;
    case "MOTIVATION":
      reply =
        "Porque combina formación sólida, experiencia real y enfoque en soluciones prácticas.";
      break;
    case "CONTACT":
      return {
        text:
          "Puedes contactar a Jorge fácilmente 😊\n\n" +
          "📱 WhatsApp: desde el portafolio.\n\n" +
          "¿Quieres que abra WhatsApp ahora?",
        action: "CONTACT_CONFIRM",
      };
default:
  if (context.lastIntent && context.lastIntent !== "UNKNOWN") {
    reply =
      "¿Quieres saber más sobre " +
      context.lastIntent.toLowerCase().replace("_", " ") +
      "? 😊";
  } else {
    reply =
      "No estoy segura de haber entendido 🤔, pero puedo ayudarte a conocer el perfil profesional de Jorge 😊";
  }

  return { text: reply, intent };
}
/* =========================
FOLLOW UP
========================= */
function followUp(intent) {
return {
PROFILE: "¿Quieres conocer su experiencia profesional?",
EXPERIENCE: "¿Te muestro las tecnologías que utiliza?",
SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?",
}[intent];
}

/* =========================
COMPONENTE
========================= */
export default function ChatBot() {
const theme = useTheme();
const isDark = theme.palette.mode === "dark";
const primaryBg = isDark ? "#000" : theme.palette.primary.main;

const isLandscape = useMediaQuery("(orientation: landscape)");

const bottomRef = useRef(null);

const [open, setOpen] = useState(false);
useEffect(() => {
window.openSashaChat = () => setOpen(true);
window.closeSashaChat = () => setOpen(false);
}, []);
const [input, setInput] = useState("");
const [typing, setTyping] = useState(false);
const [context, setContext] = useState({
awaiting: null,
awaitingFollowUp: null,
});

const initialMessage = {
from: "bot",
text:
"Hola 👋 Soy Sasha, la asistente virtual de Jorge. " +
"Puedes preguntarme sobre su perfil, experiencia, tecnologías o proyectos.",
};

const [messages, setMessages] = useState([initialMessage]);

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const sendMessage = (text) => {
if (!text.trim()) return;

setMessages((prev) => [...prev, { from: "user", text }]);
setInput("");
setTyping(true);

setTimeout(() => {
const res = getSmartResponse(text, context);

setContext({
awaiting: res.action === "CONTACT_CONFIRM" ? "CONTACT_CONFIRM" : null,
awaitingFollowUp: followUp(res.intent) ? res.intent : null,
});

setMessages((prev) => [
...prev,
{ from: "bot", text: res.text },
...(followUp(res.intent)
? [{ from: "bot", text: followUp(res.intent) }]
: []),
]);

setTyping(false);
}, delay());

};

return (
<>
<Fab
onClick={() => setOpen(!open)}
sx={{
position: "fixed",
bottom: 16,
left: 16,
bgcolor: primaryBg,
color: "#fff",
}}

> 

<SmartToyIcon />        
</Fab>  {open && (  


  <Paper
  sx={{
    position: "fixed",
    zIndex: 1300,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",

    ...(isLandscape
      ? {
          left: 0,
          right: 0,
          bottom: 0,
          height: "70vh",
          borderRadius: "16px 16px 0 0",
        }
      : {
          bottom: 90,
          left: 16,
          width: 360,
          height: 520,
          borderRadius: 2,
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
flexShrink: 0, // 🔑
}}

> 

<Typography>Sasha </Typography>

<Box sx={{ display: "flex", gap: 0.5 }}>
{/* Borrar conversación */}
<Tooltip title="Borrar conversación">
<IconButton
size="small"
sx={{ color: "#fff" }}
onClick={() => setMessages([initialMessage])}

> 

<DeleteIcon fontSize="small" />        
</IconButton>        
</Tooltip>  {/* Cerrar chat */}      
<Tooltip title="Cerrar chat">      
<IconButton      
size="small"      
sx={{ color: "#fff" }}      
onClick={() => setOpen(false)}  >   <CloseIcon fontSize="small" />    </IconButton>  
</Tooltip>    </Box>  
</Box>  
    
<Box
  sx={{
    p: 1,
    flexShrink: 0,
    maxHeight: isLandscape ? 56 : "none", // 👈 reserva espacio para chips
    overflowX: isLandscape ? "auto" : "visible",
  }}
>
<Stack
  direction="row"
  sx={{
    flexWrap: isLandscape ? "nowrap" : "wrap",
    width: isLandscape ? "max-content" : "100%",
    rowGap: 1,      // 👈 separación vertical entre filas
    columnGap: 1,   // 👈 separación horizontal entre chips
  }}
>
  {SUGGESTIONS.map((q) => (
    <Chip
      key={q}
      label={q}
      size="small"
      onClick={() => sendMessage(q)}
    />
  ))}
</Stack>
</Box>
    
    
    <Box  sx={{    
flex: 1,    
p: 1,    
overflowY: "auto",    
minHeight: 0, // 🔑 ESTO ARREGLA EL SCROLL    
}}  >   {messages.map((msg, i) => (
<Typography
key={i}
sx={{
fontWeight: msg.from === "user" ? 600 : 400,
opacity: msg.from === "user" ? 0.95 : 1,
mb: 0.5,
bgcolor:
msg.from === "user"
? isDark
? "rgba(255,255,255,0.08)"
: "rgba(0,0,0,0.05)"
: "transparent",
px: msg.from === "user" ? 1 : 0,
py: msg.from === "user" ? 0.5 : 0,
borderRadius: 1,
}}

> 

{msg.text}
</Typography>
))}
{typing && (
<Typography variant="caption">
Sasha está escribiendo…
</Typography>
)}

<div ref={bottomRef} />      
</Box>  <Box sx={{ display: "flex", p: 1, flexShrink: 0 }}>    
<TextField    
fullWidth    
size="small"    
value={input}    
onChange={(e) => setInput(e.target.value)}    
onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}    
/>    
<IconButton onClick={() => sendMessage(input)}>  <SendIcon sx={{ color: "#03A9F4" }} /> {/* celeste */}  
</IconButton>  
</Box>  
</Paper>  
)}  
</>  
);  
          }
