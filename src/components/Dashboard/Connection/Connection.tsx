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
  Modal,
  ModalBody,
  Image,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { InjectedApiType } from "../../../lib";

export const Connection = (props: PropsOf<ChakraComponent<"div">>) => {
  const { injected, init, cardano } = useCardano();
  const { unused } = useAddresses();

  const connectWallet = async (walletKey: string): Promise<void> => {
    try {
      await init(walletKey);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          "We could not connect to your wallet. Make sure that you accept the prompt from your wallet extension",
        status: "error",
        duration: 6000,
        isClosable: true,
      });

      throw new Error("could not connect");
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const backdropColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50");

  const getWalletOptions = (injected: InjectedApiType | undefined) => {
    if (!injected) return null;

    return Object.entries(injected).map(([key, wallet]) => {
      if (!wallet.name || !wallet.apiVersion) return null;
      return (
        <Box key={wallet.name} marginTop="4" marginBottom="4">
          <Button onClick={() => connectWallet(key)}>
            <Image marginRight="2" src={wallet.icon} height="60%" />
            <Text>{wallet.name}</Text>
          </Button>
        </Box>
      );
    });
  };

  const walletOptions = getWalletOptions(injected);

  const copyToClipboard = () => {
    if (unused) {
      navigator.clipboard.writeText(unused[0]).then(() => {
        toast({
          title: "Wallet address copied!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    }
  };

  return (
    <Box {...props}>
      {cardano && !!unused && (
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
            <Tooltip label={unused[0]}>
              <CopyIcon cursor="pointer" onClick={copyToClipboard} />
            </Tooltip>
            {/* <Text as="span" color="orange">
              {cardano.networkId === 0 && "(testnet)"}
            </Text> */}
          </Text>
        </Box>
      )}
      {!cardano && walletOptions && (
        <>
          <Button onClick={onOpen}>Connect Wallet</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnEsc
            closeOnOverlayClick
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Choose a wallet</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{walletOptions}</ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};
