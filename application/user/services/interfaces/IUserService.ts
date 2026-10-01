import { User } from "@/domain/user/entities/User";
import { CompleteOnboardingInput } from "../../dtos/CompleteOnboardingInput";

export interface IUserService {
  get(id: string): Promise<User>;
  completeOnboarding(id: string, input: CompleteOnboardingInput): Promise<User>;
}
