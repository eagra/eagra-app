export const getEnv = () => {
  return {
    GRAPHQL_URL: import.meta.env.EAGRA_GRAPHQL_URL as string,
    PRICE_API_URL: import.meta.env.EAGRA_PRICE_API_URL as string,
  };
};
