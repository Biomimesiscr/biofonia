import DataError from "@/domain/core/errors/DataError";

export class Biography {
  static readonly MAX_LENGTH = 280;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): Biography {
    const trimmed = value?.trim() ?? "";

    if (!trimmed) {
      throw new DataError("La biografía no puede estar vacía");
    }
    if (trimmed.length > Biography.MAX_LENGTH) {
      throw new DataError(`La biografía no puede superar ${Biography.MAX_LENGTH} caracteres`);
    }

    return new Biography(trimmed);
  }

  get value(): string {
    return this._value;
  }
}
