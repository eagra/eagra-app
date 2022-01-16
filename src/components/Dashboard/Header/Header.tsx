import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Heading } from "@chakra-ui/layout";
import { useRoutes } from "react-router-dom";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { Connection } from "../Connection/Connection";

export const Header = () => {
  const gradient = useColorModeValue(
    "radial-gradient(circle, rgba(181,254,255,1) 50%, rgba(255,221,199,1) 100%)",
    "radial-gradient(circle, rgba(0,61,91,1) 50%, rgba(0,119,144,1) 85%, rgba(0,183,213,1) 97%)"
  );

  const { isMobile } = useScreenSize();

  const headerRoutes = [
    {
      path: "/",
      element: <Heading size={isMobile ? "3xl" : undefined}>Dashboard</Heading>,
    },
    {
      path: "/assets",
      element: <Heading size={isMobile ? "3xl" : undefined}>Assets</Heading>,
    },
    {
      path: "/staking",
      element: (
        <Heading size={isMobile ? "2xl" : undefined}>Staking Center</Heading>
      ),
    },
  ];

  const HeaderTitle = useRoutes(headerRoutes);

  return (
    <Box
      width="100%"
      p={isMobile ? 4 : 8}
      position="relative"
      borderRadius="lg"
      background={gradient}
      display={isMobile ? "flex" : "block"}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-end"
      minHeight={isMobile ? 140 : undefined}
    >
      <Connection
        position={isMobile ? undefined : "absolute"}
        top="2"
        right="2"
      />
      {HeaderTitle}
    </Box>
  );
};
