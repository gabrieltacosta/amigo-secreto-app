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
        src: "/gift2.png",
        sizes: "182x182",
        type: "image/png",
      },
    ],
  };
}
