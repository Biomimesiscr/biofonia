import { createHash, randomBytes } from "node:crypto";
import { ISessionTokenService } from "@/domain/auth/services/ISessionTokenService";

export class CryptoSessionTokenService implements ISessionTokenService {
  generate(): string {
    return randomBytes(32).toString("base64url");
  }

  hash(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }
}
