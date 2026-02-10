"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // Uma biblioteca útil para gerenciar classes CSS condicionalmente
import { Button } from "./ui/button";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${pathname === href ? "underline underline-offset-6" : ""
        } `}
    >
      {children}
    </Link>
  );
}
