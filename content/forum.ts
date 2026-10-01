import type { Tone } from "@/content/home";

export type CategoryTone = Tone | "rust";

/** Dot colour of each forum category, keyed by its name as stored in the database. */
const categoryTones: Record<string, CategoryTone> = {
  "Pregúntame lo que quieras": "olive",
  Eventos: "yellow",
  "Nuevos descubrimientos": "blue",
  Consejos: "pink",
  Diálogo: "ink",
  Anécdotas: "rust",
};

export function categoryTone(name: string): CategoryTone {
  return categoryTones[name] ?? "ink";
}

export const postStats = {
  views: "vistas",
  comments: "comentarios",
  votes: "votos",
} as const;
