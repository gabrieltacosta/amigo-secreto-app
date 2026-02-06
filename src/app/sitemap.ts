import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "monthly",
    },
    // + páginas públicas que você quiser indexar
  ];
}
