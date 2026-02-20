import { Gift, GiftIcon, Shuffle, Sparkles, Users } from "lucide-react";
import { Button } from "./ui/button";
import SignInDialog from "./sign-in-dialog";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const HeroSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" />
          <span>Organize seu Amigo Secreto em minutos</span>
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Amigo secreto{" "}
          <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent">
            simples, seguro
          </span>{" "}
          e sem planilhas.
        </h1>

        <p className="text-balance text-sm text-muted-foreground sm:text-base">
          Crie grupos, cadastre participantes, faça o sorteio automático e
          mantenha tudo organizado em um só lugar. Ideal para equipes, amigos,
          famílias e empresas.{" "}
          <span className="font-semibold text-foreground">
            100% gratuito, sem cobranças ocultas.
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {session ? (
            <Button asChild>
              <Link href={"/dashboard"}>Entrar no Dashboard</Link>
            </Button>
          ) : (
            <>
              <SignInDialog />
            </>
          )}

          <p className="w-full text-xs text-muted-foreground md:w-auto">
            Sem complicação. Em poucos cliques seu grupo está pronto.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/40 px-3 py-1">
            <Shuffle className="h-3 w-3 text-primary" />
            Sorteio justo e automático
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/40 px-3 py-1">
            <Users className="h-3 w-3 text-primary" />
            Perfeito para grupos pequenos ou grandes
          </div>
        </div>
      </div>

      <div className="relative flex justify-center md:justify-end">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,_var(--primary)/20,_transparent_60%),radial-gradient(circle_at_bottom,_var(--accent)/10,_transparent_60%)] blur-3xl" />

        <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg shadow-black/40 backdrop-blur">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary/10 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Gift className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Amigo Secreto
              </p>
              <p className="text-sm text-muted-foreground">
                Painel simples, foco no sorteio
              </p>
            </div>
          </div>

          <GiftIcon
            width={260}
            height={260}
            className="h-40 w-40 rounded-3xl border border-border/60 bg-background/60 object-contain shadow-inner shadow-black/40 md:h-52 md:w-52 text-red-400"
          />

          <div className="w-full text-xs text-muted-foreground">
            <p className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 px-4 py-3">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Sorteio pronto em
              </span>
              <span className="font-semibold text-foreground">3 passos</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSession;
