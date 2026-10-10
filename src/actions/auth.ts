"use server";

import { redirect } from "next/navigation";
import { isAccountLocked, nextFailedLogin } from "@/lib/lockout";
import { loginSchema, type LoginState } from "@/lib/login-schema";
import { DUMMY_PASSWORD_HASH, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

const INVALID_CREDENTIALS = "Credenciais inválidas.";
const ACCOUNT_LOCKED = "Muitas tentativas. Tente novamente mais tarde.";
const UNAVAILABLE = "Não foi possível entrar agora. Tente novamente.";

export async function login(
  _state: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    const passwordMatches = await verifyPassword(
      password,
      user?.passwordHash ?? DUMMY_PASSWORD_HASH,
    );
    const now = new Date();

    if (user && isAccountLocked(user.lockedUntil, now)) {
      return { message: ACCOUNT_LOCKED };
    }

    if (!user || !passwordMatches) {
      if (user) {
        const next = nextFailedLogin(user.failedLoginCount, now);
        await prisma.user.update({
          where: { id: user.id },
          data: next,
        });

        if (next.lockedUntil) {
          return { message: ACCOUNT_LOCKED };
        }
      }

      return { message: INVALID_CREDENTIALS };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount: 0,
        lockedUntil: null,
      },
    });
    await createSession(user.id);
  } catch {
    return { message: UNAVAILABLE };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
