import DataError from "@/domain/core/errors/DataError";

export class PostCategoryName {
  static readonly MAX_LENGTH = 60;

  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): PostCategoryName {
    const trimmed = value?.trim() ?? "";

    if (!trimmed) {
      throw new DataError("PostCategoryName cannot be empty");
    }
    if (trimmed.length > PostCategoryName.MAX_LENGTH) {
      throw new DataError(
        `PostCategoryName cannot exceed ${PostCategoryName.MAX_LENGTH} characters`,
      );
    }

    return new PostCategoryName(trimmed);
  }

  get value(): string {
    return this._value;
  }
}
