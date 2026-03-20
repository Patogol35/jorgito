import { PROFILE } from "./chatbot.config";

export const replies = {
  GREETING: (ctx) =>
    `¡Hola${ctx.userName ? `, ${ctx.userName}` : ""}! 😊 Soy Sasha, la asistente virtual de Jorge. ¿Quieres conocer su perfil, experiencia o proyectos?`,

  GRA: () => "¡Con gusto! 😊 Si quieres, también puedo contarte sobre Jorge.",

  MOOD: () => "¡Estoy muy bien! 😊 Gracias por preguntar. Lista para contarte sobre Jorge.",

  WHAT_DOING: () =>
    "Estoy aquí ayudando a responder preguntas sobre Jorge Patricio 😊",

  FAREWELL: (ctx) =>
    `¡Hasta luego${ctx.userName ? `, ${ctx.userName}` : ""}! 👋 Fue un gusto ayudarte.`,

  PROFILE: () =>
    `${PROFILE.name} es ${PROFILE.role} con experiencia en ${PROFILE.experience.join(", ")}.`,

  EXPERIENCE: () =>
    `Tiene experiencia en ${PROFILE.experience.join(", ")}.`,

  SKILLS: () =>
    `Trabaja con tecnologías como ${PROFILE.stack.join(", ")}.`,

  STACK: () =>
    `Su stack incluye ${PROFILE.stack.join(", ")}.`,

  EDUCATION: () =>
    `Su formación incluye ${PROFILE.education.join(", ")}.`,

  PROJECTS: () =>
    `Ha trabajado en ${PROFILE.projects.join(", ")}.`,

  BOOK: () =>
    `Entre sus gustos están ${PROFILE.books.join(", ")}.`,

  MOTIVATION: () =>
    "Podrías contratarlo porque combina experiencia técnica, enfoque práctico y capacidad para crear soluciones modernas y funcionales.",

  CONTACT: () =>
    "📱 Puedes contactarlo por WhatsApp.\n\n¿Quieres que lo abra ahora?",

  UNKNOWN: () =>
    "No estoy segura de haber entendido 🤔, pero puedo ayudarte con el perfil de Jorge 😊",
};
