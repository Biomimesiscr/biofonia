import DataError from "@/domain/core/errors/DataError";

export class UserName {
  static readonly MIN_LENGTH = 2;
  static readonly MAX_LENGTH = 80;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): UserName {
    const trimmed = value?.trim().replace(/\s+/g, " ") ?? "";

    if (trimmed.length < UserName.MIN_LENGTH) {
      throw new DataError(`El nombre debe tener al menos ${UserName.MIN_LENGTH} caracteres`);
    }
    if (trimmed.length > UserName.MAX_LENGTH) {
      throw new DataError(`El nombre no puede superar ${UserName.MAX_LENGTH} caracteres`);
    }

    return new UserName(trimmed);
  }

  get value(): string {
    return this._value;
  }
}
