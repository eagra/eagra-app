import { Box } from '@chakra-ui/layout';
import { useState } from 'react';
import { PoolOffchainDataProvider } from '../../hooks/usePools';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { PageSwitcher } from './ControlPanel/PageSwitcher';
import { PoolList } from './PoolList';

export const Staking = () => {
  const [page, setPage] = useState(1);
  return (
    <PoolOffchainDataProvider>
      <>
        <ControlPanel>
          <PageSwitcher page={page} setPage={setPage} />
        </ControlPanel>
        <Box w="100%" maxHeight="100%" overflowY="scroll" marginTop="4">
          <PoolList page={page} />
        </Box>
      </>
    </PoolOffchainDataProvider>
  );
};
