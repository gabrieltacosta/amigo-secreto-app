"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma"; // Verifique se este arquivo importa do "../src/generated/prisma"
import { headers } from "next/headers";
import { FormData } from "@/components/new-group-form";
import { nanoid } from "nanoid";

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

    return { success: true, groupId: result.id };
  } catch (error) {
    console.error("Erro na transação:", error);
    throw new Error("Falha ao criar grupo e sorteio.");
  }
};
