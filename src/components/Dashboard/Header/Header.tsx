import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Heading } from "@chakra-ui/layout";
import { useRoutes } from "react-router-dom";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { Connection } from "../Connection/Connection";

export const Header = () => {
  const gradient = useColorModeValue(
    "radial-gradient(circle at top left, #f5db53 15%, #f58833 15% 55%, #dd339b 55% 100%)",
    "radial-gradient(circle at top left, #dd339b 15%, #ab33cb 15% 55%, #1111ff 55% 100%)"
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
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="space-between"
      alignItems={isMobile ? "flex-end" : "center"}
      height={isMobile ? "140px" : "80px"}
      shadow="md"
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
