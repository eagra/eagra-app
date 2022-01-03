import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { GetPools_stakePools } from "../../graphql/queries/__generated__/GetPools";
import { usePools } from "../../hooks/usePools";
import { defaultFetcher } from "../../utils/fetchers";

const usePoolData = (poolUrl: string | null) => {
  const { data, isValidating, error } = useSWR(poolUrl, defaultFetcher, {
    revalidateOnFocus: false,
  });

  return { data, isValidating, error };
};

const Pool = ({ pool }: { pool: GetPools_stakePools }) => {
  const { data } = usePoolData(pool.url);

  return (
    <div key={pool.id}>
      {/* <Text>{pool.id}</Text>
      <Text>{pool.hash}</Text>
      <Text>{pool.pledge}</Text> */}
      {data && (
        <Box css={{ border: "1px solid white" }} p="1" borderRadius="sm">
          <Text>{data.name}</Text>
          <Text>{data.ticker}</Text>
          <Text>{data.description}</Text>
        </Box>
      )}
    </div>
  );
};

export const Pools = () => {
  const [page, setPage] = useState(1);
  const { pools, isValidating, error } = usePools(page - 1, 2);

  if (isValidating) return <Text>Loading...</Text>;
  if (error || !pools || pools.length === 0) return <Text>Error</Text>;

  return (
    <>
      <Text>Stake Pools</Text>
      {pools.map((pool) => {
        if (!pool) return null;
        return <Pool pool={pool} key={pool.id} />;
      })}
      <Box d="flex" flexDir="row">
        <Button
          color="black"
          onClick={() => setPage((currentPage) => currentPage - 1)}
        >
          {"<"}
        </Button>
        <Text marginLeft="1" marginRight="1">
          {page}
        </Text>
        <Button
          color="black"
          onClick={() => setPage((currentPage) => currentPage + 1)}
        >
          {">"}
        </Button>
      </Box>
    </>
  );
};

export const Staking = () => {
  return (
    <Box color="white">
      <Heading>Delegate</Heading>
      <Pools />
    </Box>
  );
};
