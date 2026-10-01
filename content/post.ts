export const newPost = {
  metaTitle: "Nuevo post · Biofonía",
  href: "/publicar",
  navLabel: "Nuevo post",
  back: "Volver a mi perfil",
  title: "Nuevo post",
  lead: "Una observación, una pregunta, un fenómeno de la naturaleza. Ponlo en común y deja que otras miradas lo hagan crecer.",
  category: { legend: "1. Elige una categoría" },
  postTitle: {
    label: "2. Título",
    placeholder: "Ej.: ¿Alguien reconoce este escarabajo?",
  },
  content: {
    label: "3. Cuéntalo",
    placeholder:
      "Describe lo que viste, dónde y cuándo, o plantea tu pregunta con el mayor detalle posible.",
    help: "Por seguridad, no se permiten enlaces.",
    linkError: "Tu texto incluye un enlace. Quítalo para poder publicar.",
  },
  image: {
    label: "4. Imagen",
    optional: "(opcional)",
    cta: "Sube una foto que ilustre el tema",
    formats: "JPG, PNG o WebP",
    soon: "Próximamente: por ahora la imagen solo se ve en la vista previa y no se guarda con el post.",
    alt: "Imagen adjunta al post",
    remove: "Quitar imagen",
  },
  cancel: "Cancelar",
  saveDraft: "Guardar borrador",
  publish: "Publicar",
  missing: "Elige una categoría y escribe un título y un texto para publicar.",
  saved: {
    publish: {
      title: "Tu post ya está en el foro",
      text: "Puedes verlo y seguir la conversación desde tu perfil.",
    },
    draft: {
      title: "Borrador guardado",
      text: "Lo encontrarás en la pestaña Borradores de tu perfil.",
    },
    goToProfile: "Ir a mi perfil",
  },
  preview: {
    eyebrow: "Vista previa",
    now: "Ahora",
    uncategorized: "Sin categoría",
    title: "El título de tu post",
    content: "Aquí aparecerá lo que escribas.",
  },
  guidelines: {
    title: "Antes de publicar",
    items: [
      "Habla con respeto: sin insultos, ofensas ni discriminación.",
      "Comparte información verificable o tu propia experiencia en el campo.",
      "Mantén el tema cerca de la naturaleza y la biomímesis.",
      "No incluyas enlaces.",
    ],
    readAll: "Leer todas las normas",
  },
} as const;
