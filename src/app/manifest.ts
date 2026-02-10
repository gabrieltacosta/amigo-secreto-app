import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amigo Secreto Simples',
    short_name: 'Amigo Secreto',
    description: 'Crie sorteios de amigo secreto online, envie convites por e‑mail e revele os sorteados com segurança.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ec003f',
    icons: [
      {
        src: '/gift1.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}