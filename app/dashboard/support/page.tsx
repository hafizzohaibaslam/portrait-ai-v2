import ContactSection from "@/components/support/ContactSection";
import FAQSection from "@/components/support/FAQSection";

const SupportPage = () => {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-off-black">
          Help & Support
        </h1>
        <p className="mt-2 font-light text-off-gray">
          Find answers to common questions and get the help you need
        </p>
      </div>

      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default SupportPage;
