import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'How do I get job alerts?',
      answer: 'Subscribe to our email newsletter or join our WhatsApp/Telegram channels to receive instant job notifications.',
    },
    {
      question: 'Are all jobs government jobs?',
      answer: 'Primarily yes, we focus on government jobs including Central Government, Railway, Defence, Police, and Banking sectors. We also list some private sector jobs.',
    },
    {
      question: 'Is it free to use JobPulse?',
      answer: 'Yes, JobPulse is completely free. We do not charge for job alerts, admit card downloads, or results.',
    },
    {
      question: 'How often are jobs updated?',
      answer: 'Jobs are updated in real-time as official notifications are released. We monitor all major government job portals.',
    },
    {
      question: 'Can I bookmark jobs?',
      answer: 'Yes, log in to your account and click the bookmark icon on any job to save it for later.',
    },
    {
      question: 'What is the eligibility criteria for government jobs?',
      answer: 'Eligibility varies by job. Check the job details page for specific requirements like education, age limit, and experience.',
    },
  ];

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-2 font-poppins">Frequently Asked Questions</h2>
      <p className="text-muted-foreground mb-8">Find answers to common questions</p>

      <Accordion type="single" collapsible className="w-full max-w-2xl">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-semibold">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
