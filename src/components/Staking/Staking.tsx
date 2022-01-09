import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
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
  const backdropColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50");

  if (!data || error) return null;
  return (
    <Box
      backdropFilter="blur(6px)"
      bgColor={backdropColor}
      p="8"
      borderRadius="lg"
    >
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
  // if (error || !pools || pools.length === 0) return <Text>Error</Text>;

  return (
    <Box>
      <Text size="md" marginTop="4" marginBottom="2">
        Stake Pools
      </Text>
      <Box
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        {pools?.map((pool) => {
          if (!pool) return null;
          return <Pool pool={pool} key={pool.id} />;
        })}
      </Box>
      <Box d="flex" flexDir="row" marginTop="4">
        <Button onClick={() => setPage((currentPage) => currentPage - 1)}>
          {"<"}
        </Button>
        <Text marginLeft="1" marginRight="1">
          {page}
        </Text>
        <Button onClick={() => setPage((currentPage) => currentPage + 1)}>
          {">"}
        </Button>
      </Box>
    </Box>
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
