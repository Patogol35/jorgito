/* ========================= 🟣 DETECTOR ULTRA PRO ========================= */

// 🔤 Normalizar texto
const cleanText = text
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

// 🔤 INSULTOS (mega ampliado)
const insultWords = [
  // básicos
  "burro","asno","idiota","tonto","estupido","imbecil",

  // animales
  "perro","cerdo","marrano","bestia","rata","sapo",

  // LATAM
  "pendejo","pendej0","huevon","huev0n","wevon","weon",
  "gil","boludo","tarado","baboso",
  "bruto","inutil","mediocre",
  "malparido","gonorrea","careverga","careculo", "pedorro", "pobre",
  "loco", "rico", "rocoto", "indio", "longo", "bestia", "puñal", "prostituta",
  "prostituto", "puto", "puta", "carcoso", "hediondo", "apestoso", "pedante",
  "asesino", "maldito", "retrasado", "ignorante", "analfabeto", 
  

  // fuertes
  "patetico","ridiculo","basura","porqueria","asco","mierda",

  // intelectuales
  "ignorante","inepto","incompetente","fracasado","perdedor",

  // físicos
  "feo","horrible","asqueroso","gordo","flaco"
];

// 🔤 FRASES ofensivas
const insultPhrases = [
  "no sirves","no vales","das pena","me das asco",
  "eres lo peor","vales nada","que asco","das lastima"
];

// 🧠 KEYWORDS sensibles (ULTRA ampliado)
const sensitiveKeywords = {
  edad: [
    "edad","anos","cuantos anos","cumpleanos",
    "fecha de nacimiento","nacio","que edad tiene"
  ],

  relaciones: [
    "gay","homosexual","lesbiana", "bisexual",
    "pareja","novia","novio","esposo","esposa",
    "casado","casada","casarse","matrimonio",
    "divorciado","soltero","relacion",
    "sale con","esta con","tiene alguien", "maricon", "marica",
    "anda con","con quien esta"
  ],

  dinero: [
    "sueldo","salario","dinero","ingresos",
    "cuanto gana","cuanto cobra","riqueza","cuanto dinero tiene"
  ],

  politica: [
    "religion","religioso","creencias",
    "politica","ideologia","partido","vota","izquierda","derecha"
  ],

  ubicacion: [
    "vive","direccion","donde vive",
    "ubicacion","reside","ciudad","pais",
    "donde esta","en que lugar vive"
  ]
};

// 👤 nombres válidos
const ownerNames = ["jorge","patricio","jorge patricio"];

// 🔍 helpers
const hasOwner = ownerNames.some(n => cleanText.includes(n));

const matchKeyword = (keywords) =>
  keywords.some(k => cleanText.includes(k));

// 🔍 detectar sensible
const isSensitiveTopic =
  matchKeyword(sensitiveKeywords.edad) ||
  matchKeyword(sensitiveKeywords.relaciones) ||
  matchKeyword(sensitiveKeywords.dinero) ||
  matchKeyword(sensitiveKeywords.politica) ||
  matchKeyword(sensitiveKeywords.ubicacion);

// 🔍 detectar preguntas
const isQuestion =
  cleanText.includes("?") ||
  /^(quien|que|cuando|donde|por que|como|es|tiene|esta)/.test(cleanText);

// 🔍 detectar preguntas sensibles directas
const isSensitiveQuestion = hasOwner && isSensitiveTopic && isQuestion;

// 🔍 detectar insultos por palabra
const insultRegex = new RegExp(`\\b(${insultWords.join("|")})\\b`, "iu");
const isInsultWord = insultRegex.test(cleanText);

// 🔍 detectar insultos por frase
const isInsultPhrase = insultPhrases.some(p => cleanText.includes(p));

// 🔍 detectar ataques tipo "eres ..."
const isDirectAttack = /eres\s+\w+/.test(cleanText);

// 🔍 detectar insultos disfrazados (con símbolos o puntos)
const disguisedInsult = /i[\W_]*d[\W_]*i[\W_]*o[\W_]*t[\W_]*a/.test(cleanText);

// 🔥 detección final insulto
const isInsult =
  isInsultWord ||
  isInsultPhrase ||
  isDirectAttack ||
  disguisedInsult;

// 🔍 detectar preguntas implícitas (sin nombre)
const implicitOwnerAttack =
  /es\s+casado|tiene\s+novia|tiene\s+pareja/.test(cleanText);

// 🚨 RESPUESTA FINAL
if (
  (hasOwner && (isSensitiveTopic || isInsult)) ||
  isSensitiveQuestion ||
  implicitOwnerAttack
) {
  return {
    text: isInsult
      ? "Prefiero mantener una conversación respetuosa 😊 Si deseas, puedo contarte sobre su experiencia profesional."
      : "Prefiero mantener esa información en privado 😊 ¿Te gustaría saber sobre su experiencia profesional o proyectos?",
    intent: "SENSITIVE_BLOCK",
  };
}


  

