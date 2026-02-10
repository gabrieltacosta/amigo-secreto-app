import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amigo Secreto Simples",
    short_name: "Amigo Secreto",
    description:
      "Crie sorteios de amigo secreto online, envie convites por e‑mail e revele os sorteados com segurança.",
    start_url: "/",
    display: "standalone",
    background_color: "#e4e4e7",
    theme_color: "#ec003f",
    icons: [
      {
        src: "/gift3.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/gift4.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
