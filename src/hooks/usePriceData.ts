import useSWR from 'swr';
import { defaultFetcher } from '../utils/fetchers';
import { useBaseCurrency } from '../store';

import { getEnv } from '../utils/getEnv';

const { PRICE_API_URL } = getEnv();

type PriceData = {
  cardano: {
    eur: number;
    usd: number;
  };
};

const url = `${PRICE_API_URL}?ids=cardano&vs_currencies=eur,usd`;

export const usePriceData = () => {
  return useSWR<PriceData>(url, defaultFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
};

export const usePrice = () => {
  const [baseCurrency] = useBaseCurrency();
  const { data, isValidating, error } = usePriceData();

  return {
    error: !!error,
    loading: isValidating,
    price: data?.cardano[baseCurrency],
  };
};
