"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  onChange,
  disabled,
  className,
}: FormSelectProps) => {
  return (
    <div className={className}>
      {label && <div className="mb-2">{label}</div>}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "w-full bg-white rounded-[8px] border border-gray-4 shadow-none focus:ring-0 focus:ring-offset-0",
            "py-[13px]! px-[16px]! h-auto!",
            "[&_svg]:text-gray-6"
          )}
        >
          <SelectValue
            placeholder={placeholder}
            className="font-light! text-[14px]! leading-[20px]! tracking-[3%]! text-gray-5!"
          />
        </SelectTrigger>

        <SelectContent
          position="popper"
          align="start"
          className={cn(
            "bg-white border p-0! border-gray-4 rounded-none! shadow-lg rounded-bl-[8px]! rounded-br-[8px]!"
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="hover:bg-[#6731471F]! py-3!"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <div className="text-red-500 text-xs mt-1 font-medium">{error}</div>
      )}
    </div>
  );
};

export default FormSelect;
export type { SelectOption };
