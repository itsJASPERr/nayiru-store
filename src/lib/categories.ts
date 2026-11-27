export const categoryIds = [
  "pulseras",
  "collares",
  "aretes",
  "anillos",
  "instrumentos",
  "accesorios",
  "decoracion",
  "conjuntos",
  "textiles",
  "medicinas",
] as const;

export type Category = (typeof categoryIds)[number];

export const categoryInfo = {
  pulseras: { label: "Pulseras", collection: "joyeria" },
  collares: { label: "Collares y gargantillas", collection: "joyeria" },
  aretes: { label: "Aretes", collection: "joyeria" },
  anillos: { label: "Anillos", collection: "joyeria" },
  instrumentos: { label: "Instrumentos", collection: "instrumentos" },
  accesorios: { label: "Accesorios", collection: "accesorios" },
  decoracion: { label: "Decoración", collection: "decoracion" },
  conjuntos: { label: "Conjuntos", collection: "joyeria" },
  textiles: { label: "Textiles", collection: "textiles" },
  medicinas: { label: "Medicinas ancestrales", collection: "medicinas" },
} as const satisfies Record<Category, { label: string; collection: string }>;

export const collections = [
  { id: "joyeria", label: "Joyería" },
  { id: "instrumentos", label: "Instrumentos" },
  { id: "accesorios", label: "Accesorios" },
  { id: "decoracion", label: "Decoración" },
  { id: "textiles", label: "Textiles" },
  { id: "medicinas", label: "Medicinas ancestrales" },
] as const;
