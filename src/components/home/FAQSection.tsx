
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData } from '@/data/homeData';

interface FAQSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function FAQSection({ scrollToSection }: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
            ❓ FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Common questions from owner-operators about our dispatching services
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-0 rounded-2xl px-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-lg">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Have more questions? We're here to help!
          </p>
          <Button 
            size="lg" 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
