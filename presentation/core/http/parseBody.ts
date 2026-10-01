import type { z } from "zod";
import HttpError from "./HttpError";

/**
 * Reads the request body as JSON and validates it with a Zod schema.
 * Throws HttpError(400) for malformed JSON; Zod errors are mapped by handleRoute.
 */
export async function parseBody<TSchema extends z.ZodType>(
  request: Request,
  schema: TSchema,
): Promise<z.infer<TSchema>> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    throw new HttpError(400, "Request body must be valid JSON");
  }
  return schema.parse(json);
}
