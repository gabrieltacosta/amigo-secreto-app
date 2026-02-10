import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "./ui/button";
import Link from "next/link";
import SignInDialog from "./sign-in-dialog";

const CtaSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border/60 bg-background/60 p-6 text-center md:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
        pronto para começar?
      </p>
      <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        Crie agora seu próximo Amigo Secreto e deixe o app cuidar do resto.
      </h2>
      <p className="max-w-xl text-balance text-sm text-muted-foreground">
        Clique em &quot;Começar agora&quot; para criar sua conta gratuita e
        montar o primeiro grupo em poucos minutos.
      </p>
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Totalmente grátis. Sem cobranças, sem limitações, sem cartão de
          crédito.
        </p>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        {session ? (
          <Button asChild>
            <Link href={"/dashboard"}>Entrar no Dashboard</Link>
          </Button>
        ) : (
          <>
            <SignInDialog />
          </>
        )}
      </div>
    </section>
  );
};

export default CtaSession;
