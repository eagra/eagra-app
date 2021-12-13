import { useAddresses } from "../../hooks/useAddresses";

import { useCardano } from "../../hooks/useCardano";
import { useRewardAddress } from "../../hooks/useRewardAddress";

export const WalletConnection = ({ className }: { className?: string }) => {
  const cardano = useCardano();

  const walletAddresses = useAddresses();
  const rewardAddress = useRewardAddress();

  const connectWallet = async () => {
    if (!cardano) return;
    await cardano.enable();
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
          <div>
            Wallet Connected ✨
            <span css={{ fontSize: 12, color: "orange" }}>
              {cardano.networkId === 0 && "(testnet)"}
            </span>
          </div>
          {walletAddresses.map((walletAddress: any) => (
            <div
              key={walletAddress.address}
              css={{
                fontSize: 12,
                maxWidth: 280,
                lineBreak: "anywhere",
                textAlign: "center",
              }}
            >
              {walletAddress.address}
            </div>
          ))}
          {rewardAddress?.length && rewardAddress.length > 0 && (
            <div css={{ marginTop: 12 }}>
              <div>Reward Address</div>
              <div css={{ fontSize: 12 }}>{rewardAddress}</div>
            </div>
          )}
        </div>
      )}
      {!cardano?.isConnected && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};
