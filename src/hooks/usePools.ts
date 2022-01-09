import useSWR from "swr";
import { GET_POOLS } from "../graphql/queries/pools";
import {
  GetPools,
  GetPools_stakePools,
} from "../graphql/queries/__generated__/GetPools";
import { decodeBech32 } from "../lib/serializer";
import { defaultFetcher, graphqlFetcher } from "../utils/fetchers";

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
      shouldRetryOnError: false,
    }
  );

  return {
    pools: data?.stakePools,
    isValidating,
    error,
  };
};

export const usePoolData = (pool: GetPools_stakePools) => {
  const { id, metadataHash } = pool;
  const hex = id ? decodeBech32(id) : "";
  const url = `https://smash-testnet-dev.nstankov.com/api/v1/metadata/${hex}/${metadataHash}`;
  const { data, isValidating, error } = useSWR(
    !id ? null : url,
    defaultFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return { data, isValidating, error };
};
