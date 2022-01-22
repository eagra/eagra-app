/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPools
// ====================================================

export interface GetPools_stakePools_retirements {
  __typename: "StakePoolRetirement";
  inEffectFrom: number | null;
}

export interface GetPools_stakePools {
  __typename: "StakePool";
  fixedCost: any | null;
  hash: any | null;
  id: string | null;
  pledge: any | null;
  url: string | null;
  metadataHash: any | null;
  /**
   * An array relationship
   */
  retirements: GetPools_stakePools_retirements[];
}

export interface GetPools {
  /**
   * fetch data from the table: "StakePool"
   */
  stakePools: GetPools_stakePools[];
}

export interface GetPoolsVariables {
  limit: number;
  offset: number;
}
