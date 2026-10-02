import { User } from "@/domain/user/entities/User";
import { CompleteOnboardingInput } from "../../dtos/CompleteOnboardingInput";
import { UpdateProfileInput } from "../../dtos/UpdateProfileInput";

export interface IUserService {
  get(id: string): Promise<User>;
  completeOnboarding(id: string, input: CompleteOnboardingInput): Promise<User>;
  updateProfile(id: string, input: UpdateProfileInput): Promise<User>;
}
