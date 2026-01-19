"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { CONTACT_INFO } from "@/constants/contact-info";
import { cn } from "@/lib/utils";

type ContactInfoItemProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ContactInfoItem = ({
  icon,
  title,
  children,
  className,
}: ContactInfoItemProps) => {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <div className="p-3 rounded-[8px] bg-purple-7 flex items-center justify-center w-[48px] h-[48px] shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h1 className="font-medium text-[16px] leading-[24px] tracking-0 text-off-black">{title}</h1>
        <span className="font-light text-[16px] leading-[24px] tracking-0 text-black-005">{children}</span>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="space-y-3">
        <h1 className="font-medium text-[20px] leading-[24px] tracking-[-1.08px] text-off-black">Contact Information</h1>
        <p className="font-light text-[16px] leading-[24px] tracking-[-0.6px] text-black-005">
          Feel free to reach out to us through any of the following methods.
          We&apos;re here to help you preserve your precious memories.
        </p>
      </div>
      <div className="space-y-6">
        <ContactInfoItem
          icon={<Mail className="w-6 h-6 stroke-dominant-purple-main" />}
          title="Email"
        >
          <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">
            {CONTACT_INFO.email}
          </a>
        </ContactInfoItem>

        <ContactInfoItem
          icon={<Phone className="w-6 h-6 stroke-dominant-purple-main" />}
          title="Phone"
        >
          <a href={`tel:${CONTACT_INFO.phone}`} className="hover:underline">
            {CONTACT_INFO.phone}
          </a>
        </ContactInfoItem>

        <ContactInfoItem
          icon={<MapPin className="w-6 h-6 stroke-dominant-purple-main" />}
          title="Address"
        >
          {CONTACT_INFO.address.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </ContactInfoItem>
      </div>
       <div className="p-6 rounded-[12px] bg-yellow-3 space-y-2">
<h1 className="font-medium text-[16px] leading-[24px] tracking-0 text-off-black">Active Hours</h1>
   <p className="font-light text-[16px] leading-[24px] tracking-0 text-black-005">{CONTACT_INFO.hours.weekdays}</p>
        <p className="font-light text-[16px] leading-[24px] tracking-0 text-black-005">{CONTACT_INFO.hours.saturday}</p>
        <p className="font-light text-[16px] leading-[24px] tracking-0 text-black-005">{CONTACT_INFO.hours.sunday}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
