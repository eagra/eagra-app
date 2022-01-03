import gql from "graphql-tag";

export const GET_POOLS = gql`
  query GetPools($limit: Int!, $offset: Int!) {
    stakePools(limit: $limit, offset: $offset) {
      fixedCost
      hash
      id
      pledge
      url
    }
  }
`;
