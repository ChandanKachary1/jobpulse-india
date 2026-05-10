'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import JobCard from './job-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function LatestJobsSection() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('id, title, organization, category, vacancies, slug, important_dates, salary, is_trending')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(9);

        if (error) throw error;
        setJobs(data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-2 font-poppins">Latest Job Alerts</h2>
      <p className="text-muted-foreground mb-8">Most recent government job opportunities</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20" />
              <Skeleton className="h-10" />
            </div>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No jobs found. Check back soon!</p>
          </div>
        )}
      </div>

      {jobs.length > 0 && (
        <div className="text-center">
          <Link href="/search">
            <Button variant="outline" size="lg">View All Jobs</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
