import { Text } from '@chakra-ui/react';
import { createContext, useContext } from 'react';
import useSWR from 'swr';
import { GET_POOLS, GET_POOL_OFFCHAIN_DATA } from '../graphql/queries/pools';
import { GetPools } from '../graphql/queries/__generated__/GetPools';
import {
  PoolOffchainData,
  PoolOffchainData_pool_offline_data,
} from '../graphql/queries/__generated__/PoolOffchainData';
import { graphqlFetcher } from '../utils/fetchers';
import { getEnv } from '../utils/getEnv';

const { GRAPHQL_URL } = getEnv();

export const usePools = (pageIndex: number, limit = 20) => {
  const { data, isValidating, error, mutate } = useSWR<GetPools>(
    [GRAPHQL_URL, GET_POOLS, { limit, offset: limit * pageIndex }],
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
    retry: mutate,
  };
};

type PoolOffchainDataType = Omit<
  PoolOffchainData_pool_offline_data,
  'json' | '__typename'
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
  const { data, error } = useSWR<PoolOffchainData>(
    [GRAPHQL_URL, GET_POOL_OFFCHAIN_DATA],
    graphqlFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  // TODO add a global loading indicator
  if (error) return <Text>Error retrieving context</Text>;
  if (!data) return null;

  return (
    <PoolOffchainDataContext.Provider value={data?.pool_offline_data}>
      {children}
    </PoolOffchainDataContext.Provider>
  );
};

export const usePoolsOffchainData = () => {
  return useContext(PoolOffchainDataContext);
};
