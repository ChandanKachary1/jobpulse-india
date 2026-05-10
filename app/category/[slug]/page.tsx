import { supabase } from '@/lib/supabase';
import { ITEMS_PER_PAGE, CATEGORIES } from '@/lib/constants';
import JobCard from '@/components/job-card';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = CATEGORIES.find(c => c.slug === params.slug);

  return {
    title: `${category?.name} - Latest Jobs | JobPulse India`,
    description: `Find latest ${category?.name || 'government'} job alerts and opportunities on JobPulse India.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = CATEGORIES.find(c => c.slug === params.slug);

  const { data: jobs = [] } = await supabase
    .from('jobs')
    .select('id, title, organization, category, vacancies, slug, important_dates, salary, is_trending')
    .eq('category', category?.name || '')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2">{category?.name}</h1>
        <p className="text-muted-foreground">
          Found {(jobs || []).length} job{(jobs || []).length !== 1 ? 's' : ''}
        </p>
      </div>

      {(jobs || []).length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {(jobs || []).map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No jobs found in this category. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
