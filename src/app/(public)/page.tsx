import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
        Casagrande Integrate
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Acesso restrito à área administrativa.
      </p>
      <div className="mt-8">
        <Link href="/login" className={buttonVariants({ size: "lg" })}>
          Entrar
        </Link>
      </div>
    </main>
  );
}
