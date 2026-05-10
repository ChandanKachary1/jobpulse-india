import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Share2, Bookmark, Calendar, Users, FileText, Globe } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: job } = await supabase
    .from('jobs')
    .select('title, organization, description, salary')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .maybeSingle();

  if (!job) {
    return { title: 'Job Not Found' };
  }

  return {
    title: `${job.title} at ${job.organization} - JobPulse India`,
    description: job.description?.substring(0, 160) || `Apply for ${job.title}`,
    openGraph: {
      title: `${job.title} - ${job.organization}`,
      description: job.description?.substring(0, 160) || 'Government Job',
      type: 'website',
      images: [
        {
          url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !job) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.organization,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
    },
    baseSalary: job.salary ? {
      '@type': 'PriceSpecification',
      priceCurrency: 'INR',
      price: job.salary,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-accent hover:underline text-sm">← Back to Home</Link>
        </div>

        <div className="bg-card rounded-lg border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold font-poppins mb-2">{job.title}</h1>
              <p className="text-lg text-primary font-semibold">{job.organization}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
            {job.vacancies && (
              <div>
                <p className="text-sm text-muted-foreground">Vacancies</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> {job.vacancies}
                </p>
              </div>
            )}
            {job.salary && (
              <div>
                <p className="text-sm text-muted-foreground">Salary</p>
                <p className="text-lg font-semibold">₹ {job.salary}</p>
              </div>
            )}
            {job.application_fee && (
              <div>
                <p className="text-sm text-muted-foreground">Application Fee</p>
                <p className="text-lg font-semibold">{job.application_fee}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="text-lg font-semibold">{job.category}</p>
            </div>
          </div>

          <div className="space-y-6">
            {job.qualification && (
              <div>
                <h2 className="text-xl font-semibold mb-3 font-poppins">Qualification</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{job.qualification}</p>
              </div>
            )}

            {job.age_limit && (
              <div>
                <h2 className="text-xl font-semibold mb-3 font-poppins">Age Limit</h2>
                <p className="text-muted-foreground">{job.age_limit}</p>
              </div>
            )}

            {job.important_dates && Object.keys(job.important_dates).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3 font-poppins">Important Dates</h2>
                <div className="space-y-2">
                  {Object.entries(job.important_dates).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-secondary/30 rounded">
                      <span className="font-medium">{key}</span>
                      <span className="flex items-center gap-2 text-primary font-semibold">
                        <Calendar className="h-4 w-4" /> {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {job.selection_process && Array.isArray(job.selection_process) && (
              <div>
                <h2 className="text-xl font-semibold mb-3 font-poppins">Selection Process</h2>
                <ol className="space-y-2 list-decimal list-inside">
                  {job.selection_process.map((step: string, idx: number) => (
                    <li key={idx} className="text-muted-foreground">{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {job.how_to_apply && (
              <div>
                <h2 className="text-xl font-semibold mb-3 font-poppins">How to Apply</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{job.how_to_apply}</p>
              </div>
            )}

            {job.description && (
              <div>
                <h2 className="text-xl font-semibold mb-3 font-poppins">Job Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
              </div>
            )}

            {job.links && Object.keys(job.links).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3 font-poppins">Important Links</h2>
                <div className="space-y-2">
                  {Object.entries(job.links).map(([name, link]: any) => (
                    <a
                      key={name}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded hover:bg-secondary transition"
                    >
                      {name.includes('PDF') ? <FileText className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 font-poppins">Ready to Apply?</h3>
          <p className="mb-4 opacity-90">
            Follow the instructions above and apply before the deadline. Good luck!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="flex-1">Apply Now</Button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full text-primary">Share on WhatsApp</Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
