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
import { deleteGroup } from "@/app/dashboard/groups/[id]/actions";

interface ButtonProps {
  groupId: string;
}

const DeleteGroupButton = ({ groupId }: ButtonProps) => {
  const handleDelete = async () => {
    await deleteGroup({ groupIdDelete: groupId });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash2 size={20} className="text-red-500/70 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir este grupo?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteGroupButton;
