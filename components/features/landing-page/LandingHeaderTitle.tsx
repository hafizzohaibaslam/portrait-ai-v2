import Link from "next/link";
import { cn } from "@/lib/utils";

type LandingHeaderTitleProps = {
  className?: string;
};

const LandingHeaderTitle = ({ className }: LandingHeaderTitleProps) => {
  return (
    <div
      className={cn(
        "pt-[90px] lg:pt-[148px] flex flex-col items-center text-center",
        className
      )}
    >
      <h1 className="text-4xl lg:text-7xl font-medium">
        Make{" "}
        <span className="bg-linear-to-r from-yellow-1 via-purple-1 to-yellow-1 bg-clip-text text-transparent">
          Life
        </span>{" "}
        Portraits
      </h1>

      <p className="mt-3 lg:mt-8 lg:text-2xl font-light tracking-[-3%]">
        Your partner in beautifully capturing one&apos;s soul.
      </p>

      <Link
        href="/auth/sign-up"
        className="mt-8 lg:mt-10 text-center px-12 py-2 lg:px-8 lg:py-3 border-[1.5px] border-off-black bg-off-black text-white hover:bg-white hover:text-off-black rounded-lg transition-ease"
      >
        Try Portrait AI
      </Link>

      <p className="mt-16 lg:mt-[147px] font-medium text-2xl lg:text-4xl">
        Life Story Archiving, Made Easy
      </p>
    </div>
  );
};

export default LandingHeaderTitle;
