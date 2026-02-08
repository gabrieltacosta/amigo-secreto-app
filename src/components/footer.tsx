import Link from "next/link";
import { ModeToggle } from "./toggle-theme";

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col md:flex-row w-full items-center justify-between px-4 py-6 border-t mt-8 gap-4">
      <div>
        <span className="text-xs md:text-sm italic">
          &copy;{new Date().getFullYear()} | Amigo Secreto Simples - Todos os
          direitos reservados.
        </span>{" "}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/privacy"
          className="text-xs md:text-sm italic hover:underline ml-2"
        >
          Política de Privacidade
        </Link>
        <ModeToggle />
      </div>
    </footer>
  );
};

export default Footer;
