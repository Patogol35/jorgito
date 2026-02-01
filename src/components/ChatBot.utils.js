/* =========================
UTILIDADES
========================= */
export const delay = () => Math.floor(Math.random() * 500) + 400;
export const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
MEMORIA
========================= */
export const saveMemory = (ctx, data) => {
  const memory = [...(ctx.memory || [])];
  memory.push(data);
  if (memory.length > MEMORY_LIMIT) memory.shift();
  ctx.memory = memory;
};
