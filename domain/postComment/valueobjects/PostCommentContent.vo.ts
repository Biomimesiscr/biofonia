import DataError from "@/domain/core/errors/DataError";
import { PostContent } from "@/domain/post/valueobjects/PostContent.vo";

export class PostCommentContent {
  static readonly MAX_LENGTH = 1000;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): PostCommentContent {
    const trimmed = value?.trim() ?? "";

    if (!trimmed) {
      throw new DataError("El comentario no puede estar vacío");
    }
    if (trimmed.length > PostCommentContent.MAX_LENGTH) {
      throw new DataError(`El comentario no puede superar ${PostCommentContent.MAX_LENGTH} caracteres`);
    }
    if (PostContent.containsLink(trimmed)) {
      throw new DataError("El comentario no puede incluir enlaces");
    }

    return new PostCommentContent(trimmed);
  }

  get value(): string {
    return this._value;
  }
}
