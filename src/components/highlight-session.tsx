import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "./ui/text-reveal-card";

const HighlightSession = () => {
    return ( 
        <section className="flex justify-center">
          <TextRevealCard
            text="Planilhas bagunçadas, papéis perdidos..."
            revealText="Um lugar para organizar seu Amigo Secreto."
            className="max-w-full flex flex-col items-center text-center border-border/60 bg-card/90 shadow-xl shadow-black/40"
          >
            <TextRevealCardTitle className="text-sm font-medium text-muted-foreground">
              Passe o mouse (ou toque) para revelar
            </TextRevealCardTitle>
            <TextRevealCardDescription>
              Experiência pensada para facilitar a vida de quem organiza o Amigo
              Secreto — do primeiro cadastro até o dia da troca de presentes.
            </TextRevealCardDescription>
          </TextRevealCard>
        </section>
     );
}
 
export default HighlightSession;