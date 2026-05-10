import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { Providers } from './providers';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'JobPulse India - Latest Government Jobs & Admit Cards',
  description: 'Find latest government jobs, admit cards, results, and answer keys. Apply for central govt, railway, defence, police, banking, and assam jobs.',
  keywords: 'government jobs, sarkari jobs, railway jobs, defence jobs, banking jobs, admit card, results, answer key',
  openGraph: {
    title: 'JobPulse India - Government Job Alert',
    description: 'Latest government jobs, admit cards, results and more',
    type: 'website',
    url: 'https://jobpulseindia.com',
    images: [
      {
        url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JobPulse India - Government Jobs',
    description: 'Find latest government job alerts and admit cards',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
