import { ZodError, z } from "zod";
import ConflictError from "@/domain/core/errors/ConflictError";
import DataError from "@/domain/core/errors/DataError";
import NotFoundError from "@/domain/core/errors/NotFoundError";
import HttpError from "./HttpError";

export interface ErrorBody {
  error: { message: string; details?: unknown };
}

/**
 * Wraps a Route Handler so every thrown error becomes a JSON response.
 *
 *   export const GET = handleRoute<Ctx>((req, ctx) => controller.get(req, ctx));
 */
export function handleRoute<TContext = unknown>(
  handler: (request: Request, context: TContext) => Promise<Response>,
) {
  return async (request: Request, context: TContext): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

export function toErrorResponse(error: unknown): Response {
  if (error instanceof HttpError) {
    return json(error.status, error.message, error.details);
  }
  if (error instanceof ZodError) {
    return json(400, "Invalid request", z.flattenError(error));
  }
  if (error instanceof DataError) return json(422, error.message);
  if (error instanceof NotFoundError) return json(404, error.message);
  if (error instanceof ConflictError) return json(409, error.message);

  console.error(error);
  return json(500, "Internal server error");
}

function json(status: number, message: string, details?: unknown): Response {
  const body: ErrorBody = {
    error: details === undefined ? { message } : { message, details },
  };
  return Response.json(body, { status });
}
