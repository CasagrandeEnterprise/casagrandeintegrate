import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, { error: "Informe um e-mail válido." })
    .pipe(z.email({ error: "Informe um e-mail válido." })),
  password: z
    .string()
    .min(8, { error: "A senha deve ter pelo menos 8 caracteres." })
    .max(72, { error: "A senha deve ter no máximo 72 caracteres." }),
});

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};
