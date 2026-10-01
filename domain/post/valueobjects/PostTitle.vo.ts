import DataError from "@/domain/core/errors/DataError";

export class PostTitle {
  static readonly MAX_LENGTH = 120;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): PostTitle {
    const trimmed = value?.trim() ?? "";

    if (!trimmed) {
      throw new DataError("El título no puede estar vacío");
    }
    if (trimmed.length > PostTitle.MAX_LENGTH) {
      throw new DataError(`El título no puede superar ${PostTitle.MAX_LENGTH} caracteres`);
    }

    return new PostTitle(trimmed);
  }

  get value(): string {
    return this._value;
  }
}
