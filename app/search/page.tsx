'use client';

import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category,
    salaryRange: 'all',
  });

  useEffect(() => {
    const searchJobs = async () => {
      setLoading(true);
      try {
        let q = supabase
          .from('jobs')
          .select('id, title, organization, category, vacancies, slug, important_dates, salary, is_trending')
          .eq('is_active', true);

        if (query) {
          q = q.or(`title.ilike.%${query}%,organization.ilike.%${query}%,description.ilike.%${query}%`);
        }

        if (filters.category) {
          q = q.eq('category', CATEGORIES.find(c => c.slug === filters.category)?.name || '');
        }

        const { data } = await q.order('created_at', { ascending: false }).limit(50);
        setJobs(data || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    searchJobs();
  }, [query, filters.category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-poppins mb-8">Search Jobs</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search by keyword..."
          defaultValue={query}
          onChange={(e) => {
            const params = new URLSearchParams();
            if (e.target.value) params.set('q', e.target.value);
            if (filters.category) params.set('category', filters.category);
            window.history.pushState({}, '', `/search?${params.toString()}`);
          }}
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Searching...' : `Found ${jobs.length} result${jobs.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20" />
            </div>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No jobs found. Try different keywords or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
