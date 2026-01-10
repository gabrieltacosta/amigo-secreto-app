"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface deleteGroupProps {
  groupIdDelete: string;
}

export const deleteGroup = async ({ groupIdDelete }: deleteGroupProps) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const group = await prisma.group.findUnique({
    where: { id: groupIdDelete },
  });

  if (!group) {
    throw new Error("Grupo não encontrado");
  }

  if (group.userId !== session.user.id) {
    throw new Error("Não autorizado");
  }

  await prisma.group.delete({ where: { id: groupIdDelete } });

  // redireciona para dashboard após exclusão
  redirect("/dashboard");
};
