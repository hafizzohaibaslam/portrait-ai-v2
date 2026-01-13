"use client";

import FormFieldWrapper from "./FormFieldWrapper";

// Base props that extend HTML textarea element props
type BaseFormTextareaProps = Omit<
  React.ComponentProps<"textarea">,
  "className" | "onChange"
> & {
  label?: React.ReactNode;
  error?: string;
  variant?: "white" | "gray";
  onChange?: (value: string) => void;
  onEnter?: () => void;
  className?: string;
};

type FormTextareaProps = BaseFormTextareaProps;

const FormTextarea = ({
  label,
  error,
  variant = "white",
  onChange,
  onEnter,
  className,
  disabled,
  ...textareaProps
}: FormTextareaProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className={className}>
      {label && <div className="mb-2">{label}</div>}
      <FormFieldWrapper variant={variant} disabled={disabled} error={!!error}>
        <textarea
          {...textareaProps}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent flex-1 w-full h-full min-h-[112px] outline-none resize-none"
        />
      </FormFieldWrapper>
      {error && (
        <div className="text-red-500 text-xs mt-1 font-medium">{error}</div>
      )}
    </div>
  );
};

export default FormTextarea;
