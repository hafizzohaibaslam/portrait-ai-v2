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
        "flex gap-2 flex-wrap items-center justify-between w-full",
        className
      )}
    >
      {/* Left Section */}
      <div className="flex flex-wrap items-center gap-6">
        <span className="block">© {getCurrentYear()} Portrait LLC</span>
        <Link
          href="/policy/privacy"
          className="hover:underline block"
        >
          Privacy Policy
        </Link>
        <Link
          href="/policy/terms"
          className="hover:underline block"
        >
          Terms of Use
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="https://www.mjventures.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dominant-purple-main hover:underline block"
        >
          Built with 💜 by MJV
        </Link>
        <div className="flex items-center gap-2">
          <span>Partnerships:</span>
          <div className="flex items-center gap-2">
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
              className="w-auto h-[27px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
