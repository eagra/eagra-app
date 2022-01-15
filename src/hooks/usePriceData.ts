import useSWR from "swr";
import { defaultFetcher } from "../utils/fetchers";

type PriceData = {
  cardano: {
    eur: number;
    usd: number;
  };
};

export const usePriceData = () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=eur,usd";
  return useSWR<PriceData>(url, defaultFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
};

export const usePrice = (currency: keyof PriceData['cardano']) => {
  const { data, isValidating, error } = usePriceData();

  return {
    error: !!error,
    loading: isValidating,
    price: data?.cardano[currency],
  };
};
