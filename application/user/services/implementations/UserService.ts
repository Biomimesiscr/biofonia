import { User } from "@/domain/user/entities/User";
import { IUserRepository } from "@/domain/user/repositories/IUserRepository";
import { CompleteOnboardingInput } from "../../dtos/CompleteOnboardingInput";
import { UpdateProfileInput } from "../../dtos/UpdateProfileInput";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async get(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundError(id);
    return user;
  }

  async completeOnboarding(id: string, input: CompleteOnboardingInput): Promise<User> {
    const user = await this.get(id);
    user.completeOnboarding(input);
    return this.userRepository.update(user);
  }

  async updateProfile(id: string, input: UpdateProfileInput): Promise<User> {
    const user = await this.get(id);
    user.updateProfile(input);
    return this.userRepository.update(user);
  }
}
