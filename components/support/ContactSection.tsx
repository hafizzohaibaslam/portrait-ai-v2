"use client";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactSection = () => {
  return (
    <div className="mt-20">
      <div className="text-center mb-10">
        <h2 className="text-xl font-medium">Still need help?</h2>
        <p className="mt-2 font-light">
          We&apos;d love to hear from you. Send us a message and we&apos;ll
          respond as soon as possible.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
};

export default ContactSection;
