import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type BaseCurrency = 'usd' | 'eur';

const baseCurrency = atomWithStorage<BaseCurrency>('baseCurrency', 'usd');

export const useBaseCurrency = () => {
  return useAtom(baseCurrency);
};

export const useToggleBaseCurrency = () => {
  const [curr, set] = useBaseCurrency();

  const toggle = () => {
    switch (curr) {
      case 'usd':
        set('eur');
        break;
      case 'eur':
        set('usd');
        break;
      default:
        throw 'undefined behaviour';
    }
  };

  return toggle;
};
