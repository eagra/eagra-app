import { useEffect, useState } from "react";
import { useCardano } from "./useCardano";

export const useRewardAddress = () => {
  const { cardano } = useCardano();
  const [rewardAddress, setRewardAddress] = useState<string | null>(null);

  const handle = async () => {
    if (!cardano) return;

    const rewardAddress = await cardano.getRewardAddress();
    setRewardAddress(rewardAddress);
  };

  useEffect(() => {
    handle();
  }, [cardano]);

  return rewardAddress;
};
