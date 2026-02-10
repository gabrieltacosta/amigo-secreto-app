import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  fallback: ["ui-sans-serif", "system-ui", "-apple-system"]
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
    description: "Crie sorteios de amigo secreto online, envie convites por e‑mail e revele os sorteados com segurança.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "Amigo Secreto Simples",
    images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/gift1.png` }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amigo Secreto Simples | HawkDev",
    description: "Crie sorteios de amigo secreto online, envie convites por e‑mail e revele os sorteados com segurança.",
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
        className={`${roboto.className} antialiased`}
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
