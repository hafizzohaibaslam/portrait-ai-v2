"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CreateSlideShowControlsProps = {
  totalItems?: number;
  currentIndex?: number;
  canPrev?: boolean;
  canNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
};

const CreateSlideShowControls = (props: CreateSlideShowControlsProps) => {
  const buttonBaseClass =
    "w-[56px] h-[56px] p-[11px] border-[1px] border-dominant-purple-main rounded-full flex items-center justify-center";
  const buttonEnabledClass = "cursor-pointer";
  const buttonDisabledClass = "cursor-not-allowed opacity-[.5]";

  return (
    <div className={cn("flex items-center justify-between", props.className)}>
      <div
        onClick={props.onPrev}
        className={cn(
          buttonBaseClass,
          props.canPrev ? buttonEnabledClass : buttonDisabledClass
        )}
      >
        <ChevronLeft size={35} color="#673147" />
      </div>

      <div className="flex items-center justify-center">
        {Array.from({ length: props.totalItems || 0 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "mx-1 w-0 h-0 p-1 box-content rounded-full transition-ease",
              i === props.currentIndex
                ? "px-3 bg-dominant-purple-main"
                : "bg-brown-2"
            )}
          />
        ))}
      </div>

      <div
        onClick={props.onNext}
        className={cn(
          buttonBaseClass,
          props.canNext ? buttonEnabledClass : buttonDisabledClass
        )}
      >
        <ChevronRight size={35} color="#673147" />
      </div>
    </div>
  );
};

export default CreateSlideShowControls;
