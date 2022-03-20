import useSWR from 'swr';
import { defaultFetcher } from '../utils/fetchers';
import { useBaseCurrency } from '../store';

type PriceData = {
  cardano: {
    eur: number;
    usd: number;
  };
};

// https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=eur,usd

// https://api.coingecko.com/api/v3/coins/cardano/market_chart?id=cardano&vs_currency=eur&days=90

const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=eur,usd';

export const usePriceData = () => {
  return useSWR<PriceData>(API_URL, defaultFetcher, {
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
