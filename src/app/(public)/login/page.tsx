import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { readSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className="font-heading text-base leading-snug font-medium">
            Entrar
          </h1>
          <CardDescription>Acesso restrito ao administrador.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p className="text-sm text-muted-foreground">Carregando…</p>}>
            <AuthenticatedLogin />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}

async function AuthenticatedLogin() {
  const session = await readSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
