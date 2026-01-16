"use client";
import { Book } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import FAQItem from "./FAQItem";
import type { FAQCategory as FAQCategoryType } from "@/utils/support/faqData";

type FAQCategoryProps = {
  category: FAQCategoryType;
};

const FAQCategory = ({ category }: FAQCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent-purple-001 flex items-center justify-center">
          <Book className="w-5 h-5 stroke-dominant-purple-main" />
        </div>
        <div className="font-medium">{category.title}</div>
      </div>
      <Accordion>
        {category.items.map((item, index) => (
          <FAQItem key={index} item={item} />
        ))}
      </Accordion>
    </div>
  );
};

export default FAQCategory;
