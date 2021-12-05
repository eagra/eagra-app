import { useEffect, useState } from "react";
import { getRewardAddress } from "../utils/address";
import { useCardano } from "./useCardano";

export const useRewardAddress = () => {
  const cardano = useCardano();
  const [rewardAddress, setRewardAddress] = useState<string | null>(null);

  useEffect(() => {
    getRewardAddress(cardano).then((address) => {
      setRewardAddress(address);
    });
  }, [cardano]);

  return rewardAddress;
};
