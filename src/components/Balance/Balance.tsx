import { useEffect, useState } from "react";
import { useCardano } from "../../hooks/useCardano";
import { currencyToSymbol, getAssets, lovelaceToAda, roundLovelace } from "../../utils/assets";

export const Balance = () => {
  const cardano = useCardano();
  const [balance, setBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);

  const getBalance = async () => {
    if (!cardano) return;
    const isEnabled = await cardano.isEnabled();

    if (!isEnabled) return;
    const assets = await getAssets(cardano);

    const lovelaceBalance = assets.find((asset) => asset.unit === "lovelace");
    if (!lovelaceBalance) throw Error("no lovelace balance");

    const exponent = lovelaceBalance.quantity.slice(-6);
    const baseAmount = lovelaceBalance.quantity.slice(
      0,
      lovelaceBalance.quantity.length - 6
    );

    const adaBalance =
      parseInt(baseAmount) +
      lovelaceToAda(roundLovelace(exponent));
    setBalance(adaBalance);
    setIsBalanceLoading(false);
  };

  useEffect(() => {
    getBalance();
  }, [cardano.isEnabled]);

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
