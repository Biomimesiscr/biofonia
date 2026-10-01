import { FieldError } from "@/components/forms/form-field";
import { CategoryDot } from "@/components/posts/category-dot";
import { ChoiceCard } from "@/components/shared/choice-card";
import { newPost } from "@/content/post";
import type { NewPostCategory } from "./types";

type CategoryPickerProps = {
  categories: readonly NewPostCategory[];
  value: string | null;
  onChange: (id: string) => void;
  errors?: string[];
};

/** Step 1: one radio card per forum category. */
export function CategoryPicker({ categories, value, onChange, errors }: CategoryPickerProps) {
  return (
    <fieldset
      aria-describedby={errors?.length ? "category-error" : undefined}
      className="flex flex-col gap-3"
    >
      <legend className="mb-3 text-[14px] font-medium">{newPost.category.legend}</legend>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const checked = value === category.id;
          return (
            <ChoiceCard
              key={category.id}
              checked={checked}
              className="flex-[1_1_220px] items-start gap-3 p-4"
            >
              <input
                type="radio"
                name="postCategoryId"
                value={category.id}
                checked={checked}
                onChange={() => onChange(category.id)}
                className="mt-0.5 size-5 shrink-0 accent-v-ink"
              />
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 font-semibold">
                  <CategoryDot tone={category.tone} className="size-2.5" />
                  {category.name}
                </span>
                {category.description && (
                  <span className="text-[13px] text-v-text-2">{category.description}</span>
                )}
              </span>
            </ChoiceCard>
          );
        })}
      </div>
      {errors?.length ? <FieldError id="category-error" errors={errors} /> : null}
    </fieldset>
  );
}
