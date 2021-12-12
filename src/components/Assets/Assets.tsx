import useSWR from "swr";
import { useRewardAddress } from "../../hooks/useRewardAddress";
import { Asset } from "../../lib/assets";

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

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch(console.error);

const AssetComponent = ({ asset }: { asset: Asset }) => {
  const { quantity, name, policy, fingerprint, metadata } = asset;

  const image = metadata?.image as string | undefined;
  const imageUrl = image
    ? image.startsWith("ipfs")
      ? `${ipfsEndpoint}/${image.split("ipfs://")[1]}`
      : image
    : null;

  return (
    <div css={{ marginBottom: 32 }}>
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
    fetcher,
    { revalidateOnFocus: false }
  );

  console.log(walletData);

  if (isValidating) return <div>Loading...</div>;

  if (error) return <div>Error :(</div>;

  return (
    <div>
      <h3>Assets</h3>

      {walletData &&
        walletData.tokens.map((asset: Asset, index: number) => (
          <AssetComponent key={index} asset={asset} />
        ))}
    </div>
  );
};
