import { useEffect, useState } from 'react';
import { useCardano } from './useCardano';

export const useAddresses = () => {
  const { cardano } = useCardano();
  const [unused, setUnused] = useState<string[]>([]);
  const [used, setUsed] = useState<string[]>([]);

  useEffect(() => {
    const handle = async () => {
      if (!cardano) return;
      const [addresses, usedAddresses] = await Promise.all([
        cardano.getAddresses(),
        cardano.getUsedAddresses(),
      ]);
      setUnused(addresses);
      setUsed(usedAddresses);
    };

    handle();
  }, [cardano]);

  return { unused, used };
};
