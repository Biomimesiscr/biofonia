import { UserType } from "@/domain/user/valueobjects/UserType";

export interface UpdateProfileInput {
  name: string;
  userType: UserType;
  biography: string;
}
