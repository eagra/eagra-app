import { useEffect, useState } from "react";
import { CardanoApi, useCardano } from "../../hooks/useCardano";
import { Asset, getAssets } from "../../lib/assets";

const AssetComponent = ({ asset }: { asset: Asset }) => {
  const { quantity, name, policy, fingerprint } = asset;
  return (
    <div>
      <span>
        {quantity} {name}
      </span>
      <div css={{ fontSize: 12 }}>{policy}</div>
      <div css={{ fontSize: 12 }}>{fingerprint}</div>
    </div>
  );
};

export const Assets = () => {
  const cardano = useCardano();
  const [assets, setAssets] = useState<Asset[]>([]);

  const getAssetBalance = async (cardano: CardanoApi) => {
    const assets = await getAssets(cardano);
    setAssets(assets);
  };

  useEffect(() => {
    if (!cardano || !cardano.isConnected) return;
    getAssetBalance(cardano);
  }, [cardano]);

  if (!cardano || !cardano.isConnected) return null;

  return (
    <div>
      <h3>Assets</h3>
      {assets.map((asset) => (
        <AssetComponent key={asset.unit} asset={asset} />
      ))}
    </div>
  );
};
