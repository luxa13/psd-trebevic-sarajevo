import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://psd-trebevic.ba',
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
