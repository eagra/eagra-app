import { Box } from "@chakra-ui/layout";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Connection } from "./Connection/Connection";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { RefObject, useEffect, useRef } from "react";
import { stars } from "../../sketches";
import { Header } from "./Header/Header";
import { useScreenSize } from "../../hooks/useScreenSize";

export const Dashboard = () => {
  const bgColor = useColorModeValue("white", "gray.900");
  const { isMobile } = useScreenSize();

  const $p5 = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    const p5 = require("p5");
    new p5(stars, $p5.current);
  }, []);

  return (
    <Box
      bgColor={bgColor}
      width="100vw"
      display="flex"
      height="100vh"
      overflow="hidden"
      css={{ transition: "background 0.8s" }}
    >
      <Box ref={$p5} position="absolute" top="0" left="0" />
      <Navbar />
      <Box
        as="main"
        p={isMobile ? 6 : 12}
        paddingBottom="0"
        flex="1"
        position="relative"
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        height="100%"
      >
        <Header />
        <Box marginTop="12" w="100%" flex="1" overflow="hidden">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
