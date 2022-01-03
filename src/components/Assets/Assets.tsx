import useSWR from "swr";
import { useRewardAddress } from "../../hooks/useRewardAddress";
import { Asset } from "../../lib/assets";
import { defaultFetcher } from "../../utils/fetchers";
import { Tooltip, Box, Heading, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

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

  console.log({ asset });

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
    <Box css={{ width: "100%" }} p="6">
      <Heading as="h2" size="xl" color="white" marginTop="8" marginBottom="4">
        Assets
      </Heading>
      <section
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 16,
        }}
      >
        {walletData &&
          walletData.tokens.map((asset: Asset, index: number) => (
            <AssetComponent key={index} asset={asset} />
          ))}
      </section>
    </Box>
  );
};
