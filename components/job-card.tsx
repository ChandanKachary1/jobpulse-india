'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Users, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  id: string;
  title: string;
  organization: string;
  category: string;
  vacancies: number;
  slug: string;
  important_dates?: Record<string, string>;
  salary?: string;
  is_trending?: boolean;
}

export default function JobCard({
  id,
  title,
  organization,
  category,
  vacancies,
  slug,
  important_dates,
  salary,
  is_trending,
}: JobCardProps) {
  const lastDate = important_dates?.['Application End Date'] || important_dates?.['Application Deadline'];

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg hover:border-primary transition-all duration-300 bg-card">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1">
          <Link href={`/jobs/${slug}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{organization}</p>
        </div>
        {is_trending && (
          <span className="badge-primary text-xs whitespace-nowrap">Trending</span>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-4 text-sm">
        {vacancies && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{vacancies} vacancies</span>
          </div>
        )}
        {salary && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>₹ {salary}</span>
          </div>
        )}
        {lastDate && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{lastDate}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Link href={`/jobs/${slug}`} className="flex-1">
          <Button className="w-full">View Details</Button>
        </Link>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
