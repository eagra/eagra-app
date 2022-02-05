import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/layout';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import {
  GetTransactions_transactions_inputs,
  GetTransactions_transactions_outputs,
} from '../../../graphql/queries/__generated__/GetTransactions';
import { useTransactions } from '../../../hooks/useTransactions';
import { currencySymbol, lovelaceToAda, Serializer } from '../../../lib';

export const Transaction = ({
  tx,
  action,
}: {
  action: 'Received' | 'Sent';
  tx:
    | GetTransactions_transactions_outputs
    | GetTransactions_transactions_inputs;
}) => {
  const serializer = new Serializer();

  const backdropColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.50');

  return (
    <Box
      backdropFilter="blur(6px)"
      bgColor={backdropColor}
      p="8"
      borderRadius="lg"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      width="100%"
    >
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        {action === 'Sent' ? (
          <ArrowUpIcon color="red.400" />
        ) : (
          <ArrowDownIcon color="teal.400" />
        )}
        <Text fontSize="lg" marginLeft="2" fontWeight="bold">
          {action}
        </Text>
      </Box>
      <Text fontStyle="italic" wordBreak="break-word">
        {tx.txHash}
      </Text>
      <Text>
        {currencySymbol('ada')}{' '}
        {lovelaceToAda(new BigNumber(tx.value)).toFixed(2)}
      </Text>
      {tx.tokens &&
        tx.tokens.map((token, index) => {
          if (!token || !token.asset) return null;
          return (
            <Text key={index}>
              {token.quantity} {serializer.hexToAscii(token.asset.assetName)}
            </Text>
          );
        })}
    </Box>
  );
};

const TransactionList = () => {
  const { transactions, loading } = useTransactions(0);

  if (loading) return <Text>Loading Transactions...</Text>;

  if (!transactions) return <Text>No Txs</Text>;

  const { inputs, outputs } = transactions;

  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="4">
      {inputs &&
        inputs.map((tx, index) => {
          return (
            <Transaction key={tx.txHash + index} tx={tx} action="Received" />
          );
        })}
      {outputs &&
        outputs.map((tx, index) => {
          return <Transaction key={tx.txHash + index} tx={tx} action="Sent" />;
        })}
    </Box>
  );
};

export const Transactions = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box marginTop="8" w="100%">
      <Button onClick={() => setOpen((o) => !o)} p="4" bgColor="transparent">
        <Heading size="md">Transactions</Heading>
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      {open && (
        <Box marginTop="4">
          <TransactionList />
        </Box>
      )}
    </Box>
  );
};
