import { Button } from "@chakra-ui/button";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import { useState } from "react";
import useSWR from "swr";
import { GetPools_stakePools } from "../../graphql/queries/__generated__/GetPools";
import { usePools } from "../../hooks/usePools";
import { defaultFetcher } from "../../utils/fetchers";
import { ResponsiveGrid } from "../misc/ResponsiveGrid";

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
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Box>
        <Text size="lg" fontWeight="bold">
          {data.name}
        </Text>
        <Text>{data.ticker}</Text>
      </Box>
      <Text>{data.description}</Text>
    </Box>
  );
};

export const Pools = () => {
  const [page, setPage] = useState(1);
  const { pools, isValidating, error } = usePools(page - 1, 50);

  // TODO refactor this shit
  let poolComponent;
  if (isValidating) {
    poolComponent = <Text>Loading...</Text>;
  } else if (error || !pools || pools.length === 0) {
    poolComponent = <Text>Error</Text>;
  } else {
    poolComponent = (
      <ResponsiveGrid>
        {pools?.map((pool) => {
          if (!pool) return null;
          return <Pool pool={pool} key={pool.id} />;
        })}
      </ResponsiveGrid>
    );
  }
  // end TODO

  return (
    <Box marginTop="8">
      {poolComponent}
      <Box d="flex" flexDir="row" marginTop="4" alignItems="center">
        <Button onClick={() => setPage((currentPage) => currentPage - 1)}>
          <ArrowBackIcon />
        </Button>
        <Text marginLeft="2" marginRight="2">
          {page}
        </Text>
        <Button onClick={() => setPage((currentPage) => currentPage + 1)}>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export const Staking = () => {
  return (
    <Box>
      <Heading>Delegate</Heading>
      <Pools />
    </Box>
  );
};
