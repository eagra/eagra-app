/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTransactions
// ====================================================

export interface GetTransactions_transactions_outputs_tokens_asset {
  __typename: "Asset";
  policyId: any;
  fingerprint: any | null;
  name: string | null;
  assetId: any;
  assetName: any | null;
}

export interface GetTransactions_transactions_outputs_tokens {
  __typename: "Token";
  asset: GetTransactions_transactions_outputs_tokens_asset;
  quantity: string;
}

export interface GetTransactions_transactions_outputs {
  __typename: "TransactionOutput";
  address: string;
  value: string;
  txHash: any;
  tokens: GetTransactions_transactions_outputs_tokens[];
}

export interface GetTransactions_transactions_inputs_tokens_asset {
  __typename: "Asset";
  policyId: any;
  fingerprint: any | null;
  name: string | null;
  assetId: any;
  assetName: any | null;
}

export interface GetTransactions_transactions_inputs_tokens {
  __typename: "Token";
  asset: GetTransactions_transactions_inputs_tokens_asset;
  quantity: string;
}

export interface GetTransactions_transactions_inputs {
  __typename: "TransactionInput";
  address: string;
  value: string;
  txHash: any;
  tokens: (GetTransactions_transactions_inputs_tokens | null)[];
}

export interface GetTransactions_transactions_metadata {
  __typename: "TransactionMetadata";
  key: string;
  value: any;
}

export interface GetTransactions_transactions {
  __typename: "Transaction";
  outputs: (GetTransactions_transactions_outputs | null)[];
  inputs: GetTransactions_transactions_inputs[];
  metadata: (GetTransactions_transactions_metadata | null)[] | null;
}

export interface GetTransactions {
  transactions: (GetTransactions_transactions | null)[];
}

export interface GetTransactionsVariables {
  addresses: string[];
  limit: number;
  offset: number;
}
