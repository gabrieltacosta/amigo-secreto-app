import SignUp from "@/components/sign-up-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col w-full min-h-dvh justify-center items-center">
      <SignUp />
    </div>
  );
};

export default RegisterPage;
