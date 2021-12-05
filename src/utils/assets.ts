import { Value } from "@emurgo/cardano-serialization-lib-browser";
import { CardanoInjectedApi } from "../hooks/useCardano";
import { bytesToHex, hexToAscii, deserialize } from "./serializer";

export const LOVELACE_PER_ADA = 1000000;

export type Asset = {
  unit: string;
  quantity: string;
  policy?: string;
  name?: string;
};

export type BaseCurrency = "ada" | "usd" | "eur";

export const getAssets = async (cardano: CardanoInjectedApi) => {
  if (!cardano) throw new Error("cardano injected api not found");

  const rawBalance = await cardano.getBalance();

  const balance = deserialize(rawBalance);
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

export const lovelaceToAda = (lovelace: number) => {
  return lovelace / LOVELACE_PER_ADA;
};

export const roundLovelace = (exponent: string) => {
  return Math.round(parseInt(exponent) / 10000) * 10000;
};

export const currencyToSymbol = (currency: BaseCurrency) => {
  const currencyMap = { usd: "$", ada: "₳", eur: "€" };
  return currencyMap[currency];
};
