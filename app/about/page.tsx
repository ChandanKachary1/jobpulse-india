import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | JobPulse India',
  description: 'JobPulse India is a platform providing latest government job alerts, admit cards, and results.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-poppins mb-6">About JobPulse India</h1>

      <div className="space-y-6 text-lg text-muted-foreground">
        <p>
          JobPulse India is dedicated to helping job seekers find government job opportunities across India.
          We aggregate job postings from all major government organizations and present them in an easy-to-use platform.
        </p>

        <h2 className="text-2xl font-semibold text-foreground font-poppins">Our Mission</h2>
        <p>
          To make government job information accessible to every job seeker in India. We believe in transparency
          and provide up-to-date information about job openings, admit cards, results, and answer keys.
        </p>

        <h2 className="text-2xl font-semibold text-foreground font-poppins">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time job alerts and notifications</li>
          <li>Comprehensive database of government jobs</li>
          <li>Easy-to-use interface for searching and filtering</li>
          <li>Completely free - no hidden charges</li>
          <li>Mobile-friendly design</li>
          <li>Regular updates and accurate information</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground font-poppins">Contact Us</h2>
        <p>
          Email: <a href="mailto:info@jobpulseindia.com" className="text-primary hover:underline">info@jobpulseindia.com</a>
        </p>
      </div>
    </div>
  );
}
