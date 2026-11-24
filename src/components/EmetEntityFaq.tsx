import type { FAQItem } from "@/components/FAQSection";

interface EntityFaqGroup {
  heading: string;
  faqs: FAQItem[];
}

interface EmetEntityFaqProps {
  groups: EntityFaqGroup[];
  className?: string;
}

function faqByQuestion(faqs: FAQItem[], question: string): FAQItem {
  const faq = faqs.find((item) => item.question === question);
  if (!faq) {
    throw new Error(`Missing entity FAQ: ${question}`);
  }
  return faq;
}

function headingId(heading: string) {
  return `entity-faq-${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

export const EMET_WHAT_WE_DO_FAQS: FAQItem[] = [
  {
    question: "What is Emet Capital?",
    answer:
      "Emet Capital Pty Ltd (ABN 50 682 228 182) is an Australian commercial finance broker based at 2C/3-5 Anzac Parade, Kensington NSW 2033. We help business owners, property investors and developers compare and arrange business-purpose finance secured by commercial or residential property. Emet Capital is a broker, not a lender.",
  },
  {
    question: "Is Emet Capital a lender?",
    answer:
      "No. Emet Capital is a finance broker. We do not lend our own money, set interest rates or approve loans. We review your transaction, identify bank, non-bank and private lenders that may suit it, present your application and help manage it through to settlement. The lender makes every credit decision.",
  },
  {
    question: "What types of finance does Emet Capital arrange?",
    answer:
      "We arrange business-purpose property finance: commercial property finance for purchases and refinances, bridging finance for settlement and timing gaps, first and second mortgages to release property equity for a business purpose, and private lending when a bank is not the right fit. We also arrange property development, refinancing and SMSF commercial property finance.",
  },
  {
    question: "Who does Emet Capital help?",
    answer:
      "Business owners, company directors, property investors and developers who need finance for a business or investment purpose. Emet Capital does not arrange consumer credit, such as a home loan for a home you live in, a personal loan or a car loan for personal use.",
  },
  {
    question: "Where does Emet Capital work?",
    answer:
      "Our office is in Kensington, Sydney. We arrange finance for business borrowers across Australia, and the security property can be in any state or territory, subject to each lender's criteria.",
  },
  {
    question: "Is Emet Capital connected to other businesses called Emet?",
    answer:
      "No. Emet Capital (Sydney, ABN 50 682 228 182) is not affiliated with Emet Capital Management (New York), Emet Mortgage (California), Emit Capital (Melbourne) or EMET Capital (Bogota).",
  },
];

export const EMET_HOW_IT_WORKS_FAQS: FAQItem[] = [
  {
    question: "How does working with Emet Capital work?",
    answer:
      "First, you tell us the purpose of the funds, the property offered as security, the amount needed and your deadline. Second, we review the deal and the repayment plan and explain which lender types may fit. Third, we prepare the application and present it to suitable lenders. Fourth, the lender assesses it, values the property and decides. Finally, we help coordinate documents with your solicitor and accountant through to settlement.",
  },
  {
    question: "How long does it take to arrange finance?",
    answer:
      "It depends on the lender, the property, the valuation and how complete your documents are. Non-bank and private lenders can sometimes move faster than banks, but no timeframe is guaranteed. Telling us your deadline at the start lets us rule out lenders that are unlikely to meet it.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "A short summary of what the funds are for, the property you can offer as security and any loans already secured on it, the amount needed, your deadline and how the loan will be repaid, for example by sale, refinance or business cash flow. Lenders then usually ask for identification, company or trust details, financial statements or other income evidence, and a valuation.",
  },
  {
    question: "What should I check before borrowing from a private lender?",
    answer:
      "Check the total cost, including interest, establishment and other fees and any default charges; the loan term; what happens if you repay late; the security the lender will register; and whether your repayment plan is realistic. Get independent legal advice on the loan documents before you sign.",
  },
  {
    question: "Can Emet Capital help if a bank has said no?",
    answer:
      "It may. A bank decline does not rule out non-bank or private lenders, which can assess the property security, the purpose and the repayment plan differently. We look at why the bank declined and whether another lender type is a realistic fit before anything is submitted. No outcome is guaranteed.",
  },
];

export const HOME_ENTITY_FAQS: FAQItem[] = [
  faqByQuestion(EMET_WHAT_WE_DO_FAQS, "What is Emet Capital?"),
  faqByQuestion(EMET_WHAT_WE_DO_FAQS, "Is Emet Capital a lender?"),
  faqByQuestion(EMET_WHAT_WE_DO_FAQS, "What types of finance does Emet Capital arrange?"),
  faqByQuestion(EMET_WHAT_WE_DO_FAQS, "Who does Emet Capital help?"),
  faqByQuestion(EMET_HOW_IT_WORKS_FAQS, "How does working with Emet Capital work?"),
  faqByQuestion(EMET_HOW_IT_WORKS_FAQS, "Can Emet Capital help if a bank has said no?"),
];

const EmetEntityFaq = ({ groups, className }: EmetEntityFaqProps) => {
  const labelledBy = groups[0] ? headingId(groups[0].heading) : undefined;

  return (
    <section className={"entity-faq section-pad " + (className ?? "")} aria-labelledby={labelledBy}>
      {groups.map((group) => {
        const id = headingId(group.heading);
        return (
          <div className="entity-faq-group" key={id}>
            <h2 id={id}>{group.heading}</h2>
            {group.faqs.map((faq) => (
              <div className="entity-faq-item" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default EmetEntityFaq;
