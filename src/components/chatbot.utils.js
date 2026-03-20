import {
  BOT_NAME,
  OWNER_KEYWORDS,
  OWNER_NAMES,
  VALID_OWNER_PHRASES,
} from "./chatbot.config";

export const normalize = (str = "") =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const delay = () => 500 + Math.floor(Math.random() * 700);

// ✅ CORREGIDO
export const includesAny = (text, words = []) => {
  const normalizedText = ` ${normalize(text)} `;

  return words.some((word) => {
    const normalizedWord = ` ${normalize(word)} `;
    return normalizedText.includes(normalizedWord);
  });
};

export const isForBot = (rawName = "", botName = BOT_NAME) => {
  const name = normalize(rawName.trim());
  return !name || name === normalize(botName);
};

export const handleNamedPattern = ({
  text,
  regex,
  onValid,
  fallbackResponse,
  botName = BOT_NAME,
}) => {
  const match = text.match(regex);
  if (!match) return null;

  if (isForBot(match[2] || "", botName)) {
    return onValid();
  }

  return fallbackResponse;
};

export const isValidFarewell = (text) => {
  const t = normalize(text);

  const exactFarewells = [
    "adios",
    "adiós",
    "chao",
    "chau",
    "hasta luego",
    "nos vemos",
    "bye",
    "hasta pronto",
  ].map(normalize);

  return exactFarewells.includes(t);
};

export const isAboutOwner = (text) => {
  const validNames = ["jorge", "patricio", "jorge patricio"];
  const t = text.toLowerCase().trim();

  const words = t.split(/\s+/).filter(Boolean);

  // 🔍 Detectar "de alguien"
  const matchDe = t.match(/\bde\s+([a-z\s]+)/);
  if (matchDe) {
    const name = matchDe[1].trim();
    return validNames.includes(name);
  }

  // 🔍 Detectar si hay nombres inválidos
  const hasInvalidName = words.some((word) => {
    // ignorar palabras cortas
    if (word.length <= 2) return false;

    // ignorar keywords conocidas
    if ([
      "proyectos","proyecto","experiencia","formacion","formación",
      "educacion","educación","perfil","stack","habilidades",
      "tecnologias","tecnología","tecnologias","tecnologías",
      "contacto","contactar","whatsapp","estudios","libros",
      "full","fullstack","desarrollador","ingeniero","master","máster",
      "mi","mis","tu","tus","sus"
    ].includes(word)) return false;

    // ignorar nombres válidos
    if (validNames.some(n => n.includes(word))) return false;

    // 🚨 cualquier otra palabra → posible nombre inválido
    return true;
  });

  if (hasInvalidName) return false;

  // ✅ Permitir frases normales (keywords)
  return true;
};
export const saveMemory = (ctx, entry) => {
  const memory = Array.isArray(ctx.memory) ? ctx.memory : [];
  const nextMemory = [...memory, { ...entry, at: Date.now() }].slice(-20);
  ctx.memory = nextMemory;
};
