import type { Tone } from "@/content/home";

export type CategoryTone = Tone | "rust";

type ForumCategory = { name: string; tone: CategoryTone; description: string };

/**
 * The forum categories from the design, in display order. `name` is how each one
 * is stored in the database: `prisma/seed.ts` creates them from this list.
 */
export const forumCategories: readonly ForumCategory[] = [
  { name: "Pregúntame lo que quieras", tone: "olive", description: "Personas con experiencia responden dudas." },
  { name: "Eventos", tone: "yellow", description: "Cuenta experiencias o invita a actividades." },
  { name: "Nuevos descubrimientos", tone: "blue", description: "Comparte resultados de una investigación." },
  { name: "Consejos", tone: "pink", description: "Pide o da apoyo sobre un tema." },
  { name: "Diálogo", tone: "ink", description: "Conversación abierta sobre temas diversos." },
  { name: "Anécdotas", tone: "rust", description: "Experiencias personales en el campo o el laboratorio." },
];

const byName = new Map(forumCategories.map((category) => [category.name, category]));

/** Dot colour of a category, by its stored name. */
export function categoryTone(name: string): CategoryTone {
  return byName.get(name)?.tone ?? "ink";
}

/** One-line description of a category, by its stored name. */
export function categoryDescription(name: string): string | null {
  return byName.get(name)?.description ?? null;
}

export const postStats = {
  views: "vistas",
  comments: "comentarios",
  votes: "votos",
} as const;

export const forum = {
  metaTitle: "Foro · Biofonía",
  categories: { label: "Categorías", all: "Todo el foro" },
  sort: {
    label: "Ordenar publicaciones",
    options: {
      hoy: {
        label: "Destacadas de hoy",
        title: "Publicaciones del día",
        subtitle: "Lo que la comunidad está conversando hoy, ordenado por votos.",
      },
      recientes: {
        label: "Recientes",
        title: "Lo más reciente",
        subtitle: "Todo lo que se ha compartido, empezando por lo último.",
      },
      mes: {
        label: "Más votadas del mes",
        title: "Lo más votado del mes",
        subtitle: "Las conversaciones que más han crecido este mes.",
      },
    },
  },
  share: "Comparte lo que ves",
  vote: {
    label: "Votar por esta publicación",
    unit: "votos",
  },
  report: { label: "Reportar", soon: "Próximamente" },
  empty: {
    text: "Todavía no hay publicaciones aquí.",
    cta: "Sé la primera persona en compartir algo",
  },
  banner: {
    title: "Entre laboratorio y territorio",
    text: "Ciencia académica y saber local, sin jerarquías: preguntando, escuchando y construyendo conocimiento juntos.",
    cta: "Nuevo post",
  },
  top: {
    title: "Lo más votado del mes",
    meta: (votes: number, category: string) => `${votes} votos · ${category}`,
  },
  rules: {
    title: "Normas del foro",
    summary:
      "Respeto ante todo, información verificable o de experiencia propia, temas de naturaleza y biomímesis, y sin enlaces.",
    readAll: "Leer las normas",
  },
} as const;
