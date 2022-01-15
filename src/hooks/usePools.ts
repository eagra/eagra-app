import useSWR from "swr";
import { GET_POOLS } from "../graphql/queries/pools";
import {
  GetPools,
  GetPools_stakePools,
} from "../graphql/queries/__generated__/GetPools";
import { Serializer } from "../lib";
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
  const serializer = new Serializer();
  const { id, metadataHash, retirements } = pool;
  const hex = id ? serializer.bech32ToHex(id) : null;
  const url =
    hex &&
    metadataHash &&
    (!retirements || retirements?.length === 0) &&
    `https://smash-testnet-dev.nstankov.com/api/v1/metadata/${hex}/${metadataHash}`;

  const { data, isValidating, error } = useSWR(url, defaultFetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data || ((retirements as any)?.length > 0 && { retired: true }),
    isValidating,
    error,
  };
};
