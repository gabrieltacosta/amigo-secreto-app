import { ConfettiTrigger } from "@/components/confetti-trigger";
import DeleteGroupButton from "@/components/delete-group-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  TextRevealCard,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { Metadata } from "next";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const groupId = (await params).id;
  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  return {
    title: group?.name || "Grupo",
  };
}



export default async function GroupPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created: string }>;
}) {
  const groupId = (await params).id as string;
  const isCreator = (await searchParams).created === "true";

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
      {isCreator && <ConfettiTrigger />}
      <h1 className="text-xl md:text-2xl font-bold mb-4">{group?.name}</h1>
      <Card className="max-w-xs md:max-w-2xl relative">
        <div className="absolute right-3">
          <DeleteGroupButton groupId={groupId} />
        </div>
        <CardContent>
          <CardContent className="mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>e-mail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((p) => (
                  <TableRow key={p.id} className="p-2">
                    <TableCell>{p.name}</TableCell>
                    <TableCell className="text-xs md:text-sm lg:text-base">
                      {p.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className="text-xs md:text-sm lg:text-base">
                    {participants.length} participantes
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter>
            <TextRevealCard
              text="Deslize para revelar!"
              revealText={`${drawnParticipantName?.name}`}
              className="max-w-full flex flex-col items-center text-center border-border/60 bg-card/90 shadow-xl shadow-black/40"
            >
              <TextRevealCardTitle className="text-sm md:text-base">
                Você tirou:
              </TextRevealCardTitle>
            </TextRevealCard>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
