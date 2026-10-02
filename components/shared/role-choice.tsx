import { ChoiceCard } from "@/components/shared/choice-card";
import { onboarding } from "@/content/auth";
import { cn } from "@/lib/utils";

const iconTone = { olive: "bg-v-olive", pink: "bg-v-pink" } as const;
const kickerTone = { olive: "text-v-olive-ink", pink: "text-v-accent-ink" } as const;

export type Role = (typeof onboarding.role.options)[number]["value"];

type RoleChoiceProps = {
  legend: string;
  value: Role | null;
  onChange: (role: Role) => void;
};

/** The two `userType` radio cards: lab or territory. */
export function RoleChoice({ legend, value, onChange }: RoleChoiceProps) {
  return (
    <fieldset className="flex flex-wrap gap-4">
      <legend className="sr-only">{legend}</legend>
      {onboarding.role.options.map((option) => {
        const checked = value === option.value;
        return (
          <ChoiceCard
            key={option.value}
            checked={checked}
            className="flex-[1_1_240px] flex-col gap-4 p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-full",
                  iconTone[option.tone],
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-v-on-accent"
                >
                  <path d={option.icon} />
                </svg>
              </span>
              <input
                type="radio"
                name="userType"
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="size-5 accent-v-ink"
              />
            </div>
            <span
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.075em]",
                kickerTone[option.tone],
              )}
            >
              {option.kicker}
            </span>
            <span className="text-[21px] leading-[1.2] font-semibold">{option.title}</span>
            <span className="text-v-text-2">{option.text}</span>
          </ChoiceCard>
        );
      })}
    </fieldset>
  );
}
