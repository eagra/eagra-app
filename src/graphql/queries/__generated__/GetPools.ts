/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPools
// ====================================================

export interface GetPools_stakePools {
  __typename: "StakePool";
  fixedCost: string;
  hash: any;
  id: any;
  pledge: string;
  url: string | null;
}

export interface GetPools {
  stakePools: (GetPools_stakePools | null)[] | null;
}

export interface GetPoolsVariables {
  limit: number;
  offset: number;
}
