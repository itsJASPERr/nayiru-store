export const categoryIds = [
  "pulseras",
  "collares",
  "aretes",
  "anillos",
  "instrumentos",
  "accesorios",
  "decoracion",
] as const;

export type Category = (typeof categoryIds)[number];

export const categoryInfo = {
  pulseras: { label: "Pulseras", collection: "joyeria" },
  collares: { label: "Collares", collection: "joyeria" },
  aretes: { label: "Aretes", collection: "joyeria" },
  anillos: { label: "Anillos", collection: "joyeria" },
  instrumentos: { label: "Instrumentos", collection: "instrumentos" },
  accesorios: { label: "Accesorios", collection: "accesorios" },
  decoracion: { label: "Decoración", collection: "decoracion" },
} as const satisfies Record<Category, { label: string; collection: string }>;

export const collections = [
  { id: "joyeria", label: "Joyería", image: "/nayiru/pulsera-jaguar.webp" },
  { id: "instrumentos", label: "Instrumentos", image: "/nayiru/tambor-ceremonial.webp" },
  { id: "accesorios", label: "Accesorios", image: "/nayiru/bolso-putumayo.webp" },
  { id: "decoracion", label: "Decoración", image: "/nayiru/porta-sahumerio.webp" },
] as const;
