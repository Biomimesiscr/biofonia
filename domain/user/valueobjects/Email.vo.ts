import DataError from "@/domain/core/errors/DataError";

export class Email {
  static readonly MAX_LENGTH = 254;
  private static readonly FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  /** Emails are stored trimmed and lower-cased so lookups are case-insensitive. */
  static create(value: string): Email {
    const normalized = value?.trim().toLowerCase() ?? "";

    if (!normalized) {
      throw new DataError("El correo electrónico es obligatorio");
    }
    if (normalized.length > Email.MAX_LENGTH || !Email.FORMAT.test(normalized)) {
      throw new DataError("El correo electrónico no es válido");
    }

    return new Email(normalized);
  }

  get value(): string {
    return this._value;
  }
}
