"use client";
import { useState } from "react";
import { toast } from "sonner";
import FormInput from "@/components/shared/FormInput";
import FormTextarea from "@/components/shared/FormTextarea";
import ThemedButton from "@/components/shared/ThemedButton";
import { validateEmail } from "@/utils/validation";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    formData.name.trim() &&
    validateEmail(formData.email) &&
    formData.message.trim();

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate form submission (no API call)
    await new Promise((resolve) => setTimeout(resolve, 500));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-7 rounded-md p-8 flex-1 lg:flex flex-col justify-between"
    >
      <div>
        <div className="font-medium text-xl">Send us a Message</div>
        <div className="mt-6 space-y-4">
          <FormInput
            label="Name"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            variant="white"
            required
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            variant="white"
            required
          />
          <FormInput
            label="Subject"
            value={formData.subject}
            onChange={(value) => handleChange("subject", value)}
            variant="white"
          />
          <FormTextarea
            label="Message"
            value={formData.message}
            onChange={(value) => handleChange("message", value)}
            variant="white"
            className="min-h-[120px]"
            required
          />
        </div>
      </div>
      <ThemedButton
        type="submit"
        variant="purple"
        className="mt-5"
        disabled={!isValid}
        loading={isSubmitting}
      >
        Send Message
      </ThemedButton>
    </form>
  );
};

export default ContactForm;
