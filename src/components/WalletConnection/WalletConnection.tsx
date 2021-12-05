import { useEffect, useState } from "react";
import { useAddresses } from "../../hooks/useAddresses";

import { useCardano } from "../../hooks/useCardano";
import { useRewardAddress } from "../../hooks/useRewardAddress";

export const WalletConnection = ({ className }: { className?: string }) => {
  const cardano = useCardano();
  const walletAddresses = useAddresses();
  const rewardAddress = useRewardAddress();

  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  const checkInitialWalletConnection = async () => {
    const isEnabled = await cardano?.isEnabled();
    setIsEnabled(isEnabled);
    setIsLoadingInitial(false);
  };

  const connectWallet = async () => {
    if (!cardano) return;
    await cardano.enable();
  };

  useEffect(() => {
    checkInitialWalletConnection();
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
  }, [isEnabled]);

  return (
    <div className={className}>
      {isLoadingInitial && <span>Loading...</span>}
      {!isLoadingInitial && isEnabled && walletAddresses.length > 0 && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div>Wallet Connected ✨</div>
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
      {!isLoadingInitial && !isEnabled && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};
