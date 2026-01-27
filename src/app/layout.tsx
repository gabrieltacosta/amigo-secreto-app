import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from '@vercel/speed-insights/next';


const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: "Amigo Secreto Online",
    template: "%s | Amigo Secreto Online",
  },
  description: "Organize sorteios de amigo secreto online.",
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
