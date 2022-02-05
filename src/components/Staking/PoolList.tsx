import { Box, Button, Heading, Skeleton } from '@chakra-ui/react';
import { usePools } from '../../hooks/usePools';
import { ResponsiveGrid } from '../misc/ResponsiveGrid';
import { Pool } from './Pool';

export const PoolList = ({ page }: { page: number }) => {
  const POOLS_PER_PAGE = 100;
  const { pools, isValidating, error, retry } = usePools(
    page - 1,
    POOLS_PER_PAGE
  );

  if (error) {
    return (
      <Box>
        <Heading>Error Fetching Pools</Heading>
        <Button onClick={() => retry()}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box marginBottom="20">
      <ResponsiveGrid>
        {pools && !isValidating
          ? pools.map((pool) => {
            if (!pool) return null;
            return <Pool pool={pool} key={pool.id} />;
          })
          : [...Array(POOLS_PER_PAGE).keys()].map((_, index) => {
            return <Skeleton height="200px" borderRadius="lg" key={index} />;
          })}
      </ResponsiveGrid>
    </Box>
  );
};
