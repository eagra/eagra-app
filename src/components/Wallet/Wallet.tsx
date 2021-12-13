import { Box, Heading, Text } from "@chakra-ui/layout";
import { Assets } from "../Assets/Assets";
import { Balance } from "../Balance/Balance";
import { Navbar } from "../Navbar/Navbar";
import { WalletConnection } from "../WalletConnection/WalletConnection";

export const Wallet = () => {
  return (
    <Box
      as="main"
      w="100%"
      bgColor="gray.800"
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Box
        as="section"
        bgColor="teal.800"
        marginTop="8"
        p="12"
        borderRadius="md"
        css={{
          width: "80%",
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
      </Box>

      <WalletConnection />
      <Balance />
      <Assets />
    </Box>
  );
};
