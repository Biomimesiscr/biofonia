import { z } from "zod";
import { FORUM_SORT_PARAMS } from "../forumSortParams";

/** Any single value from a search param (repeated keys keep the first). */
const single = z.preprocess((value) => (Array.isArray(value) ? value[0] : value), z.string().optional());

/**
 * `/foro?categoria=<id>&orden=hoy|recientes|mes`. Never fails: unknown or missing
 * values fall back to the whole forum, sorted by today's highlights.
 */
export const ForumSearchParamsSchema = z.object({
  categoria: single.catch(undefined).transform((value) => value || null),
  orden: z.preprocess(
    (value) => (Array.isArray(value) ? value[0] : value),
    z.enum(FORUM_SORT_PARAMS).catch("hoy"),
  ),
});

export type ForumSearchParams = z.infer<typeof ForumSearchParamsSchema>;
