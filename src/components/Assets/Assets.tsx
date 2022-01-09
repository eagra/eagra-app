import useSWR from "swr";
import { useRewardAddress } from "../../hooks/useRewardAddress";
import { Asset } from "../../lib/assets";
import { defaultFetcher } from "../../utils/fetchers";
import { Tooltip, Box, Heading, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useMemo } from "react";

type WalletData = {
  addr: string;
  itn_reward: number;
  lovelaces: number;
  reward: number;
  synched: number;
  tokens: Asset[];
  utxos: number;
  vote_reward: number;
  withdrawal: number;
};

const walletEndpoint = "https://pool.pm/wallet";
const ipfsEndpoint = "https://infura-ipfs.io/ipfs";

const AssetComponent = ({ asset }: { asset: Asset }) => {
  const { quantity, name, policy, fingerprint, metadata } = asset;

  const image = metadata?.image as string | undefined;
  const imageUrl = image
    ? image.startsWith("ipfs")
      ? `${ipfsEndpoint}/${image.split("ipfs://")[1]}`
      : image
    : null;

  return (
    <Box bgColor="teal.800" p="2" css={{ marginBottom: 32, color: "white" }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${name} token image`}
          css={{ marginBottom: 16, width: "100%", height: "auto" }}
        />
      )}
      <div>
        <span>
          {quantity} {name}{" "}
        </span>
        <Tooltip label={`PolicyId: ${policy}  Fingerprint: ${fingerprint}`}>
          <InfoIcon />
        </Tooltip>
      </div>
    </Box>
  );
};

export const Assets = () => {
  const rewardAddress = useRewardAddress();
  const { isMobile, isMedium, isLarge } = useScreenSize();

  const responsiveGridTemplate = useMemo(() => {
    if (isMobile) return "1fr";
    if (isMedium) return "1fr 1fr";
    if (isLarge) return "1fr 1fr 1fr";
    return "1fr 1fr 1fr 1fr";
  }, [isMobile, isMedium]);

  const {
    data: walletData,
    isValidating,
    error,
  } = useSWR<WalletData>(
    rewardAddress ? `${walletEndpoint}/${rewardAddress}` : null,
    defaultFetcher,
    { revalidateOnFocus: false }
  );

  if (isValidating) return <Text color="white">Loading...</Text>;
  if (error) return <Text color="white">Error :(</Text>;

  return (
    <Box w="100%">
      <Heading as="h2" size="xl" marginTop="8" marginBottom="4">
        Assets
      </Heading>
      <Box
        as="section"
        display="grid"
        gap="16px"
        gridTemplateColumns={responsiveGridTemplate}
      >
        {walletData &&
          walletData.tokens.map((asset: Asset, index: number) => (
            <AssetComponent key={index} asset={asset} />
          ))}
      </Box>
    </Box>
  );
};
