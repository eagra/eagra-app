import {
  TransactionUnspentOutput,
  Value,
  min_ada_required,
  BigNum,
  StakeDelegation,
  StakeCredential,
  PoolParams,
} from "@emurgo/cardano-serialization-lib-browser";
import AssetFingerprint from "@emurgo/cip14-js";
import { CardanoApi } from "../hooks/useCardano";
import { bytesToHex, hexToAscii, hexToBytes, hexToValue } from "./serializer";
import { Buffer as B } from "buffer/";
import BigFloat from "./BigFloat";

// minUTxOValue protocol paramter has been removed since Alonzo HF.
// Calulation of minADA works differently now, but 1 minADA still sufficient for now
export const MIN_UTXO = 1_000_000;
export const LOVELACE_PER_ADA = 1_000_000;

export type Asset = {
  unit: string;
  quantity: string;
  policy?: string;
  name?: string;
  fingerprint?: string;
  metadata?: Record<string, unknown>;
};

export type BaseCurrency = "ada" | "usd" | "eur";

// assets
export const getAssets = async (cardano: CardanoApi) => {
  if (!cardano) throw new Error("cardano injected api not found");

  const rawBalance = await cardano.getBalance();
  const balance = hexToValue(rawBalance);

  return await valueToAssets(balance);
};

export const valueToAssets = (balance: Value): Asset[] => {
  const assets: Asset[] = [];

  // if assets not detected, return empty array;
  const multiasset = balance.multiasset();
  if (!multiasset) return assets;

  const multiAssets = multiasset.keys();
  for (let j = 0; j < multiAssets.len(); j++) {
    const policy = multiAssets.get(j);
    const policyAssets = multiasset.get(policy);

    const assetNames = policyAssets?.keys();

    if (!assetNames) {
      continue;
    }

    for (let k = 0; k < assetNames?.len(); k++) {
      const policyAsset = assetNames.get(k);
      const quantity = policyAssets?.get(policyAsset);

      const unit =
        bytesToHex(policy.to_bytes()) + bytesToHex(policyAsset.name());

      const _policy = unit.slice(0, 56);
      const _name = unit.slice(56);

      const fingerprint = getAssetFingerprint(_policy, _name);

      if (!quantity) throw new Error(`quantity is required for asset ${unit}`);

      assets.push({
        unit,
        quantity: quantity?.to_str(),
        policy: _policy,
        name: hexToAscii(_name),
        fingerprint,
      });
    }
  }

  return assets;
};

export const getAssetFingerprint = (policy: string, name: string) => {
  return AssetFingerprint.fromParts(
    B.from(policy, "hex"),
    B.from(name, "hex")
  ).fingerprint();
};

// ada balance
export const getBalance = async (cardano: CardanoApi) => {
  const rawBalance = await cardano.getBalance();
  const balance = hexToValue(rawBalance);

  return valueToLovelace(balance);
};

export const valueToLovelace = (value: Value): BigFloat => {
  return new BigFloat(value.coin().to_str());
};

export const lovelaceToAda = (lovelaceBalance: BigFloat) => {
  return lovelaceBalance.divide(LOVELACE_PER_ADA);
};

export const truncLovelace = (fraction: number) => {
  return (Math.floor(fraction / 10000) * 10000) / LOVELACE_PER_ADA;
};

export const currencyToSymbol = (currency: BaseCurrency) => {
  const currencyMap = { usd: "$", ada: "₳", eur: "€" };
  return currencyMap[currency];
};

// collateral
export const getCollateral = async (cardano: CardanoApi) => {
  const [rawCollateral] = await cardano.getCollateral();
  if (!rawCollateral) return new BigFloat(0);

  const collateral = hexToBytes(rawCollateral);

  const tx = TransactionUnspentOutput.from_bytes(collateral);
  return valueToLovelace(tx.output().amount());
};

// locked value
export const getLockedBalance = async (cardano: CardanoApi) => {
  const rawBalance = await cardano.getBalance();
  const balance = hexToValue(rawBalance);

  const minAda = BigNum.from_str(MIN_UTXO.toString());
  const lockedAda = min_ada_required(balance, minAda).to_str();

  return new BigFloat(lockedAda);
};
