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

export const includesAny = (text, words = []) => {
  const normalizedText = normalize(text);
  return words.some((word) => normalizedText.includes(normalize(word)));
};

export const isForBot = (rawName = "", botName = BOT_NAME) => {
  const name = normalize(rawName.trim());
  return !name || name === botName;
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

export const isAboutOwner = (input) => {
  const normalizedText = normalize(input);
  const words = normalizedText.split(/\s+/).filter(Boolean);

  if (OWNER_NAMES.some((name) => normalizedText.includes(name))) {
    return true;
  }

  const hasSensitiveKeyword = OWNER_KEYWORDS.some((kw) =>
    normalizedText.includes(kw)
  );

  if (!hasSensitiveKeyword) {
    return true;
  }

  if (VALID_OWNER_PHRASES.some((phrase) => normalizedText.includes(phrase))) {
    return true;
  }

  if (words.length === 1) {
    return true;
  }

  return false;
};

export const saveMemory = (ctx, entry) => {
  const memory = Array.isArray(ctx.memory) ? ctx.memory : [];
  const nextMemory = [...memory, { ...entry, at: Date.now() }].slice(-20);
  ctx.memory = nextMemory;
};
