import { Text } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import useSWR from "swr";
import { GET_POOLS, GET_POOL_OFFCHAIN_DATA } from "../graphql/queries/pools";
import { GetPools } from "../graphql/queries/__generated__/GetPools";
import {
  PoolOffchainData,
  PoolOffchainData_pool_offline_data,
} from "../graphql/queries/__generated__/PoolOffchainData";
import { graphqlFetcher } from "../utils/fetchers";

const graphqlUrl = // "https://graphql-testnet.nstankov.com/",
  // "https://graphql-api.testnet.dandelion.link/",
  "https://hasura-testnet.nstankov.com/v1/graphql";

export const usePools = (pageIndex: number, limit = 20) => {
  const { data, isValidating, error } = useSWR<GetPools>(
    [graphqlUrl, GET_POOLS, { limit, offset: limit * pageIndex }],
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

type PoolOffchainDataType = Omit<
  PoolOffchainData_pool_offline_data,
  "json" | "__typename"
> & {
  json: {
    description: string;
    homepage: string;
    name: string;
    ticker: string;
  };
};

export const PoolOffchainDataContext = createContext<
  PoolOffchainDataType[] | undefined
>([]);

export const PoolOffchainDataProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { data, isValidating, error } = useSWR<PoolOffchainData>(
    [graphqlUrl, GET_POOL_OFFCHAIN_DATA],
    graphqlFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  if (isValidating) return <Text>Loading...</Text>;
  if (error) return <Text>Error retrieving context</Text>;
  if (!data && !isValidating) return null;

  return (
    <PoolOffchainDataContext.Provider value={data?.pool_offline_data}>
      {children}
    </PoolOffchainDataContext.Provider>
  );
};

export const usePoolsOffchainData = () => {
  return useContext(PoolOffchainDataContext);
};
