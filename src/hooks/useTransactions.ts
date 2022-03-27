import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { GET_TRANSACTIONS } from '../graphql/queries/transactions';
import {
  GetTransactions,
  GetTransactions_transactions,
  GetTransactions_transactions_inputs,
  GetTransactions_transactions_outputs,
} from '../graphql/queries/__generated__/GetTransactions';
import { graphqlFetcher } from '../utils/fetchers';
import { useAddresses } from './useAddresses';

import { getEnv } from '../utils/getEnv';

const { GRAPHQL_URL } = getEnv();

export type TransactionsByType = {
  inputs: GetTransactions_transactions_inputs[];
  outputs: GetTransactions_transactions_outputs[];
};

const processTransactions = (txs: GetTransactions_transactions[]) => {
  if (!txs) return;

  const txReducer = (
    acc: TransactionsByType,
    curr: GetTransactions_transactions
  ) => {
    const { inputs, outputs } = curr;
    return {
      inputs: [...acc.inputs, ...(inputs as TransactionsByType['inputs'])],
      outputs: [...acc.outputs, ...(outputs as TransactionsByType['outputs'])],
    };
  };

  return txs.reduce(txReducer, { inputs: [], outputs: [] });
};

export const useTransactions = (pageIndex: number, limit = 10) => {
  const { used: addresses } = useAddresses();
  const [txs, setTxs] = useState<TransactionsByType>({
    inputs: [],
    outputs: [],
  });

  const { data, isValidating, error } = useSWR<GetTransactions>(
    addresses?.length > 0
      ? [
          GRAPHQL_URL,
          GET_TRANSACTIONS,
          { addresses, limit, offset: limit * pageIndex },
        ]
      : null,
    graphqlFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (data?.transactions) {
      const filteredTxs = data.transactions.filter(
        (tx) => tx !== null
      ) as GetTransactions_transactions[];

      const txsByType = processTransactions(filteredTxs);
      if (txsByType) {
        setTxs(txsByType);
      }
    }
  }, [data?.transactions]);

  return {
    transactions: txs,
    loading: isValidating,
    error: !!error,
  };
};
