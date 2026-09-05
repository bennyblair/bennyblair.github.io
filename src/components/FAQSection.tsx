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
  id?: string;
}

const FAQSection = ({ faqs, id = "faqs" }: FAQSectionProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="faq-section">
      {id !== "faqs" && <span id="faqs" className="anchor-alias" />}
      <h2 id={id} className="text-2xl font-bold text-foreground mb-6">
        Frequently asked questions
      </h2>
      
      <Accordion type="single" collapsible className="faq-list w-full">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="faq-item"
          >
            <AccordionTrigger className="text-left hover:no-underline font-medium text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent forceMount className="text-muted-foreground leading-relaxed pb-1.5 text-sm">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
