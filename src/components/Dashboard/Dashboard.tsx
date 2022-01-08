import { Box, Heading, Text } from "@chakra-ui/layout";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Connection } from "./Connection/Connection";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";

export const Dashboard = () => {
  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <Box
      w="100%"
      bgColor={bgColor}
      width="100vw"
      display="flex"
      minHeight="100vh"
      css={{transition: 'background 0.8s'}}
    >
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
      <Box as="main" p="12" flex="1">
        <Connection />
        <Outlet />
      </Box>
    </Box>
  );
};
