import { useEffect, useState } from 'react';
import { useCardano } from './useCardano';

export const useRewardAddress = () => {
  const { cardano } = useCardano();
  const [rewardAddress, setRewardAddress] = useState<string | null>(null);

  useEffect(() => {
    const handle = async () => {
      if (!cardano) return;

      const rewardAddress = await cardano.getRewardAddress();
      setRewardAddress(rewardAddress);
    };

    handle();
  }, [cardano]);

  return rewardAddress;
};
