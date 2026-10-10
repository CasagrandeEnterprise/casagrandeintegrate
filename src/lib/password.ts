import bcrypt from "bcryptjs";

export const BCRYPT_ROUNDS = 12;

// Same cost as stored passwords, so a missing account takes a similar time to reject.
export const DUMMY_PASSWORD_HASH =
  "$2b$12$IEv9zaxZPUP9/.4N2UwfIeF/y6eflLTnuToU3pvje653HRuE.3LV6";

export function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
