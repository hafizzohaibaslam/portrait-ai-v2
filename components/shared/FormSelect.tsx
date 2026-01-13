"use client";

import { ChevronDown } from "lucide-react";
import FormFieldWrapper from "./FormFieldWrapper";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = {
  label?: React.ReactNode;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  error?: string;
  variant?: "white" | "gray";
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const FormSelect = ({
  label,
  options,
  value,
  placeholder = "Select option",
  error,
  variant = "white",
  onChange,
  disabled,
  className,
}: FormSelectProps) => {
  return (
    <div className={className}>
      {label && <div className="mb-2">{label}</div>}
      <FormFieldWrapper variant={variant} disabled={disabled} error={!!error}>
        <div className="relative flex items-center w-full">
          <select
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className={cn(
              "bg-transparent flex-1 w-full h-full outline-none appearance-none pr-8 cursor-pointer",
              !value && "text-gray-500"
            )}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-0 w-4 h-4 text-gray-6 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </FormFieldWrapper>
      {error && (
        <div className="text-red-500 text-xs mt-1 font-medium">{error}</div>
      )}
    </div>
  );
};

export default FormSelect;
export type { SelectOption };
