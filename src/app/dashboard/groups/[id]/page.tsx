import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  TextRevealCard,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import prisma from "@/lib/prisma";

export default async function GroupsPage({
  params,
}: {
  params: { id: string };
}) {
  const group = await prisma.group.findMany({
    where: {
      id: params.id,
    },
    include: {
      participants: true,
    },
  });

  
  const drawnParticipant = group[0]?.participants[0]?.drawnParticipantId;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4">{group[0]?.name}</h1>
      <Card className="min-w-full md:min-w-md">
        <CardContent>
          <CardContent className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Participantes
            </h2>
            <ul className="space-y-2">
              {group[0]?.participants.map((participant) => (
                <li key={participant.id} className="border-b">
                  {participant.name}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <TextRevealCard
              text="Passe o mouse para revelar!"
              revealText={`
                ${
                  group[0]?.participants.find(
                    (participant) => participant.id === drawnParticipant
                  )?.name
                }`}
            >
              <TextRevealCardTitle>Você tirou:</TextRevealCardTitle>
            </TextRevealCard>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
