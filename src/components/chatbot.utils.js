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

export const isAboutOwner = (input) => {
  const normalizedText = normalize(input);

  // ✅ Si menciona explícitamente un nombre válido → OK
  if (OWNER_NAMES.some((name) => normalizedText.includes(normalize(name)))) {
    return true;
  }

  // 🔥 Detectar si el usuario menciona "de alguien"
  const nameMatch = normalizedText.match(/de\s+([a-z]+)/);

  if (nameMatch) {
    const name = nameMatch[1];

    // ❌ Si menciona un nombre que NO es Jorge → bloquear
    if (
      !OWNER_NAMES.some((n) =>
        normalize(n).includes(name)
      )
    ) {
      return false;
    }
  }

  // ✅ Frases válidas
  if (
    VALID_OWNER_PHRASES.some((phrase) =>
      normalizedText.includes(normalize(phrase))
    )
  ) {
    return true;
  }

  // ✅ Keywords generales
  if (
    OWNER_KEYWORDS.some((keyword) =>
      normalizedText.includes(normalize(keyword))
    )
  ) {
    return true;
  }

  return false;
};
export const saveMemory = (ctx, entry) => {
  const memory = Array.isArray(ctx.memory) ? ctx.memory : [];
  const nextMemory = [...memory, { ...entry, at: Date.now() }].slice(-20);
  ctx.memory = nextMemory;
};
