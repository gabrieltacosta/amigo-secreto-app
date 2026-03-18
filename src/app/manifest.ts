import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amigo Secreto Simples",
    short_name: "Amigo Secreto Simples",
    description:
      "Crie sorteios de amigo secreto online, envie convites por e‑mail e revele os sorteados com segurança.",
    start_url: "/",
    display: "standalone",
    background_color: "#e4e4e7",
    theme_color: "#ec003f",
    icons: [
      {
        src: "icons/launchericon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icons/launchericon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icons/launchericon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icons/launchericon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icons/launchericon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/launchericon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    lang: "pt-BR",
    orientation: "any",
    categories: [
      "entertainment",
      "lifestyle",
      "personalization",
      "social",
      "utilities",
    ],
    screenshots: [
      {
        src: "screenshots/desktop.png",
        sizes: "1897x903",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop View",
      },
      {
        src: "screenshots/mobile.png",
        sizes: "374x817",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile View",
      },
      {
        src: "screenshots/desktop-full.png",
        sizes: "1920x2765",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile View",
      },
      {
        src: "screenshots/mobile-full.png",
        sizes: "378x3990",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile View",
      },
    ],
  };
}
