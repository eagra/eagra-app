import { Box } from "@chakra-ui/layout";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Connection } from "./Connection/Connection";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { RefObject, useEffect, useRef } from "react";
import stars from "../../sketches/stars";
import blobs from "../../sketches/blobls";

export const Dashboard = () => {
  const bgColor = useColorModeValue("white", "gray.900");

  const $p5 = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    const p5 = require("p5");
    new p5(blobs, $p5.current);
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

      {/* <Box
        as="section"
        bgColor="teal.800"
        marginTop="4"
        p="12"
        position="relative"
        borderRadius="md"
        css={{
          width: "96%",
          height: 120,
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
          flexDirection: "column",
        }}
      >
        <Heading as="h1" size="2xl" color="white">
          Eagra Wallet
        </Heading>
        <Text color="white" css={{ width: "100%" }}>
          Your key to{" "}
          <Text as="span" color="teal.200">
            DeFi
          </Text>{" "}
          on Cardano
        </Text>
        <Connection css={{ position: "absolute", top: 4, right: 8 }} />
      </Box> */}
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
