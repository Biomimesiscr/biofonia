export type Tone = "pink" | "olive" | "yellow" | "ink" | "blue";
export type Audience = "laboratorio" | "territorio";

export type Step = {
  number: string;
  tone: Tone;
  title: string;
  paragraphs: readonly [string, string];
};

export type Post = {
  href: string;
  category: { label: string; tone: Tone | "rust" };
  title: string;
  author: { name: string; initials: string; tone: Tone };
  audience: Audience;
  votes: number;
  comments: number;
};

export const site = {
  name: "Biofonía",
  title: "Biofonía",
  description:
    "Un espacio de Biomímesis Costa Rica para compartir preguntas, experiencias y descubrimientos entre la academia y los territorios.",
  statusLabel: "Próximamente",
  loginLabel: "Iniciar sesión",
  loginHref: "/acceso",
  logoutLabel: "Cerrar sesión",
  completeProfileLabel: "Completa tu perfil",
  completeProfileHref: "/bienvenida",
  forumHref: "/foro",
  navLabel: "Principal",
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Foro", href: "/foro" },
  ],
  account: {
    triggerLabel: "Menú de tu cuenta",
    menuLabel: "Tu cuenta",
    myProfileLabel: "Mi perfil",
    myProfileHref: "/perfil",
  },
} as const;

export const hero = {
  eyebrow: "Un espacio de Biomímesis Costa Rica",
  title: "Un foro para conversar entre laboratorio y territorio.",
  lead: "Ciencia académica y saber local, sin jerarquías: preguntando, escuchando y construyendo conocimiento juntos.",
} as const;

export const soundwave = {
  ariaLabel:
    "Dos ondas de sonido, una del laboratorio y otra del territorio, que se encuentran al centro",
  sectionLabel: "Laboratorio y territorio",
  legend: [
    { label: "Laboratorio", dot: "bg-v-ink", text: "text-v-ink" },
    { label: "Encuentro", dot: "bg-v-pink", text: "text-v-accent-ink" },
    { label: "Territorio", dot: "bg-v-olive", text: "text-v-ink" },
  ],
} as const;

export const duality = {
  cards: [
    {
      audience: "laboratorio",
      eyebrow: "Laboratorio",
      text: "Hay conocimientos que nacen en el laboratorio.",
    },
    {
      audience: "territorio",
      eyebrow: "Territorio",
      text: "Otros, de observar, habitar y escuchar la naturaleza durante generaciones.",
    },
  ],
  closing: "Biofonía crea un espacio para que ambos se encuentren.",
} as const;

export const manifesto = {
  eyebrow: "Sin jerarquías",
  text: "Ciencia académica y saber local, sin jerarquías: preguntando, escuchando y construyendo conocimiento juntos.",
} as const;

export const participate = {
  id: "formas",
  eyebrow: "Participa",
  title: "Cuatro formas de entrar en la conversación",
  steps: [
    {
      number: "01",
      tone: "pink",
      title: "Comparte lo que ves",
      paragraphs: [
        "Una observación, una pregunta, un fenómeno de la naturaleza.",
        "Ponlo en común y deja que otras miradas lo hagan crecer.",
      ],
    },
    {
      number: "02",
      tone: "olive",
      title: "Pregunta lo que te intriga",
      paragraphs: [
        "No importa de dónde venga la pregunta.",
        "Puede comenzar en el territorio y llegar al laboratorio —o al revés.",
      ],
    },
    {
      number: "03",
      tone: "yellow",
      title: "Súmate al diálogo",
      paragraphs: [
        "Responde, contrasta, conecta experiencias y conocimiento.",
        "Cada conversación puede revelar algo que nadie había visto de esa manera.",
      ],
    },
    {
      number: "04",
      tone: "ink",
      title: "Ven a curiosear",
      paragraphs: [
        "No necesitas ser investigador, especialista ni conocer a nadie.",
        "Entra, lee, descubre y aprende. Sin cuenta. Sin credenciales. Solo con curiosidad.",
      ],
    },
  ] satisfies readonly Step[],
} as const;

export const featuredPosts = {
  id: "destacadas",
  eyebrow: "Desde el foro",
  title: "Publicaciones destacadas",
  actionLabel: "Ir al foro",
  votesLabel: "votos",
  commentsLabel: "comentarios",
  audienceLabels: { laboratorio: "Laboratorio", territorio: "Territorio" },
  posts: [
    {
      href: "/foro",
      category: { label: "Nuevos descubrimientos", tone: "blue" },
      title: "La estructura del ala de la mariposa morfo, vista de cerca",
      author: { name: "Laura Jiménez", initials: "LJ", tone: "pink" },
      audience: "laboratorio",
      votes: 128,
      comments: 44,
    },
    {
      href: "/foro",
      category: { label: "Anécdotas", tone: "rust" },
      title: "Mi abuelo sabía cuándo iba a llover por las ranas",
      author: { name: "Don Rafael Quesada", initials: "RQ", tone: "olive" },
      audience: "territorio",
      votes: 38,
      comments: 27,
    },
    {
      href: "/foro",
      category: { label: "Pregúntame lo que quieras", tone: "olive" },
      title: "¿Alguien reconoce este escarabajo?",
      author: { name: "Daniela Mora", initials: "DM", tone: "yellow" },
      audience: "territorio",
      votes: 41,
      comments: 9,
    },
  ] satisfies readonly Post[],
} as const;

export const comingSoon = {
  text: "Un espacio de Biomímesis Costa Rica para compartir preguntas, experiencias y descubrimientos entre la academia y los territorios.",
  display: "Próximamente.",
} as const;

export const footer = {
  left: "Biofonía · Biomímesis Costa Rica",
  right: "CICIMA · Universidad de Costa Rica",
} as const;
