"use client";
import FAQCategory from "./FAQCategory";
import { faqData } from "@/utils/support/faqData";

const FAQSection = () => {
  return (
    <div className="flex flex-col gap-10">
      {faqData.map((category, index) => (
        <FAQCategory key={index} category={category} />
      ))}
    </div>
  );
};

export default FAQSection;
