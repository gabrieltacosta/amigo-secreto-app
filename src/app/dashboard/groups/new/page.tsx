import NewGroupForm from "@/components/new-group-form";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Novo Grupo",
};

export default async function NewGroupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const loggedUser = {
    id: session?.user?.id as string,
    name: session?.user?.name.split(" ")[0] as string,
    email: session?.user?.email as string,
  };

  return (
    <div className="mt-8">
      <NewGroupForm {...loggedUser} />
    </div>
  );
}
