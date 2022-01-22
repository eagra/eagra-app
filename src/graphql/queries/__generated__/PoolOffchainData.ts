/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PoolOffchainData
// ====================================================

export interface PoolOffchainData_pool_offline_data {
  __typename: "pool_offline_data";
  json: any;
  hash: any;
}

export interface PoolOffchainData {
  /**
   * fetch data from the table: "pool_offline_data"
   */
  pool_offline_data: PoolOffchainData_pool_offline_data[];
}
