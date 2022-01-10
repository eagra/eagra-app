/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPools
// ====================================================

export interface GetPools_stakePools_retirements {
  __typename: "StakePoolRetirement";
  inEffectFrom: number;
}

export interface GetPools_stakePools {
  __typename: "StakePool";
  fixedCost: string;
  hash: any;
  id: any;
  pledge: string;
  url: string | null;
  metadataHash: any | null;
  retirements: (GetPools_stakePools_retirements | null)[] | null;
}

export interface GetPools {
  stakePools: (GetPools_stakePools | null)[] | null;
}

export interface GetPoolsVariables {
  limit: number;
  offset: number;
}
