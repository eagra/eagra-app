import { request } from "graphql-request";

export const defaultFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

//Slower but performs validation
//Todo optimize, because looking for headers is taxing, it rarely gets there, but still...

export const jsonFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    //Check if data is json
    if (res.headers.get("content-type") !== "application/json") {
      throw new Error("Not a json");
    }
    return res.json();
  });

export const graphqlFetcher = (
  url: string,
  query: string,
  args?: Record<string, unknown>
) => request(url, query, args);
