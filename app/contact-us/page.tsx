import ContactForm from "@/components/support/ContactForm";
import ContactInfo from "@/components/support/ContactInfo";
import LandingFooter from "@/components/landing-page/LandingFooter";
import LandingHeader from "@/components/landing-page/LandingHeader";

const ContactUsPage = () => {
  return <div className="min-h-screen pb-[32px]">
    {/* Header */}
    <LandingHeader />
    {/* Main */}
    <div className="w-full flex flex-col gap-6 justify-center items-center bg-yellow-3 pt-20 pb-18">
      <h1 className="font-medium text-[36px] leading-[24px] tracking-0 text-off-black">Get In Touch</h1>
      <p className="font-light text-[16px] leading-[24px] tracking-[-0.6px] text-blac-005">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
    </div>

    {/* Contact Form and Info */}
    <div className="w-full max-w-[1216px] mx-auto flex justify-between gap-[48px] mt-[68px] mb-[80px]">
    <ContactForm />
    <ContactInfo />
    </div>
    {/* Footer */}
    <LandingFooter className="w-full max-w-[1196px] mx-auto"/>
  </div>;
};

export default ContactUsPage;
