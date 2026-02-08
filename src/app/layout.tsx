import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: "Amigo Secreto Simples - HawkDev",
    template: "%s | Amigo Secreto Simples - HawkDev",
  },
  description:
    "Crie sorteios de amigo secreto online, envie convites por e‑mail e revele os sorteados com segurança.",
  openGraph: {
    title: "Amigo Secreto Simples | HawkDev",
    description: "Organize seu amigo secreto em poucos cliques.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "Amigo Secreto Simples",
    images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/gift1.png` }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amigo Secreto Simples | HawkDev",
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col container mx-auto min-h-dvh p-4">
            {children}
          </div>
          <Toaster richColors position="top-right" />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
