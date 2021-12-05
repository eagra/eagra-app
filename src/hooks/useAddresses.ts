import { useEffect, useState } from "react";
import { getAddresses, ParsedAddress } from "../utils/address";
import { useCardano } from "./useCardano";

export const useAddresses = () => {
  const cardano = useCardano();
  const [walletAddresses, setWalletAddresses] = useState<ParsedAddress[]>([]);

  useEffect(() => {
    getAddresses(cardano).then((addresses) => {
      setWalletAddresses(addresses);
    });
  }, [cardano.isEnabled]);

  return walletAddresses;
};
