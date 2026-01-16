"use client";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
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
    <div className={cn("flex", className)}>
      <div className="mr-4 p-3 rounded-md bg-purple-7 w-fit h-fit shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="mt-1 font-light text-gray-5">{children}</div>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="flex-1 lg:flex flex-col justify-between">
      <div>
        <div className="font-medium text-xl">Contact Information</div>
        <p className="mt-2 font-light text-gray-5">
          Feel free to reach out to us through any of the following methods.
          We&apos;re here to help you preserve your precious memories.
        </p>
      </div>
      <div className="mt-4 space-y-8">
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

      <ContactInfoItem
        icon={<Clock className="w-6 h-6 stroke-dominant-purple-main" />}
        title="Active Hours"
        className="mt-4 bg-yellow-3 p-6 rounded-md"
      >
        <div>{CONTACT_INFO.hours.weekdays}</div>
        <div>{CONTACT_INFO.hours.saturday}</div>
        <div>{CONTACT_INFO.hours.sunday}</div>
      </ContactInfoItem>
    </div>
  );
};

export default ContactInfo;
