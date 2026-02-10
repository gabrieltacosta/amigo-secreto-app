import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const InstructionSession = () => {
  return (
    <section className="space-y-6 mt-10 sm:mt-32">
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
            Cadastre os participantes com email, evitando repetições e mantendo
            tudo pronto para o sorteio.
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
            tire e que tudo seja justo e cada participante recebera um email com
            seu amigo secreto.
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InstructionSession;
