"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOutButton = () => {
  const router = useRouter();
  const [signouting, setSignouting] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Deslogado com sucesso.");
          setSignouting(false);
          router.push("/");
        },
        onError: () => {
          toast.error("Erro ao deslogar. Tente novamente.");
          setSignouting(false);
        },
        onRequest: () => {
          setSignouting(true);
        },
        onResponse: () => {
          setSignouting(false);
        },
      },
    });
  };

  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      onClick={handleSignOut}
      disabled={signouting === true}
    >
      {signouting ? "Saindo..." : "Sair"}
    </Button>
  );
};

export default SignOutButton;
