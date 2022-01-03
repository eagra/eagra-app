import { useCardano } from "../../../hooks/useCardano";
import { useAddresses } from "../../../hooks/useAddresses";
import { Tooltip, Text, Button } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

export const Connection = ({ className }: { className?: string }) => {
  const { cardano, init } = useCardano();
  const toast = useToast();

  const walletAddresses = useAddresses();

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
    <div className={className} css={{ color: "white" }}>
      {cardano?.isConnected && walletAddresses.length > 0 && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text>
            ✨ Wallet Connected{" "}
            <Tooltip label={walletAddresses[0].address}>
              <CopyIcon />
            </Tooltip>
            <Text as="span" color="orange">
              {cardano.networkId === 0 && "(testnet)"}
            </Text>
          </Text>
        </div>
      )}
      {!cardano?.isConnected && (
        <Button color="black" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
