"use client";

import { cn } from "@/lib/utils";
import { Stars, Upload } from "lucide-react";

type StepChooseProcessProps = {
  onSelect: (option: "ai" | "manual") => void;
};

const StepChooseProcess = ({ onSelect }: StepChooseProcessProps) => {
  const cards = [
    {
      iconNode: <Stars />,
      title: "Let AI Interview You",
      tag: "RECOMMENDED",
      description: (
        <>
          Portrait Genie will guide you through a personalized conversation,
          asking thoughtful questions to create your portrait.
        </>
      ),
      optionType: "ai" as const,
      theme: "primary" as const,
    },
    {
      iconNode: <Upload />,
      title: (
        <>
          Get Started
          <br />
          Yourself
        </>
      ),
      description: (
        <>
          Jump right in and start building your portrait. Upload photos, videos
          and more, or create content right here on Portrait AI.
        </>
      ),
      optionType: "manual" as const,
      theme: "secondary" as const,
    },
  ];

  return (
    <div>
      <div className="max-w-[500px]">
        <div className="text-xl lg:text-[28px]">Create a new Portrait</div>
        <div className="font-light text-lg mt-4">
          Every person is unique and their story matters. Get started now by
          adding context to the Portrait.
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 text-center">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => {
              if (card.optionType === "manual") {
                onSelect(card.optionType);
              }
              // AI option is not functional for now
            }}
            className={cn(
              "transition-ease cursor-pointer rounded-xl flex flex-col items-center justify-between p-8 border-2 border-purple-03",
              card.theme === "secondary"
                ? "hover:bg-purple-04"
                : "bg-linear-to-t from-purple-04 to-accent-purple-001/64 hover:bg-accent-purple-001"
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "p-4 w-fit h-fit *:w-[32px] *:h-[32px] rounded-2xl",
                  card.theme === "secondary"
                    ? "bg-accent-purple-001 *:stroke-dominant-purple-main"
                    : "bg-dominant-purple-main *:stroke-white"
                )}
              >
                {card.iconNode}
              </div>
              <div className="text-2xl mt-6">{card.title}</div>
              {card.tag ? (
                <div
                  className={cn(
                    "mt-3 rounded-full px-3 py-1 text-xs",
                    card.theme === "primary"
                      ? ""
                      : "bg-dominant-purple-main text-white"
                  )}
                >
                  {card.tag}
                </div>
              ) : undefined}
            </div>
            <div className="mt-6 font-light text-gray-7">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepChooseProcess;
