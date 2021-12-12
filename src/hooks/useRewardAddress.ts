import { useEffect, useState } from "react";
import { getRewardAddress } from "../lib/address";
import { useCardano } from "./useCardano";

export const useRewardAddress = () => {
  const cardano = useCardano();
  const [rewardAddress, setRewardAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!cardano) return;

    getRewardAddress(cardano).then((address) => {
      setRewardAddress(address);
    });
  }, [cardano]);

  return rewardAddress;
};
