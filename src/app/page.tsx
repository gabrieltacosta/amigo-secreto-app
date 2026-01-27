import { Gift, Sparkles, Users, Shuffle, GiftIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import Footer from "@/components/footer";
import SignInDialog from "@/components/sign-in-dialog";
import SignUpDialog from "@/components/sign-up-dialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })


  return (
    <>
      <main className="flex flex-1 flex-col gap-12 py-12 md:py-16 lg:py-20">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              Organize seu Amigo Secreto em minutos
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
              famílias e empresas.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {session ? <Button asChild>
                <Link href={"/dashboard"}>
                  Entrar no Dashboard
                </Link></Button> :
                <>
                  <SignUpDialog />
                  <SignInDialog />
                </>

              }

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

        {/* Como funciona */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Como funciona
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Em poucos cliques seu sorteio está pronto para acontecer.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border/60 bg-card/80">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    1
                  </span>
                  Crie o grupo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Defina o nome do grupo, data do sorteio e valor do presente. Tudo
                organizado em um só lugar.
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/80">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    2
                  </span>
                  Adicione participantes
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cadastre os participantes com email, evitando repetições e mantendo tudo
                pronto para o sorteio.
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/80">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    3
                  </span>
                  Sorteie em um clique
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                O app cuida do sorteio automaticamente, garantindo que ninguém se
                tire e que tudo seja justo e cada participante recebera um email com seu amigo secreto.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Destaque visual */}
        <section className="flex justify-center">
          <TextRevealCard
            text="Planilhas bagunçadas, papéis perdidos..."
            revealText="Um lugar para organizar seu Amigo Secreto."
            className="max-w-full border-border/60 bg-card/90 shadow-xl shadow-black/40"
          >
            <TextRevealCardTitle className="text-sm font-medium text-muted-foreground">
              Passe o mouse (ou toque) para revelar
            </TextRevealCardTitle>
            <TextRevealCardDescription>
              Experiência pensada para facilitar a vida de quem organiza o
              Amigo Secreto — do primeiro cadastro até o dia da troca de
              presentes.
            </TextRevealCardDescription>
          </TextRevealCard>
        </section>

        {/* CTA final */}
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
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {session ? <Button asChild>
              <Link href={"/dashboard"}>
                Entrar no Dashboard
              </Link></Button> :
              <>
                <SignUpDialog />
                <SignInDialog />
              </>

            }
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
