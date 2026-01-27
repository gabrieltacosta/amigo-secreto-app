import DeleteGroupButton from "@/components/delete-group-button";
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
  const groupId = (await params).id as string;

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
      <Card className="max-w-xs md:max-w-2xl relative">
        <div className="absolute right-3">
          <DeleteGroupButton groupId={groupId} />
        </div>
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
              text="Deslize para revelar!"
              revealText={`${drawnParticipantName?.name}`}
            >
              <TextRevealCardTitle className="text-sm md:text-base">Você tirou:</TextRevealCardTitle>
            </TextRevealCard>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
