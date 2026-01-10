"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteGroup } from "@/app/dashboard/groups/[id]/actions";
import { useState } from "react";

interface ButtonProps {
  groupId: string;
}

const DeleteGroupButton = ({ groupId }: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // A action server faz o redirect em caso de sucesso
      await deleteGroup({ groupIdDelete: groupId });
    } catch (err: any) {
      alert(err?.message || "Erro ao excluir o grupo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            onClick={handleDelete}
            variant={"link"}
            size={"icon"}
            disabled={loading}
          >
            <Trash2 size={20} className="text-red-500/70" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir este grupo?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteGroupButton;
