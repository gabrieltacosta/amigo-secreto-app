"use client";

import { Gift, MenuIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SignOutButton from "./sign-out-button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  const isMobile = useIsMobile();
  const { data: session } = authClient.useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link
            href={"/"}
            className="text-lg sm:text-2xl font-bold flex items-center gap-2"
          >
            <Gift className="h-6 w-6 text-red-400" />
            <span>
              Amigo <span className="font-thin">Secreto Simples</span>
            </span>
          </Link>
          {!session ? <Button variant={"outline"} asChild><Link href={"/"}>Home</Link></Button> :
            <>
              {isMobile ? (
                <Sheet>
                  <SheetTrigger>
                    <MenuIcon />
                  </SheetTrigger>
                  <SheetContent className="p-4">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={session?.user.image as string} />
                          <AvatarFallback>
                            {session?.user.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span> Olá, {session?.user.name}</span>
                      </SheetTitle>
                    </SheetHeader>
                    <SheetClose asChild>
                      <Button asChild variant="outline">
                        <Link
                          href={"/dashboard"}
                          className="text-foreground text-sm flex gap-2 items-center"
                        >
                          <UserRound className="w-4 h-4" />
                          Meus Grupos
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="outline">
                        <Link href={"/dashboard/groups/new"}>Novo Grupo</Link>
                      </Button>
                    </SheetClose>
                    <SignOutButton />
                  </SheetContent>
                </Sheet>
              ) : (
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
                  <span> Olá, {session?.user.name}</span>
                  <SignOutButton />
                </nav>
              )}
            </>
          }
        </div>
      </div>
    </header>
  );
}
