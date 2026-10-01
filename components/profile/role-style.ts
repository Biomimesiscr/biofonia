import { onboarding } from "@/content/auth";
import type { Audience } from "@/content/home";

/** Badge, avatar and accent classes for each member role tone. */
export const roleStyle = {
  pink: { badge: "pink-soft", avatar: "pink", dot: "text-v-pink", text: "text-v-accent-ink" },
  olive: { badge: "olive-soft", avatar: "olive", dot: "text-v-olive", text: "text-v-olive-ink" },
} as const;

export type UserType = (typeof onboarding.role.options)[number]["value"];

/** The onboarding role option and its styles for a user type. */
export function roleFor(userType: UserType) {
  const role = onboarding.role.options.find((option) => option.value === userType)!;
  return { role, style: roleStyle[role.tone] };
}

/** The audience pill ("Laboratorio" / "Territorio") a user type is shown with. */
export function audienceOf(userType: UserType): Audience {
  return userType === "IN_FIELD" ? "territorio" : "laboratorio";
}
