import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest Admit Cards | JobPulse India',
  description: 'Download admit cards for government exams - SSC, UPSC, Railway, Banking, Police and more.',
};

export default async function AdmitCardPage() {
  const { data: admitCards = [] } = await supabase
    .from('admit_cards')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2">Admit Cards</h1>
      <p className="text-muted-foreground mb-8">Download exam admit cards from government organizations</p>

      <div className="grid md:grid-cols-2 gap-6">
        {(admitCards || []).map((card) => (
          <div key={card.id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-start gap-4 mb-4">
              <FileText className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                <p className="text-muted-foreground">{card.organization}</p>
                {card.exam_date && (
                  <p className="text-sm text-muted-foreground mt-1">Date: {card.exam_date}</p>
                )}
              </div>
            </div>
            <a href={card.download_link} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Admit Card
              </Button>
            </a>
          </div>
        ))}
      </div>

      {(!admitCards || admitCards.length === 0) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No admit cards available at the moment</p>
        </div>
      )}
    </div>
  );
}
