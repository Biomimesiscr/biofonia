import UnauthorizedError from "@/domain/core/errors/UnauthorizedError";

export class GoogleEmailNotVerifiedError extends UnauthorizedError {
  constructor() {
    super("Tu correo de Google no está verificado");
  }
}
