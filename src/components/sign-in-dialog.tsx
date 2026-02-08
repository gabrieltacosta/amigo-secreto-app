"use client";

import { Gift } from "lucide-react";
import SignIn from "./sign-in-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

const SignInDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          Começar agora
          <Gift className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <SignIn />
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
