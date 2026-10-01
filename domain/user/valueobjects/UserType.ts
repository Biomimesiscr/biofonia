export const USER_TYPES = ["IN_LABORATORY", "IN_FIELD"] as const;

/** Where the user joins the conversation from: the lab or the territory. */
export type UserType = (typeof USER_TYPES)[number];
