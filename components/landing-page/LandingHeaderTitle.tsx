import Link from "next/link";
import { cn } from "@/lib/utils";

type LandingHeaderTitleProps = {
  className?: string;
};

const LandingHeaderTitle = ({ className }: LandingHeaderTitleProps) => {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-center justify-between text-center",
        className
      )}
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="font-medium text-[40px] leading-[48px] tracking-[1.5%] lg:text-[80px] lg:leading-[72px] lg:tracking-[-3%] text-off-black">
          Make{" "}
          <span className="bg-linear-to-r from-[#FBBC05] via-[#8A38F5] to-[#FBBC05] bg-clip-text text-transparent">
            Life
          </span>{" "}
          Portraits
        </h1>

        <p className="mt-3 lg:mt-8 font-light text-[26px] leading-[28px] tracking-[-3%] text-black-005">
          Your partner in beautifully capturing one&apos;s soul.
        </p>

        <Link
          href="/auth/sign-up"
          className="mt-8 lg:mt-10 black-button max-w-[200px]"
        >
          Try Portrait AI
        </Link>
      </div>

      <p className="mb-4 font-medium text-[32px] leading-[36px] tracking-[-3%] lg:text-[40px] lg:leading-[40px] lg:tracking-[-3%] text-off-black">
        Life Story Archiving, Made Easy
      </p>
    </div>
  );
};

export default LandingHeaderTitle;
