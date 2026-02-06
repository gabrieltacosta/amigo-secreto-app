import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col md:flex-row w-full items-center justify-between px-4 py-6 border-t mt-8 gap-4">
      <div>
        <span className="text-xs md:text-sm italic">
          &copy;{new Date().getFullYear()} | Amigo Secreto Simples - Todos os
          direitos reservados.
        </span>{" "}
      </div>
      <div>
        <Link
          href="/privacy"
          className="text-xs md:text-sm italic hover:underline ml-2"
        >
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
