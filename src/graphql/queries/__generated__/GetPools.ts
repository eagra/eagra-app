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

export interface GetPools_stakePools_activeStake {
  __typename: "ActiveStake";
  amount: any | null;
}

export interface GetPools_stakePools_rewards {
  __typename: "Reward";
  amount: any | null;
  earnedInEpochNo: any | null;
  type: any | null;
}

export interface GetPools_stakePools {
  __typename: "StakePool";
  hash: any | null;
  id: string | null;
  pledge: any | null;
  metadataHash: any | null;
  /**
   * An array relationship
   */
  retirements: GetPools_stakePools_retirements[];
  /**
   * An array relationship
   */
  activeStake: GetPools_stakePools_activeStake[];
  /**
   * An array relationship
   */
  rewards: GetPools_stakePools_rewards[];
  fixedCost: any | null;
  margin: any | null;
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
