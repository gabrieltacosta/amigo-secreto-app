import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const groups = await prisma.group.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col w-full min-h-dvh p-4">
      <h1>Meus Grupos</h1>
      {groups.length === 0 ? (
        <span>Nenhum grupo encontrado.</span>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.id}>{group.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;
