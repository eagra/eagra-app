import { Box, Heading, Text } from "@chakra-ui/layout";
import useSWR from "swr";

const usePools = () => {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .catch(console.error);

  const {
    data: pools,
    isValidating,
    error,
  } = useSWR("https://pool.pm/pools.json", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    pools,
    isValidating,
    error,
  };
};

export const Delegate = () => {
  const { pools, isValidating } = usePools();

  const poolList = pools ? Object.values(pools) : [];

  console.log({ poolList });
  return (
    <Box color="white">
      <Heading>Delegate</Heading>
      {isValidating ? <Text>Loading...</Text> : <Text>Stake Pools</Text>}
      {poolList?.length > 0 &&
        poolList.map((pool: any) => <Text>{pool.name}</Text>)}
    </Box>
  );
};
