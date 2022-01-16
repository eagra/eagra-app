import gql from "graphql-tag";

export const GET_TRANSACTIONS = gql`
  query GetTransactions($addresses: [String!]!, $limit: Int!, $offset: Int!) {
    transactions(
      where: {
        _or: {
          inputs: { address: { _in: $addresses } }
          outputs: { address: { _in: $addresses } }
        }
      }
      limit: $limit
      offset: $offset
    ) {
      outputs(where: { address: { _in: $addresses } }) {
        address
        value
        txHash
        tokens {
          asset {
            policyId
            fingerprint
            name
            assetId
            assetName
          }
          quantity
        }
      }
      inputs(where: { address: { _in: $addresses } }) {
        address
        value
        txHash
        tokens {
          asset {
            policyId
            fingerprint
            name
            assetId
            assetName
          }
          quantity
        }
      }
      metadata {
        key
        value
      }
    }
  }
`;
