import { randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto";
import { IPasswordHasher } from "@/domain/auth/services/IPasswordHasher";

const KEY_LENGTH = 64;
// OWASP-recommended scrypt cost (N=2^17, r=8, p=1) needs ~128 MiB of memory.
const PARAMS = { N: 2 ** 17, r: 8, p: 1 } as const;

function deriveKey(password: string, salt: Buffer, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize("NFKC"), salt, KEY_LENGTH, options, (error, key) =>
      error ? reject(error) : resolve(key),
    );
  });
}

/**
 * Hashes with Node's built-in scrypt. Stored format is self-describing so the
 * cost can be raised later without breaking existing hashes:
 * `scrypt$N$r$p$<salt base64>$<key base64>`.
 */
export class ScryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16);
    const key = await deriveKey(password, salt, { ...PARAMS, maxmem: 256 * 1024 * 1024 });
    return ["scrypt", PARAMS.N, PARAMS.r, PARAMS.p, salt.toString("base64"), key.toString("base64")].join("$");
  }

  async verify(password: string, hash: string): Promise<boolean> {
    const [algorithm, n, r, p, salt, key] = hash.split("$");
    if (algorithm !== "scrypt" || !salt || !key) return false;

    const expected = Buffer.from(key, "base64");
    const actual = await deriveKey(password, Buffer.from(salt, "base64"), {
      N: Number(n),
      r: Number(r),
      p: Number(p),
      maxmem: 256 * 1024 * 1024,
    });
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }
}
