/* =========================
CONFIG
========================= */
export const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge%20,%20vi%20tu%20portafolio";

/* =========================
PALABRAS CLAVE
========================= */
export const YES_WORDS = ["sí", "si", "claro", "ok", "dale", "okey"];
export const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
PERFIL
========================= */
export const PROFILE = {
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
export const SUGGESTIONS = [
  "¿Quién es Jorge?",
  "¿Qué experiencia tiene?",
  "¿Qué estudios tiene?",
  "¿En qué tecnologías trabaja?",
  "¿Es Full Stack?",
  "Cuéntame sobre sus proyectos",
  "¿Por qué contratar a Jorge?",
  "¿Cómo puedo contactar a Jorge?",
  "¿Quién te creó?",
  "Sus libros favoritos?",
];

/* =========================
INTENCIONES
========================= */
export const INTENTS = {
  GRA: ["Gracias"],
  WHAT_DOING: [
    "que haces",
    "qué haces",
    "que estas haciendo",
    "qué estás haciendo",
    "en que estas",
    "en qué estás",
    "que andas haciendo",
    "qué andas haciendo",
  ],
  LIKES_TALK: ["conversar", "hablar"],
  LIKES_HELP: ["ayudar"],
  BOOK: ["sus libros favoritos", "libros favoritos", "libros"],
  MOOD: ["cómo estás", "como estas", "estás bien"],
  HAPPY: ["feliz"],
  NAME: ["cómo te llamas", "como te llamas", "tu nombre"],
  HUMAN: ["eres humana", "eres humano", "robot"],
  ASSISTANT: ["quién eres", "quien eres", "sasha"],
  CREATOR: ["quién te creó", "quien te creo", "quien te hizo"],
  HELP: [
    "qué puedes hacer",
    "que puedes hacer",
    "buenas tardes",
    "buenas noches",
  ],
  FAREWELL: ["adiós", "hasta luego", "bye", "chao"],
  GREETING: ["hola", "buenas", "buenos días"],
  PROFILE: ["jorge", "perfil", "patricio"],
  EDUCATION: ["estudios", "máster", "formación", "educación"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "lenguajes", "habilidades"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos"],
  MOTIVATION: ["contratar"],
  CONTACT: ["contactar", "whatsapp", "contacto"],
};
