import DataError from "@/domain/core/errors/DataError";

/** A plain-text password chosen by the user, validated before it is hashed. */
export class Password {
  static readonly MIN_LENGTH = 8;
  static readonly MAX_LENGTH = 128;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): Password {
    const length = value?.length ?? 0;

    if (length < Password.MIN_LENGTH) {
      throw new DataError(`La contraseña debe tener al menos ${Password.MIN_LENGTH} caracteres`);
    }
    if (length > Password.MAX_LENGTH) {
      throw new DataError(`La contraseña no puede superar ${Password.MAX_LENGTH} caracteres`);
    }

    return new Password(value);
  }

  get value(): string {
    return this._value;
  }
}
