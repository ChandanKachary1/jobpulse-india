import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: jobs } = await supabase
    .from('jobs')
    .select('slug, updated_at')
    .eq('is_active', true);

  const jobUrls = (jobs || []).map((job) => ({
    url: `https://jobpulseindia.com/jobs/${job.slug}`,
    lastModified: new Date(job.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `https://jobpulseindia.com/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: 'https://jobpulseindia.com',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    {
      url: 'https://jobpulseindia.com/admit-card',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://jobpulseindia.com/results',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://jobpulseindia.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://jobpulseindia.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...jobUrls];
}
