import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LandingFooterProps = {
  className?: string;
};

const getCurrentYear = () => new Date().getFullYear();

const LandingFooter = ({ className }: LandingFooterProps) => {
  return (
    <footer
      className={cn(
        "mt-[42px] xl:mt-0 border-t border-t-gray-1 lg:border-none pt-8 px-12 py-6 md:py-12 xl:px-[156px] xl:py-[78px] xl:pt-[90px] lg:text-lg text-center flex flex-col xl:flex-row items-center justify-between",
        className
      )}
    >
      {/* Left Section */}
      <div className="md:flex items-center">
        <span className="block">© {getCurrentYear()} Portrait LLC</span>
        <Link
          href="/policy/privacy"
          className="mt-4 md:mt-0 md:ml-8 hover:underline block"
        >
          Privacy Policy
        </Link>
        <Link
          href="/policy/terms"
          className="mt-4 md:mt-0 md:ml-8 hover:underline block"
        >
          Terms of Use
        </Link>
      </div>

      {/* Right Section */}
      <div className="mt-8 xl:mt-0 md:flex items-center">
        <Link
          href="https://www.mjventures.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dominant-purple-main hover:underline block"
        >
          Built with 💜 by MJV
        </Link>
        <div className="mt-4 md:mt-0 md:ml-5 flex items-center">
          <span>Partnerships:</span>
          <div className="ml-3 flex items-center">
            <Image
              src="/images/icon-google-colored.png"
              alt="Google"
              width={27}
              height={27}
              className="w-auto h-[27px]"
            />
            <Image
              src="/images/icon-aws.png"
              alt="AWS"
              width={27}
              height={27}
              className="w-auto h-[27px] ml-3"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
