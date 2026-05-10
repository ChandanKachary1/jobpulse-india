'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdmitCardsSection() {
  const [admitCards, setAdmitCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        const { data, error } = await supabase
          .from('admit_cards')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setAdmitCards(data || []);
      } catch (error) {
        console.error('Error fetching admit cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCards();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-secondary/30 max-w-7xl mx-auto px-4 rounded-lg">
      <h2 className="text-3xl font-bold mb-2 font-poppins">Admit Cards</h2>
      <p className="text-muted-foreground mb-8">Download latest exam admit cards</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10" />
            </div>
          ))
        ) : admitCards.length > 0 ? (
          admitCards.map((card) => (
            <div key={card.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start gap-3 mb-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.organization}</p>
                </div>
              </div>
              <a href={card.download_link} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No admit cards available</p>
          </div>
        )}
      </div>

      <Link href="/admit-card">
        <Button variant="default" className="w-full">View All Admit Cards</Button>
      </Link>
    </section>
  );
}
