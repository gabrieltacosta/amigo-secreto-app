import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TextRevealCard, TextRevealCardTitle } from "@/components/ui/text-reveal-card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string, friendId: string }>;
}) {
  // No Next.js 15+, 'params' é uma Promise, então usamos await
  const groupId = (await params).id as string;
  const friendId = (await params).friendId as string

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  // Se o grupo não existir, retorna 404
  if (!group) {
    notFound();
  }

  const participants = await prisma.participant.findMany({
    where: {
      groupId: groupId,
      drawnParticipantId: friendId
    },
  });

  // Se nenhum participante tiver tirado esse amigo, retorna 404
  if (!participants || participants.length === 0) {
    notFound();
  }

  const drawnParticipantId = participants[0].drawnParticipantId;

  if (!drawnParticipantId) {
    notFound();
  }

  const drawnParticipantName = await prisma.participant.findUnique({
    where: {
      id: drawnParticipantId as string,
    },
  });

  if (!drawnParticipantName) {
    notFound();
  }


  return (
    <div className="flex w-full flex-col min-h-dvh">
      <div className="flex flex-col">
        <Header />
      </div>
      <div className="flex-1 flex-col">
        <div className="w-full h-full flex flex-col justify-center items-center p-4">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Sorteio do amigo secreto do grupo "{group?.name}"</h1>
          <Card className="max-w-sm md:max-w-2xl">
            <CardContent>
              <CardContent className="mb-8">
                <p className="text-lg md:text-xl font-semibold mb-4">
                  Olá, <span>{participants[0].name}</span>
                </p>
              </CardContent>
              <CardFooter>
                <TextRevealCard
                  text="Deslize para revelar!"
                  revealText={`${drawnParticipantName?.name}`}
                >
                  <TextRevealCardTitle className="text-sm md:text-base">Você tirou:</TextRevealCardTitle>
                </TextRevealCard>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col">
        <Footer />
      </div>
    </div>
  )
}