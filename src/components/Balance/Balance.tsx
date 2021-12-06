import { useEffect, useState } from "react";
import { CardanoApi, useCardano } from "../../hooks/useCardano";
import { currencyToSymbol, getAssets, lovelaceToAda } from "../../utils/assets";

export const Balance = () => {
  const cardano = useCardano();
  const [balance, setBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const getBalance = async (cardano: CardanoApi) => {
    const assets = await getAssets(cardano);

    const lovelaceBalance = assets.find((asset) => asset.unit === "lovelace");
    if (!lovelaceBalance) throw Error("no lovelace balance");

    return lovelaceToAda(lovelaceBalance);
  };

  useEffect(() => {
    if (!cardano || !cardano.isConnected) return;
    setIsBalanceLoading(true);
    getBalance(cardano)
      .then((adaBalance) => {
        setBalance(adaBalance);
      })
      .finally(() => setIsBalanceLoading(false));
  }, [cardano]);

  if (!cardano || !cardano.isConnected) return null;

  return (
    <div>
      {isBalanceLoading ? (
        "Loading..."
      ) : (
        <span>
          Balance:{" "}
          <span css={{ color: "#99ddff" }}>
            {currencyToSymbol("ada")} {balance}
          </span>
        </span>
      )}
    </div>
  );
};
