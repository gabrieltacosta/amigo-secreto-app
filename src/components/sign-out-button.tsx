"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";

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
      variant={"ghost"}
      size={"sm"}
      onClick={handleSignOut}
      disabled={signouting === true}
    >
      {signouting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
    </Button>
  );
};

export default SignOutButton;
