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

  // 🔥 Detectar nombres en el texto
  const words = normalizedText.split(" ");

  const hasOwnerName = OWNER_NAMES.some((name) =>
    normalizedText.includes(normalize(name))
  );

  const hasOtherName = words.some(
    (word) =>
      word.length > 2 &&
      !OWNER_NAMES.some((name) =>
        normalize(name).includes(word)
      ) &&
      !OWNER_KEYWORDS.includes(word) &&
      !["quien", "que", "como", "cuando", "donde", "por", "para"].includes(word)
  );

  // ❌ Si hay otro nombre → bloquear
  if (hasOtherName && !hasOwnerName) {
    return false;
  }

  // ✅ Si menciona Jorge → OK
  if (hasOwnerName) return true;

  // ✅ Frases válidas
  if (
    VALID_OWNER_PHRASES.some((phrase) =>
      normalizedText.includes(normalize(phrase))
    )
  ) {
    return true;
  }

  // ✅ Keywords (solo si no hay nombres raros)
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
