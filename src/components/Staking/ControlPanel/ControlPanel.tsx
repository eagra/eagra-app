import { Box } from '@chakra-ui/react';

export const ControlPanel = ({ children }: { children: JSX.Element }) => {
  return (
    <Box display="flex" width="100%" height="48px">
      {children}
    </Box>
  );
};
