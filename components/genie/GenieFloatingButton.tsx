"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  GENIE_DRAG_THRESHOLD,
  GENIE_EDGE_OFFSET,
} from "@/utils/genie/constants";

type GenieFloatingButtonProps = {
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>; // Reserved for future drag constraints
  onClick?: () => void; // Called when button is clicked (not dragged)
};

const GenieFloatingButton = ({
  className,
  onClick,
}: // containerRef reserved for future drag constraints
GenieFloatingButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button

    hasMovedRef.current = false;
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      initialPos.current = { x: position.x, y: position.y };
    }
  };

  // Handle drag move
  useEffect(() => {
    const DRAG_THRESHOLD = 5; // pixels - minimum movement to consider it a drag

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // If moved more than threshold, it's a drag
      if (distance > DRAG_THRESHOLD) {
        hasMovedRef.current = true;
        setPosition({
          x: initialPos.current.x + deltaX,
          y: initialPos.current.y + deltaY,
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;

      const wasDrag = hasMovedRef.current;
      setIsDragging(false);

      // Snap to nearest edge only if it was actually dragged
      if (wasDrag) {
        // Prevent click event if it was a drag
        e.preventDefault();
        e.stopPropagation();

        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect) {
          let targetX = position.x;

          // Horizontal snap
          if (rect.left < GENIE_DRAG_THRESHOLD) {
            targetX = GENIE_EDGE_OFFSET - rect.left + position.x;
          } else if (rect.right > window.innerWidth - GENIE_DRAG_THRESHOLD) {
            targetX =
              window.innerWidth - GENIE_EDGE_OFFSET - rect.right + position.x;
          }

          // Vertical snap (optional - keeping at bottom for now)
          const targetY = position.y;

          setPosition({ x: targetX, y: targetY });
        }
      }

      hasMovedRef.current = false;
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp, true); // Use capture phase to intercept
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp, true);
    };
  }, [isDragging, position]);

  return (
    <div
      ref={buttonRef}
      className={cn(
        "fixed z-2 right-6 bottom-10",
        "flex items-center bg-white p-2",
        "shadow-lg shadow-black/16 rounded-full",
        "cursor-pointer select-none",
        "transition-all duration-300",
        isDragging && "scale-95 cursor-grabbing",
        !isDragging && "hover:scale-105",
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-label="Open Portrait Genie"
      tabIndex={0}
      onClick={(e) => {
        // Prevent click if it was a drag
        if (hasMovedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        // Call onClick handler if provided
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className="relative w-9 h-9 md:w-14 md:h-14 rounded-full overflow-hidden">
        <Image
          src="/images/woman-genie.png"
          alt="Portrait Genie"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Hover text */}
      <div
        className={cn(
          "font-medium text-off-black whitespace-nowrap overflow-hidden",
          "transition-all duration-300 ease-out",
          isHovered ? "opacity-100 w-auto px-3" : "opacity-0 w-0 px-0"
        )}
      >
        <div>Portrait Genie here!</div>
        <div>How may I help you?</div>
      </div>
    </div>
  );
};

export default GenieFloatingButton;
