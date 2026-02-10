"use client";

import Link from "next/link";
import { Gift, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-12 md:py-16 lg:py-20">
      {/* Ícone animado */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="relative animate-bounce">
          <Gift className="w-24 h-24 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            404 - Presente Perdido!
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Parece que alguém abriu o presente errado... Esta página não existe ou
          foi movida.
        </p>
      </div>

      {/* Sugestões de ajuda */}
      <div className="w-full max-w-md p-4 rounded-lg bg-card border border-border">
        <div className="flex items-start gap-3">
          <Search className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">O que você pode fazer:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Verificar a URL digitada</li>
              <li>• Voltar à página inicial</li>
              <li>• Acessar seu painel de controle</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Button asChild variant="default" className="flex-1">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/dashboard">Ir para Dashboard</Link>
        </Button>
      </div>

      {/* Mensagem decorativa */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-xs text-muted-foreground/50">
          Erro 404 • Página não encontrada
        </p>
        <div className="flex justify-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/30" />
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/50" />
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
