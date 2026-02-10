import Footer from "@/components/footer";
import HeroSession from "@/components/hero-session";
import CtaSession from "@/components/cta-session";
import HighlightSession from "@/components/highlight-session";
import InstructionSession from "@/components/instruction-session";
import Testimonials from "@/components/testimonials-section";

export default function Home() {


  return (
    <>
      <main className="flex flex-1 flex-col gap-12 py-12 md:py-16 lg:py-20">
        {/* Hero */}
        <HeroSession />

        {/* Como funciona */}
        <InstructionSession />

        {/* Destaque visual */}
        <HighlightSession />

        {/* Prova social*/}
        <Testimonials />

        {/* CTA final */}
        <CtaSession />
      </main>
      <Footer />
    </>
  );
}
