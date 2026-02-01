import { PROFILE, YES_WORDS, NO_WORDS, WHATSAPP_URL, INTENTS } from "./config";
import { normalize, pickNonRepeated, isValidFarewell } from "./utils";

const detectIntent = (msg) => {
  const text = normalize(msg);
  let best = "UNKNOWN";
  let max = 0;

  for (const intent in INTENTS) {
    let score = 0;
    for (const word of INTENTS[intent]) {
      if (text.includes(normalize(word))) {
        score += word.length > 4 ? 2 : 1;
      }
    }
    if (score > max) {
      max = score;
      best = intent;
    }
  }
  return max ? best : "UNKNOWN";
};

export function getSmartResponse(message, context) {
  const text = normalize(message);
  const ctx = { ...context };

  const replies = {
    GREETING: (c) =>
      pickNonRepeated(c, "GREETING", [
        "Hola 👋 Soy Sasha, la asistente virtual de Jorge 😊",
        "¡Hola! ☺️ Me llamo Sasha y estoy aquí para ayudarte 💕",
        "Hola 😊 ¿En qué puedo ayudarte hoy?",
      ]),

    PROFILE: (c) =>
      pickNonRepeated(c, "PROFILE", [
        `${PROFILE.name} es ${PROFILE.role}. ${PROFILE.description}`,
        "Jorge es un profesional enfocado en soluciones modernas 💻",
      ]),

    EDUCATION: (c) =>
      pickNonRepeated(c, "EDUCATION", [
        `Cuenta con un ${PROFILE.education} 😊`,
      ]),

    EXPERIENCE: (c) =>
      pickNonRepeated(c, "EXPERIENCE", [
        `Tiene experiencia como ${PROFILE.experience.join(", ")} 😊`,
      ]),

    SKILLS: (c) =>
      pickNonRepeated(c, "SKILLS", [
        `Trabaja con ${PROFILE.stack.join(", ")} 💻`,
      ]),

    PROJECTS: (c) =>
      pickNonRepeated(c, "PROJECTS", [
        `Ha trabajado en ${PROFILE.projects.join(", ")} 😊`,
      ]),

    BOOK: () =>
      "A Jorge le encantan los libros de misterio, especialmente Dan Brown 📚",

    CONTACT: () =>
      `📱 Puedes contactarlo por WhatsApp aquí:\n${WHATSAPP_URL}`,

    FAREWELL: () =>
      "¡Gracias por visitar el portafolio! 👋✨",
  };

  if (isValidFarewell(text)) {
    return { text: replies.FAREWELL(), intent: "FAREWELL" };
  }

  const intent = detectIntent(text);

  return {
    text:
      typeof replies[intent] === "function"
        ? replies[intent](ctx)
        : "Puedo ayudarte con información sobre Jorge 😊",
    intent,
  };
    }
