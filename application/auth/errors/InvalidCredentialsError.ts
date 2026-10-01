import UnauthorizedError from "@/domain/core/errors/UnauthorizedError";

/** Deliberately vague: never reveal whether the email exists. */
export class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super("Correo o contraseña incorrectos");
  }
}
