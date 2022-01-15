import { Box } from "@chakra-ui/layout";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Connection } from "./Connection/Connection";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { RefObject, useEffect, useRef } from "react";
import { stars } from "../../sketches";

export const Dashboard = () => {
  const bgColor = useColorModeValue("white", "gray.900");

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
      css={{ transition: "background 0.8s" }}
      overflow="hidden"
    >
      <Box ref={$p5} position="absolute" top="0" left="0" />
      <Navbar />
      <Box
        as="main"
        p="12"
        flex="1"
        position="relative"
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        overflowY="scroll"
      >
        <Connection position="absolute" top="12" right="12" />
        <Outlet />
      </Box>
    </Box>
  );
};
