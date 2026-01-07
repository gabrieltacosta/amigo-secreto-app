import { Gift, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SignOutButton from "./signoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link
            href={"/"}
            className="text-2xl font-bold flex items-center gap-2"
          >
            <Gift className="h-6 w-6 text-red-400" />
            <span>
              Amigo <span className="font-thin">Secreto</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link
                href={"/dashboard"}
                className="text-foreground text-sm flex gap-2 items-center"
              >
                <UserRound className="w-4 h-4" />
                Meus Grupos
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={"/dashboard/groups/new"}>Novo Grupo</Link>
            </Button>
            <Avatar>
              <AvatarImage src={session?.user.image as string} />
              <AvatarFallback>
                {session?.user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span> Olá, {session && session?.user.name}</span>
            <SignOutButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
