import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Painel",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader action="logout" />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Painel</h1>
        <Suspense
          fallback={
            <p className="mt-8 text-sm text-muted-foreground">
              Carregando sessão…
            </p>
          }
        >
          <SessionCard />
        </Suspense>
      </main>
    </div>
  );
}

async function SessionCard() {
  const user = await getCurrentUser();

  return (
    <Card className="mt-8 max-w-md">
      <CardHeader>
        <h2 className="font-heading text-base leading-snug font-medium">
          Sessão ativa
        </h2>
        <CardDescription>
          Você está autenticado como administrador.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <p className="font-medium">{user.name}</p>
        <p className="text-muted-foreground">{user.email}</p>
      </CardContent>
    </Card>
  );
}
