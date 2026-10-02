"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { newPost } from "@/content/post";

type ImagePickerProps = {
  /** Object URL of the chosen image, or null. */
  value: string | null;
  onChange: (url: string | null) => void;
};

/**
 * Step 4: pick a photo and preview it. There is no storage yet, so the file
 * input has no `name` and the image is never sent with the form.
 */
export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const copy = newPost.image;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium">
        {copy.label} <span className="font-normal text-v-text-2">{copy.optional}</span>
      </span>
      {value ? (
        <div className="relative overflow-hidden rounded-[20px] bg-v-beige">
          {/* eslint-disable-next-line @next/next/no-img-element -- local object URL */}
          <img src={value} alt={copy.alt} className="block max-h-80 w-full object-cover" />
          <Button
            variant="outline"
            onClick={() => onChange(null)}
            className="absolute top-3 right-3 bg-v-paper"
          >
            <Icon name="x" className="size-4" />
            {copy.remove}
          </Button>
        </div>
      ) : (
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-v-edge bg-v-paper p-6 text-center text-v-text-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-v-brand">
          <Icon name="image" className="size-8" />
          <span className="font-semibold text-v-text">{copy.cta}</span>
          <span className="text-[13px]">{copy.formats}</span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onChange(URL.createObjectURL(file));
            }}
            className="sr-only"
          />
        </label>
      )}
      <p className="text-[13px] text-v-text-3">{copy.soon}</p>
    </div>
  );
}
