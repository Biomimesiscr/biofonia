import ConflictError from "@/domain/core/errors/ConflictError";

export class EmailAlreadyRegisteredError extends ConflictError {
  constructor() {
    super("Ya existe una cuenta con este correo electrónico");
  }
}
