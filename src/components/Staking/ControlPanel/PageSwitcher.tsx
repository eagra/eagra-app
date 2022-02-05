import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

export const PageSwitcher = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Box d="flex" flexDir="row" alignItems="center">
      <Button onClick={() => setPage((currentPage) => currentPage - 1)}>
        <ArrowBackIcon />
      </Button>
      <Text marginLeft="2" marginRight="2" fontWeight="bold">
        {page}
      </Text>
      <Button onClick={() => setPage((currentPage) => currentPage + 1)}>
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
};
