import DataError from "@/domain/core/errors/DataError";

/** Matches anything that looks like a URL. Links are not allowed in posts. */
const LINK_PATTERN = /(https?:\/\/|www\.)/i;

export class PostContent {
  static readonly MAX_LENGTH = 3000;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): PostContent {
    const trimmed = value?.trim() ?? "";

    if (!trimmed) {
      throw new DataError("El texto del post no puede estar vacío");
    }
    if (trimmed.length > PostContent.MAX_LENGTH) {
      throw new DataError(`El texto no puede superar ${PostContent.MAX_LENGTH} caracteres`);
    }
    if (PostContent.containsLink(trimmed)) {
      throw new DataError("El texto no puede incluir enlaces");
    }

    return new PostContent(trimmed);
  }

  static containsLink(text: string): boolean {
    return LINK_PATTERN.test(text);
  }

  get value(): string {
    return this._value;
  }
}
