import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | JobPulse India',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-poppins mb-6">Privacy Policy</h1>

      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold text-foreground font-poppins">1. Introduction</h2>
          <p>
            JobPulse India ("we", "our", or "us") operates the JobPulse India website. This page informs you of our
            policies regarding the collection, use, and disclosure of personal data when you use our Service and the
            choices you have associated with that data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground font-poppins">2. Information Collection</h2>
          <p>
            We collect information you provide directly, such as when you create an account, subscribe to alerts, or
            contact us. This may include your name, email address, and preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground font-poppins">3. Use of Information</h2>
          <p>
            We use the information we collect to provide, improve, and personalize our services, send job alerts and
            notifications, and communicate with you about updates and changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground font-poppins">4. Security</h2>
          <p>
            The security of your personal information is important to us. However, no method of transmission over the
            Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground font-poppins">5. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
