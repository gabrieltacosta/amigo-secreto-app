import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: "Amigo Secreto Online",
    template: "%s | Amigo Secreto Online",
  },
  description:
    "Crie sorteios de amigo secreto online, envie convites por e‑mail e revele os sorteados com segurança.",
  openGraph: {
    title: "Amigo Secreto Online | HawkDev",
    description: "Organize seu amigo secreto em poucos cliques.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "Amigo Secreto",
    images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/gift1.png` }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amigo Secreto Online | HawkDev",
    description: "Organize seu amigo secreto em poucos cliques.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/gift1.png`],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
    languages: {
      "pt-BR": `${process.env.NEXT_PUBLIC_APP_URL}`,
      "x-default": `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased dark`}
        cz-shortcut-listen="true"
      >
        <div className="flex flex-col container mx-auto min-h-dvh p-4">
          {children}
        </div>
        <Toaster richColors position="top-right" />
        <SpeedInsights />
      </body>
    </html>
  );
}
