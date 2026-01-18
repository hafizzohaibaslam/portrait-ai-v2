import PortraitsSection from "@/components/portraits/PortraitsSection";
import HighlightsSection from "@/components/highlights/HighlightsSection";

const PortraitsPage = () => {
  return (
    <div className="flex flex-col gap-[70px]">
      <PortraitsSection />
      <HighlightsSection />
    </div>
  );
};

export default PortraitsPage;
