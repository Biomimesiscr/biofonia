/**
 * The reasons offered when reporting a post, in display order. `prisma/seed.ts`
 * stores them as `PostReportReason` rows from this list.
 */
export const postReportReasons = [
  "Lenguaje ofensivo o discriminación",
  "Información falsa o peligrosa",
  "No está relacionado con el tema",
  "Incluye enlaces",
  "Otro motivo",
] as const;

export const postDetail = {
  metaTitle: (title: string) => `${title} · Biofonía`,
  back: "Volver al foro",
  published: (date: string) => `Publicado ${date}`,
  views: (count: number) => `${count} ${count === 1 ? "vista" : "vistas"}`,
  draft: "Borrador · Sin publicar",
  postAuthor: "Autor del post",
  actions: {
    label: "Acciones de la publicación",
    votes: "votos",
    voteLabel: "Votar por esta publicación",
    comments: "comentarios",
    save: "Guardar",
    saveSoon: "Próximamente",
    share: "Compartir",
    report: "Reportar",
  },
  toast: {
    linkCopied: "Enlace copiado",
    commentPublished: "Comentario publicado",
    replyPublished: "Respuesta publicada",
    reported: "Gracias. Un moderador revisará tu reporte.",
  },
  errors: {
    unavailable: "Esta publicación ya no está disponible.",
    commentUnavailable: "Ese comentario ya no está disponible.",
    vote: "No pudimos registrar tu voto. Inténtalo de nuevo.",
    comment: "No pudimos publicar tu comentario. Inténtalo de nuevo.",
    report: "No pudimos enviar tu reporte. Inténtalo de nuevo.",
    alreadyReported: "Ya reportaste esta publicación. Un moderador la revisará.",
    reasonMissing: "Ese motivo ya no existe. Elige otro.",
  },
  conversation: {
    title: (count: number) => `Conversación · ${count}`,
    sortLabel: "Ordenar comentarios",
    sort: { votes: "Más votados", recent: "Recientes" },
    empty: "Todavía no hay comentarios. Empieza la conversación.",
    composer: {
      label: "Escribe un comentario",
      placeholder: "Suma tu mirada a la conversación: responde, contrasta o conecta experiencias.",
      help: "Sé respetuoso. No se permiten enlaces.",
      linkError: "Quita el enlace para poder comentar.",
      submit: "Comentar",
    },
    reply: {
      action: "Responder",
      label: (author: string) => `Respuesta a ${author}`,
      help: "No se permiten enlaces.",
      linkError: "Quita el enlace para poder responder.",
      submit: "Responder",
      cancel: "Cancelar",
      repliesLabel: (author: string) => `Respuestas a ${author}`,
    },
    vote: { comment: "Votar por este comentario", reply: "Votar por esta respuesta" },
    signedOut: {
      text: "Inicia sesión para sumarte a la conversación.",
      cta: "Iniciar sesión",
    },
  },
  author: {
    eyebrow: "Sobre quien publica",
    viewProfile: "Ver perfil",
  },
  balance: {
    eyebrow: "Esta conversación",
    gathers: "Reúne",
    lab: (count: number) => `${count} ${count === 1 ? "voz" : "voces"} del laboratorio`,
    and: "y",
    field: (count: number) => `${count} del territorio`,
  },
  related: {
    title: "También te puede interesar",
    meta: (votes: number, comments: number) => `${votes} votos · ${comments} comentarios`,
  },
  report: {
    title: "Reportar publicación",
    text: "Un moderador lo revisará. Nadie más verá quién reportó.",
    legend: "¿Qué está pasando?",
    close: "Cerrar",
    cancel: "Cancelar",
    submit: "Enviar reporte",
  },
} as const;
