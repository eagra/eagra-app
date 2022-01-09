import useSWR from "swr";
import { GET_POOLS } from "../graphql/queries/pools";
import { GetPools } from "../graphql/queries/__generated__/GetPools";
import { graphqlFetcher } from "../utils/fetchers";

export const usePools = (pageIndex: number, limit = 20) => {
  const { data, isValidating, error } = useSWR<GetPools>(
    [
      "https://graphql-testnet.nstankov.com/",
      // "https://graphql-api.testnet.dandelion.link/",
      GET_POOLS,
      { limit, offset: limit * pageIndex },
    ],
    graphqlFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    pools: data?.stakePools,
    isValidating,
    error,
  };
};
