import Link from "next/link";
import { cn } from "@/lib/utils";

type LandingGetInTouchProps = {
  className?: string;
};

const LandingGetInTouch = ({ className }: LandingGetInTouchProps) => {
  return (
    <section className={cn("mt-12 px-4 md:px-24 2xl:px-[170px]", className)}>
      <div className="mt-18 lg:mt-[147px] bg-yellow-2 px-10 py-12 rounded-md flex flex-col lg:flex-row items-center lg:justify-between text-center lg:text-left">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-medium">
            Need help capturing memories?
          </h2>
          <p className="text-base text-off-black/80">
            We can help you digitize your DVDs, VHS tapes, old photos, and
            videos. Our concierge service takes care of the uploading process
            for you. Please get in touch to find out more.
          </p>
        </div>
        <Link
          href="/contact-us"
          className="mt-8 lg:mt-0 shrink-0 ml-0 lg:ml-8 text-center px-12 py-2 lg:px-8 lg:py-3 border-[1.5px] border-off-black! hover:bg-off-black hover:text-white rounded-lg transition-ease"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
};

export default LandingGetInTouch;
