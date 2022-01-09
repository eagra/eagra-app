import { Box } from "@chakra-ui/layout";
import { ReactNode, useMemo } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";

export const ResponsiveGrid = ({ children }: { children: ReactNode }) => {
  const { isMobile, isMedium, isLarge } = useScreenSize();

  const responsiveGridTemplate = useMemo(() => {
    if (isMobile) return "1fr";
    if (isMedium) return "1fr 1fr";
    if (isLarge) return "1fr 1fr 1fr";
    return "1fr 1fr 1fr 1fr";
  }, [isMobile, isMedium]);

  return (
    <Box
      as="section"
      display="grid"
      gap="16px"
      gridTemplateColumns={responsiveGridTemplate}
    >
      {children}
    </Box>
  );
};
