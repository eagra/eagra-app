import { useEffect, useState } from "react";
import { useCardano } from "./useCardano";

export const useAddresses = () => {
  const { cardano } = useCardano();
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);

  const handle = async () => {
    if (!cardano) return;
    const addresses = await cardano.getAddresses();
    setWalletAddresses(addresses);
  };

  useEffect(() => {
    handle();
  }, [cardano]);

  return walletAddresses;
};
