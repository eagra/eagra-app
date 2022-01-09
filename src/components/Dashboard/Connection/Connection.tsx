import { useCardano } from "../../../hooks/useCardano";
import { useAddresses } from "../../../hooks/useAddresses";
import {
  Tooltip,
  Text,
  Button,
  Box,
  useColorModeValue,
  ChakraComponent,
  PropsOf,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

export const Connection = (props: PropsOf<ChakraComponent<"div">>) => {
  const walletAddresses = useAddresses();
  const { cardano, init } = useCardano();

  const toast = useToast();
  const backdropColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50");

  const connectWallet = async () => {
    if (!cardano) return;
    try {
      await cardano.enable();
      init();
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          "We could not connect to your wallet. Make sure that you accept the prompt from your wallet extension",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Box {...props}>
      {cardano?.isConnected && walletAddresses.length > 0 && (
        <Box
          display="flex"
          backdropFilter="blur(6px)"
          bgColor={backdropColor}
          borderRadius="lg"
          p="1"
          alignItems="center"
        >
          <Text>
            ✨ Wallet Connected{" "}
            <Tooltip label={walletAddresses[0].address}>
              <CopyIcon
                cursor="pointer"
                onClick={() => {
                  if (walletAddresses[0].address) {
                    navigator.clipboard
                      .writeText(walletAddresses[0].address)
                      .then(() => {
                        toast({
                          title: "Wallet address copied!",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        });
                      });
                  }
                }}
              />
            </Tooltip>
            <Text as="span" color="orange">
              {cardano.networkId === 0 && "(testnet)"}
            </Text>
          </Text>
        </Box>
      )}
      {!cardano?.isConnected && (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Box>
  );
};
