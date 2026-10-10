import Link from "next/link";
import { logout } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";

export function SiteHeader({ action }: { action: "login" | "logout" }) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Casagrande Integrate
        </Link>
        {action === "login" ? (
          <Link href="/login" className={buttonVariants()}>
            Entrar
          </Link>
        ) : (
          <form action={logout}>
            <Button type="submit" variant="outline">
              Sair
            </Button>
          </form>
        )}
      </div>
    </header>
  );
}
