import type { ForumFilters } from "./types";

/** `/foro` with the given filters; the defaults are left out of the URL. */
export function forumHref({ categoria, orden }: ForumFilters): string {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (orden !== "hoy") params.set("orden", orden);
  const query = params.toString();
  return query ? `/foro?${query}` : "/foro";
}
