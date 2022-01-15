import { Value } from "@emurgo/cardano-serialization-lib-browser";
import BigNumber from "bignumber.js";

export const LOVELACE_PER_ADA = 1_000_000;
export type BaseCurrency = "ada" | "usd" | "eur";

export const valueToLovelace = (value: Value) => {
  return new BigNumber(value.coin().to_str());
};

export const lovelaceToAda = (lovelaceBalance: BigNumber) => {
  return lovelaceBalance.dividedBy(LOVELACE_PER_ADA);
};

export const currencySymbol = (currency: BaseCurrency) => {
  const currencyMap = { usd: "$", ada: "₳", eur: "€" };
  return currencyMap[currency];
};