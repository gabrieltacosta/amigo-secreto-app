"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma"; // Verifique se este arquivo importa do "../src/generated/prisma"
import { headers } from "next/headers";
import { FormData } from "@/components/new-group-form";
import { nanoid } from "nanoid";
import { Resend } from "resend";
import { render } from "@react-email/render";
import SecretFriendEmail from "@/components/emails/secret-friend";

export const createGroup = async (data: FormData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  if (!data.participant || data.participant.length < 2) {
    throw new Error(
      "Adicione pelo menos 2 participantes para realizar o sorteio"
    );
  }


  // Gera IDs manuais para controle do sorteio em memória
  const participantsWithId = data.participant.map((p) => ({
    id: nanoid(),
    name: p.name,
    email: p.email,
  }));

  // --- Lógica de Sorteio (Fisher-Yates com Derangement) ---
  const generateDerangement = (n: number) => {
    const indices = Array.from({ length: n }, (_, i) => i);
    let shuffled = [...indices];
    let attempts = 0;

    const fisherYatesShuffle = (arr: number[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    do {
      shuffled = [...indices];
      fisherYatesShuffle(shuffled);
      attempts++;
      if (attempts > 500) return indices.map((i) => (i + 1) % n);
    } while (shuffled.some((v, i) => v === i));

    return shuffled;
  };

  const perm = generateDerangement(participantsWithId.length);

  const drawnPairs = participantsWithId.map((p, i) => ({
    participantId: p.id,
    drawnParticipantId: participantsWithId[perm[i]].id,
  }));
  // -------------------------------------------------------

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Criar o Grupo
      const createdGroup = await tx.group.create({
        data: {
          name: data.group_name,
          userId: session.user.id,
        },
      });

      // 2. Criar Participantes (sem o amigo secreto ainda)
      // Usamos createMany é mais performático, mas create em loop permite setar o ID manual
      await Promise.all(
        participantsWithId.map((p) =>
          tx.participant.create({
            data: {
              id: p.id, // ID manual do nanoid
              name: p.name,
              email: p.email,
              groupId: createdGroup.id,
            },
          })
        )
      );

      // 3. Atualizar Participantes com o amigo sorteado (Conectar a relação)
      await Promise.all(
        drawnPairs.map((d) =>
          tx.participant.update({
            where: { id: d.participantId },
            data: {
              // AQUI ESTAVA O ERRO: Use a sintaxe de relação
              drawnParticipant: {
                connect: {
                  id: d.drawnParticipantId,
                },
              },
            },
          })
        )
      );

      return createdGroup;
    });

    // Fetch participants from DB with their assigned drawnParticipant
    const dbParticipants = await prisma.participant.findMany({
      where: { groupId: result.id },
      include: { drawnParticipant: true },
    });

    // Send emails (do not fail group creation if emails can't be delivered)
    const { error: emailError } = await sendEmailToParticipants(
      dbParticipants,
      data.group_name,
      result.id
    );

    if (emailError) {
      console.error("Erro ao enviar emails ao criar grupo:", emailError);
      return { success: true, groupId: result.id, emailError: true };
    }

    return { success: true, groupId: result.id };
  } catch (error) {
    console.error("Erro na transação:", error);
    throw new Error("Falha ao criar grupo e sorteio.");
  }
};

type DbParticipant = {
  id: string;
  name: string;
  email: string | null;
  drawnParticipant?: { id: string; name: string } | null;
};

async function sendEmailToParticipants(
  participants: DbParticipant[],
  groupName: string,
  groupId: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1. Filtra participantes válidos
  const toSend = participants.filter((p) => p.email && p.email.trim() !== "");
  
  if (toSend.length === 0) {
    return { error: "Nenhum participante com email válido." };
  }

  // 2. Transforma a lista no formato que o Resend Batch espera, renderizando o componente de e-mail
  const batchPayload = await Promise.all(
    toSend.map(async (participant) => {
      const assignedId = participant.drawnParticipant?.id;

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

      // friendId na URL será o ID do amigo sorteado
      const revealUrl = assignedId
        ? `${baseUrl}/group/${groupId}/friend/${assignedId}`
        : `${baseUrl}`;

      const html = await render(
        SecretFriendEmail({
          participantName: participant.name,
          groupName,
          revealUrl,
        })
      );

      return {
        from: `Amigo Secreto ${groupName} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: participant.email as string,
        subject: `Sorteio de amigo secreto - ${groupName}`,
        html,
      };
    })
  );

  try {
    // 3. Envia em lotes (Batch)
    // O Resend aceita até 100 por chamada. 
    // Se você tiver mais de 100, precisará dividir o array 'batchPayload'.
    const { data, error } = await resend.batch.send(batchPayload);

    if (error) {
      console.error("Erro no Resend Batch:", error);
      return { error: error.message };
    }

    return { error: null, data };
  } catch (err) {
    console.error("Erro inesperado ao enviar emails:", err);
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
