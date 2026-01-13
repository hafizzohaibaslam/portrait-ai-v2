import { useEffect, useState } from "react";

const MAX_WIDTH = 1840;

export type LayoutState = {
  containerMinHeight: number;
  imageSize: number;
  radius: number;
  imagesContainer: {
    top: number;
    left: number | string;
    fixed: boolean;
  };
};

// Custom hook for responsive layout calculations
export const useSecurityLayout = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [layout, setLayout] = useState<LayoutState>({
    containerMinHeight: 810,
    imageSize: 100,
    radius: 0,
    imagesContainer: {
      top: 0,
      left: 0,
      fixed: false,
    },
  });

  useEffect(() => {
    const calculateLayout = (): LayoutState => {
      if (!containerRef.current) return layout;

      let width = containerRef.current.clientWidth;
      if (width > MAX_WIDTH) width = MAX_WIDTH;

      const windowWidth = window.innerWidth;
      const newLayout: LayoutState = {
        containerMinHeight: 800,
        imageSize: 85,
        radius: width * 0.44,
        imagesContainer: {
          top: 85 * 5.4,
          left: 85 / 2.5,
          fixed: false,
        },
      };

      // Desktop breakpoints
      if (windowWidth >= 1536) {
        newLayout.imageSize = 110;
        newLayout.radius = width * 0.45;
        newLayout.imagesContainer.top = 110 * 5.4;
      } else if (windowWidth >= 1286) {
        newLayout.containerMinHeight = 720;
        newLayout.imageSize = 85;
        newLayout.radius = width * 0.44;
      }

      if (windowWidth <= 1518) {
        newLayout.imagesContainer.top = newLayout.imageSize * 5.2;
      }

      // Fixed positioning breakpoint
      if (windowWidth <= 1300) {
        newLayout.radius = 1300 * 0.45;
        newLayout.imagesContainer.fixed = true;
        newLayout.imagesContainer.top = newLayout.imageSize * 6.5;
        newLayout.imagesContainer.left = "52%";
      }

      // Container height adjustments
      if (windowWidth <= 1024) {
        newLayout.containerMinHeight = 680;
      } else if (windowWidth <= 1276) {
        newLayout.containerMinHeight = 720;
        if (newLayout.imagesContainer.fixed) {
          newLayout.imagesContainer.left = "52.5%";
        }
      }

      // Mobile left positioning (when fixed)
      if (newLayout.imagesContainer.fixed) {
        const mobileLeftPositions: Record<number, string> = {
          420: "55.4%",
          460: "55.3%",
          530: "54.8%",
          636: "54.4%",
          743: "53.3%",
          877: "53%",
          986: "53%",
        };

        for (const [breakpoint, position] of Object.entries(
          mobileLeftPositions
        )) {
          if (windowWidth <= Number(breakpoint)) {
            newLayout.imagesContainer.left = position;
            break;
          }
        }
      }

      return newLayout;
    };

    const updateLayout = () => {
      setLayout(calculateLayout());
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return layout;
};
