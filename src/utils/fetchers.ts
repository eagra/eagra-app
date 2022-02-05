import { request } from 'graphql-request';

export const defaultFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export const graphqlFetcher = (
  url: string,
  query: string,
  args?: Record<string, unknown>
) => request(url, query, args);
