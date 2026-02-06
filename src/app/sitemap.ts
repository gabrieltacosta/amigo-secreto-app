import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/privacy`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "yearly",
    },
    // + páginas públicas que você quiser indexar
  ];
}
