import { useColorModeValue, Box, Heading, Text } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { GetPools_stakePools } from "../../graphql/queries/__generated__/GetPools";
import { usePoolsOffchainData } from "../../hooks/usePools";
import { currencySymbol, lovelaceToAda } from "../../lib";
import { AnimatedBox } from "../misc";

export const Pool = ({ pool }: { pool: GetPools_stakePools }) => {
  const offchainData = usePoolsOffchainData();

  const backdropColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50");
  const bgColor = useColorModeValue("gray.200", "gray.800");

  const metadata = offchainData?.find(
    (data) => data.hash === pool.metadataHash
  );

  if (!metadata) return null;

  return (
    <AnimatedBox
      backdropFilter="blur(6px)"
      bgColor={backdropColor}
      borderRadius="lg"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      as="a"
      href={metadata.json.homepage}
      overflow="hidden"
    >
      <Box bgColor={bgColor} p="4" flex="1">
        <Heading as="h2" size="md" fontWeight="bold" paddingBottom="4">
          {metadata.json.name}{" "}
        </Heading>
        <Text>{metadata.json.ticker}</Text>
        <Text>
          Active Stake: {currencySymbol("ada")}
          {pool.activeStake[0]
            ? lovelaceToAda(new BigNumber(pool.activeStake[0].amount)).toFixed(
                0
              )
            : 0}
        </Text>
        <Text>
          Pledge: {currencySymbol("ada")}
          {pool.pledge
            ? lovelaceToAda(new BigNumber(pool.pledge)).toString()
            : 0}
        </Text>
      </Box>
      <Box p="4">
        <Text>
          Costs: {currencySymbol("ada")}
          {lovelaceToAda(new BigNumber(pool.fixedCost)).toString()} +{" "}
          {Math.round(pool.margin * 100)}%
        </Text>
      </Box>
    </AnimatedBox>
  );
};
