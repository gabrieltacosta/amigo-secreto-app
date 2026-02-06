import Footer from "@/components/footer";
import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <div className="flex flex-col">
        <Header />
      </div>
      <div className="flex-1 flex-col">{children}</div>
      <div className="flex flex-col">
        <Footer />
      </div>
    </>
  );
}
