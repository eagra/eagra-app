import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
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
  const { data, error } = usePoolData(pool.url);

  if (!data || error) return null;
  return (
    <Box bgColor="teal.800" p="2" borderRadius="md">
      <Text>{data.name}</Text>
      <Text>{data.ticker}</Text>
      <Text>{data.description}</Text>
    </Box>
  );
};

export const Pools = () => {
  const [page, setPage] = useState(1);
  const { pools, isValidating, error } = usePools(page - 1, 20);

  if (isValidating) return <Text>Loading...</Text>;
  if (error || !pools || pools.length === 0) return <Text>Error</Text>;

  return (
    <>
      <Text size="md" marginTop="4" marginBottom="2">Stake Pools</Text>
      <Box
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        {pools.map((pool) => {
          if (!pool) return null;
          return <Pool pool={pool} key={pool.id} />;
        })}
      </Box>
      <Box d="flex" flexDir="row" marginTop="4">
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
    <Box color="white" padding="6">
      <Heading>Delegate</Heading>
      <Pools />
    </Box>
  );
};
