import { Heading, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import { useRewardAddress } from "../../hooks/useRewardAddress";
import { Asset } from "../../lib/assets";
import { defaultFetcher } from "../../utils/fetchers";

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
    <div css={{ marginBottom: 32, color: "white", width: "20vw" }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${name} token image`}
          css={{ marginBottom: 16 }}
        />
      )}
      <div>
        <span>
          {quantity} {name}
        </span>
        <div css={{ fontSize: 12 }}>{policy}</div>
        <div css={{ fontSize: 12 }}>{fingerprint}</div>
      </div>
    </div>
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
    <div>
      <Heading as="h2" size="xl" color="white" marginTop="8" marginBottom="4">
        Assets
      </Heading>
      <section
        css={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {walletData &&
          walletData.tokens.map((asset: Asset, index: number) => (
            <AssetComponent key={index} asset={asset} />
          ))}
      </section>
    </div>
  );
};
