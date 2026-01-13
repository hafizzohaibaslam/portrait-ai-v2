"use client";
import FormFieldWrapper from "./FormFieldWrapper";

// Base props that extend HTML input element props
type BaseFormInputProps = Omit<
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

// Specific input types (excluding password - that has its own component)
type FormInputProps = BaseFormInputProps & {
  type?: "text" | "email" | "tel" | "number" | "url" | "search";
};

const FormInput = ({
  label,
  type = "text",
  error,
  variant = "white",
  onChange,
  onEnter,
  className,
  disabled,
  ...inputProps
}: FormInputProps) => {
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
          type={type}
          {...inputProps}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent flex-1 w-full h-full outline-none"
        />
      </FormFieldWrapper>
      {error && (
        <div className="text-red-500 text-xs mt-1 font-medium">{error}</div>
      )}
    </div>
  );
};

export default FormInput;
