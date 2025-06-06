import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes a resume ATS-compatible?",
    answer: "ATS-compatible resumes use standard sections, avoid complex formatting, include relevant keywords from the job description, and use common fonts. Our templates are designed to pass through Applicant Tracking Systems while still looking professional to human recruiters."
  },
  {
    question: "How does the AI content suggestion work?",
    answer: "Our AI-powered system uses Google Gemini to analyze your existing content and job descriptions to suggest improvements. It helps optimize your bullet points, highlights relevant skills, and ensures your resume uses industry-standard terminology to increase your chances of getting noticed."
  },
  {
    question: "Can I create multiple versions of my resume?",
    answer: "Yes! With our Pro plan, you can create unlimited versions of your resume tailored to different positions or industries. Our system makes it easy to duplicate and modify your resume for specific job applications."
  },
  {
    question: "What file formats can I export my resume in?",
    answer: "You can export your resume as a PDF (recommended for most applications), DOCX (editable Microsoft Word format), or plain text (for copying into online applications). All formats maintain ATS compatibility."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All your personal information and resume data is encrypted and stored securely. We do not share your information with third parties without your consent."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely! You can cancel your subscription at any time. After cancellation, you'll continue to have access to your account until the end of your billing period."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our resume builder and how it can help your job search.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}