/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTransactions
// ====================================================

export interface GetTransactions_transactions_outputs_tokens_asset {
  __typename: "Asset";
  policyId: any | null;
  fingerprint: any | null;
  name: string | null;
  assetId: any;
  assetName: any | null;
}

export interface GetTransactions_transactions_outputs_tokens {
  __typename: "TokenInOutput";
  /**
   * An object relationship
   */
  asset: GetTransactions_transactions_outputs_tokens_asset | null;
  quantity: any | null;
}

export interface GetTransactions_transactions_outputs {
  __typename: "TransactionOutput";
  address: string | null;
  value: any | null;
  txHash: any | null;
  /**
   * An array relationship
   */
  tokens: GetTransactions_transactions_outputs_tokens[];
}

export interface GetTransactions_transactions_inputs_tokens_asset {
  __typename: "Asset";
  policyId: any | null;
  fingerprint: any | null;
  name: string | null;
  assetId: any;
  assetName: any | null;
}

export interface GetTransactions_transactions_inputs_tokens {
  __typename: "TokenInOutput";
  /**
   * An object relationship
   */
  asset: GetTransactions_transactions_inputs_tokens_asset | null;
  quantity: any | null;
}

export interface GetTransactions_transactions_inputs {
  __typename: "TransactionInput";
  address: string | null;
  value: any | null;
  txHash: any | null;
  /**
   * An array relationship
   */
  tokens: GetTransactions_transactions_inputs_tokens[];
}

export interface GetTransactions_transactions_metadata {
  __typename: "tx_metadata";
  key: any;
  value: any | null;
}

export interface GetTransactions_transactions {
  __typename: "Transaction";
  /**
   * An array relationship
   */
  outputs: GetTransactions_transactions_outputs[];
  /**
   * An array relationship
   */
  inputs: GetTransactions_transactions_inputs[];
  /**
   * An array relationship
   */
  metadata: GetTransactions_transactions_metadata[];
}

export interface GetTransactions {
  /**
   * fetch data from the table: "Transaction"
   */
  transactions: GetTransactions_transactions[];
}

export interface GetTransactionsVariables {
  addresses: string[];
  limit: number;
  offset: number;
}
