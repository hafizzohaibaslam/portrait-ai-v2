"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormFieldWrapper from "./FormFieldWrapper";

// Base props that extend HTML input element props (for password type)
type BaseFormPasswordProps = Omit<
  React.ComponentProps<"input">,
  "className" | "type" | "onChange"
> & {
  label?: React.ReactNode;
  error?: string;
  variant?: "white" | "gray";
  onChange?: (value: string) => void;
  onEnter?: () => void;
  className?: string;
};

type FormPasswordProps = BaseFormPasswordProps;

const FormPassword = ({
  label,
  error,
  variant = "white",
  onChange,
  onEnter,
  className,
  disabled,
  ...inputProps
}: FormPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className={className}>
      {label && <div className="mb-2">{label}</div>}
      <FormFieldWrapper variant={variant} disabled={disabled} error={!!error}>
        <input
          type={showPassword ? "text" : "password"}
          {...inputProps}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent flex-1 w-full h-full outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2 cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-8" />
          ) : (
            <Eye className="w-5 h-5 text-gray-8" />
          )}
        </button>
      </FormFieldWrapper>
      {error && (
        <div className="text-red-500 text-xs mt-1 font-medium">{error}</div>
      )}
    </div>
  );
};

export default FormPassword;
