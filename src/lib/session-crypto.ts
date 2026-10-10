import { SignJWT, jwtVerify } from "jose";

const SESSION_DURATION = "7d";

function getKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
  }

  return new TextEncoder().encode(secret);
}

export async function encryptSession(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getKey());
}

export async function decryptSession(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getKey(), {
      algorithms: ["HS256"],
    });

    if (typeof payload.userId !== "string" || payload.userId.length === 0) {
      return null;
    }

    return { userId: payload.userId };
  } catch {
    return null;
  }
}
