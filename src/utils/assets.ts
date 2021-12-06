import { Value } from "@emurgo/cardano-serialization-lib-browser";
import { CardanoApi } from "../hooks/useCardano";
import { bytesToHex, hexToAscii, hexToValue } from "./serializer";

export const LOVELACE_PER_ADA = 1000000;

export type Asset = {
  unit: string;
  quantity: string;
  policy?: string;
  name?: string;
};

export type BaseCurrency = "ada" | "usd" | "eur";

export const getAssets = async (cardano: CardanoApi) => {
  if (!cardano) throw new Error("cardano injected api not found");

  const rawBalance = await cardano.getBalance();

  const balance = hexToValue(rawBalance);
  const assets = await valueToAssets(balance);

  return assets;
};

export const valueToAssets = async (value: Value): Promise<Asset[]> => {
  const assets: Asset[] = [];

  assets.push({ unit: "lovelace", quantity: value.coin().to_str() });

  const multiasset = value.multiasset();
  if (multiasset) {
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
        const name = hexToAscii(unit.slice(56));

        // TODO
        // const fingerprint = new AssetFingerprint(
        //   Buffer.from(_policy, "hex"),
        //   Buffer.from(_name, "hex")
        // ).fingerprint();

        if (!quantity)
          throw new Error(`quantity is required for asset ${unit}`);

        assets.push({
          unit,
          quantity: quantity?.to_str(),
          policy: _policy,
          name,
          // fingerprint,
        });
      }
    }
  }

  return assets;
};

export const lovelaceToAda = (lovelaceBalance: Asset) => {
  const fraction = lovelaceBalance.quantity.slice(-6);
  const baseAmount = lovelaceBalance.quantity.slice(
    0,
    lovelaceBalance.quantity.length - 6
  );

  const baseAda = baseAmount.length > 0 ? parseInt(baseAmount) : 0;
  const fractionAda = roundLovelace(fraction) / LOVELACE_PER_ADA;

  return baseAda + fractionAda;
};

export const roundLovelace = (exponent: string) => {
  return Math.round(parseInt(exponent) / 10000) * 10000;
};

export const currencyToSymbol = (currency: BaseCurrency) => {
  const currencyMap = { usd: "$", ada: "₳", eur: "€" };
  return currencyMap[currency];
};
