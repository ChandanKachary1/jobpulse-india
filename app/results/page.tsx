import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Download, CircleCheck as CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Results | JobPulse India',
  description: 'Check latest government exam results - SSC, UPSC, Railway, Banking results and more.',
};

export default async function ResultsPage() {
  const { data: results = [] } = await supabase
    .from('results')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2">Exam Results</h1>
      <p className="text-muted-foreground mb-8">Check latest government examination results</p>

      <div className="grid md:grid-cols-2 gap-6">
        {(results || []).map((result) => (
          <div key={result.id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{result.title}</h3>
                <p className="text-muted-foreground">{result.organization}</p>
                {result.result_date && (
                  <p className="text-sm text-muted-foreground mt-1">Released: {result.result_date}</p>
                )}
              </div>
            </div>
            <a href={result.result_link} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                View/Download Result
              </Button>
            </a>
          </div>
        ))}
      </div>

      {(!results || results.length === 0) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No results available at the moment</p>
        </div>
      )}
    </div>
  );
}
