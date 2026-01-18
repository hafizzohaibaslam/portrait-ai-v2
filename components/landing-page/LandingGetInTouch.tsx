import Link from "next/link";
import { cn } from "@/lib/utils";

type LandingGetInTouchProps = {
  className?: string;
};

const LandingGetInTouch = ({ className }: LandingGetInTouchProps) => {
  return (
    <section
      className={cn(
        "mt-[90px] lg:mt-[133px] w-full max-w-[1196px] mx-auto flex justify-between items-center gap-8",
        "py-[48px] px-[40px] bg-yellow-2 rounded-[8px]",
        className
      )}
    >
      <div className="flex flex-col gap-2 max-w-2xl">
        <h2 className="font-medium text-[30px] leading-[39px] tracking-[-0.6px] text-black-2">
          Need help capturing memories?
        </h2>
        <p className="text-base text-off-black/80">
          We can help you digitize your DVDs, VHS tapes, old photos, and videos.
          Our concierge service takes care of the uploading process for you.
          Please get in touch to find out more.
        </p>
      </div>
      <Link
        href="/contact-us"
        className="get-started-button px-[38px] py-[4px]"
      >
        Get in touch
      </Link>
    </section>
  );
};

export default LandingGetInTouch;
