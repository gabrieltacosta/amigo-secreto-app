import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  TextRevealCard,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import prisma from "@/lib/prisma";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const groupId = (await params).id;

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  const participants = await prisma.participant.findMany({
    where: {
      groupId: groupId,
    },
  });

  const drawnParticipantId = participants[0].drawnParticipantId;

  const drawnParticipantName = await prisma.participant.findUnique({
    where: {
      id: drawnParticipantId as string,
    },
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4">{group?.name}</h1>
      <Card className="min-w-full md:min-w-md">
        <CardContent>
          <CardContent className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Participantes
            </h2>
            <ul className="space-y-2">
              {participants.map((p) => (
                <li key={p.id} className="border-b">
                  {p.name}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <TextRevealCard
              text="Passe o mouse para revelar!"
              revealText={`${drawnParticipantName?.name}`}
            >
              <TextRevealCardTitle>Você tirou:</TextRevealCardTitle>
            </TextRevealCard>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
