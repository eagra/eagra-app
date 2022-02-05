import gql from 'graphql-tag';

export const GET_POOLS = gql`
  query GetPools($limit: Int!, $offset: Int!) {
    stakePools(limit: $limit, offset: $offset) {
      hash
      id
      pledge
      metadataHash
      retirements {
        inEffectFrom
      }
      activeStake(limit: 1) {
        amount
      }
      rewards(limit: 3) {
        amount
        earnedInEpochNo
        type
      }
      fixedCost
      margin
      pledge
    }
  }
`;

export const GET_POOL_OFFCHAIN_DATA = gql`
  query PoolOffchainData {
    pool_offline_data {
      json
      hash
    }
  }
`;
