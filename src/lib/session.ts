import "server-only";

import { cookies } from "next/headers";
import { decryptSession, encryptSession } from "@/lib/session-crypto";

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);
  const session = await encryptSession(userId);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function readSession() {
  const token = (await cookies()).get("session")?.value;
  return decryptSession(token);
}
