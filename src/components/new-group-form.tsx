"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { createGroup } from "@/app/dashboard/groups/new/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  group_name: z.string().min(3, "Digite no minímo 3 caracteres!").trim(),
  participant: z
    .array(
      z.object({
        name: z.string().min(1, "Digite o nome do participante").trim(),
        email: z.string().email("Digite um email válido").trim(),
      }),
    )
    .min(1, "Adicione pelo menos um participante"),
});

export type FormData = z.infer<typeof formSchema>;

export default function NewGroupForm({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group_name: "",
      participant: [{ name: name ?? "", email: email ?? "" }],
    },
  });

  const { setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participant",
  });

  const router = useRouter();

  useEffect(() => {
    const firstName = name ?? "";
    setValue("participant.0.name", firstName);
    setValue("participant.0.email", email ?? "");
  }, [name, email, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (data.participant.length < 3) {
        toast.error("Adicione pelo menos 3 participantes para criar o grupo.");
        return;
      }
      setLoading(true);
      const { groupId } = await createGroup(data);
      form.reset();
      toast.success("Grupo criado com sucesso! Emails enviados.");
      router.push(`/dashboard/groups/${groupId}?created=true`);
      setLoading(false);
    } catch (error) {
      toast.error(`Erro ao criar grupo: ${error}`);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Impede o envio do formulário
      append({ name: "", email: "" }); // Adiciona o novo campo
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle>Novo grupo</CardTitle>
        <CardDescription>Convide seus amigos para participar</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="group_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do grupo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do grupo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="mt-12! mb-4">Participantes</h2>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center space-y-4 w-full"
              >
                <div className="md:col-span-5 space-y-2">
                  <FormField
                    control={form.control}
                    name={`participant.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o nome da pessoa"
                            className="readonly:text-muted-foreground"
                            {...(index === 0 ? { readOnly: true } : {})}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:col-span-6 space-y-2">
                  <FormField
                    control={form.control}
                    name={`participant.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o email da pessoa"
                            className="readonly:text-muted-foreground"
                            {...(index === 0 ? { readOnly: true } : {})}
                            onKeyDown={handleKeyDown}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:col-span-1 flex justify-center items-center">
                  {index !== 0 && (
                    <Button
                      type="button"
                      variant="link"
                      size={"icon"}
                      disabled={loading}
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500/90" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0 w-full">
              <Button
                variant="outline"
                type="button"
                onClick={() => append({ name: "", email: "" })}
                className="w-full md:w-auto"
              >
                Adicionar amigo
              </Button>
              <Button
                type="submit"
                className="flex items-center space-x-2 w-full md:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Criar grupo e enviar emails"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
