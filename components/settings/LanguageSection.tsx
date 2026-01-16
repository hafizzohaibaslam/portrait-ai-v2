"use client";
import FormFieldWrapper from "@/components/shared/FormFieldWrapper";

const LanguageSection = () => {
  return (
    <div className="relative">
      <label className="block text-sm mb-2">Language</label>
      <FormFieldWrapper variant="gray" className="mt-2">
        <div className="bg-transparent flex-1 w-full h-full outline-none text-gray-5">
          English
        </div>
      </FormFieldWrapper>
    </div>
  );
};

export default LanguageSection;
