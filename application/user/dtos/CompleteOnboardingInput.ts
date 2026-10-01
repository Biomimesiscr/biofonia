import { UserType } from "@/domain/user/valueobjects/UserType";

export interface CompleteOnboardingInput {
  userType: UserType;
  biography: string;
}
