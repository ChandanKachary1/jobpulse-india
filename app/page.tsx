import HeroSection from '@/components/hero-section';
import LatestJobsSection from '@/components/latest-jobs-section';
import AdmitCardsSection from '@/components/admit-cards-section';
import FAQSection from '@/components/faq-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function JobSectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-40" />
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />

      <Suspense fallback={<JobSectionSkeleton />}>
        <LatestJobsSection />
      </Suspense>

      <div className="bg-accent/5 py-4 md:py-8">
        <Suspense fallback={<JobSectionSkeleton />}>
          <div className="max-w-7xl mx-auto px-4">
            <AdmitCardsSection />
          </div>
        </Suspense>
      </div>

      <div className="py-12 md:py-16 bg-secondary/20">
        <FAQSection />
      </div>
    </div>
  );
}
