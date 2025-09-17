import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 id="faqs" className="text-2xl font-bold text-foreground mb-6">
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="border border-border rounded-lg px-6 py-2 bg-card hover:bg-muted/50 transition-colors"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4 font-medium text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;