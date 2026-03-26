/* =========================
CONFIG
========================= */
export const WHATSAPP_URL =
  "https://wa.me/593997979099?text=Hola%20Jorge%20,%20vi%20tu%20portafolio";

/* =========================
UTILIDADES
========================= */
export const delay = () => Math.floor(Math.random() * 500) + 400;
export const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const YES_WORDS = ["sí", "si", "claro", "ok", "dale", "okey"];
export const NO_WORDS = ["no", "ahora no", "luego"];

/* =========================
MEMORIA
========================= */
export const MEMORY_LIMIT = 10;

export const saveMemory = (ctx, data) => {
  const memory = [...(ctx.memory || [])];
  memory.push(data);
  if (memory.length > MEMORY_LIMIT) memory.shift();
  ctx.memory = memory;
};

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
  
  tools: [
    "Git",
    "NextDNS",
    "Postman",
    "Virtualbox",
    "Linux",
    "AnyDesk",
    "Vercel",
    "Microsoft Office",
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
  "¿Qué experiencia tiene Jorge?",
  "¿Qué estudios tiene Jorge?",
  "¿En qué tecnologías trabaja Jorge?",
  "¿Jorge Es Full Stack?",
  "Cuéntame sobre los proyectos de Jorge",
  "¿Por qué contratar a Jorge?",
  "¿Cómo puedo contactar a Jorge?",
  "¿Quién te creó?",

];

/* =========================
INTENCIONES
========================= */
export const INTENTS = {
  GRA: ["Gracias"],
  
  TOOLS : [
  "herramientas",
  "tools",
  "herramientas técnicas",
  "qué herramientas usas",
  "qué herramientas dominas",
],

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

  LIKES_MUSIC: ["música", "musica"],
  LIKES_MOVIES: ["películas", "peliculas"],
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

  MOOD: ["cómo estás", "como estas", "estás bien"],
  HAPPY: ["feliz"],

  NAME: ["cómo te llamas", "como te llamas", "tu nombre"],
  HUMAN: ["eres humana", "eres humano", "robot"],
  ASSISTANT: ["quién eres", "quien eres", "sasha"],
  CREATOR: ["quién te creó", "quien te creo", "quien te hizo"],
  BOOK: ["sus libros favoritos", "libros favoritos", "libros"],

  HELP: [
    "qué puedes hacer",
    "que puedes hacer",
    "buenas tardes",
    "buenas noches",
  ],

  FAREWELL: ["adiós", "hasta luego", "bye", "chao"],

  GREETING: ["hola", "buenas", "buenos días"],
  PROFILE: ["jorge", "perfil"],
  EDUCATION: ["estudios", "máster", "formación", "estudio","formacion", "educación", "educacion"],
  EXPERIENCE: ["experiencia"],
  SKILLS: ["tecnologías", "lenguajes", "habilidades","tecnología"],
  STACK: ["full stack"],
  PROJECTS: ["proyectos", "proyecto"],
  MOTIVATION: ["contratar"],
  CONTACT: ["contactar", "whatsapp", "contacto"],
};

/* =========================
NORMALIZACIÓN
========================= */
export const normalize = (t = "") =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* =========================
DETECT INTENT
========================= */
export const detectIntent = (msg) => {
  const text = normalize(msg);
  const words = text.split(" ");

  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;

    for (const word of INTENTS[intent]) {
      const w = normalize(word);

      // 👉 si es frase (tiene espacio)
      if (w.includes(" ")) {
        if (text.includes(w)) {
          score += 2;
        }
      } 
      // 👉 si es palabra
      else {
        if (words.includes(w)) {
          score += 1;
        }
      }
    }

    if (score > max) {
      max = score;
      best = intent;
    }
  }

  return max ? best : "UNKNOWN";
};

/* =========================
FOLLOW UP
========================= */
export const followUp = (intent) =>
  ({
    PROFILE: "¿Quieres conocer su experiencia profesional?\n👉 Responde \"si\" u \"ok\"",
    EXPERIENCE: "¿Te muestro las tecnologías que utiliza?\n👉 Responde \"si\" u \"ok\"",
    SKILLS: "¿Quieres saber en qué proyectos aplica estas tecnologías?\n👉 Responde \"si\" u \"ok\"",
    PROJECTS: null,
  }[intent] || null);

export const isValidFarewell = (text) => {
  const t = normalize(text);

  const valid = [
    "chao",
    "chau",
    "bye",
    "adios",
    "hasta luego",
    "chao sasha",
    "bye sasha",
    "adios sasha",
  ];

  return valid.includes(t);
};

/* =========================
REPETICIÓN
========================= */
export const pickNonRepeated = (ctx = {}, intent, options) => {
  if (!ctx.usedReplies) ctx.usedReplies = {};
  if (!ctx.usedReplies[intent]) ctx.usedReplies[intent] = [];

  const unused = options.filter(
    (opt) => !ctx.usedReplies[intent].includes(opt)
  );

  const choice = unused.length
    ? randomPick(unused)
    : randomPick(options);

  ctx.usedReplies[intent].push(choice);

  if (ctx.usedReplies[intent].length >= options.length) {
    ctx.usedReplies[intent] = [];
  }

  return choice;
};
    
