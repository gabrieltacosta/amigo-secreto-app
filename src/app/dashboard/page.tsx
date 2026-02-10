import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

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
    <div className="flex flex-col w-full p-4 gap-8">
      <h1 className="text-center sm:text-2xl">Meus Grupos</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {groups.length === 0 ? (
          <p>Nenhum grupo encontrado.</p>
        ) : (
          groups.map((group) => (
            <Link
              href={`/dashboard/groups/${group.id}`}
              key={group.id}
            >
              <Card className="mb-4 hover:shadow-xl">
                <CardContent>
                  <h2 className="text-lg font-semibold">{group.name}</h2>
                </CardContent>
                <CardFooter>
                  <span className="text-xs font-thin">
                    Criado em{" "}
                    {new Date(group.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
