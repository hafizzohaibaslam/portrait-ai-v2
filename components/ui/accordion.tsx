"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
};

export const Accordion = ({ children, className }: AccordionProps) => {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
};

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
};

export const AccordionItem = ({ children, className }: AccordionItemProps) => {
  return (
    <div className={cn("border border-gray-3 rounded-xl bg-white", className)}>
      {children}
    </div>
  );
};

type AccordionTriggerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export const AccordionTrigger = ({
  children,
  isOpen,
  onToggle,
  className,
}: AccordionTriggerProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex flex-1 items-center justify-between py-4 px-6 transition-all hover:underline cursor-pointer w-full text-left",
        className
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
};

type AccordionContentProps = {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
};

export const AccordionContent = ({
  children,
  isOpen,
  className,
}: AccordionContentProps) => {
  if (!isOpen) return null;

  return (
    <div className={cn("pb-4 pt-0 px-6", className)}>{children}</div>
  );
};
