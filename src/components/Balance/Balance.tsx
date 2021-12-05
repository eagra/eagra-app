import { useEffect, useState } from "react";
import { useCardano } from "../../hooks/useCardano";
import {
  currencyToSymbol,
  getAssets,
  lovelaceToAda,
} from "../../utils/assets";

export const Balance = () => {
  const cardano = useCardano();
  const [balance, setBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);

  const getBalance = async () => {
    if (!cardano) return;
    const isEnabled = await cardano.isEnabled();

    if (!isEnabled) {
      setIsBalanceLoading(false);
      return;
    }
    const assets = await getAssets(cardano);

    const lovelaceBalance = assets.find((asset) => asset.unit === "lovelace");
    if (!lovelaceBalance) throw Error("no lovelace balance");

    const adaBalance = lovelaceToAda(lovelaceBalance);

    setBalance(adaBalance);
    setIsBalanceLoading(false);
  };

  useEffect(() => {
    getBalance();
  }, [cardano.isEnabled]);

  if (!cardano.isEnabled) return null;

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
