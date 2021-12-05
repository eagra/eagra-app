import { useEffect, useRef, useState } from "react";

import { useCardano } from "../../hooks/useCardano";
import { getAssets } from "../../utils/assets";

export const WalletConnection = () => {
  const cardano = useCardano();

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
    getAssets(cardano).then(console.log);
  }, [isEnabled]);

  return (
    <div>
      {isLoadingInitial && <span>Loading...</span>}
      {!isLoadingInitial && isEnabled && <div>Wallet Connected ✨</div>}
      {!isLoadingInitial && !isEnabled && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};
