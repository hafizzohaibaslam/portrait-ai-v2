"use client";
import { useState } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FAQItem as FAQItemType } from "@/utils/support/faqData";

type FAQItemProps = {
  item: FAQItemType;
};

const FAQItem = ({ item }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem>
      <AccordionTrigger isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
        <span className="font-medium text-sm">{item.question}</span>
      </AccordionTrigger>
      <AccordionContent isOpen={isOpen}>
        <p className="font-light text-sm">{item.answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
